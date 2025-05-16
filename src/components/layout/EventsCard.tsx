// src/components/layout/EventsCard.tsx
import { Pencil, Trash2, Copy } from "lucide-react";
import { Event } from "../../types";

type EventCardProps = {
  event: Event;
  canModify: boolean; // Controls disable toggle (admin and marketing only)
  canDelete: boolean;
  onDuplicate: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onToggleDisable: (id: number, current: boolean) => void;
  disableLoading: number | null;
  isAdmin: boolean;
};

export default function EventCard({
  event,
  canModify,
  canDelete,
  onDuplicate,
  onEdit,
  onDelete,
  onToggleDisable,
  disableLoading,
  isAdmin,
}: EventCardProps) {
  return (
    <div className="bg-white/10 rounded-lg p-4 space-y-2 relative">
      <h2 className="text-lg font-semibold">{event.title}</h2>
      <p>{event.location}</p>
      <p>{event.date}</p>
      <p className="text-sm italic">{event.region}</p>
      {event.disabled && (
        <span className={`absolute top-2 right-2 text-xs px-2 py-1 rounded ${isAdmin ? 'bg-yellow-500' : 'bg-red-500'} text-white`}>
          Disabled
        </span>
      )}
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onDuplicate(event.id)}
          className="hover:bg-white/10 p-1 rounded transition"
        >
          <Copy size={18} />
        </button>
        {canModify && (
          <button
            onClick={() => onEdit(event.id)}
            className="hover:bg-white/10 p-1 rounded transition"
          >
            <Pencil size={18} />
          </button>
        )}
        {canDelete && (
          <button
            onClick={() => onDelete(event.id)}
            className="hover:bg-white/10 p-1 rounded transition text-red-300"
          >
            <Trash2 size={18} />
          </button>
        )}
        {canModify && (
          <button
            onClick={() => onToggleDisable(event.id, event.disabled)}
            className="ml-auto text-xs bg-white/20 px-2 py-1 rounded hover:bg-white/30 transition disabled:opacity-50"
            disabled={disableLoading === event.id}
            aria-label={event.disabled ? "Enable event" : "Disable event"}
          >
            {disableLoading === event.id ? "Toggling..." : event.disabled ? "Enable" : "Disable"}
          </button>
        )}
      </div>
    </div>
  );
}