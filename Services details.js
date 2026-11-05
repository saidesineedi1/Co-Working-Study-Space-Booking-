const APP_STATE = {
  theme: localStorage.getItem('nexus_theme') || 'light',
  direction: localStorage.getItem('nexus_dir') || 'ltr',
  user: JSON.parse(localStorage.getItem('nexus_user')) || {
    isLoggedIn: false,
    name: 'Alex Morgan',
    email: 'alex.morgan@workspace.com',
    plan: 'Pro Dedicated Desk'
  },
  bookings: JSON.parse(localStorage.getItem('nexus_bookings')) || [
    {
      id: 'BK-101',
      spaceType: 'Open Desk (Zone B - Silent Pod)',
      dateTime: 'Today, 02:00 PM - 06:00 PM',
      seatNum: 'Desk #14',
      status: 'Active'
    },
    {
      id: 'BK-102',
      spaceType: 'Private Cabin Suite 04',
      dateTime: 'Tomorrow, 10:00 AM - 02:00 PM',
      seatNum: 'Cabin 4B',
      status: 'Confirmed'
    },
    {
      id: 'BK-103',
      spaceType: 'Executive Meeting Room A',
      dateTime: 'Oct 29, 2026, 03:00 PM - 05:00 PM',
      seatNum: 'Conf Room 1',
      status: 'Completed'
    }
  ],
  pricing: {
    'open-desk': 5,
    'private-cabin': 18,
    'meeting-room': 35,
    'dedicated-desk': 12,
    'study-zone': 4,
    'virtual-office': 25
  }
};

