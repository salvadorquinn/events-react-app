import { useEffect, useState } from "react";
import { supabase } from "../../createClient";
import { useNavigate } from "react-router-dom";
import EventHeader from "../../components/layout/EventHeader";
import SearchBar, { SearchFilters } from "../../components/layout/SearchBar";
import EventList from "../../components/layout/EventList";
import UserManagementModal from "../../components/modal/UserManagementModal";
import UserDetailsModal from "../../components/modal/UserDetailsModal";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { ROLE_PERMISSIONS } from "../../constants";
import type { Event } from "../../types/event";
import { User, Role } from "../../types";
import { notify } from "../../utils/notifications";
import { logger } from "../../utils/logger";
import { sessionManager } from "../../utils/session";
import { apiRateLimiter, userActionRateLimiter } from "../../utils/rateLimit";
export default function EventDashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState<User | null>(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({
    status: "all",
    date: "all",
    upcoming: false
  });
  const [disableLoading, setDisableLoading] = useState<number | null>(null);

  const navigate = useNavigate();
  const isAdmin = role === "admin" || role === "super-admin";
  const canModify = isAdmin;

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .order('email');
      
      if (error) {
        logger.error('Error fetching users:', error);
        notify.error('Failed to fetch users');
        return;
      }

      if (data) {
        const validRoles: Role[] = ["super-admin", "admin", "marketing-supervisor", "marketing", "marketing-intern"];
        const validatedUsers = data
          .filter((user: any) => validRoles.includes(user.role))
          .map((user: any) => ({
            ...user,
            role: user.role as Role,
          }));
        setUsers(validatedUsers);

        // Update current user data if it exists in the new data
        if (currentUser) {
          const updatedCurrentUser = validatedUsers.find(u => u.id === currentUser.id);
          if (updatedCurrentUser) {
            setCurrentUser(updatedCurrentUser);
          }
        }
      }
    } catch (error) {
      logger.error('Error fetching users:', error);
      notify.error('Failed to fetch users');
    }
  };

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        await sessionManager.refreshSession();
        const user = sessionManager.getUser();
        
        if (!user) {
          navigate("/LoginPage");
          return;
        }

        setRole(user.role as Role);
        setCurrentUser(user);
        await fetchEvents();
        await fetchUsers(); // Fetch users data initially
      } catch (error) {
        logger.error('Error initializing dashboard', error);
        notify.error('Failed to initialize dashboard');
        navigate("/LoginPage");
      } finally {
        setCheckingAuth(false);
      }
    };

    initializeDashboard();
  }, [navigate]);

  // Add effect to refresh user data periodically
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      if (currentUser) {
        fetchUsers();
      }
    }, 60000); // Refresh every minute

    return () => clearInterval(refreshInterval);
  }, [currentUser]);

  const fetchEvents = async () => {
    if (!apiRateLimiter.canMakeRequest('fetchEvents')) {
      const waitTime = apiRateLimiter.getRemainingTime('fetchEvents');
      notify.error(`Too many requests. Please wait ${Math.ceil(waitTime / 1000)} seconds.`);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("start_date", { ascending: true });

      if (error) {
        logger.error('Failed to fetch events', error);
        notify.error('Failed to load events');
        return;
      }

      if (data) {
        logger.debug('Raw Events Data:', { data });
        setEvents(data);
      }
    } catch (error) {
      logger.error('Failed to fetch events', error);
      notify.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!userActionRateLimiter.canMakeRequest('deleteEvent')) {
      notify.error('Please wait before trying to delete another event');
      return;
    }

    if (!confirm("Are you sure you want to delete this event? This action cannot be undone.")) return;

    try {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) throw error;

      setEvents(events.filter(e => e.id !== id));
      notify.success('Event deleted successfully');
      logger.info('Event deleted', { eventId: id });
    } catch (error) {
      logger.error('Error deleting event', error);
      notify.error('Failed to delete event');
    }
  };

  const handleDisableToggle = async (id: number) => {
    if (!userActionRateLimiter.canMakeRequest('toggleDisable')) {
      notify.error('Please wait before toggling event status');
      return;
    }

    setDisableLoading(id);
    try {
      const event = events.find(e => e.id === id);
      if (!event) {
        notify.error('Event not found');
        return;
      }

      const { error } = await supabase
        .from("events")
        .update({ disabled: !event.disabled })
        .eq("id", id);

      if (error) throw error;

      setEvents(events.map(e => e.id === id ? { ...e, disabled: !e.disabled } : e));
      notify.success(`Event ${event.disabled ? 'enabled' : 'disabled'} successfully`);
    } catch (error) {
      logger.error('Error toggling event status', error);
      notify.error('Failed to update event status');
    } finally {
      setDisableLoading(null);
    }
  };

  const handleLogout = async () => {
    try {
      await sessionManager.clearSession();
      navigate("/LoginPage");
    } catch (error) {
      logger.error('Error logging out', error);
      notify.error('Failed to log out');
    }
  };

  const handleUpdateRole = async (userId: string, newRole: string) => {
    if (!userActionRateLimiter.canMakeRequest('updateRole')) {
      notify.error('Please wait before updating another user\'s role');
      return;
    }

    if (currentUser?.role !== "super-admin") {
      notify.error('Only super-admins can change user roles');
      return;
    }

    // Get the target user
    const targetUser = users.find(u => u.id === userId);
    if (!targetUser) {
      notify.error('User not found');
      return;
    }

    // Check if target user is a super-admin
    if (targetUser.role === "super-admin" && !ROLE_PERMISSIONS[targetUser.role].canBeModified) {
      notify.error('Super admin users cannot be modified');
      return;
    }

    try {
      const { error } = await supabase.from("users").update({ role: newRole }).eq("id", userId);
      if (error) throw error;

      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole as Role } : u));
      if (currentUser?.id === userId) {
        setRole(newRole as Role);
        setCurrentUser(prev => prev ? { ...prev, role: newRole as Role } : null);
      }
      notify.success('Role updated successfully');
      logger.info('User role updated', { userId, newRole });
    } catch (error) {
      logger.error('Error updating role', error);
      notify.error('Failed to update role');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
    
    const targetUser = users.find(u => u.id === userId);
    if (!targetUser) {
      notify.error('User not found');
      return;
    }

    // Check if target user is a super-admin
    if (targetUser.role === "super-admin") {
      if (currentUser?.role !== "super-admin") {
        notify.error('Only super-admins can delete super-admin users');
        return;
      }
      if (!ROLE_PERMISSIONS[targetUser.role].canBeModified) {
        notify.error('Super admin users cannot be modified');
        return;
      }
    }

    // Check if trying to delete an admin
    if (targetUser.role === "admin" && currentUser?.role !== "super-admin") {
      notify.error('Only super-admins can delete admin users');
      return;
    }

    try {
      const { error: userDeleteError } = await supabase.from("users").delete().eq("id", userId);
      if (userDeleteError) throw userDeleteError;

      const { error: authDeleteError } = await supabase.auth.admin.deleteUser(userId);
      if (authDeleteError) throw authDeleteError;

      setUsers(users.filter(u => u.id !== userId));
      notify.success('User deleted successfully');
    } catch (error) {
      logger.error('Error deleting user:', error);
      notify.error('Failed to delete user. Please try again.');
    }
  };

  const handleResetPassword = async (email: string) => {
    if (!confirm(`Send password reset email to ${email}?`)) return;
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + "/reset-password",
      });
      if (error) throw error;
      
      alert("Password reset email sent successfully!");
    } catch (error) {
      logger.error('Error sending password reset:', error);
      alert("Failed to send password reset email. Please try again.");
    }
  };

  const handleUpdateProfile = () => {
    // For now, just show the user details modal for the current user
    if (currentUser) {
      setShowUserDetailsModal(currentUser);
    }
  };

  const handleDuplicateEvent = async (id: number) => {
    try {
      const { data: original, error: fetchError } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError || !original) throw fetchError;

      const duplicated = {
        ...original,
        title: `${original.title} (Copy)`,
        start_date: new Date().toISOString().split("T")[0],
        end_date: null, // Reset end date for duplicated event
      };
      delete duplicated.id;

      const { error: insertError } = await supabase
        .from("events")
        .insert([duplicated]);

      if (insertError) throw insertError;

      await fetchEvents();
      notify.success("Event duplicated successfully!");
    } catch (error) {
      logger.error('Error duplicating event:', error);
      notify.error("Failed to duplicate event. Please try again.");
    }
  };
  const filteredEvents = events
    .map((e) => {
      let score = 0;
      const searchQuery = search.toLowerCase();
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // Apply status filter
      if (filters.status !== "all") {
        const isDisabled = e.disabled || false;
        if (filters.status === "active" && isDisabled) return null;
        if (filters.status === "disabled" && !isDisabled) return null;
      }

      // Apply upcoming filter
      if (filters.upcoming) {
        const eventStartDate = new Date(e.start_date);
        const eventEndDate = e.end_date ? new Date(e.end_date) : eventStartDate;
        if (eventEndDate < today) return null;
      }

      // Apply date filter
      if (filters.date !== "all") {
        const eventStartDate = new Date(e.start_date);
        const eventEndDate = e.end_date ? new Date(e.end_date) : eventStartDate;
        const diffDays = Math.floor((eventStartDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        switch (filters.date) {
          case "today":
            if (diffDays !== 0) return null;
            break;
          case "week":
            if (diffDays > 7 || eventEndDate < today) return null;
            break;
          case "month":
            if (diffDays > 30 || eventEndDate < today) return null;
            break;
          case "year":
            if (diffDays > 365 || eventEndDate < today) return null;
            break;
        }
      }

      // Calculate search score
      if (searchQuery) {
        if (e.title?.toLowerCase().includes(searchQuery)) score += 3;
        if (e.location?.toLowerCase().includes(searchQuery)) score += 2;
        if (e.region?.toLowerCase().includes(searchQuery)) score += 2;
        if (e.start_date?.toLowerCase().includes(searchQuery)) score += 1;
        if (e.end_date?.toLowerCase().includes(searchQuery)) score += 1;
        if (score === 0) return null;
      }

      return { ...e, score: score || 1 };
    })
    .filter((e): e is Event & { score: number } => e !== null)
    .sort((a, b) => {
      // First sort by score (for search results)
      if (b.score !== a.score) return b.score - a.score;
      
      // Then sort by start date
      const aDate = new Date(a.start_date);
      const bDate = new Date(b.start_date);
      return aDate.getTime() - bDate.getTime();
    });

  // Detailed summary logging
  logger.debug('Detailed Filter Summary:', {
    totalEvents: events.length,
    filteredEvents: filteredEvents.length,
    currentFilters: filters,
    allEventTitles: events.map(e => e.title)
  });
  // Menu items are now handled by EventHeader component

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#9b1f62] via-[#682161] to-[#3e3764] text-white">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  logger.debug('Filtered events:', { filteredEvents });
  logger.debug('User role:', { role, isAdmin, canModify });

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#9b1f62] via-[#682161] to-[#3e3764] px-4 py-10 text-white">
      <div className="max-w-7xl mx-auto">
        <EventHeader
          currentUser={currentUser!}
          role={role!}
          onAddEvent={() => navigate("/Admin/events/new")}
          onManageUsers={() => {
            fetchUsers();
            setShowUserModal(true);
          }}
          onLogout={handleLogout}
          onUpdateProfile={handleUpdateProfile}
        />
        <SearchBar 
          value={search} 
          onChange={setSearch} 
          onFilterChange={setFilters}
        />
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <EventList
            events={filteredEvents}
            currentUserRole={role || ""}
            onDuplicate={handleDuplicateEvent}
            onEdit={(id) => navigate(`/Admin/events/edit/${id}`)}
            onDelete={handleDelete}
            onToggleDisable={handleDisableToggle}
            disableLoading={disableLoading}
          />
        )}

        {showUserModal && (
          <UserManagementModal
            users={users}
            currentUser={currentUser!}
            onClose={() => setShowUserModal(false)}
            onUpdateRole={handleUpdateRole}
            onDeleteUser={handleDeleteUser}
            onResetPassword={handleResetPassword}
            onViewDetails={(user) => setShowUserDetailsModal(user)}
            usersLoading={loading}
          />
        )}

        {showUserDetailsModal && (
          <UserDetailsModal
            user={showUserDetailsModal}
            currentUser={currentUser!}
            onClose={() => {
              setShowUserDetailsModal(null);
              fetchUsers();
            }}
            onResetPassword={handleResetPassword}
            onDeleteUser={handleDeleteUser}
          />
        )}
      </div>
    </div>
  );
}