import { ROLE_PERMISSIONS } from "../constants";

type RoleBadgeProps = {
  role: string;
};

export default function RoleBadge({ role }: RoleBadgeProps) {
  const permissions = ROLE_PERMISSIONS[role as keyof typeof ROLE_PERMISSIONS];
  return (
    <span className={`inline-block px-2 py-1 text-xs text-white rounded ${permissions?.color || "bg-gray-500"}`}>
      {permissions?.label || role}
    </span>
  );
}