const servicesData = {
  'open-desk': {
    slug: 'open-desk',
    name: 'Open Desk Workspace',
    category: 'FLEXIBLE HOT-DESKING',
    rateText: 'From $5.00 / hour',
    pageTitle: 'Workspace Hub | Open Desk Workspace – Flexible Hot-Desking',
    metaDesc: 'Flexible open desk hot-desking in an energizing, productive workspace with 1 Gbps fiber Wi-Fi and ergonomic chairs.',
    heroDesc: 'Flexible, shared workstations designed for freelancers, remote professionals, and travelling creatives who value freedom, energy, and reliable connectivity.',
    heroImage: 'assets/open-desk.jpg',
    pillText: 'Instant Hot-Desk Access Available',
    metaTags: [
      { text: 'From $5.00 / hr', highlight: true },
      { text: 'Single Workstation' },
      { text: 'Drop-In &amp; Day Passes' },
      { text: '1 Gbps Wi-Fi 6' }
    ],
    whyBadge: 'Ultimate Flexibility',
    whyTitle: 'Why Choose Our Open Desk Workspace?',
    whyDesc: 'Experience the perfect blend of freedom, community energy, and ergonomic infrastructure. Choose a new spot each day or find your favorite sunlit corner.',
    whyImage: 'assets/hero-coworking.jpg',
    whyPoints: [
      {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
        title: 'Zero Friction Drop-In',
        desc: 'Book on demand, arrive with your laptop, and tap in with your digital pass in under 30 seconds.'
      },
      {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></svg>',
        title: 'Vibrant Professional Network',
        desc: 'Surround yourself with inspired builders, tech founders, and remote professionals without noisy distractions.'
      },
      {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
        title: 'Complete Hour-by-Hour Freedom',
        desc: 'Pay only for what you use, from a quick 2-hour work sprint to all-day productive deep work.'
      },
      {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
        title: 'Dual Power & High-Speed Hubs',
        desc: 'Every station has integrated surge-protected AC outlets, USB-C 65W PD chargers, and fast Wi-Fi.'
      }
    ],
    benefits: [
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>',
        title: 'Gigabit Fiber Connectivity',
        desc: 'Redundant dual-ISP 1 Gbps fiber optic Wi-Fi 6 with seamless roaming across all seating zones.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/></svg>',
        title: 'Herman Miller Seating',
        desc: 'Posture-perfect ergonomic task chairs designed to support healthy spinal alignment all day.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>',
        title: 'Barista Craft Espresso Bar',
        desc: 'Unlimited artisan espresso, single-origin pour-overs, herbal infusions, and filtered mineral water.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>',
        title: 'Acoustic Phone Booths',
        desc: 'Sound-isolated single-person pods for confidential video conferences and private client calls.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>',
        title: 'Flexible Hourly & Daily Billing',
        desc: 'No long contracts or security deposits. Book online in 3 taps and get work done immediately.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>',
        title: 'Printing & Concierge Support',
        desc: 'Complimentary high-speed color laser printing and an on-site support concierge to assist you.'
      }
    ],
    splitImage: 'assets/gallery-lounge.jpg',
    splitTitle: 'Effortless Arrival & Premium Amenities',
    splitDesc: 'Walk in, select any vacant open desk with an indicator light, plug in, and get straight into deep focus.',
    amenities: [
      { title: 'Instant Mobile Keycard Access', desc: 'Unlock front doors and member lounges with your smartphone NFC pass.' },
      { title: 'Natural Daylit Work Environments', desc: 'Circadian-tuned floor-to-ceiling glass windows that prevent eye fatigue.' },
      { title: 'Locker Storage Options', desc: 'Temporary daytime digital lockers available for your laptop bag and gym gear.' },
      { title: 'High-Performance Climate Control', desc: 'HEPA air filtration and quiet acoustic ceiling baffles maintaining 21°C comfort.' }
    ],
    relatedSlugs: ['dedicated-desk', 'private-cabin', 'study-zone'],
    ctaHeading: 'Ready to Reserve Your Open Desk?',
    ctaDesc: 'Step into an energizing workspace designed around focus, connection, and productivity. Reserve online in 60 seconds.'
  },

  'private-cabin': {
    slug: 'private-cabin',
    name: 'Private Office Cabins',
    category: 'SOUNDPROOF EXECUTIVE SUITES',
    rateText: 'From $18.00 / hour',
    pageTitle: 'Workspace Hub | Private Office Cabins – Soundproof Team Suites',
    metaDesc: 'Acoustically isolated private cabins for teams and executives. Includes biometric access, conference screens, and sound masking.',
    heroDesc: 'Fully furnished, acoustically isolated office suites designed for founders, remote teams, and executives requiring privacy, focus, and prestige.',
    heroImage: 'assets/private-cabin.jpg',
    pillText: 'Acoustic Privacy Guaranteed',
    metaTags: [
      { text: 'From $18.00 / hr', highlight: true },
      { text: 'Capacity: 1 - 6 Persons' },
      { text: 'Biometric Smart Lock' },
      { text: 'NRC 0.85 Sound Isolation' }
    ],
    whyBadge: 'Uncompromised Isolation',
    whyTitle: 'Why Choose Our Private Office Cabins?',
    whyDesc: 'When client confidentiality, high-stakes investor pitches, and team focus matter most, our private cabins provide a distraction-free corporate haven.',
    whyImage: 'assets/membership-split.jpg',
    whyPoints: [
      {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
        title: 'Absolute Acoustic Privacy',
        desc: 'Double-glazed laminated glass and acoustic wall panels dampen sound to an industry-leading NRC 0.85.'
      },
      {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
        title: 'Biometric Access Control',
        desc: 'Fingerprint and encrypted NFC smartphone locks keep your confidential prototypes and files secure.'
      },
      {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
        title: 'Fully Furnished Executive Spec',
        desc: 'Electric sit-stand desks, Herman Miller executive chairs, and magnetic dry-erase brainstorming walls.'
      },
      {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
        title: '24/7 Unrestricted Access',
        desc: 'Work late, build over weekends, or sync with overseas time zones without time limit constraints.'
      }
    ],
    benefits: [
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
        title: 'Dedicated VLAN & Private IP',
        desc: 'Isolated, encrypted network segment tailored for corporate compliance and secure database access.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
        title: '4K Team Collaboration Screen',
        desc: 'Wall-mounted 55" 4K display with wireless screen mirroring for effortless sprint demos.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>',
        title: 'Mail & Package Handling',
        desc: 'Receive company mail, courier packages, and signed documents securely at the front concierge.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>',
        title: 'Complimentary Meeting Credits',
        desc: 'Includes 10 hours per month in our executive conference suites at no supplementary charge.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>',
        title: 'Custom Company Branding',
        desc: 'Your company name and logo frosted onto the glass entryway to greet clients professionally.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>',
        title: 'Daily Sanitization & Cleaning',
        desc: 'Nightly commercial cleaning and trash removal so your team arrives to a pristine suite every morning.'
      }
    ],
    splitImage: 'assets/gallery-team.jpg',
    splitTitle: 'Tailored Suite Architecture & Service',
    splitDesc: 'Move your team into an office that reflects high standards, maintains total privacy, and removes operational headaches.',
    amenities: [
      { title: 'Independent Thermostat & Ventilation', desc: 'Direct climate control inside each cabin with continuous fresh air intake.' },
      { title: 'Personal Mini-Bar & Credenza', desc: 'Built-in storage credenza and compact beverage cooling for executive refreshment.' },
      { title: 'Secure Filing & Document Safe', desc: 'Lockable steel pedestals and combination safe for valuable hardware.' },
      { title: 'Priority Concierge Assistance', desc: 'Direct dial to front-of-house staff for guest greeting, catering, and tech support.' }
    ],
    relatedSlugs: ['meeting-room', 'dedicated-desk', 'virtual-office'],
    ctaHeading: 'Ready to Secure Your Private Cabin?',
    ctaDesc: 'Elevate your team\'s daily operations with a soundproof sanctuary built for high productivity and executive prestige.'
  },

  'meeting-room': {
    slug: 'meeting-room',
    name: 'Meeting Rooms',
    category: 'HIGH-TECH CONFERENCE SUITES',
    rateText: 'From $35.00 / hour',
    pageTitle: 'Workspace Hub | Meeting Rooms – High-Tech Conference Suites',
    metaDesc: 'State-of-the-art conference rooms with 75" 4K displays, Neat Bar videoconferencing, acoustic insulation, and barista catering.',
    heroDesc: 'Professional conference rooms equipped with cutting-edge audiovisual gear, seamless wireless casting, and barista beverage service for impactful client presentations.',
    heroImage: 'assets/meeting-room.jpg',
    pillText: 'Neat Bar Video Conference Ready',
    metaTags: [
      { text: 'From $35.00 / hr', highlight: true },
      { text: 'Capacity: 6 - 12 Persons' },
      { text: '75" 4K UHD Presentation Screen' },
      { text: 'Barista Service Included' }
    ],
    whyBadge: 'Client-Ready Excellence',
    whyTitle: 'Why Choose Our High-Tech Meeting Rooms?',
    whyDesc: 'First impressions matter. Host board presentations, client workshops, and global video conferences in an environment engineered for crystal-clear collaboration.',
    whyImage: 'assets/hero-editorial.jpg',
    whyPoints: [
      {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>',
        title: 'Studio-Grade Video Conferencing',
        desc: 'Neat Bar and auto-framing 4K cameras ensure remote participants feel in the exact same room.'
      },
      {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
        title: 'Instant Wireless Screen Casting',
        desc: 'ClickShare and Apple AirPlay integration allows anyone to share decks with a single tap.'
      },
      {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg>',
        title: 'Espresso & Catering Hospitality',
        desc: 'Complimentary artisan barista coffee and gourmet tea service brought straight to your room.'
      },
      {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>',
        title: 'Precision Time Booking',
        desc: 'Reserve precisely from 60 minutes to multiple full-day strategy retreats with no buffer fees.'
      }
    ],
    benefits: [
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
        title: '75" 4K UHD Commercial Display',
        desc: 'Anti-glare screen with vivid color accuracy designed for intricate financial models and design decks.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>',
        title: 'Ceiling Array Microphones',
        desc: 'Adaptive beamforming microphones eliminate table echo, rustling papers, and background hum.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>',
        title: 'Full-Wall Magnetic Whiteboards',
        desc: 'Extensive writable ceramic surfaces with fresh pens for architecture diagrams and sprint planning.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></svg>',
        title: 'Executive Leather Seating',
        desc: 'Plush mid-back conference armchairs that ensure all attendees remain comfortable throughout long sessions.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
        title: 'Acoustic Wall Paneling',
        desc: 'Specialized fabric sound baffling prevents sound bleed into the open coworking floor.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>',
        title: 'VIP Guest Reception',
        desc: 'Our front desk concierge welcomes your guests by name and escorts them directly to your room.'
      }
    ],
    splitImage: 'assets/gallery-focus.jpg',
    splitTitle: 'Effortless AV Setup & Hospitality',
    splitDesc: 'Walk in, plug one USB-C cable or mirror wirelessly, and command the room with absolute confidence.',
    amenities: [
      { title: 'One-Touch Join Touchpad', desc: 'Launch Zoom, Teams, or Google Meet calls instantly with a pre-synced table tablet.' },
      { title: 'Built-in Power Pods at Every Seat', desc: 'Flush conference table power wells with AC, USB-A, and USB-C connectivity.' },
      { title: 'Full Catering Menus Available', desc: 'Order artisanal sandwich platters, fresh juices, and breakfast pastries for your team.' },
      { title: 'Private Privacy Blinds', desc: 'Motorized acoustic blinds allow complete visual discretion on demand.' }
    ],
    relatedSlugs: ['private-cabin', 'open-desk', 'virtual-office'],
    ctaHeading: 'Ready to Book an Executive Meeting Room?',
    ctaDesc: 'Impress your clients and accelerate team decisions. Reserve your conference suite in minutes.'
  },

  'dedicated-desk': {
    slug: 'dedicated-desk',
    name: 'Dedicated Desks',
    category: 'PERSONAL RESERVED STATIONS',
    rateText: 'From $12.00 / hour',
    pageTitle: 'Workspace Hub | Dedicated Desks – Your Personal Reserved Station',
    metaDesc: 'Reserve your permanent dedicated desk with locked pedestal, monitor arm, and 24/7 access in a quiet professional environment.',
    heroDesc: 'Your own permanent personal workstation in a shared, highly productive atmosphere. Set up your dual monitors, leave your gear, and return each day with peace of mind.',
    heroImage: 'assets/dedicated-desk.jpg',
    pillText: 'Your Permanent Workstation 24/7',
    metaTags: [
      { text: 'From $12.00 / hr', highlight: true },
      { text: 'Personal Reserved Spot' },
      { text: 'Lockable Pedestal' },
      { text: '24/7 Unlimited Access' }
    ],
    whyBadge: 'Consistency & Comfort',
    whyTitle: 'Why Choose a Dedicated Desk?',
    whyDesc: 'Enjoy the stability of a permanent office desk combined with the vibrant community and premium amenities of a world-class coworking campus.',
    whyImage: 'assets/hero-coworking.jpg',
    whyPoints: [
      {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>',
        title: 'Guaranteed Same Spot Daily',
        desc: 'Never hunt for an open seat. Your desk is exclusively yours 24 hours a day, 7 days a week.'
      },
      {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
        title: 'Lockable Storage Pedestal',
        desc: 'Secure your monitors, mechanical keyboard, reference books, and files under lock and key.'
      },
      {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
        title: 'Ergonomic Monitor Arms',
        desc: 'Pre-installed heavy-duty gas-spring VESA mounts ready to hold your 27" to 34" ultrawide displays.'
      },
      {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
        title: 'Business Address & Mail Service',
        desc: 'Use our prime commercial address on your stationery and receive client mail safely.'
      }
    ],
    benefits: [
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/></svg>',
        title: 'Premium Ergonomic Chair',
        desc: 'Equipped with a Herman Miller Aeron or Steelcase Gesture chair calibrated to your body posture.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
        title: 'Dedicated Ethernet Port',
        desc: 'Hardwired Cat6 Gigabit connection at your desk for maximum low-latency data transfers.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
        title: 'Round-the-Clock Keycard Access',
        desc: 'Arrive early at dawn or work past midnight. You have unrestricted access 365 days a year.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>',
        title: 'Monthly Meeting Room Credits',
        desc: 'Includes 5 complimentary hours each month in our tech-enabled conference rooms.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg>',
        title: 'Full Barista Bar Access',
        desc: 'Enjoy unlimited craft pour-overs, nitro cold brew on tap, organic tea, and wellness snacks.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>',
        title: 'Free Black & White Printing',
        desc: 'Monthly allowance of 150 free laser prints and digital scanning directly to your email.'
      }
    ],
    splitImage: 'assets/gallery-lounge.jpg',
    splitTitle: 'Engineered for High-Output Professionals',
    splitDesc: 'Leave behind the daily setup routine. Sit down, power up, and dive straight into your best work.',
    amenities: [
      { title: 'Personalized Desk Nameplate', desc: 'Subtle metal engraved nameplate marking your reserved workspace.' },
      { title: 'Cable Management Trough', desc: 'Integrated under-desk wire organizers keeping power bricks neatly concealed.' },
      { title: 'Noise-Dampened Zone Positioning', desc: 'Located away from heavy traffic corridors for continuous deep focus.' },
      { title: 'Access to Acoustic Phone Pods', desc: 'Unlimited use of phone booths for confidential client and partner calls.' }
    ],
    relatedSlugs: ['open-desk', 'private-cabin', 'study-zone'],
    ctaHeading: 'Ready to Claim Your Dedicated Desk?',
    ctaDesc: 'Enjoy the consistency of a reserved personal desk with full member perks. Reserve your spot today.'
  },

  'study-zone': {
    slug: 'study-zone',
    name: 'Study Zones',
    category: 'QUIET ACADEMIC SANCTUARY',
    rateText: 'From $4.00 / hour',
    pageTitle: 'Workspace Hub | Study Zones – Silent Academic Sanctuary',
    metaDesc: 'Pin-drop quiet study sanctuary for students, researchers, and exam candidates with carrels, warm lighting, and zero distractions.',
    heroDesc: 'A pin-drop silent academic sanctuary designed for students, bar exam candidates, medical researchers, and authors who require uncompromising concentration.',
    heroImage: 'assets/study-zone.jpg',
    pillText: 'Silent Study Protocol Enforced',
    metaTags: [
      { text: 'From $4.00 / hr', highlight: true },
      { text: 'Strict Silent Policy' },
      { text: 'Private Study Carrels' },
      { text: 'Circadian Eye-Care Lighting' }
    ],
    whyBadge: 'Unbroken Concentration',
    whyTitle: 'Why Choose Our Quiet Study Zones?',
    whyDesc: 'When preparing for life-defining exams or writing complex dissertations, you need an environment free from chatter, phone notifications, and sudden interruptions.',
    whyImage: 'assets/gallery-focus.jpg',
    whyPoints: [
      {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',
        title: 'Zero-Noise Policy',
        desc: 'Strict silence enforced by space proctors. Phone conversations and loud video calls are strictly prohibited.'
      },
      {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/></svg>',
        title: 'Eye-Care Warm Illumination',
        desc: 'Flicker-free, 4000K warm diffused desk lighting scientifically tested to reduce ocular fatigue over long hours.'
      },
      {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>',
        title: 'Deep Focus Study Carrels',
        desc: 'High acoustic side baffles eliminate peripheral motion distractions, keeping your focus on the page.'
      },
      {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
        title: 'Affordable Student Rates',
        desc: 'Special hourly pricing and multi-week exam sprint passes structured for students and researchers.'
      }
    ],
    benefits: [
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
        title: 'Academic Focus Atmosphere',
        desc: 'A calm library-style energy where everyone around you is deeply committed to rigorous study.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/></svg>',
        title: 'Padded Lumbar Task Chairs',
        desc: 'Designed for 8+ hour study marathons without lower back stiffness or pressure points.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>',
        title: 'Ultra-Fast Research Wi-Fi',
        desc: 'Seamless downloads of large research datasets, academic papers, and lecture video streams.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg>',
        title: 'Silent Herbal Tea & Coffee Lounge',
        desc: 'Rehydrate and refresh in our separate relaxation pantry without disturbing fellow researchers.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
        title: 'Late Night Study Access',
        desc: 'Open until midnight for daytime students and 24/7 keycard access for registered exam pass holders.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>',
        title: 'Free High-Volume Printing',
        desc: 'Generous printing quota for study guides, research papers, lecture slides, and practice exams.'
      }
    ],
    splitImage: 'assets/hero-editorial.jpg',
    splitTitle: 'Engineered for Scholarly Breakthroughs',
    splitDesc: 'Shut out world noise, open your textbooks, and immerse yourself in an atmosphere optimized for mental retention.',
    amenities: [
      { title: 'Personal Book & Laptop Ledges', desc: 'Elevated wooden shelves on every carrel keeping notebooks and drinks off your primary desk area.' },
      { title: 'Sound-Dampening Carpet & Acoustic Ceilings', desc: 'Heavy wool carpeting that absorbs footsteps and chair movements completely.' },
      { title: 'Silent Phone Booth Access Outside Zone', desc: 'Emergency call booths located in the hallway to keep the main study floor silent.' },
      { title: 'Hydration & Tea Infusion Stations', desc: 'Chilled alkaline water and herbal focus teas available just outside the study door.' }
    ],
    relatedSlugs: ['open-desk', 'dedicated-desk', 'private-cabin'],
    ctaHeading: 'Ready to Excel in the Quiet Study Zone?',
    ctaDesc: 'Secure your silent study carrel and turn your study sessions into powerful breakthroughs. Book your desk today.'
  },

  'virtual-office': {
    slug: 'virtual-office',
    name: 'Virtual Office Services',
    category: 'PRESTIGIOUS BUSINESS PRESENCE',
    rateText: 'From $25.00 / day',
    pageTitle: 'Workspace Hub | Virtual Office Services – Prestigious Business Presence',
    metaDesc: 'Establish an elite commercial address in Tech Corridor with mail forwarding, live call answering, and monthly meeting room access.',
    heroDesc: 'Establish a prestigious corporate presence in our prime Tech Corridor location with professional mail handling, local phone answering, and conference room privileges.',
    heroImage: 'assets/virtual-office.jpg',
    pillText: 'Prime Tech Corridor Address',
    metaTags: [
      { text: 'From $25.00 / day', highlight: true },
      { text: 'Prime Commercial Address' },
      { text: 'Mail & Courier Handling' },
      { text: 'Meeting Room Allowance' }
    ],
    whyBadge: 'Enterprise Credibility',
    whyTitle: 'Why Choose Our Virtual Office Package?',
    whyDesc: 'Elevate your brand reputation with a recognized business address, protect your personal privacy, and access boardrooms whenever clients come to town.',
    whyImage: 'assets/membership-split.jpg',
    whyPoints: [
      {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
        title: 'Prestigious Commercial Address',
        desc: 'Register your company, website, and Google Business Profile at 742 Innovation Way, Tech Corridor.'
      },
      {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
        title: 'Digital Mail Scanning & Forwarding',
        desc: 'Our concierge logs all incoming letters, scans envelopes, and forwards physical mail anywhere globally.'
      },
      {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
        title: 'Dedicated Local Phone Line',
        desc: 'Personalized phone answering in your company name with automatic call patching to your mobile.'
      },
      {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>',
        title: 'Monthly Meeting Room Credits',
        desc: 'Includes 8 hours of executive conference room usage each month to host your corporate partners.'
      }
    ],
    benefits: [
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
        title: 'Official Legal Entity Registration',
        desc: 'Fully compliant commercial lease documentation for regulatory filings, LLC formation, and banking.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/></svg>',
        title: 'Same-Day Mail Notifications',
        desc: 'Receive immediate email and push alerts the instant a letter or certified package arrives.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>',
        title: 'Professional Front Desk Team',
        desc: 'Trained executive receptionists represent your business with warmth, polish, and professionalism.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
        title: 'Drop-In Coworking Day Passes',
        desc: 'Includes 2 full-day Open Desk passes every month for when you need to work in town.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
        title: 'Instant Online Setup',
        desc: 'Submit your verification documents online and activate your prestigious business address in 24 hours.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
        title: 'Global Forwarding Network',
        desc: 'We forward physical mail and packages via DHL / FedEx to any destination worldwide on your schedule.'
      }
    ],
    splitImage: 'assets/faq-workspace.jpg',
    splitTitle: 'Effortless Digital Mail & Phone Portal',
    splitDesc: 'Manage your entire commercial presence from an intuitive mobile and web portal without physical overhead.',
    amenities: [
      { title: 'Secure Digital Vault For Mail Scans', desc: 'Searchable PDF archives of all incoming documents with 256-bit encryption.' },
      { title: 'Custom Voicemail Greeting', desc: 'Recorded with your company name, delivering MP3 audio attachments to your inbox.' },
      { title: 'Courier Signature on Delivery', desc: 'Our front desk signs for all registered mail, certified legal notices, and deliveries.' },
      { title: 'Lobby Directory Listing', desc: 'Display your company name on our prominent digital lobby directory board.' }
    ],
    relatedSlugs: ['meeting-room', 'private-cabin', 'open-desk'],
    ctaHeading: 'Ready to Establish Your Virtual Office?',
    ctaDesc: 'Equip your business with an elite commercial address and comprehensive executive support today.'
  }
};

