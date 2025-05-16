import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { supabase } from "../../createClient";

export default function EventForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [searchParams] = useSearchParams();

  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    address: "",
    region: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [existingImage, setExistingImage] = useState<string | null>(null);

  // Fetch existing event when editing
  useEffect(() => {
    if (isEditMode) {
      const fetchEvent = async () => {
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .eq("id", id)
          .single();

        if (data) {
          setEvent({
            title: data.title || "",
            description: data.description || "",
            date: data.date || "",
            venue: data.venue || "",
            address: data.address || "",
            region: data.region || "",
          });
          setExistingImage(data.image);
          setImagePreview(data.image);
        }

        if (error) {
          console.error("Fetch error:", error.message);
          alert("Failed to load event");
          navigate("/EventDashboard");
        }
      };

      fetchEvent();
    } else {
      // Prefill region if adding a new event
      const regionFromUrl = searchParams.get("region");
      if (regionFromUrl) {
        setEvent((prev) => ({ ...prev, region: regionFromUrl }));
      }
    }
  }, [id, isEditMode, navigate, searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleRegionSelect = (region: string) => {
    setEvent({ ...event, region });
  };

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
      console.error("Image upload error:", error.message);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from("event-images")
      .getPublicUrl(fileName);

    return publicUrlData?.publicUrl || null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const imageUrl = await uploadImage();

    if (!imageUrl) {
      alert("Image upload failed.");
      setSaving(false);
      return;
    }

    const link = event.region === "Bangladesh" ? "/BdEvents" : "/AuEvents";

    if (isEditMode) {
      const { error } = await supabase
        .from("events")
        .update({ ...event, image: imageUrl, link })
        .eq("id", id);

      if (error) {
        alert("Failed to update event.");
        console.error("Update error:", error.message);
      } else {
        alert("Event updated!");
        navigate("/EventDashboard");
      }
    } else {
      const { error } = await supabase
        .from("events")
        .insert([{ ...event, image: imageUrl, link }]);

      if (error) {
        alert("Failed to add event.");
        console.error("Insert error:", error.message);
      } else {
        alert("Event added!");
        navigate("/EventDashboard");
      }
    }

    setSaving(false);
  };

  const handleCancel = () => {
    navigate("/EventDashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#9b1f62] via-[#682161] to-[#3e3764] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-white text-center mb-8">
            {isEditMode ? "Edit Event" : "Add New Event"}
          </h1>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="col-span-full">
              <label className="text-white/90 font-medium mb-1 block">
                Title
              </label>
              <input
                name="title"
                value={event.title}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                placeholder="Event Title"
              />
            </div>

            <div className="col-span-full">
              <label className="text-white/90 font-medium mb-1 block">
                Description
              </label>
              <textarea
                name="description"
                value={event.description}
                onChange={handleChange}
                rows={3}
                required
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                placeholder="Event Description"
              />
            </div>

            <div>
              <label className="text-white/90 font-medium mb-1 block">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={event.date}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
              />
            </div>

            <div>
              <label className="text-white/90 font-medium mb-1 block">
                Venue
              </label>
              <input
                name="venue"
                value={event.venue}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
              />
            </div>

            <div>
              <label className="text-white/90 font-medium mb-1 block">
                Address
              </label>
              <input
                name="address"
                value={event.address}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
              />
            </div>

            <div>
              <label className="text-white/90 font-medium mb-1 block">
                Region
              </label>
              <div className="flex gap-4">
                {["Bangladesh", "Australia"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => handleRegionSelect(r)}
                    className={`px-4 py-2 rounded-lg border text-white transition ${
                      event.region === r
                        ? "bg-[#9b1f62] border-white"
                        : "bg-white/10 border-white/20 hover:bg-white/20"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="col-span-full">
              <label className="text-white/90 font-medium block mb-2">
                Upload Image{" "}
                <span className="text-sm text-white/60">
                  (Recommended: 500X500px)
                </span>
              </label>

              {!imagePreview ? (
                <div className="relative mx-auto border-2 border-dashed border-white/30 rounded-lg hover:border-white/50 transition-all bg-white/5 w-full max-w-full xl:w-[1080px] xl:h-[280px] flex items-center justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required={!isEditMode}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-white/70"
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
                    <p className="mt-2 text-sm text-white/80">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-white/60">PNG, JPG, GIF</p>
                  </div>
                </div>
              ) : (
                <div className="relative mx-auto w-full max-w-full xl:w-[280px] xl:h-[280px] overflow-hidden border border-white/20 rounded-lg bg-white/5">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 bg-white/40 hover:bg-white/60 text-white text-xs px-3 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            <div className="col-span-full flex justify-between mt-6 flex-col md:flex-row gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-white/10 text-white px-6 py-3 rounded-lg hover:bg-white/20"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="bg-gradient-to-r from-[#9b1f62] to-[#682161] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-70"
              >
                {saving
                  ? isEditMode
                    ? "Saving changes..."
                    : "Adding event..."
                  : isEditMode
                  ? "Save Changes"
                  : "Add Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
