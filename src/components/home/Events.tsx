// src/components/home/Events.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../createClient';
import { Event } from '../../types';

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('disabled', false)
          .order('date', { ascending: true });

        if (error) {
          console.error('Error fetching events:', error);
          setError('Failed to load events. Please try again later.');
          return;
        }

        console.log('Public events fetched:', data);
        setEvents(data as Event[]);
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const renderEventCard = (event: Event, keyPrefix: string) => (
    <div key={`${keyPrefix}-${event.id}`} className="border border-gray-200 p-5 bg-gray-50 hover:shadow-lg transition-shadow">
      <img src={event.image || ''} alt={event.title} className="w-full h-auto mb-4" />
      <h2 className="text-lg font-semibold mb-2">{event.title}</h2>
      <p className="text-sm text-gray-700 mb-4">{event.description}</p>
      <div className="text-sm text-gray-800 mb-4 whitespace-pre-line">
        <strong>TIME</strong>
        <br />
        {event.date}
        <br />
        {event.location}
        <br />
        {event.map_link || event.location}
      </div>
      <Link to={event.map_link || '#'} className="text-black-600 hover:underline">
        View details →
      </Link>
    </div>
  );

  if (loading) {
    return <div className="text-center py-10">Loading events...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div>
      {/* Australia Events */}
      <section className="py-10 max-w-[1200px] mx-auto">
        <h1 className="text-4xl font-semibold mb-10 text-center leading-snug">
          Upcoming Events in Australia
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {events.filter(e => e.region === 'Australia').map(e => renderEventCard(e, 'au'))}
        </div>
      </section>

      {/* Bangladesh Events */}
      <section className="py-6 max-w-[1200px] mx-auto">
        <h1 className="text-4xl font-semibold mb-10 text-center leading-snug">
          Upcoming Events in Bangladesh
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {events.filter(e => e.region === 'Bangladesh').map(e => renderEventCard(e, 'bd'))}
        </div>
      </section>
    </div>
  );
};

export default Events;