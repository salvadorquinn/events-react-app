// src/components/layout/EventsCard.tsx
import { Pencil, Trash2, Copy, Power, Calendar, MapPin, Globe } from "lucide-react";
import type { Event } from "../../types/event";
import { getEventDateTime } from '../../utils/dateTime';

type EventCardProps = {
  event: Event;
  canModify: boolean;
  canDelete: boolean;
  canDuplicate: boolean;
  canToggleDisable: boolean;
  onDuplicate: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleDisable: () => void;
  disableLoading: number | null;
  isAdmin: boolean;
};

export default function EventCard({
  event,
  canModify,
  canDelete,
  canDuplicate,
  canToggleDisable,
  onDuplicate,
  onEdit,
  onDelete,
  onToggleDisable,
  disableLoading,
  isAdmin,
}: EventCardProps) {  const getDateTimeDisplay = () => {
    return (
      <div className="space-y-2 sm:space-y-3">
        <div className="flex items-start gap-1">
          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 text-white/70 flex-shrink-0" />
          <div className="text-xs sm:text-sm">
            {getEventDateTime(event.start_date, event.start_time, event.end_date, event.end_time)}
          </div>
        </div>
      </div>
    );    const dateTimeStr = getEventDateTime(event.start_date, event.start_time, event.end_date, event.end_time);
    
    return (
      <div className="space-y-1 sm:space-y-2">
        <div className="flex items-start gap-1">
          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 text-white/70 flex-shrink-0" />
          <div className="text-xs sm:text-sm">
            {dateTimeStr}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl shadow-lg overflow-hidden transition-all duration-200 
    ${event.disabled ? 'opacity-60' : 'hover:bg-white/15 hover:shadow-xl'}`}>
      {event.image && (
        <div className="relative h-32 sm:h-40 overflow-hidden rounded-t-lg sm:rounded-t-xl">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          {event.disabled && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <span className="text-xs sm:text-sm text-white font-medium">Event Disabled</span>
            </div>
          )}
        </div>
      )}
      
      <div className="p-3 sm:p-4">
        <h3 className="text-sm sm:text-base font-semibold text-white mb-2 sm:mb-3 line-clamp-2">
          {event.title}
        </h3>
        
        <div className="space-y-2 sm:space-y-3">
          <div className="space-y-2 sm:space-y-3 text-white/90">
            {getDateTimeDisplay()}
            
            {event.venue && (
              <div className="flex items-start gap-1">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 text-white/70 flex-shrink-0" />
                <span className="text-xs sm:text-sm line-clamp-1">{event.venue}</span>
              </div>
            )}
            
            {event.region && (
              <div className="flex items-start gap-1">
                <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 text-white/70 flex-shrink-0" />
                <span className="text-xs sm:text-sm">{event.region}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Admin Actions */}
        {isAdmin && (
          <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-1 sm:gap-2">
              {canModify && (
                <button
                  onClick={onEdit}
                  className="p-1 sm:p-1.5 text-white/90 hover:bg-white/10 rounded transition-colors"
                  title="Edit Event"
                >
                  <Pencil className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              )}
              {canDuplicate && (
                <button
                  onClick={onDuplicate}
                  className="p-1 sm:p-1.5 text-white/90 hover:bg-white/10 rounded transition-colors"
                  title="Duplicate Event"
                >
                  <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              )}
              {canToggleDisable && (
                <button
                  onClick={onToggleDisable}
                  disabled={disableLoading === event.id}
                  className={`p-1 sm:p-1.5 text-white/90 hover:bg-white/10 rounded transition-colors
                    ${disableLoading === event.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title={event.disabled ? 'Enable Event' : 'Disable Event'}
                >
                  {disableLoading === event.id ? (
                    <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                  ) : (
                    <Power className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  )}
                </button>
              )}
              {canDelete && (
                <button
                  onClick={onDelete}
                  className="p-1 sm:p-1.5 text-white/90 hover:bg-white/10 rounded transition-colors"
                  title="Delete Event"
                >
                  <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}