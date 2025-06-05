import { useState, useEffect } from 'react';
import { supabase } from '../../createClient';
import { Lead, Communication } from '../../types/communication';
import { notify } from '../../utils/notifications';
import EmailComposer from '../../components/Communication/EmailComposer';
import { Search, Mail, ChevronRight, Send, Clock, Calendar, Filter } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [communications, setCommunications] = useState<Communication[]>([]);
  const [showEmailComposer, setShowEmailComposer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    fetchLeads();
  }, [page, startDate, endDate]);

  const fetchLeads = async () => {
    try {
      let query = supabase
        .from('leads')
        .select('*', { count: 'exact' });

      if (startDate) {
        query = query.gte('created_at', startDate.toISOString());
      }
      if (endDate) {
        const nextDay = new Date(endDate);
        nextDay.setDate(nextDay.getDate() + 1);
        query = query.lt('created_at', nextDay.toISOString());
      }

      query = query
        .order('created_at', { ascending: false })
        .range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1);

      const { data, error, count } = await query;

      if (error) throw error;
      
      if (page === 1) {
        setLeads(data || []);
      } else {
        setLeads(prev => [...prev, ...(data || [])]);
      }
      
      setHasMore(count ? count > page * ITEMS_PER_PAGE : false);
    } catch (error: any) {
      notify.error('Error fetching leads');
      console.error('Error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmailCommunications = async (leadId: string) => {
    try {
      const { data, error } = await supabase
        .from('communications')
        .select('*')
        .eq('lead_id', leadId)
        .eq('type', 'email')
        .order('sent_at', { ascending: false });

      if (error) throw error;
      setCommunications(data || []);
    } catch (error: any) {
      notify.error('Error fetching email communications');
      console.error('Error:', error.message);
    }
  };

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
    fetchEmailCommunications(lead.id);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      new: 'bg-blue-500/10 text-blue-500 border border-blue-500/20',
      contacted: 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20',
      qualified: 'bg-green-500/10 text-green-500 border border-green-500/20',
      converted: 'bg-purple-500/10 text-purple-500 border border-purple-500/20',
      lost: 'bg-red-500/10 text-red-500 border border-red-500/20'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500/10 text-gray-500 border border-gray-500/20';
  };

  const handleLoadMore = () => {
    if (hasMore) {
      setPage(prev => prev + 1);
    }
  };

  const resetFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setPage(1);
    setSearchQuery('');
  };

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#9b1f62] via-[#682161] to-[#3e3764] p-2 sm:p-6">
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            border: none;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: rgba(255, 255, 255, 0.3);
          }

          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
          }

          .custom-scrollbar-light::-webkit-scrollbar {
            width: 6px;
          }
          
          .custom-scrollbar-light::-webkit-scrollbar-track {
            background: transparent;
          }
          
          .custom-scrollbar-light::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.1);
            border-radius: 20px;
            border: none;
          }

          .custom-scrollbar-light::-webkit-scrollbar-thumb:hover {
            background-color: rgba(0, 0, 0, 0.2);
          }

          .custom-scrollbar-light {
            scrollbar-width: thin;
            scrollbar-color: rgba(0, 0, 0, 0.1) transparent;
          }
        `}
      </style>
      
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden h-[calc(100vh-1rem)] sm:h-[calc(100vh-3rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
          {/* Leads Panel */}
          <div className="lg:border-r border-white/10 flex flex-col h-[50vh] lg:h-full overflow-hidden">
            <div className="p-3 sm:p-4 border-b border-white/10 space-y-3 sm:space-y-4 shrink-0">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search leads..."
                      className="w-full pl-10 pr-4 py-2 text-sm sm:text-base bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#9b1f62] focus:border-transparent transition-all duration-200"
                    />
                    <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white/50 absolute left-3 top-2.5" />
                  </div>
                </div>
              </div>

              <div className="relative">
                <DatePicker
                  selected={startDate}
                  onChange={(dates: [Date | null, Date | null]) => {
                    const [start, end] = dates;
                    setStartDate(start);
                    setEndDate(end);
                  }}
                  startDate={startDate || undefined}
                  endDate={endDate || undefined}
                  selectsRange
                  placeholderText="Select date range..."
                  className="w-full pl-10 pr-4 py-2 text-sm sm:text-base bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#9b1f62] focus:border-transparent transition-all duration-200"
                  dateFormat="MMM d, yyyy"
                />
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white/50 absolute left-3 top-2.5" />
                {(startDate || endDate) && (
                  <button
                    onClick={resetFilters}
                    className="absolute right-3 top-2.5 p-1 text-white/50 hover:text-white transition-colors duration-200"
                  >
                    <Filter className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="p-2">
                {loading && page === 1 ? (
                  <div className="text-center py-4 text-white/70">Loading leads...</div>
                ) : filteredLeads.length === 0 ? (
                  <div className="text-center py-4 text-white/70">
                    {searchQuery || startDate || endDate ? 'No leads found matching your criteria.' : 'No leads found'}
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      {filteredLeads.map((lead) => (
                        <button
                          key={lead.id}
                          onClick={() => handleLeadClick(lead)}
                          className={`w-full text-left p-3 sm:p-4 rounded-lg transition-all duration-200 group ${
                            selectedLead?.id === lead.id
                              ? 'bg-[#9b1f62] shadow-lg scale-[0.98]'
                              : 'bg-white/5 hover:bg-white/10 hover:scale-[0.99]'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-3">
                                <div className="flex-1 truncate">
                                  <div className="text-sm sm:text-base font-medium text-white group-hover:text-white truncate">
                                    {lead.name}
                                  </div>
                                  <div className="text-xs sm:text-sm text-white/70 group-hover:text-white/90 truncate">
                                    {lead.email}
                                  </div>
                                  <div className="text-xs text-white/50 mt-1">
                                    {new Date(lead.created_at).toLocaleDateString()} {new Date(lead.created_at).toLocaleTimeString()}
                                  </div>
                                </div>
                              </div>
                              <div className="mt-2 flex items-center space-x-2">
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                                  {lead.status}
                                </span>
                              </div>
                            </div>
                            <ChevronRight className={`w-4 h-4 sm:w-5 sm:h-5 transform transition-transform ${
                              selectedLead?.id === lead.id ? 'rotate-90 text-white' : 'text-white/40 group-hover:text-white/60'
                            }`} />
                          </div>
                        </button>
                      ))}
                    </div>
                    {hasMore && (
                      <button
                        onClick={handleLoadMore}
                        className="w-full py-3 mt-2 text-sm sm:text-base text-center text-white/70 hover:text-white transition-colors duration-200"
                      >
                        {loading ? 'Loading more...' : 'Load more leads'}
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Communications Panel */}
          <div className="lg:col-span-2 flex flex-col h-[50vh] lg:h-full overflow-hidden border-t lg:border-t-0 border-white/10">
            <div className="p-3 sm:p-4 border-b border-white/10 flex justify-between items-center shrink-0">
              {selectedLead ? (
                <div>
                  <h2 className="text-base sm:text-lg font-medium text-white">{selectedLead.name}</h2>
                  <p className="text-xs sm:text-sm text-white/70">{selectedLead.email}</p>
                </div>
              ) : (
                <h2 className="text-base sm:text-lg font-medium text-white">Email Communications</h2>
              )}
              {selectedLead && (
                <button
                  onClick={() => setShowEmailComposer(true)}
                  className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base bg-[#9b1f62] text-white rounded-lg hover:bg-[#8a1b57] transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Email
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="p-3 sm:p-4">
                {selectedLead ? (
                  communications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-white/70">
                      <Mail className="w-8 h-8 sm:w-12 sm:h-12 mb-4 stroke-1" />
                      <p className="text-sm sm:text-base">No email communications found</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {communications.map((comm) => (
                        <div
                          key={comm.id}
                          className={`p-3 sm:p-4 rounded-lg transition-all duration-200 hover:bg-white/5 ${
                            comm.direction === 'outgoing' ? 'ml-4 sm:ml-8' : 'mr-4 sm:mr-8'
                          }`}
                        >
                          <div className="flex flex-wrap gap-2 items-center mb-2">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              comm.direction === 'outgoing' 
                                ? 'bg-[#9b1f62]/10 text-[#9b1f62] border border-[#9b1f62]/20' 
                                : 'bg-white/10 text-white border border-white/20'
                            }`}>
                              {comm.direction === 'outgoing' ? 'Sent' : 'Received'}
                            </span>
                            <div className="flex items-center text-xs sm:text-sm text-white/60">
                              <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                              {new Date(comm.sent_at).toLocaleString()}
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              comm.status === 'sent'
                                ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                                : comm.status === 'failed'
                                ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                                : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                            }`}>
                              {comm.status}
                            </span>
                          </div>
                          {comm.subject && (
                            <h3 className="text-sm sm:text-base font-medium text-white mb-2">
                              {comm.subject}
                            </h3>
                          )}
                          <div
                            className="text-xs sm:text-sm text-white/80 prose prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: comm.content }}
                          />
                        </div>
                      ))}
                    </div>
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-white/70">
                    <Mail className="w-8 h-8 sm:w-12 sm:h-12 mb-4 stroke-1" />
                    <p className="text-sm sm:text-base">Select a lead to view email communications</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Composer Modal */}
      {showEmailComposer && selectedLead && (
        <EmailComposer
          lead={selectedLead}
          onClose={() => setShowEmailComposer(false)}
          onSend={() => {
            fetchEmailCommunications(selectedLead.id);
            setShowEmailComposer(false);
          }}
        />
      )}
    </div>
  );
} 