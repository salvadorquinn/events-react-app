import { useState } from 'react';
import { supabase } from '../../createClient';
import { notify } from '../../utils/notifications';
import { logger } from '../../utils/logger';

export default function TestEventForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'seminar',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      logger.info('Submitting form data:', { formData });

      // First, check if a lead with this email already exists
      const { data: existingLeads, error: searchError } = await supabase
        .from('leads')
        .select('id, name, status')
        .eq('email', formData.email)
        .maybeSingle();

      if (searchError) {
        logger.error('Error searching for existing lead:', searchError);
        throw new Error(`Failed to check for existing lead: ${searchError.message}`);
      }

      let leadId;

      if (existingLeads) {
        // Update existing lead
        leadId = existingLeads.id;
        const { error: updateError } = await supabase
          .from('leads')
          .update({
            name: formData.name, // Update name in case it changed
            phone: formData.phone || null, // Update phone in case it changed
            notes: `Last Event Interest: ${formData.eventType}\n\n${formData.message}\n\nPrevious notes will be in the message history.`,
            updated_at: new Date().toISOString()
          })
          .eq('id', leadId);

        if (updateError) {
          logger.error('Error updating lead:', updateError);
          throw new Error(`Failed to update lead: ${updateError.message}`);
        }

        logger.info('Lead updated successfully');
      } else {
        // Create new lead
        const { data: newLead, error: insertError } = await supabase
          .from('leads')
          .insert([{
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            source: 'event_form',
            status: 'new',
            notes: `Event Type: ${formData.eventType}\n\n${formData.message}`
          }])
          .select()
          .single();

        if (insertError) {
          logger.error('Lead insertion error:', insertError);
          throw new Error(`Failed to create lead: ${insertError.message}`);
        }

        leadId = newLead.id;
        logger.info('New lead created successfully');
      }

      // Create a communication record for the form submission
      const { error: commError } = await supabase
        .from('communications')
        .insert([{
          lead_id: leadId,
          direction: 'incoming',
          type: 'form',
          subject: `New Event Interest: ${formData.eventType}`,
          content: formData.message || 'No additional message provided',
          status: 'sent'
        }]);

      if (commError) {
        logger.error('Communication insertion error:', commError);
        throw new Error(`Failed to create communication record: ${commError.message}`);
      }

      logger.info('Communication record created successfully');

      notify.success('Form submitted successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: 'seminar',
        message: ''
      });
    } catch (error: any) {
      logger.error('Form submission error:', error);
      notify.error(error.message || 'Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-6 space-y-4 md:space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 md:px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#9b1f62] focus:border-transparent text-sm md:text-base"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 md:px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#9b1f62] focus:border-transparent text-sm md:text-base"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 md:px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#9b1f62] focus:border-transparent text-sm md:text-base"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label htmlFor="eventType" className="block text-sm font-medium text-white mb-1">
            Event Type *
          </label>
          <select
            id="eventType"
            name="eventType"
            required
            value={formData.eventType}
            onChange={handleChange}
            className="w-full px-3 md:px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#9b1f62] focus:border-transparent text-sm md:text-base"
          >
            <option value="seminar">Seminar</option>
            <option value="workshop">Workshop</option>
            <option value="conference">Conference</option>
            <option value="webinar">Webinar</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-white mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 md:px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#9b1f62] focus:border-transparent text-sm md:text-base"
            placeholder="Any additional information or questions?"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 md:px-6 py-2.5 md:py-3 bg-[#9b1f62] text-white rounded-lg font-medium text-sm md:text-base transition-all duration-200
        hover:bg-[#8a1b57] focus:outline-none focus:ring-2 focus:ring-[#9b1f62] focus:ring-offset-2 focus:ring-offset-[#3e3764]
        disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
} 