let activeServiceSlug = 'open-desk';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initDirection();
  initHeaderScroll();
  initUserStatus();
  renderBookingsTable();
  setupDefaultBookingDate();
  setupKeyboardAccessibility();
  
  const urlParams = new URLSearchParams(window.location.search);
  const requestedSlug = urlParams.get('service');
  
  if (requestedSlug && servicesData[requestedSlug]) {
    activeServiceSlug = requestedSlug;
    renderServiceDetails(activeServiceSlug);
  } else if (!requestedSlug) {
    activeServiceSlug = 'open-desk';
    renderServiceDetails(activeServiceSlug);
  } else {
    renderNotFoundState();
  }
});

function renderServiceDetails(slug) {
  const data = servicesData[slug];
  if (!data) {
    renderNotFoundState();
    return;
  }

  const contentEl = document.getElementById('serviceDetailContent');
  const notFoundEl = document.getElementById('serviceNotFound');
  if (contentEl) contentEl.style.display = 'block';
  if (notFoundEl) notFoundEl.style.display = 'none';

  document.title = data.pageTitle;
  const metaDescEl = document.getElementById('pageMetaDesc');
  if (metaDescEl) metaDescEl.setAttribute('content', data.metaDesc);

  const breadcrumbEl = document.getElementById('breadcrumbCurrent');
  if (breadcrumbEl) breadcrumbEl.textContent = data.name;

  document.querySelectorAll('.dropdown-item[data-service-link]').forEach(item => {
    if (item.getAttribute('data-service-link') === slug) {
      item.classList.add('current-page');
    } else {
      item.classList.remove('current-page');
    }
  });

  const kickerEl = document.getElementById('heroCategoryText');
  const titleEl = document.getElementById('heroTitle');
  const descEl = document.getElementById('heroDescription');
  const heroImgEl = document.getElementById('heroImage');
  const pillTextEl = document.getElementById('heroFloatingPillText');
  const metaStripEl = document.getElementById('heroMetaStrip');

  if (kickerEl) kickerEl.textContent = data.category;
  if (titleEl) titleEl.textContent = data.name;
  if (descEl) descEl.textContent = data.heroDesc;
  if (heroImgEl) {
    heroImgEl.src = data.heroImage;
    heroImgEl.alt = data.name;
  }
  if (pillTextEl) pillTextEl.textContent = data.pillText;

  if (metaStripEl) {
    metaStripEl.innerHTML = data.metaTags.map(tag => `
      <span class="sd-meta-tag ${tag.highlight ? 'sd-meta-tag-highlight' : ''}">${tag.text}</span>
    `).join('');
  }

  const whyBadgeEl = document.getElementById('whyBadge');
  const whyTitleEl = document.getElementById('whyTitle');
  const whyDescEl = document.getElementById('whyDescription');
  const whyImgEl = document.getElementById('whyImage');
  const whyGridEl = document.getElementById('whyPointsGrid');

  if (whyBadgeEl) whyBadgeEl.textContent = data.whyBadge;
  if (whyTitleEl) whyTitleEl.textContent = data.whyTitle;
  if (whyDescEl) whyDescEl.textContent = data.whyDesc;
  if (whyImgEl) {
    whyImgEl.src = data.whyImage;
    whyImgEl.alt = data.whyTitle;
  }

  if (whyGridEl) {
    whyGridEl.innerHTML = data.whyPoints.map(point => `
      <div class="sd-why-point-card">
        <div class="sd-why-point-icon">${point.icon}</div>
        <h4 class="sd-why-point-title">${point.title}</h4>
        <p class="sd-why-point-desc">${point.desc}</p>
      </div>
    `).join('');
  }

  const benefitsTitleEl = document.getElementById('benefitsTitle');
  const benefitsSubtitleEl = document.getElementById('benefitsSubtitle');
  const benefitsGridEl = document.getElementById('benefitsGrid');

  if (benefitsTitleEl) benefitsTitleEl.textContent = `Key Benefits of ${data.name}`;
  if (benefitsSubtitleEl) benefitsSubtitleEl.textContent = `Everything included with your ${data.name.toLowerCase()} reservation to empower productivity.`;

  if (benefitsGridEl) {
    benefitsGridEl.innerHTML = data.benefits.map(b => `
      <article class="sd-benefit-card">
        <div class="sd-benefit-icon">${b.icon}</div>
        <h3 class="sd-benefit-title">${b.title}</h3>
        <p class="sd-benefit-text">${b.desc}</p>
      </article>
    `).join('');
  }

  const splitTitleEl = document.getElementById('splitTitle');
  const splitDescEl = document.getElementById('splitDescription');
  const splitImgEl = document.getElementById('splitImage');
  const amenitiesListEl = document.getElementById('splitAmenitiesList');

  if (splitTitleEl) splitTitleEl.textContent = data.splitTitle;
  if (splitDescEl) splitDescEl.textContent = data.splitDesc;
  if (splitImgEl) {
    splitImgEl.src = data.splitImage;
    splitImgEl.alt = data.splitTitle;
  }

  if (amenitiesListEl) {
    amenitiesListEl.innerHTML = data.amenities.map(a => `
      <div class="sd-amenity-item">
        <div class="sd-amenity-icon">✓</div>
        <div class="sd-amenity-content">
          <strong class="sd-amenity-heading">${a.title}</strong>
          <span class="sd-amenity-sub">${a.desc}</span>
        </div>
      </div>
    `).join('');
  }

  const relatedGridEl = document.getElementById('relatedCardsGrid');
  if (relatedGridEl) {
    relatedGridEl.innerHTML = data.relatedSlugs.map(rSlug => {
      const rel = servicesData[rSlug];
      if (!rel) return '';
      return `
        <article class="sd-related-card">
          <div class="sd-related-img-wrap">
            <img src="${rel.heroImage}" alt="${rel.name}" class="sd-related-img" onerror="this.onerror=null;this.src='asstes/hero-coworking.jpg';">
            <span class="sd-related-badge">${rel.category}</span>
          </div>
          <div class="sd-related-body">
            <h3 class="sd-related-title">${rel.name}</h3>
            <p class="sd-related-desc">${rel.heroDesc.slice(0, 110)}...</p>
            <div class="sd-related-rate">${rel.rateText}</div>
            <a href="Services Details.html?service=${rel.slug}" class="btn-primary btn-sm sd-related-btn">
              <span>View Service</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </div>
        </article>
      `;
    }).join('');
  }

  const ctaHeadingEl = document.getElementById('ctaHeading');
  const ctaDescEl = document.getElementById('ctaDescription');
  const ctaBookBtnTextEl = document.getElementById('ctaBookBtnText');

  if (ctaHeadingEl) ctaHeadingEl.textContent = data.ctaHeading;
  if (ctaDescEl) ctaDescEl.textContent = data.ctaDesc;
  if (ctaBookBtnTextEl) ctaBookBtnTextEl.textContent = `Book ${data.name} Now`;
}

