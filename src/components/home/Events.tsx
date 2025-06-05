// src/components/home/Events.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../createClient';
import type { Event } from '../../types/event';
import { logger } from '../../utils/logger';
import { formatDateRange } from '../../utils/dateTime';

const EventCard: React.FC<{ event: Event }> = ({ event }) => {  // Using imported formatDateRange from dateTime.ts

  return (
    <Link
      to={event.link || '#'}
      className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200"
    >
      {event.image && (
        <div className="h-40 overflow-hidden rounded-t-lg">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-3">
        <h3 className="text-base font-semibold text-gray-900 mb-1.5">
          {event.title}
        </h3>        <p className="text-sm text-gray-600 mb-1">
          {formatDateRange(event.start_date, event.end_date, true)} {/* Include time in the display */}
        </p>
        <p className="text-xs text-gray-500">{event.venue}</p>
        <p className="text-xs text-gray-500">{event.region}</p>
      </div>
    </Link>
  );
};

const Events: React.FC = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [completedEvents, setCompletedEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const { data: allEvents, error: allEventsError } = await supabase
          .from('events')
          .select('*')
          .order('start_date', { ascending: true });

        if (allEventsError) {
          logger.error('Error fetching events:', allEventsError);
          setError('Failed to load events. Please try again later.');
          return;
        }

        // Get non-disabled events
        const nonDisabledEvents = allEvents?.filter(event => !event.disabled) || [];

        // Check which events are in the past
        const now = new Date();
        now.setHours(0, 0, 0, 0); // Reset time to start of day for fair comparison

        const upcoming: Event[] = [];
        const completed: Event[] = [];

        nonDisabledEvents.forEach((event: Event) => {
          // Convert dates to UTC to ensure consistent comparison
          const startDate = new Date(event.start_date);
          startDate.setHours(0, 0, 0, 0);
          
          const endDate = event.end_date ? new Date(event.end_date) : startDate;
          endDate.setHours(0, 0, 0, 0);

          if (endDate >= now) {
            upcoming.push(event);
          } else {
            completed.push(event);
          }
        });
        
        // Sort events by start date (upcoming: ascending, completed: descending)
        const sortedUpcoming = upcoming.sort((a, b) => {
          return new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
        });
        
        const sortedCompleted = completed.sort((a, b) => {
          return new Date(b.start_date).getTime() - new Date(a.start_date).getTime();
        });
        
        setUpcomingEvents(sortedUpcoming);
        setCompletedEvents(sortedCompleted);
      } catch (err) {
        logger.error('Unexpected error:', err);
        setError('An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[150px]">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-3">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Upcoming Events Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Upcoming Events
          {upcomingEvents.length > 0 && (
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({upcomingEvents.length})
            </span>
          )}
        </h2>
        {upcomingEvents.length === 0 ? (
          <div className="text-center text-gray-600 p-3 bg-gray-50 rounded-lg">
            No upcoming events at this time.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>

      {/* Completed Events Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Successfully Completed Events
          {completedEvents.length > 0 && (
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({completedEvents.length})
            </span>
          )}
        </h2>
        {completedEvents.length === 0 ? (
          <div className="text-center text-gray-600 p-3 bg-gray-50 rounded-lg">
            No completed events yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Events;