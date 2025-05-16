
// src/pages/EventBackend/EventDashboard.tsx
import { useEffect, useState } from "react";
import { supabase } from "../../createClient";
import { useNavigate } from "react-router-dom";
import EventHeader from "../../components/layout/EventHeader";
import SearchBar from "../../components/layout/SearchBar";
import EventList from "../../components/layout/EventList";
import UserManagementModal from "../../components/modal/UserManagementModal";
import CreateUserModal from "../../components/modal/CreateUserModal";
import UserDetailsModal from "../../components/modal/UserDetailsModal";
import { ROLE_PERMISSIONS } from "../../constants";
import { User, Event } from "../../types";

export default function EventDashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [usersLoading, setUsersLoading] = useState(false);
  const [disableLoading, setDisableLoading] = useState<number | null>(null);

  const navigate = useNavigate();
  const isAdmin = role === "admin";
  const canModify = role === "admin" || role === "marketing";
  const permissions = role ? ROLE_PERMISSIONS[role as keyof typeof ROLE_PERMISSIONS] : null;

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/LoginPage");
        return;
      }

      const user = session.user;
      const { data, error } = await supabase
        .from("users")
        .select("id, email, role, name")
        .eq("id", user.id)
        .single();

      console.log('Auth data:', data, 'Error:', error);
      if (error || !data) {
        navigate("/LoginPage");
        return;
      }

      setRole(data.role);
      setCurrentUser(data);
      fetchEvents();
      setCheckingAuth(false);
    };

    checkAuth();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/LoginPage");
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [navigate]);

  const fetchEvents = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("events").select("*").order("date", { ascending: true });
    if (!error) {
      console.log('Fetched events:', data);
      setEvents(data || []);
    } else {
      console.error('Error fetching events:', error);
    }
    setLoading(false);
  };

  const fetchUsers = async () => {
    setUsersLoading(true);
    const { data, error } = await supabase
      .from("users")
      .select("id, email, role, name, created_at, last_sign_in")
    console.log('Fetched users:', data, 'Error:', error);
    if (!error) setUsers(data || []);
    setUsersLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this event?")) return;
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (!error) setEvents(events.filter(e => e.id !== id));
  };

  const handleDisableToggle = async (id: number, current: boolean) => {
    try {
      console.log('Toggling disable for event:', { id, current });
      setDisableLoading(id);
      const newDisabled = !current;
      const { error } = await supabase
        .from("events")
        .update({ disabled: newDisabled })
        .eq("id", id);
      
      if (error) {
        console.error("Error toggling event disable status:", error);
        alert("Failed to toggle event status. Please try again.");
        return;
      }

      setEvents((prevEvents) => {
        const updatedEvents = prevEvents.map((event) =>
          event.id === id ? { ...event, disabled: newDisabled } : event
        );
        console.log('Updated events state:', updatedEvents);
        return updatedEvents;
      });
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred.");
    } finally {
      setDisableLoading(null);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/LoginPage");
  };

  const handleUpdateRole = async (userId: string, newRole: string) => {
    const { error } = await supabase.from("users").update({ role: newRole }).eq("id", userId);
    if (!error) {
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      if (currentUser?.id === userId) {
        setRole(newRole);
        setCurrentUser(prev => prev ? { ...prev, role: newRole } : null);
      }
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
    const { error: userDeleteError } = await supabase.from("users").delete().eq("id", userId);
    if (userDeleteError) return;
    const { error: authDeleteError } = await supabase.auth.admin.deleteUser(userId);
    if (!authDeleteError) setUsers(users.filter(u => u.id !== userId));
  };

  const handleResetPassword = async (email: string) => {
    if (!confirm(`Send password reset email to ${email}?`)) return;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/reset-password",
    });
    if (!error) alert("Password reset email sent");
  };

  const handleCreateUser = async (email: string, role: string) => {
    const { data, error } = await supabase.auth.admin.createUser({ email, email_confirm: true });
    if (error || !data?.user) return;
    const { error: roleError } = await supabase
      .from("users")
      .insert([{ id: data.user.id, email, role, created_at: new Date().toISOString(), name: email.split('@')[0] }]);
    if (!roleError) fetchUsers();
  };

  const handleViewUserDetails = (user: User) => {
    console.log('Viewing user:', user);
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  const handleDuplicateEvent = async (id: number) => {
    const { data: original, error } = await supabase.from("events").select("*").eq("id", id).single();
    if (error || !original) {
      console.error("Error fetching original event:", error);
      return alert("Failed to fetch original event.");
    }

    const duplicated = {
      ...original,
      title: `${original.title} (Copy)`,
      date: new Date().toISOString().split("T")[0],
    };
    delete duplicated.id;

    const { error: insertError } = await supabase.from("events").insert([duplicated]);
    if (insertError) {
      console.error("Error duplicating event:", insertError);
      return alert("Failed to duplicate event.");
    }

    fetchEvents();
  };

  const filteredEvents = events
    .map((e) => {
      let score = 0;
      const query = search.toLowerCase();
      if (e.title?.toLowerCase().includes(query)) score += 3;
      if (e.location?.toLowerCase().includes(query)) score += 2;
      if (e.region?.toLowerCase().includes(query)) score += 2;
      if (e.date?.toLowerCase().includes(query)) score += 1;
      return score > 0 || query === "" ? { ...e, score } : null;
    })
    .filter((e): e is Event & { score: number } => e !== null)
    .sort((a, b) => b.score - a.score);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#9b1f62] via-[#682161] to-[#3e3764] text-white">
        Checking authentication...
      </div>
    );
  }

  console.log('Filtered events:', filteredEvents);
  console.log('User role:', role, 'isAdmin:', isAdmin, 'canModify:', canModify);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#9b1f62] via-[#682161] to-[#3e3764] px-4 py-10 text-white">
      <div className="max-w-7xl mx-auto">
        <EventHeader
          currentUser={currentUser!}
          role={role!}
          onAddEvent={() => navigate("/Admin/events/new")}
          onManageUsers={() => { fetchUsers(); setShowUserModal(true); }}
          onCreateUser={() => setShowCreateUserModal(true)}
          onLogout={handleLogout}
        />
        <SearchBar value={search} onChange={setSearch} />
        {loading ? (
          <p className="text-center">Loading events...</p>
        ) : (
          <EventList
            events={filteredEvents}
            canModify={canModify}
            canDelete={permissions?.canDeleteEvents || false}
            onDuplicate={handleDuplicateEvent}
            onEdit={(id) => navigate(`/Admin/events/edit/${id}`)}
            onDelete={handleDelete}
            onToggleDisable={handleDisableToggle}
            disableLoading={disableLoading}
            isAdmin={isAdmin}
          />
        )}
        {showUserModal && currentUser && (
          <UserManagementModal
            users={users}
            currentUser={currentUser}
            onClose={() => setShowUserModal(false)}
            onUpdateRole={handleUpdateRole}
            onDeleteUser={handleDeleteUser}
            onResetPassword={handleResetPassword}
            onViewDetails={handleViewUserDetails}
            usersLoading={usersLoading}
          />
        )}
        {showCreateUserModal && (
          <CreateUserModal
            onClose={() => setShowCreateUserModal(false)}
            onCreate={handleCreateUser}
          />
        )}
        {showUserDetails && selectedUser && currentUser && (
          <UserDetailsModal
            user={selectedUser}
            currentUser={currentUser}
            onClose={() => {
              setShowUserDetails(false);
              setSelectedUser(null);
            }}
            onResetPassword={handleResetPassword}
            onDeleteUser={handleDeleteUser}
          />
        )}
      </div>
    </div>
  );
}
