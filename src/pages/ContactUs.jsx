import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  Sparkles,
  Building,
  HelpCircle
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ContactUs = () => {
  const { showToast } = useShop();
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Private Residential Lighting',
    city: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Missing Details', 'Please complete the required fields.', 'error');
      return;
    }

    setSubmitted(true);
    showToast(
      'Inquiry Dispatched',
      'Thank you! An architectural concierge from our studio will connect with you within 4 business hours.',
      'gold'
    );
  };

  const faqs = [
    {
      q: "Are LuminaLight fixtures compatible with standard smart home dimmers?",
      a: "Yes. All our integrated LED drivers and dimmable fixtures utilize phase-cut and 0-10V dimming technologies fully compatible with Lutron, Philips Hue Wall Modules, Schneider, and standard leading/trailing edge wall dimmers."
    },
    {
      q: "Can chandelier suspension drop heights be customized for high ceilings?",
      a: "Absolutely. Standard chandeliers include adjustable suspension aircraft cables and brass extension rods up to 2.5 meters. For double-height atriums (up to 6 meters), custom extension kits are crafted upon request."
    },
    {
      q: "How does White-Glove delivery and installation work?",
      a: "Orders above ₹25,000 include scheduled delivery in reinforced protective timber crates. Our technical team unpacks, inspects, and can liaise directly with your interior contractor or provide certified installation in major metro regions."
    },
    {
      q: "Do you offer trade privileges for architects and interior designers?",
      a: "Yes, our LuminaLight Trade Partner program offers exclusive privileges, customized photometrics, 3D CAD/Revit files, and volume pricing. Use code ARCHITECT15 or contact our trade desk directly."
    },
    {
      q: "What is covered under the 5-Year LuminaCare Warranty?",
      a: "LuminaCare covers 100% of LED drivers, phosphor boards, electronic transformers, and structural metal finish integrity against oxidation or defects for a full five years."
    }
  ];

  const showrooms = [
    {
      city: "Mumbai Atelier",
      address: "The Pavilion, Ground Floor, Dr. Annie Besant Road, Worli, Mumbai 400018",
      phone: "+91 22 4988 7700",
      hours: "Mon - Sat: 10:30 AM – 7:30 PM",
      email: "mumbai@luminalight.in"
    },
    {
      city: "New Delhi Gallery",
      address: "14 Golf Links Arcade, Near Lodhi Estate, New Delhi 110003",
      phone: "+91 11 4120 8822",
      hours: "Mon - Sat: 11:00 AM – 8:00 PM",
      email: "delhi@luminalight.in"
    },
    {
      city: "Bengaluru Studio",
      address: "44 Lavelle Road, Shanthala Nagar, Ashok Nagar, Bengaluru 560001",
      phone: "+91 80 4355 9911",
      hours: "Tue - Sun: 10:30 AM – 7:30 PM",
      email: "bengaluru@luminalight.in"
    }
  ];

  return (
    <div className="bg-warm-50 py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-gold-600 font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>Architectural Consultation</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-normal tracking-tight mb-4">
            Connect with LuminaLight
          </h1>
          <p className="text-charcoal-500 text-sm sm:text-base font-light leading-relaxed">
            Whether planning illumination for a private villa, seeking custom drop rods, or booking a private showroom tour, our architectural lighting specialists are at your disposal.
          </p>
        </div>

        {/* Contact Form & Studio Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-24">
          
          {/* Left Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-warm-200 p-8 sm:p-12 shadow-sm">
            <h2 className="font-serif text-2xl text-charcoal font-normal mb-2">
              Send an Atelier Inquiry
            </h2>
            <p className="text-xs text-charcoal-400 mb-8">
              We respond to design inquiries within 4 business hours.
            </p>

            {submitted ? (
              <div className="bg-warm-50 border border-gold-400 p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center mx-auto text-gold-700">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-charcoal">Inquiry Confirmed</h3>
                <p className="text-xs text-charcoal-600 max-w-sm mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-charcoal">{formData.name}</span>. A senior lighting consultant has received your message and will reach out to you at <span className="font-semibold text-charcoal">{formData.email}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      type: 'Private Residential Lighting',
                      city: '',
                      message: ''
                    });
                  }}
                  className="mt-4 px-6 py-2.5 bg-charcoal text-warm-50 text-xs uppercase tracking-widest font-semibold hover:bg-gold-500 hover:text-charcoal-950 transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-charcoal-700 font-semibold mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Vikramaditya Oberoi"
                      className="w-full p-3 bg-warm-50 border border-warm-300 text-charcoal focus:outline-none focus:border-gold-500"
                    />
                  </div>
                  <div>
                    <label className="block text-charcoal-700 font-semibold mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. v.oberoi@domain.com"
                      className="w-full p-3 bg-warm-50 border border-warm-300 text-charcoal focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-charcoal-700 font-semibold mb-1">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98200 00000"
                      className="w-full p-3 bg-warm-50 border border-warm-300 text-charcoal focus:outline-none focus:border-gold-500"
                    />
                  </div>
                  <div>
                    <label className="block text-charcoal-700 font-semibold mb-1">
                      Inquiry Nature
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full p-3 bg-warm-50 border border-warm-300 text-charcoal focus:outline-none focus:border-gold-500 cursor-pointer"
                    >
                      <option value="Private Residential Lighting">Private Residential Lighting</option>
                      <option value="Trade & Architectural Partner Program">Trade & Architectural Partner Program</option>
                      <option value="Showroom Appointment Booking">Showroom Appointment Booking</option>
                      <option value="Custom Chandelier Dimension Request">Custom Chandelier Dimension Request</option>
                      <option value="Order & White-Glove Logistics">Order & White-Glove Logistics</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-charcoal-700 font-semibold mb-1">
                    Project City / Location
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Mumbai, New Delhi, Bengaluru..."
                    className="w-full p-3 bg-warm-50 border border-warm-300 text-charcoal focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-charcoal-700 font-semibold mb-1">
                    Project Vision / Specifications *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your spaces, ceiling heights, required color warmth, or products of interest..."
                    className="w-full p-3 bg-warm-50 border border-warm-300 text-charcoal focus:outline-none focus:border-gold-500 leading-relaxed"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-charcoal hover:bg-gold-500 hover:text-charcoal-950 text-warm-50 text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-sm"
                  >
                    <span>Transmit Inquiry</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Direct Support (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-warm-200 p-8 shadow-sm">
              <h3 className="font-serif text-xl text-charcoal mb-4">Direct Atelier Desks</h3>
              <div className="space-y-4 text-xs">
                <div className="flex items-start space-x-3 pb-4 border-b border-warm-100">
                  <Phone className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-charcoal block">National Concierge Desk</span>
                    <span className="text-charcoal-500 block">+91 22 4988 7700 (Toll Free)</span>
                    <span className="text-[11px] text-charcoal-400">Available Mon-Sat: 10:00 AM - 8:00 PM IST</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 pb-4 border-b border-warm-100">
                  <Mail className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-charcoal block">Client Concierge</span>
                    <a href="mailto:concierge@luminalight.in" className="text-gold-700 hover:underline block">
                      concierge@luminalight.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Building className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-charcoal block">Architect & Trade Relations</span>
                    <a href="mailto:trade@luminalight.in" className="text-gold-700 hover:underline block">
                      trade@luminalight.in
                    </a>
                    <span className="text-[11px] text-charcoal-400">Direct trade account managers & sample dispatch</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Guarantees Box */}
            <div className="bg-charcoal text-warm-50 p-8 border border-charcoal-700">
              <h4 className="font-serif text-lg text-gold-400 mb-2">White-Glove Design Promise</h4>
              <p className="text-xs text-warm-200 font-light leading-relaxed mb-4">
                We provide custom photometric calculations, beam spread diagrams, and complimentary physical finish samples upon specification.
              </p>
              <div className="flex items-center space-x-2 text-[11px] text-gold-300 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>Complimentary Finishes Swatch Box</span>
              </div>
            </div>
          </div>

        </div>

        {/* Flagship Showrooms Section */}
        <div className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-gold-600 font-semibold mb-1 block">
              Flagship Destinations
            </span>
            <h2 className="font-serif text-3xl text-charcoal font-normal">
              Our Experience Ateliers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {showrooms.map((sr, idx) => (
              <div key={idx} className="bg-white border border-warm-200 p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-gold-600 font-bold block mb-2">
                    Gallery 0{idx + 1}
                  </span>
                  <h3 className="font-serif text-xl font-medium text-charcoal mb-4">
                    {sr.city}
                  </h3>
                  <div className="space-y-2.5 text-xs text-charcoal-600 font-light">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5" />
                      <span>{sr.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                      <span>{sr.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                      <span>{sr.hours}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-warm-100">
                  <a
                    href={`mailto:${sr.email}`}
                    className="text-xs font-semibold text-charcoal hover:text-gold-600 transition-colors uppercase tracking-wider"
                  >
                    Book Private Tour →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-3xl mx-auto bg-white border border-warm-200 p-8 sm:p-12 shadow-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest text-gold-600 font-semibold mb-1">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Common Inquiries</span>
            </div>
            <h3 className="font-serif text-2xl text-charcoal font-normal">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="border border-warm-200 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between bg-warm-50/50 hover:bg-warm-100/50 transition-colors text-xs sm:text-sm font-semibold text-charcoal"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-charcoal-400 transition-transform duration-200 shrink-0 ml-2 ${isOpen ? 'rotate-180 text-gold-600' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="p-4 bg-white text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed border-t border-warm-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
