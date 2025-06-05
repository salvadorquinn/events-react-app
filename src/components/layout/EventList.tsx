// src/components/layout/EventList.tsx
import type { Event } from "../../types/event";
import { ROLE_PERMISSIONS } from "../../constants";
import EventCard from "./EventsCard";

interface EventListProps {
  events: Event[];
  onDuplicate: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onToggleDisable: (id: number) => void;
  disableLoading: number | null;
  currentUserRole: string;
}

export default function EventList({
  events,
  onDuplicate,
  onEdit,
  onDelete,
  onToggleDisable,
  disableLoading,
  currentUserRole,
}: EventListProps) {  const permissions = ROLE_PERMISSIONS[currentUserRole as keyof typeof ROLE_PERMISSIONS];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          canModify={permissions.canEditEvents}
          canDelete={permissions.canDeleteEvents}
          canDuplicate={permissions.canCloneEvents}
          canToggleDisable={permissions.canDisableEvents}
          onEdit={() => onEdit(event.id)}
          onDelete={() => onDelete(event.id)}
          onDuplicate={() => onDuplicate(event.id)}
          onToggleDisable={() => onToggleDisable(event.id)}
          disableLoading={disableLoading}
          isAdmin={permissions.canEditEvents || permissions.canDeleteEvents || permissions.canCloneEvents || permissions.canDisableEvents}
        />
      ))}
    </div>
  );
}