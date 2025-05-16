import { createClient } from "@supabase/supabase-js";
import { ROLE_PERMISSIONS } from "./constants";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Remove syncUserRoles from automatic execution


export async function syncUserRoles() {
  const { data: users, error } = await supabase.from("users").select("id, role");

  if (error) {
    console.error("Error fetching users:", error);
    return;
  }

  for (const user of users) {
    // Fetch current user_metadata
    const { data: authUser, error: fetchError } = await supabase.auth.admin.getUserById(user.id);

    if (fetchError) {
      console.error(`Error fetching auth user ${user.id}:`, fetchError.message);
      continue;
    }

    const currentRole = authUser.user?.user_metadata?.role;
    const validRoles = Object.keys(ROLE_PERMISSIONS);

    // Only update if the users table role is different and valid
    if (user.role !== currentRole && validRoles.includes(user.role)) {
      const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
        user_metadata: { role: user.role },
      });

      if (updateError) {
        console.error(`Error updating ${user.id}:`, updateError.message);
      } else {
        console.log(`Updated ${user.id} to role ${user.role}`);
      }
    }
  }
}