import { useState, useEffect } from 'react';
import { eventService } from '../../services/eventService';
import { Link } from 'react-router-dom'; // Add to imports

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Assuming your backend returns data inside a 'data' or 'events' property
        // Adjust this depending on your actual API response structure
        const res = await eventService.getAllEvents();
        setEvents(res.data || res); 
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading events...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Alumni Events</h1>
        <Link to="/events/create" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
  Create Event
</Link>
      </div>

      {events.length === 0 ? (
        <p className="text-gray-500 text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
          No events found. Be the first to host one!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200">
                {/* Placeholder for event image */}
                <img 
                  src={event.imageUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80"} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-sm font-semibold text-blue-600 mb-2">
                  {new Date(event.date).toLocaleDateString()}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-600 line-clamp-2">{event.description}</p>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
                  <span>📍 {event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}