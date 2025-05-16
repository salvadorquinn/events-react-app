// src/components/layout/EventList.tsx
import EventCard from "./EventsCard";
import { Event } from "../../types";

type EventListProps = {
  events: (Event & { score: number })[];
  canModify: boolean; // Controls disable toggle (admin and marketing only)
  canDelete: boolean;
  onDuplicate: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onToggleDisable: (id: number, current: boolean) => void;
  disableLoading: number | null;
  isAdmin: boolean;
};

export default function EventList({
  events,
  canModify,
  canDelete,
  onDuplicate,
  onEdit,
  onDelete,
  onToggleDisable,
  disableLoading,
  isAdmin,
}: EventListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          canModify={canModify}
          canDelete={canDelete}
          onEdit={() => onEdit(event.id)}
          onDelete={() => onDelete(event.id)}
          onDuplicate={() => onDuplicate(event.id)}
          onToggleDisable={() => onToggleDisable(event.id, event.disabled)}
          disableLoading={disableLoading}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
}