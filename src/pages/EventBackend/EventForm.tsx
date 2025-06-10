import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { supabase } from "../../createClient";
import { notify } from "../../utils/notifications";
import { logger } from '../../utils/logger';
import LoadingSpinner from "../../components/common/LoadingSpinner";

type Venue = {
  id: number;
  name: string;
  is_inhouse: boolean;
  address?: string;
  map_link?: string;
  created_at?: string;
  region: string;
};

export default function EventForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [searchParams] = useSearchParams();

  const [event, setEvent] = useState({
    title: "",
    description: "",
    start_date: new Date().toISOString().split('T')[0],
    start_time: "09:00",
    end_date: "",
    end_time: "17:00",
    venue: "",
    address: "",
    region: "",
    location: "",
    disabled: false,
    is_virtual: false,
    map_link: ""
  });

  const [venues, setVenues] = useState<(Venue & { region: string })[]>([]);
  const [isInhouseEvent, setIsInhouseEvent] = useState(false);
  const [isVirtualEvent, setIsVirtualEvent] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [showVenueDropdown, setShowVenueDropdown] = useState(false);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const { data, error } = await supabase
          .from('venues')
          .select('*')
          .order('name', { ascending: true });

        if (error) {
          logger.error('Error fetching venues:', error);
          notify.error('Failed to load venues');
          return;
        }

        if (data) {
          setVenues(data);
        }
      } catch (error) {
        logger.error('Error:', error);
        notify.error('Failed to load venues');
      }
    };

    fetchVenues();
  }, []);

  useEffect(() => {
    if (isEditMode) {
      const fetchEvent = async () => {
        try {
          const { data, error } = await supabase
            .from("events")
            .select("*")
            .eq("id", id)
            .single();

          if (error) {
            logger.error('Error fetching event:', error);
            notify.error("Failed to load event");
            return;
          }

          if (data) {
            // Format dates and times for input fields
            const formattedData = {
              ...data,
              start_date: data.start_date ? new Date(data.start_date).toISOString().split('T')[0] : '',
              end_date: data.end_date ? new Date(data.end_date).toISOString().split('T')[0] : '',
              start_time: data.start_time || '09:00',
              end_time: data.end_time || '17:00',
              is_virtual: data.is_virtual || false
            };
            setEvent(formattedData);
            setIsVirtualEvent(data.is_virtual || false);
            setExistingImage(data.image || null);
            
            // Check if the venue is an inhouse venue
            const venueData = venues.find(v => v.name === data.venue);
            setIsInhouseEvent(venueData?.is_inhouse ?? false);
          }
        } catch (error) {
          logger.error('Error:', error);
          notify.error("Failed to load event");
        }
      };

      fetchEvent();
    }
  }, [id, isEditMode, venues]);

  // Reset venue and address when region changes or virtual status changes
  useEffect(() => {
    if (event.region || isVirtualEvent) {
      setEvent(prev => ({ 
        ...prev, 
        venue: "", 
        address: "" 
      }));
      setIsInhouseEvent(false);
    }
  }, [event.region, isVirtualEvent]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Validate end_date is not before start_date
    if (name === 'end_date' && value) {
      if (event.start_date && new Date(value) < new Date(event.start_date)) {
        alert('End date cannot be before start date');
        return;
      }
    }
    
    // Validate start_date is not after end_date
    if (name === 'start_date' && value) {
      if (event.end_date && new Date(value) > new Date(event.end_date)) {
        setEvent(prev => ({ ...prev, end_date: '' })); // Clear end date if it's before new start date
      }
    }

    // Handle time validation
    if (name === 'end_time' && event.start_date === event.end_date) {
      const [startHours, startMinutes] = event.start_time.split(':').map(Number);
      const [endHours, endMinutes] = value.split(':').map(Number);
      
      if (endHours < startHours || (endHours === startHours && endMinutes <= startMinutes)) {
        alert('End time must be after start time on the same day');
        return;
      }
    }

    setEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleRegionSelect = (region: string) => {
    setEvent(prev => ({ 
      ...prev, 
      region,
      venue: "", // Reset venue when region changes
      address: "" // Reset address when region changes
    }));
    setIsInhouseEvent(false); // Reset inhouse checkbox when region changes
  };

  // Filter venues based on selected region
  const filteredVenues = venues.filter(venue => 
    venue.region === event.region && venue.is_inhouse
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return existingImage;

    const fileName = `${Date.now()}_${imageFile.name}`;
    const { data, error } = await supabase.storage
      .from("event-images")
      .upload(fileName, imageFile);

    if (error) {
      logger.error('Image upload error:', error);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from("event-images")
      .getPublicUrl(fileName);

    return publicUrlData?.publicUrl || null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;

    setSaving(true);
    try {
      const imageUrl = await uploadImage();
      
      const eventData = {
        title: event.title,
        description: event.description,
        start_date: new Date(event.start_date).toISOString(),
        end_date: event.end_date ? new Date(event.end_date).toISOString() : null,
        start_time: event.start_time,
        end_time: event.end_time,
        venue: isVirtualEvent ? "Virtual Event" : event.venue,
        address: isVirtualEvent ? "N/A" : event.address,
        region: isVirtualEvent ? "Virtual" : event.region,
        image: imageUrl || existingImage,
        disabled: event.disabled
        // Temporarily remove map_link until the column is added to the database
        // map_link: isInhouseEvent ? event.map_link : null
      };

      logger.info('Submitting event data:', { eventData });

      if (isEditMode) {
        const { data, error } = await supabase
          .from("events")
          .update(eventData)
          .eq("id", id);

        if (error) {
          logger.error('Error updating event:', error);
          logger.error('Error details:', {
            code: error.code,
            message: error.message,
            details: error.details,
            hint: error.hint
          });
          throw error;
        }
        logger.info('Update response:', { data });
        notify.success("Event updated successfully");
      } else {
        const { data, error } = await supabase
          .from("events")
          .insert([eventData])
          .select();

        if (error) {
          logger.error('Error creating event:', error);
          logger.error('Error details:', {
            code: error.code,
            message: error.message,
            details: error.details,
            hint: error.hint
          });
          throw error;
        }
        logger.info('Insert response:', { data });
        notify.success("Event created successfully");
      }

      navigate("/EventDashboard");
    } catch (error: any) {
      logger.error('Full error object:', error);
      notify.error(error.message || "Failed to save event");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/EventDashboard");
  };

  const handleVenueSelect = (venueName: string) => {
    const selectedVenue = venues.find(v => v.name === venueName);
    setEvent(prev => ({ 
      ...prev, 
      venue: venueName,
      address: selectedVenue?.address || prev.address,
      map_link: selectedVenue?.map_link || ""
    }));
    setShowVenueDropdown(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#9b1f62] via-[#682161] to-[#3e3764] py-4 sm:py-6 px-3 sm:px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold text-white text-center mb-4 sm:mb-6">
            {isEditMode ? "Edit Event" : "Add New Event"}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Region Selection */}
            <div className="bg-white/5 rounded-lg p-3 sm:p-4">
              <label className="text-white/90 font-medium mb-2 block text-sm sm:text-base">
                Region *
              </label>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                {["Bangladesh", "Australia"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => handleRegionSelect(r)}
                    disabled={isVirtualEvent}
                    className={`px-4 py-2 sm:py-2.5 rounded-lg border text-white text-sm sm:text-base transition-all duration-200 ${
                      event.region === r
                        ? "bg-[#9b1f62] border-white shadow-lg transform scale-102"
                        : isVirtualEvent
                        ? "bg-white/5 border-white/10 cursor-not-allowed opacity-50"
                        : "bg-white/10 border-white/20 hover:bg-white/20"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Virtual Event Toggle */}
            <div className="bg-white/5 rounded-lg p-3 sm:p-4">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm sm:text-base text-white/90 font-medium">Virtual Event</span>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={isVirtualEvent}
                    onChange={(e) => {
                      setIsVirtualEvent(e.target.checked);
                      if (e.target.checked) {
                        setEvent(prev => ({
                          ...prev,
                          region: "",
                          venue: "",
                          address: ""
                        }));
                        setIsInhouseEvent(false);
                      }
                    }}
                    className="sr-only"
                  />
                  <div className={`block w-12 sm:w-14 h-7 sm:h-8 rounded-full transition-colors duration-200 ${isVirtualEvent ? 'bg-[#9b1f62]' : 'bg-white/20'}`}>
                    <div className={`absolute left-1 top-1 bg-white w-5 sm:w-6 h-5 sm:h-6 rounded-full transition-transform duration-200 transform ${isVirtualEvent ? 'translate-x-5 sm:translate-x-6' : 'translate-x-0'}`}></div>
                  </div>
                </div>
              </label>
            </div>

            {/* Basic Information */}
            <div className="bg-white/5 rounded-lg p-3 sm:p-4 space-y-3 sm:space-y-4">
              <h2 className="text-sm sm:text-base font-semibold text-white mb-2 sm:mb-3">Basic Information</h2>
              
              <div>
                <label className="text-white/90 font-medium mb-1 sm:mb-1.5 block text-sm">
                  Title *
                </label>
                <input
                  name="title"
                  value={event.title}
                  onChange={handleChange}
                  required
                  className="w-full p-2 sm:p-2.5 rounded-lg bg-white/10 border border-white/20 text-white text-sm sm:text-base placeholder-white/50 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
                  placeholder="Enter event title"
                />
              </div>

              <div>
                <label className="text-white/90 font-medium mb-1 sm:mb-1.5 block text-sm">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={event.description}
                  onChange={handleChange}
                  rows={3}
                  required
                  className="w-full p-2 sm:p-2.5 rounded-lg bg-white/10 border border-white/20 text-white text-sm sm:text-base placeholder-white/50 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
                  placeholder="Enter event description"
                />
              </div>
            </div>

            {/* Date and Time */}
            <div className="bg-white/5 rounded-lg p-3 sm:p-4 space-y-3 sm:space-y-4">
              <h2 className="text-sm sm:text-base font-semibold text-white mb-2 sm:mb-3">Date and Time</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="text-white/90 font-medium mb-1 sm:mb-1.5 block text-sm">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    name="start_date"
                    value={event.start_date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-2 sm:p-2.5 rounded-lg bg-white/10 border border-white/20 text-white text-sm sm:text-base focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
                  />
                </div>

                <div>
                  <label className="text-white/90 font-medium mb-1 sm:mb-1.5 block text-sm">
                    Start Time *
                  </label>
                  <input
                    type="time"
                    name="start_time"
                    value={event.start_time}
                    onChange={handleChange}
                    required
                    className="w-full p-2 sm:p-2.5 rounded-lg bg-white/10 border border-white/20 text-white text-sm sm:text-base focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
                  />
                </div>

                <div>
                  <label className="text-white/90 font-medium mb-1 sm:mb-1.5 block text-sm">
                    End Date
                    <span className="text-white/60 text-xs ml-1">(Optional)</span>
                  </label>
                  <input
                    type="date"
                    name="end_date"
                    value={event.end_date}
                    onChange={handleChange}
                    min={event.start_date || new Date().toISOString().split('T')[0]}
                    className="w-full p-2 sm:p-2.5 rounded-lg bg-white/10 border border-white/20 text-white text-sm sm:text-base focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
                  />
                </div>

                <div>
                  <label className="text-white/90 font-medium mb-1 sm:mb-1.5 block text-sm">
                    End Time
                    <span className="text-white/60 text-xs ml-1">(Optional)</span>
                  </label>
                  <input
                    type="time"
                    name="end_time"
                    value={event.end_time}
                    onChange={handleChange}
                    className="w-full p-2 sm:p-2.5 rounded-lg bg-white/10 border border-white/20 text-white text-sm sm:text-base focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
                  />
                </div>
              </div>
            </div>

            {/* Venue Information - Only show if not virtual */}
            {!isVirtualEvent && (
              <div className="bg-white/5 rounded-lg p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3 sm:mb-4">
                  <h2 className="text-sm sm:text-base font-semibold text-white">Venue Information</h2>
                  
                  {/* Inhouse Event Toggle */}
                  <label className="flex items-center cursor-pointer">
                    <span className="text-xs sm:text-sm text-white/90 mr-2 sm:mr-3">Inhouse Event</span>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={isInhouseEvent}
                        onChange={(e) => {
                          setIsInhouseEvent(e.target.checked);
                          if (!e.target.checked) {
                            setEvent(prev => ({ 
                              ...prev, 
                              venue: "", 
                              address: "",
                              map_link: "" 
                            }));
                          }
                        }}
                        className="sr-only"
                      />
                      <div className={`block w-12 sm:w-14 h-7 sm:h-8 rounded-full transition-colors duration-200 ${isInhouseEvent ? 'bg-[#9b1f62]' : 'bg-white/20'}`}>
                        <div className={`absolute left-1 top-1 bg-white w-5 sm:w-6 h-5 sm:h-6 rounded-full transition-transform duration-200 transform ${isInhouseEvent ? 'translate-x-5 sm:translate-x-6' : 'translate-x-0'}`}></div>
                      </div>
                    </div>
                  </label>
                </div>
                
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  {/* Venue Selection/Input */}
                  <div>
                    <label className="text-white/90 font-medium mb-1 sm:mb-1.5 block text-sm">
                      Venue Name *
                    </label>
                    {isInhouseEvent ? (
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setShowVenueDropdown(!showVenueDropdown)}
                          className="w-full p-2 sm:p-2.5 rounded-lg bg-white/10 border border-white/20 text-white text-sm sm:text-base text-left flex justify-between items-center focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
                        >
                          {event.venue || `Select ${event.region} Venue`}
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                        
                        {showVenueDropdown && (
                          <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg max-h-48 overflow-auto">
                            {filteredVenues.length > 0 ? (
                              filteredVenues.map((venue) => (
                                <button
                                  key={venue.id}
                                  type="button"
                                  onClick={() => handleVenueSelect(venue.name)}
                                  className="w-full px-3 py-2 text-left text-sm sm:text-base text-gray-700 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg transition-colors duration-200"
                                >
                                  {venue.name}
                                </button>
                              ))
                            ) : (
                              <div className="px-3 py-2 text-sm sm:text-base text-gray-500 text-center">
                                No inhouse venues available in {event.region}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <input
                        name="venue"
                        value={event.venue}
                        onChange={handleChange}
                        required
                        className="w-full p-2 sm:p-2.5 rounded-lg bg-white/10 border border-white/20 text-white text-sm sm:text-base placeholder-white/50 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
                        placeholder={`Enter venue name in ${event.region}`}
                      />
                    )}
                  </div>

                  {/* Address Field */}
                  <div>
                    <label className="text-white/90 font-medium mb-1 sm:mb-1.5 block text-sm">
                      Address *
                    </label>
                    <input
                      name="address"
                      value={event.address}
                      onChange={handleChange}
                      required
                      disabled={isInhouseEvent}
                      className={`w-full p-2 sm:p-2.5 rounded-lg bg-white/10 border border-white/20 text-white text-sm sm:text-base placeholder-white/50 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40 ${
                        isInhouseEvent ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                      placeholder={isInhouseEvent ? "Address will be set automatically" : "Enter venue address"}
                    />
                  </div>

                  {/* Map Link Field - Only show for inhouse events */}
                  {isInhouseEvent && (
                    <div>
                      <label className="text-white/90 font-medium mb-1 sm:mb-1.5 block text-sm">
                        Map Link
                        <span className="text-white/60 text-xs ml-1">(Set in venue settings)</span>
                      </label>
                      <input
                        name="map_link"
                        value={event.map_link}
                        readOnly
                        disabled
                        className="w-full p-2 sm:p-2.5 rounded-lg bg-white/10 border border-white/20 text-white text-sm sm:text-base placeholder-white/50 opacity-75 cursor-not-allowed"
                        placeholder="Map link will be set automatically"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Image Upload */}
            <div className="bg-white/5 rounded-lg p-3 sm:p-4">
              <h2 className="text-sm sm:text-base font-semibold text-white mb-3 sm:mb-4">Event Image</h2>
              
              <div>
                <label className="text-white/90 font-medium block mb-2 text-sm">
                  Upload Image
                  <span className="text-white/60 text-xs ml-2">(500×500px)</span>
                </label>

                {!imagePreview && !existingImage ? (
                  <div className="relative mx-auto border-2 border-dashed border-white/30 rounded-lg hover:border-white/50 transition-all bg-white/5 h-[150px] sm:h-[200px] flex items-center justify-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      required={!isEditMode}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="text-center px-2">
                      <svg
                        className="mx-auto h-8 w-8 sm:h-10 sm:w-10 text-white/70"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="mt-2 text-xs sm:text-sm text-white/80">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-white/60">PNG, JPG, GIF</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative mx-auto h-[150px] sm:h-[200px] overflow-hidden border border-white/20 rounded-lg bg-white/5">
                    <img
                      src={imagePreview || existingImage || ''}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                        if (existingImage) setExistingImage(null);
                      }}
                      className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white text-xs sm:text-sm px-2 py-1 rounded transition-colors duration-200"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-between items-center pt-4 sm:pt-6">              <button
                type="button"
                onClick={handleCancel}
                className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-white/10 text-white text-sm sm:text-base hover:bg-white/20 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}                className={`min-w-[120px] px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg bg-gradient-to-r from-[#9b1f62] to-[#682161] text-white text-sm sm:text-base font-medium shadow-lg hover:opacity-90 transition-all duration-200 ${
                  saving ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  {saving && (
                    <div className="w-4 h-4">
                      <LoadingSpinner size="sm" />
                    </div>
                  )}
                  <span>{saving ? (isEditMode ? "Saving..." : "Creating...") : (isEditMode ? "Save Changes" : "Create Event")}</span>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
