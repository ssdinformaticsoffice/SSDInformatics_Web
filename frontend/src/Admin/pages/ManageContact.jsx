import { useEffect, useState } from "react";
import axios from "axios";
import { 
  Mail, Phone, MapPin, Globe, Clock, 
  Send, User, FileText, 
  AlertCircle, CheckCircle, MessageCircle
} from "lucide-react";

const ManageContact = () => {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contact");
      setContacts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post("http://localhost:5000/api/contact", formData);
      setSubmitStatus({ type: 'success', message: response.data.message || 'Message sent successfully!' });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      fetchContacts();
    } catch (error) {
      setSubmitStatus({ type: 'error', message: error.response?.data?.message || 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Contact Info Cards
  const contactInfo = [
    { icon: MapPin, label: "Address", value: "123 Tech Park, Bangalore, India", color: "from-blue-500 to-indigo-500" },
    { icon: Phone, label: "Phone", value: "+91 98765 43210", color: "from-green-500 to-emerald-500" },
    { icon: Mail, label: "Email", value: "info@ssdinformatics.com", color: "from-purple-500 to-pink-500" },
    { icon: Globe, label: "Website", value: "www.ssdinformatics.com", color: "from-cyan-500 to-blue-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1120] via-[#0f1a2e] to-[#1a2a44] p-4 sm:p-6 lg:p-8">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-blue-500/5 rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
            <MessageCircle size={16} className="text-blue-400" />
            <span className="text-blue-200/60 text-sm font-medium">Get in Touch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Management</span>
          </h1>
          <p className="text-blue-200/50 max-w-2xl mx-auto">
            Manage and respond to all incoming messages from your website visitors in one place.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200/40 text-sm">Total Messages</p>
                <p className="text-3xl font-bold text-white mt-1">{contacts.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Mail className="text-blue-400" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200/40 text-sm">Unread</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {contacts.filter(c => !c.read).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                <AlertCircle className="text-yellow-400" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200/40 text-sm">Today's Messages</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {contacts.filter(c => new Date(c.createdAt).toDateString() === new Date().toDateString()).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <CheckCircle className="text-green-400" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200/40 text-sm">Last Message</p>
                <p className="text-lg font-semibold text-white mt-1 truncate">
                  {contacts[0]?.name || 'No messages'}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Clock className="text-purple-400" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Contact Form & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Send className="text-blue-400" size={24} />
              Send a Message
            </h2>
            
            {submitStatus && (
              <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                submitStatus.type === 'success' 
                  ? 'bg-green-500/20 border border-green-500/30 text-green-300' 
                  : 'bg-red-500/20 border border-red-500/30 text-red-300'
              }`}>
                {submitStatus.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                <span className="text-sm">{submitStatus.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-blue-200/60 block mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 text-blue-300/30" size={18} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder:text-blue-200/20 transition-all duration-300"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-200/60 block mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 text-blue-300/30" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder:text-blue-200/20 transition-all duration-300"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-blue-200/60 block mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-3.5 text-blue-300/30" size={18} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder:text-blue-200/20 transition-all duration-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-200/60 block mb-1.5">
                    Subject
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-3.5 text-blue-300/30" size={18} />
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject of your message"
                      className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder:text-blue-200/20 transition-all duration-300"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-blue-200/60 block mb-1.5">
                  Message
                </label>
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    rows="5"
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder:text-blue-200/20 transition-all duration-300 resize-none"
                    required
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full min-h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <>
                    Send Message
                    <Send className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={18} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info Cards */}
          <div className="space-y-4">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 shadow-xl hover:bg-white/10 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center shadow-lg shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <info.icon size={20} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-blue-200/40 text-xs font-medium uppercase tracking-wider">
                      {info.label}
                    </p>
                    <p className="text-white font-medium mt-0.5 break-words">
                      {info.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Social Media - Text based */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 shadow-xl">
              <p className="text-blue-200/40 text-xs font-medium uppercase tracking-wider mb-3">
                Connect With Us
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#" className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-blue-200/60 hover:text-white hover:bg-white/10 transition-all duration-300 text-sm">
                  Twitter
                </a>
                <a href="#" className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-blue-200/60 hover:text-white hover:bg-white/10 transition-all duration-300 text-sm">
                  LinkedIn
                </a>
                <a href="#" className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-blue-200/60 hover:text-white hover:bg-white/10 transition-all duration-300 text-sm">
                  Instagram
                </a>
                <a href="#" className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-blue-200/60 hover:text-white hover:bg-white/10 transition-all duration-300 text-sm">
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Google Map Section */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <MapPin className="text-blue-400" size={22} />
              Find Us On Map
            </h2>
          </div>
          <div className="h-[300px] w-full bg-[#0f1629] flex items-center justify-center">
            <div className="text-center text-blue-200/30">
              <MapPin size={48} className="mx-auto mb-3 text-blue-400/20" />
              <p className="text-sm">Google Map Integration</p>
              <p className="text-xs">123 Tech Park, Bangalore, India</p>
            </div>
          </div>
        </div>

        {/* Messages Table */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <Mail className="text-blue-400" size={22} />
              Recent Messages
              <span className="ml-2 text-sm font-normal text-blue-200/40 bg-white/5 px-3 py-1 rounded-full">
                {contacts.length} total
              </span>
            </h2>
          </div>

          {/* Mobile View */}
          <div className="md:hidden p-4 space-y-4">
            {contacts.slice(0, 5).map((item) => (
              <div
                key={item._id}
                className="bg-white/5 border border-white/10 rounded-xl p-4 text-white hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-white truncate">{item.name}</h3>
                    <p className="text-sm text-blue-200/50 truncate">{item.email}</p>
                  </div>
                  <span className="text-xs text-blue-200/30 flex-shrink-0">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-2 text-sm text-blue-200/60 line-clamp-2">{item.message}</p>
                <div className="mt-2 flex items-center gap-2 text-xs text-blue-200/30">
                  <span className="px-2 py-0.5 bg-white/5 rounded-full">{item.subject}</span>
                  <span className="px-2 py-0.5 bg-white/5 rounded-full">{item.phone}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-white">
              <thead className="bg-white/10">
                <tr>
                  <th className="p-4 text-sm font-semibold text-blue-200/60">Name</th>
                  <th className="p-4 text-sm font-semibold text-blue-200/60">Email</th>
                  <th className="p-4 text-sm font-semibold text-blue-200/60">Phone</th>
                  <th className="p-4 text-sm font-semibold text-blue-200/60">Subject</th>
                  <th className="p-4 text-sm font-semibold text-blue-200/60">Message</th>
                  <th className="p-4 text-sm font-semibold text-blue-200/60">Date</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4 font-medium text-white">{item.name}</td>
                    <td className="p-4 text-blue-200/50">{item.email}</td>
                    <td className="p-4 text-blue-200/50">{item.phone}</td>
                    <td className="p-4 text-blue-200/50">{item.subject}</td>
                    <td className="p-4 text-blue-200/50 max-w-xs truncate">{item.message}</td>
                    <td className="p-4 text-blue-200/30 text-sm">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {contacts.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-blue-200/30">
                      No messages received yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageContact;