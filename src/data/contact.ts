import { siteConfig } from "@/data/site";

export const contactHero = {
  label: "GET IN TOUCH",
  headline: ["Contact HS Group"],
  subtitle:
    "Let's discuss your next engineering, telecom, power, renewable energy or infrastructure project.",
  image:
    "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=85&auto=format&fit=crop",
  primaryCta: { label: "Request Consultation", href: "#contact-form" },
  secondaryCta: { label: "Call Now", href: `tel:${siteConfig.phone.replace(/\s/g, "")}` },
};

export const contactQuick = {
  label: "QUICK CONTACT",
  title: "Reach Us Instantly",
  subtitle: "Connect with HS Group through the channel that works best for your inquiry.",
  cards: [
    {
      id: "call",
      icon: "Phone",
      title: "Call Us",
      info: siteConfig.phone,
      href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
      action: "Call now",
    },
    {
      id: "email",
      icon: "Mail",
      title: "Email",
      info: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      action: "Send email",
    },
    {
      id: "office",
      icon: "MapPin",
      title: "Corporate Office",
      info: siteConfig.address,
      href: "https://maps.google.com/?q=Dhaka+Bangladesh",
      action: "View map",
    },
    {
      id: "hours",
      icon: "Clock",
      title: "Working Hours",
      info: "Sun – Thu: 9:00 AM – 6:00 PM",
      href: null,
      action: "Business hours",
    },
  ],
};

export const contactOffice = {
  label: "CORPORATE OFFICE",
  title: "Our Locations Across Operations",
  subtitle:
    "From headquarters to factory and regional sites, HS Group maintains facilities that support engineering delivery nationwide.",
  image:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=85&auto=format&fit=crop",
  locations: [
    {
      type: "Corporate Office",
      name: "HS Group Headquarters",
      address: "Dhaka, Bangladesh",
      phone: siteConfig.phone,
      email: siteConfig.email,
      mapsUrl: "https://maps.google.com/?q=Dhaka+Bangladesh",
    },
    {
      type: "Factory",
      name: "Manufacturing & Assembly Facility",
      address: "Industrial Area, Dhaka Division",
      phone: siteConfig.phone,
      email: "factory@hsgroup.com",
      mapsUrl: "https://maps.google.com/?q=Dhaka+Bangladesh",
    },
    {
      type: "Warehouse",
      name: "Logistics & Materials Hub",
      address: "Central Logistics Zone, Bangladesh",
      phone: siteConfig.phone,
      email: "logistics@hsgroup.com",
      mapsUrl: "https://maps.google.com/?q=Dhaka+Bangladesh",
    },
    {
      type: "Regional Office",
      name: "Chittagong Operations",
      address: "Chittagong, Bangladesh",
      phone: siteConfig.phone,
      email: "chittagong@hsgroup.com",
      mapsUrl: "https://maps.google.com/?q=Chittagong+Bangladesh",
    },
  ],
};

export const contactForm = {
  label: "SEND A MESSAGE",
  title: "Request Engineering Consultation",
  subtitle:
    "Share your project requirements and our team will respond with the right expertise for your industry and scope.",
  departments: [
    "Engineering",
    "Sales",
    "Business Development",
    "Technical Support",
    "Accounts",
    "Procurement",
    "HR",
    "General Inquiry",
  ],
  interests: [
    { id: "telecom", label: "Telecom" },
    { id: "power", label: "Power" },
    { id: "solar", label: "Solar" },
    { id: "civil", label: "Civil" },
    { id: "smart-city", label: "Smart City" },
    { id: "general", label: "General Inquiry" },
  ],
  countries: [
    "Bangladesh",
    "Singapore",
    "Sri Lanka",
    "Malaysia",
    "UAE",
    "India",
    "Other",
  ],
  subjects: [
    "Project Inquiry",
    "Request Quotation",
    "Technical Support",
    "Partnership",
    "Supplier Registration",
    "Career Inquiry",
    "Other",
  ],
  successTitle: "Message Sent Successfully",
  successDescription:
    "Thank you for contacting HS Group. Our team will review your inquiry and respond within 1–2 business days.",
};

export const contactDepartments = {
  label: "DEPARTMENT DIRECTORY",
  title: "Connect With the Right Team",
  subtitle:
    "Direct access to the departments that support engineering delivery, commercial partnerships, and operational excellence.",
  items: [
    {
      name: "Engineering Department",
      manager: "Head of Engineering",
      email: "engineering@hsgroup.com",
      phone: siteConfig.phone,
      responseTime: "Within 24 hours",
      icon: "HardHat",
    },
    {
      name: "Sales",
      manager: "Sales Director",
      email: "sales@hsgroup.com",
      phone: siteConfig.phone,
      responseTime: "Within 12 hours",
      icon: "Briefcase",
    },
    {
      name: "Business Development",
      manager: "BD Manager",
      email: "bd@hsgroup.com",
      phone: siteConfig.phone,
      responseTime: "Within 24 hours",
      icon: "TrendingUp",
    },
    {
      name: "Technical Support",
      manager: "Support Lead",
      email: "support@hsgroup.com",
      phone: siteConfig.phone,
      responseTime: "Within 8 hours",
      icon: "Headphones",
    },
    {
      name: "Accounts",
      manager: "Finance Manager",
      email: "accounts@hsgroup.com",
      phone: siteConfig.phone,
      responseTime: "Within 48 hours",
      icon: "Calculator",
    },
    {
      name: "Procurement",
      manager: "Procurement Manager",
      email: "procurement@hsgroup.com",
      phone: siteConfig.phone,
      responseTime: "Within 48 hours",
      icon: "Package",
    },
    {
      name: "HR",
      manager: "HR Manager",
      email: "hr@hsgroup.com",
      phone: siteConfig.phone,
      responseTime: "Within 72 hours",
      icon: "Users",
    },
  ],
};

export const contactGlobal = {
  label: "GLOBAL PRESENCE",
  title: "Offices Across Our Network",
  subtitle:
    "HS Group operates across South Asia with strategic regional presence and planned expansion into new markets.",
  networkLabel: "HS Group Contact Network",
  countries: [
    {
      id: "bangladesh",
      name: "Bangladesh",
      city: "Dhaka",
      role: "Headquarters",
      flag: "🇧🇩",
      mapX: 721,
      mapY: 176,
      address: "Dhaka, Bangladesh",
      email: "info@hsgroup.com",
      phone: "+880 2 5500 0000",
    },
    {
      id: "singapore",
      name: "Singapore",
      city: "Singapore",
      role: "Regional Hub",
      flag: "🇸🇬",
      mapX: 757,
      mapY: 236,
      address: "Singapore",
      email: "singapore@hsgroup.com",
      phone: "+65 6000 0000",
    },
    {
      id: "sri-lanka",
      name: "Sri Lanka",
      city: "Colombo",
      role: "Project Operations",
      flag: "🇱🇰",
      mapX: 693,
      mapY: 222,
      address: "Colombo, Sri Lanka",
      email: "srilanka@hsgroup.com",
      phone: "+94 11 2000 000",
    },
  ],
  futureMarkers: [
    { name: "Malaysia", mapX: 748, mapY: 248, label: "Expansion Planned" },
    { name: "UAE", mapX: 620, mapY: 188, label: "Expansion Planned" },
  ],
};

export type ContactGlobalCountry = (typeof contactGlobal.countries)[number];
export type ContactFutureMarker = (typeof contactGlobal.futureMarkers)[number];

export const contactMap = {
  label: "FIND US",
  title: "Visit Our Corporate Office",
  subtitle: "Located in Dhaka, Bangladesh — open during business hours for scheduled meetings.",
  embedUrl:
    "https://maps.google.com/maps?q=Dhaka%2C%20Bangladesh&t=&z=13&ie=UTF8&iwloc=&output=embed",
  openUrl: "https://maps.google.com/?q=Dhaka+Bangladesh",
  openLabel: "Open in Google Maps",
};

export const contactFaq = {
  label: "FAQ",
  title: "Frequently Asked Questions",
  subtitle: "Quick answers to common questions about contacting and working with HS Group.",
  items: [
    {
      question: "How soon will HS Group respond?",
      answer:
        "We typically respond to general inquiries within 1–2 business days. Technical support and sales inquiries are prioritized and often answered within the same business day.",
    },
    {
      question: "Do you support international projects?",
      answer:
        "Yes. HS Group delivers engineering projects across Bangladesh, Singapore, and Sri Lanka, and supports international clients through regional partnerships and engineering consultancy.",
    },
    {
      question: "Can I request quotations?",
      answer:
        "Absolutely. Use the contact form and select “Request Quotation” as the subject, or email sales@hsgroup.com with your project scope, timeline, and technical requirements.",
    },
    {
      question: "How can I become a supplier?",
      answer:
        "Suppliers may register interest through the contact form (Department: Procurement) or email procurement@hsgroup.com. Our team will share enlistment requirements and next steps.",
    },
    {
      question: "Where is your corporate office?",
      answer:
        "Our corporate headquarters is located in Dhaka, Bangladesh. Use the map section on this page for directions, or call us to schedule an appointment.",
    },
  ],
};

export const contactEmergency = {
  label: "EMERGENCY SUPPORT",
  title: "Need Immediate Engineering Support?",
  description:
    "For urgent site issues, critical infrastructure support, or time-sensitive technical assistance, reach our emergency hotline.",
  hotlineLabel: "Emergency Hotline",
  hotline: siteConfig.phone,
  badge: "24/7 Support",
  cta: { label: "Call Now", href: `tel:${siteConfig.phone.replace(/\s/g, "")}` },
};

export const contactCta = {
  label: "LET'S BUILD THE FUTURE",
  headline: "Let's Build Tomorrow's Infrastructure Together",
  description:
    "Partner with HS Group for engineering, power, telecom, renewable energy, infrastructure, and smart technology solutions.",
  backgroundImage:
    "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1600&q=85&auto=format&fit=crop",
  primaryCta: { label: "Schedule Meeting", href: "#contact-form" },
  secondaryCta: { label: "Send Inquiry", href: "#contact-form" },
};