function renderNotFoundState() {
  const contentEl = document.getElementById('serviceDetailContent');
  const notFoundEl = document.getElementById('serviceNotFound');
  
  if (contentEl) contentEl.style.display = 'none';
  if (notFoundEl) notFoundEl.style.display = 'block';

  document.title = 'Workspace Hub | Service Not Found';
  const breadcrumbEl = document.getElementById('breadcrumbCurrent');
  if (breadcrumbEl) breadcrumbEl.textContent = 'Not Found';
}

function handleBookThisService() {
  openBookingModal(activeServiceSlug);
}

function initTheme() {
  const html = document.documentElement;
  html.setAttribute('data-theme', APP_STATE.theme);
  
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }
}

function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  html.setAttribute('data-theme', newTheme);
  APP_STATE.theme = newTheme;
  localStorage.setItem('nexus_theme', newTheme);
}

function initDirection() {
  const html = document.documentElement;
  html.setAttribute('dir', APP_STATE.direction);
  updateRTLButtonText();
  
  const rtlBtn = document.getElementById('rtlToggleBtn');
  if (rtlBtn) {
    rtlBtn.addEventListener('click', toggleDirection);
  }
}

function toggleDirection() {
  const html = document.documentElement;
  const currentDir = html.getAttribute('dir') || 'ltr';
  const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
  
  html.setAttribute('dir', newDir);
  APP_STATE.direction = newDir;
  localStorage.setItem('nexus_dir', newDir);
  
  updateRTLButtonText();
}

function updateRTLButtonText() {
  const rtlBtn = document.getElementById('rtlToggleBtn');
  if (rtlBtn) {
    const badge = rtlBtn.querySelector('.btn-text-badge');
    if (badge) {
      badge.textContent = APP_STATE.direction.toUpperCase();
    }
  }
}

function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

const mobileToggle = document.getElementById('mobileMenuToggle');
const closeDrawer = document.getElementById('closeDrawerBtn');
const mobileDrawer = document.getElementById('mobileDrawer');

if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
}

if (closeDrawer) {
  closeDrawer.addEventListener('click', closeMobileDrawer);
}

function closeMobileDrawer() {
  if (mobileDrawer) {
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function initUserStatus() {
  const loginBtn = document.getElementById('headerLoginBtn');
  const loginText = document.getElementById('loginBtnText');
  const dashUser = document.getElementById('dashUserName');
  const dashPlan = document.getElementById('dashUserPlan');
  
  if (APP_STATE.user && APP_STATE.user.isLoggedIn) {
    if (loginText) loginText.textContent = APP_STATE.user.name ? APP_STATE.user.name.split(' ')[0] : 'Dashboard';
    if (loginBtn) {
      loginBtn.setAttribute('title', 'Open Dashboard');
      loginBtn.href = 'dashboard.html';
      loginBtn.onclick = null;
    }
  } else {
    if (loginText) loginText.textContent = 'Login';
    if (loginBtn) {
      loginBtn.setAttribute('title', 'Sign In');
      loginBtn.href = 'login.html';
      loginBtn.onclick = null;
    }
  }

  if (dashUser) dashUser.textContent = APP_STATE.user.name;
  if (dashPlan) dashPlan.textContent = APP_STATE.user.plan;
}

function openAuthModal(mode = 'login') {
  const modal = document.getElementById('authModal');
  const title = document.getElementById('authModalTitle');
  const toggle = document.getElementById('authToggleQuestion');
  
  if (!modal) return;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  
  if (mode === 'signup') {
    if (title) title.textContent = 'Create Workspace Hub Account';
    if (toggle) toggle.innerHTML = 'Already have an account? <a href="#" onclick="toggleAuthMode(event, \'login\')">Login</a>';
  } else {
    if (title) title.textContent = 'Welcome Back to Workspace Hub';
    if (toggle) toggle.innerHTML = 'Don\'t have an account? <a href="#" onclick="toggleAuthMode(event, \'signup\')">Sign up</a>';
  }
}

function closeAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function toggleAuthMode(e, targetMode) {
  if (e) e.preventDefault();
  openAuthModal(targetMode);
}

function handleAuthSubmit(e) {
  e.preventDefault();
  const emailInput = document.getElementById('authEmail');
  const email = emailInput ? emailInput.value : 'Member';
  
  APP_STATE.user.isLoggedIn = true;
  APP_STATE.user.email = email;
  APP_STATE.user.name = email.split('@')[0] || 'Alex Morgan';
  localStorage.setItem('nexus_user', JSON.stringify(APP_STATE.user));
  
  initUserStatus();
  closeAuthModal();
  showToast(`Welcome back, ${APP_STATE.user.name}!`, 'success');
}

function handleLogout() {
  APP_STATE.user.isLoggedIn = false;
  localStorage.setItem('nexus_user', JSON.stringify(APP_STATE.user));
  initUserStatus();
  closeDashboardModal();
  showToast('You have been logged out.', 'info');
}

function openDashboardModal() {
  const modal = document.getElementById('dashboardModal');
  if (!modal) return;
  
  renderBookingsTable();
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeDashboardModal() {
  const modal = document.getElementById('dashboardModal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function renderBookingsTable() {
  const tbody = document.getElementById('dashboardBookingsList');
  if (!tbody) return;
  
  if (APP_STATE.bookings.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; padding: 32px; color: var(--color-secondary-text);">
          No active bookings found. <a href="#" onclick="closeDashboardModal(); openBookingModal('open-desk');" style="color: var(--color-terracotta); font-weight: 600;">Book a space now</a>.
        </td>
      </tr>
    `;
    return;
  }
  
  tbody.innerHTML = APP_STATE.bookings.map(b => `
    <tr>
      <td><strong>${b.id}</strong></td>
      <td>${b.spaceType}</td>
      <td>${b.dateTime}</td>
      <td><span class="seat-badge">${b.seatNum}</span></td>
      <td>
        <span class="badge ${b.status === 'Active' ? 'badge-primary' : b.status === 'Confirmed' ? 'badge-confirmed' : 'badge-completed'}">
          ${b.status}
        </span>
        ${b.status !== 'Completed' ? `
          <button class="btn-cancel-link" onclick="cancelBooking('${b.id}')" title="Cancel booking">&times;</button>
        ` : ''}
      </td>
    </tr>
  `).join('');
}

function cancelBooking(id) {
  APP_STATE.bookings = APP_STATE.bookings.filter(b => b.id !== id);
  localStorage.setItem('nexus_bookings', JSON.stringify(APP_STATE.bookings));
  renderBookingsTable();
  showToast(`Booking ${id} was successfully cancelled.`, 'info');
}

function openBookingModal(serviceSlug = 'open-desk') {
  const modal = document.getElementById('bookingModal');
  const spaceSelect = document.getElementById('spaceTypeSelect');
  
  if (!modal) return;
  
  if (spaceSelect && serviceSlug && serviceSlug !== 'all') {
    spaceSelect.value = serviceSlug;
  }
  
  updateBookingPricing();
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
  const modal = document.getElementById('bookingModal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function setupDefaultBookingDate() {
  const dateInput = document.getElementById('bookingDate');
  if (!dateInput) return;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  dateInput.value = tomorrow.toISOString().split('T')[0];
  dateInput.min = new Date().toISOString().split('T')[0];
}

function updateBookingPricing() {
  const spaceSelect = document.getElementById('spaceTypeSelect');
  const hoursSelect = document.getElementById('bookingDuration');
  const summarySpace = document.getElementById('summarySpaceName');
  const summaryPrice = document.getElementById('summaryPrice');
  
  if (!spaceSelect || !hoursSelect) return;
  
  const space = spaceSelect.value || 'open-desk';
  const hours = parseInt(hoursSelect.value, 10) || 4;
  const rate = APP_STATE.pricing[space] || 5;
  const total = rate * hours;
  
  if (summarySpace) {
    const selectedText = spaceSelect.options[spaceSelect.selectedIndex]?.text || 'Open Desk';
    summarySpace.textContent = selectedText.split('(')[0].trim();
  }
  
  if (summaryPrice) {
    summaryPrice.textContent = `$${total.toFixed(2)}`;
  }
}

function handleBookingSubmit(e) {
  e.preventDefault();
  
  const spaceSelect = document.getElementById('spaceTypeSelect');
  const dateInput = document.getElementById('bookingDate');
  const hoursSelect = document.getElementById('bookingDuration');
  
  const spaceName = spaceSelect.options[spaceSelect.selectedIndex]?.text.split('(')[0].trim() || 'Workspace';
  const date = dateInput.value || 'Upcoming';
  const hours = hoursSelect.value || '4';
  
  const newBooking = {
    id: 'BK-' + Math.floor(100 + Math.random() * 900),
    spaceType: spaceName,
    dateTime: `${date}, ${hours} Hours`,
    seatNum: `Station #${Math.floor(1 + Math.random() * 30)}`,
    status: 'Confirmed'
  };
  
  APP_STATE.bookings.unshift(newBooking);
  localStorage.setItem('nexus_bookings', JSON.stringify(APP_STATE.bookings));
  
  closeBookingModal();
  showToast(`Booking ${newBooking.id} confirmed! Code sent via SMS.`, 'success');
  
  setTimeout(() => {
    openDashboardModal();
  }, 1000);
}

function openSpaceDetails(slug) {
  if (slug && servicesData[slug]) {
    window.location.href = `Services Details.html?service=${slug}`;
  }
}

function openPlansModal() {
  openGenericModal('Membership Plans', `
    <p style="margin-bottom:14px; color:var(--color-secondary-text);">Choose from our flexible membership tiers:</p>
    <ul style="display:flex; flex-direction:column; gap:10px; margin-bottom:16px;">
      <li><strong>Day Pass ($25/day):</strong> Full access to open desk zones &amp; craft coffee bar.</li>
      <li><strong>Dedicated Desk ($280/mo):</strong> Reserved 24/7 personal workstation with lockable storage.</li>
      <li><strong>Private Cabin ($750/mo):</strong> Soundproof executive suite with meeting credits.</li>
    </ul>
  `);
}

function openGenericModal(title, contentHtml) {
  const modal = document.getElementById('genericModal');
  const titleEl = document.getElementById('genericModalTitle');
  const bodyEl = document.getElementById('genericModalBody');
  
  if (!modal) return;
  if (titleEl) titleEl.textContent = title;
  if (bodyEl) bodyEl.innerHTML = contentHtml;
  
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeGenericModal() {
  const modal = document.getElementById('genericModal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  
  const toast = document.createElement('div');
  toast.className = `toast-message toast-${type}`;
  toast.setAttribute('role', 'alert');
  
  let iconSvg = '';
  if (type === 'success') {
    iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';
  } else if (type === 'error') {
    iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
  } else {
    iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
  }
  
  toast.innerHTML = `
    <div class="toast-icon">${iconSvg}</div>
    <div class="toast-body">${message}</div>
    <button class="toast-close" onclick="this.parentElement.remove()" aria-label="Close notification">&times;</button>
  `;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 300);
  }, 4000);
}

function setupKeyboardAccessibility() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAuthModal();
      closeDashboardModal();
      closeBookingModal();
      closeGenericModal();
      closeMobileDrawer();
    }
  });

  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  });
}
