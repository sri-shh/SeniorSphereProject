import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  GraduationCap,
  Search,
  Bell,
  Home,
  HelpCircle,
  Users,
  MessageSquare,
  User,
  Plus,
  ThumbsUp,
  MessageCircle,
  CheckCircle2,
  Check,
  Filter,
  Calendar,
  Clock,
  Send,
  Star,
  Sparkles,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  ShieldCheck,
  Award,
  Briefcase,
  MapPin,
  Tag,
  X,
  Lock,
  Unlock,
  TrendingUp,
  Building,
  AlertCircle,
  LogOut,
  LogIn,
  UserPlus,
  Mail,
  Video
} from 'lucide-react';

// ==========================================
// TIET CONSTANTS & MOCK DATA
// ==========================================

const TIET_BRANCHES = [
  { code: 'COPC', name: 'COPC (Computer Science Engineering(Patiala Campus))' },
  { code: 'ENC', name: 'ENC (Electronics & Computer Engineering)' },
  { code: 'COE', name: 'COE (Computer Engineering)' },
  { code: 'ECE', name: 'ECE (Electronics & Communication Engineering)' },
  { code: 'CSBS', name: 'CSBS (Computer Science & Business Systems)' },
  { code: 'EEC', name: 'EEC (Electrical & Computer Engineering)' },
  { code: 'ELE', name: 'ELE (Electrical Engineering)' },
  { code: 'MEE', name: 'MEE (Mechanical Engineering)' },
  { code: 'CIE', name: 'CIE (Civil Engineering)' },
  { code: 'CHE', name: 'CHE (Chemical Engineering)' },
  { code: 'BT', name: 'BT (Biotechnology)' },
  { code: 'DSAI', name: 'DSAI (Data Science and Artificial Intelligence)' }
];

const DEFAULT_USER = {
  name: 'Srishti',
  rollNumber: '102303412',
  email: 'srishti@thapar.edu',
  year: '2nd Year',
  yearNumber: 2,
  branch: 'ENC',
  batch: 'Batch of 2029',
  hostel: 'Hostel N',
  cgpa: '8.84',
  karma: 420
};

const INITIAL_SENIORS = [
  // --- 2nd Year Students ---
  {
    id: 's_2yr_1',
    name: 'Rohan Mehta',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250',
    branch: 'ENC',
    year: '2nd Year',
    yearNumber: 2,
    cgpa: '9.15',
    deansList: true,
    achievement: 'GSoC 2026 Aspirant & Microcontrollers Lead',
    company: 'Open Source Contributor',
    hostel: 'Hostel J',
    societies: ['OWASP TIET', 'TIET Robotics Society'],
    expertise: ['C/C++', 'Microprocessors (UEC404)', 'Embedded Systems', 'Arduino & ESP32'],
    bio: '2nd year ENC student passionate about low-level hardware and C programming. Helping 1st years master UES009 mechanics and C programming basics.',
    rating: 4.85,
    reviewsCount: 16,
    slotsAvailable: 3,
    connected: false,
    verified: true
  },
  {
    id: 's_2yr_2',
    name: 'Ishita Gupta',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
    branch: 'COE',
    year: '2nd Year',
    yearNumber: 2,
    cgpa: '9.45',
    deansList: true,
    achievement: 'Smart India Hackathon Finalist & Top Coder',
    company: 'SIH Finalist',
    hostel: 'Hostel PG',
    societies: ['Creative Computing Society (CCS)', 'ACM-W'],
    expertise: ['Data Structures (UCS411)', 'Python', 'Object Oriented Programming', 'Web Dev'],
    bio: 'Maintaining a 9.4+ in COE. Can assist juniors with UCS411 Data Structures, OOPs concepts in C++, and getting started with hackathons at TIET.',
    rating: 4.90,
    reviewsCount: 21,
    slotsAvailable: 4,
    connected: false,
    verified: true
  },
  {
    id: 's_2yr_3',
    name: 'Aditya Verma',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=250',
    branch: 'ECE',
    year: '2nd Year',
    yearNumber: 2,
    cgpa: '8.78',
    deansList: false,
    achievement: 'Robotics Competition Winner @ Saturnalia',
    company: 'TIET Robotics Club',
    hostel: 'Hostel H',
    societies: ['Robotics Society', 'IETE Student Forum'],
    expertise: ['Circuit Analysis', 'Analog Electronics', 'MATLAB', 'Lab Coursework'],
    bio: 'Hands-on hardware tinkerer. Specializes in solving circuit doubts, network theorems, and acing 1st/2nd year electronics lab vivas.',
    rating: 4.78,
    reviewsCount: 12,
    slotsAvailable: 2,
    connected: false,
    verified: true
  },
  {
    id: 's_2yr_4',
    name: 'Tanvi Bansal',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=250',
    branch: 'CSBS',
    year: '2nd Year',
    yearNumber: 2,
    cgpa: '9.28',
    deansList: true,
    achievement: 'FinTech Case Competition Runner Up',
    company: 'FinTech Cohort',
    hostel: 'Hostel N',
    societies: ['Enactus TIET', 'Finance Club'],
    expertise: ['Business Statistics', 'Python for Finance', 'DSA Fundamentals', 'Case Studies'],
    bio: 'CSBS 2nd year. Helping freshmen with the intersection of computer science and business analytics, coursework survival, and campus life.',
    rating: 4.88,
    reviewsCount: 19,
    slotsAvailable: 3,
    connected: false,
    verified: true
  },

  // --- 3rd Year Students ---
  {
    id: 's2',
    name: 'Kunal Verma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    branch: 'ENC',
    year: '3rd Year',
    yearNumber: 3,
    cgpa: '8.94',
    deansList: true,
    achievement: "GSoC '25 Contributor @ Linux Foundation",
    company: 'Linux Foundation',
    hostel: 'Hostel M (B-Gate)',
    societies: ['OWASP Student Chapter', 'Saturnalia Tech Team'],
    expertise: ['Embedded Systems', 'C/C++', 'GSoC & Open Source', 'ENC Core Survival'],
    bio: 'Navigating ENC without losing sanity! Passionate about computer architecture, kernel modules, and hardware-software co-design. Ping me for UEC404 or GSoC proposals.',
    rating: 4.88,
    reviewsCount: 29,
    slotsAvailable: 4,
    connected: true,
    verified: true
  },
  {
    id: 's4',
    name: 'Arnav Singhal',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    branch: 'COE',
    year: '3rd Year',
    yearNumber: 3,
    cgpa: '9.18',
    deansList: true,
    achievement: 'Codeforces Candidate Master & LeetCode Guardian',
    company: 'ICPC Regionalist',
    hostel: 'Hostel J (J-Hall)',
    societies: ['Thapar CP Cohort Leader', 'CCS Tech Team'],
    expertise: ['DSA & CP', 'Graph Theory', 'Dynamic Programming', 'ICPC Strategy'],
    bio: "Rank 120 in ICPC Regionals. Teaching competitive programming patterns that actually appear in DE Shaw, Sprinklr, and Google OA tests. Let's conquer graphs together.",
    rating: 4.92,
    reviewsCount: 51,
    slotsAvailable: 3,
    connected: false,
    verified: true
  },
  {
    id: 's_3yr_1',
    name: 'Mehak Singla',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    branch: 'ECE',
    year: '3rd Year',
    yearNumber: 3,
    cgpa: '9.05',
    deansList: true,
    achievement: 'Hardware Engineering Intern @ STMicroelectronics',
    company: 'STMicroelectronics',
    hostel: 'Hostel I',
    societies: ['IEEE Student Chapter', 'Women in Tech TIET'],
    expertise: ['Signals & Systems (UEC404)', 'Verilog HDL', 'FPGA Design', 'Digital Electronics'],
    bio: 'ECE 3rd year placed in summer internship at STMicro. Passionate about Verilog design, signal processing, and helping 2nd years crack core ECE/ENC subjects.',
    rating: 4.93,
    reviewsCount: 31,
    slotsAvailable: 2,
    connected: false,
    verified: true
  },
  {
    id: 's_3yr_2',
    name: 'Varun Aggarwal',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=250',
    branch: 'EEC',
    year: '3rd Year',
    yearNumber: 3,
    cgpa: '8.88',
    deansList: false,
    achievement: 'TIET Formula Student EV Powertrain Lead',
    company: 'Team Fateh (Formula Student)',
    hostel: 'Hostel K',
    societies: ['Team Fateh', 'Energy & Power Society'],
    expertise: ['Power Electronics', 'Electric Vehicles', 'Embedded C', 'Hardware Projects'],
    bio: 'Powertrain lead at Team Fateh. Can advise on Formula Student participation, electrical design, and balancing heavy society work with academics.',
    rating: 4.81,
    reviewsCount: 18,
    slotsAvailable: 4,
    connected: false,
    verified: true
  },
  {
    id: 's_3yr_3',
    name: 'Harshita Rao',
    avatar: 'https://images.unsplash.com/photo-1534751516642-a171edd2521d?auto=format&fit=crop&q=80&w=250',
    branch: 'CSBS',
    year: '3rd Year',
    yearNumber: 3,
    cgpa: '9.35',
    deansList: true,
    achievement: 'Incoming SWE Intern @ Atlassian',
    company: 'Atlassian',
    hostel: 'Hostel N',
    societies: ['Rotaract Club', 'ACM Student Chapter'],
    expertise: ['On-Campus Summer Internships', 'DSA Roadmap', 'System Design Basics', 'Resume Polish'],
    bio: 'Secured an early summer offer at Atlassian. Let me help you optimize your resume, prepare for company OA rounds, and structure your coding practice.',
    rating: 4.97,
    reviewsCount: 36,
    slotsAvailable: 2,
    connected: false,
    verified: true
  },

  // --- 4th Year Students ---
  {
    id: 's1',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    branch: 'COE',
    year: '4th Year',
    yearNumber: 4,
    cgpa: '9.42',
    deansList: true,
    achievement: 'Placed @ Microsoft (SWE)',
    company: 'Microsoft',
    hostel: 'Hostel N',
    societies: ['Creative Computing Society (CCS)', 'Rotaract TIET'],
    expertise: ['DSA & CP', 'System Design', 'On-Campus Placements', 'Resume Review'],
    bio: 'Cleared Microsoft on-campus drive. Grinded 500+ LeetCode problems and survived COE 5th sem lab vivas. Always open to help juniors with DSA roadmap and mock interviews!',
    rating: 4.95,
    reviewsCount: 38,
    slotsAvailable: 2,
    connected: false,
    verified: true
  },
  {
    id: 's3',
    name: 'Simran Kaur',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
    branch: 'CSBS',
    year: '4th Year',
    yearNumber: 4,
    cgpa: '9.58',
    deansList: true,
    achievement: 'Incoming Product Analyst @ McKinsey',
    company: 'McKinsey & Company',
    hostel: 'Hostel PG',
    societies: ['Ex-President Enactus TIET', 'Lead TIET'],
    expertise: ['Product Management', 'Case Interviews', 'Non-Tech Placements', 'CGPA Booster'],
    bio: 'Balancing a 9.5+ CGPA with college societies & consulting cases. Mentor for non-tech roles, product case study breakdowns, and consulting recruitment prep.',
    rating: 5.0,
    reviewsCount: 44,
    slotsAvailable: 1,
    connected: false,
    verified: true
  },
  {
    id: 's5',
    name: 'Divyanshu Patel',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=250',
    branch: 'ECE',
    year: '4th Year',
    yearNumber: 4,
    cgpa: '8.86',
    deansList: false,
    achievement: 'Placed @ Texas Instruments (Analog)',
    company: 'Texas Instruments',
    hostel: 'Hostel K',
    societies: ['TIET Robotics Society', 'Urvashi Cultural'],
    expertise: ['VLSI Design', 'Analog Circuits', 'UES009 Mechanics', 'Hardware Lab Vivas'],
    bio: 'Core hardware enthusiast. Can help with circuit simulations in Cadence, UEC301 signals, and tackling core technical rounds for TI, Qualcomm, and NXP.',
    rating: 4.82,
    reviewsCount: 22,
    slotsAvailable: 5,
    connected: false,
    verified: true
  },
  {
    id: 's6',
    name: 'Ananya Deshmukh',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
    branch: 'ENC',
    year: '4th Year',
    yearNumber: 4,
    cgpa: '9.31',
    deansList: true,
    achievement: 'Incoming SDE @ JP Morgan Chase (JPMC)',
    company: 'JP Morgan Chase',
    hostel: 'Hostel I',
    societies: ['MLSC TIET', 'ACM Student Chapter'],
    expertise: ['FinTech Placements', 'Full-Stack Dev', 'ENC to SDE Transition', 'Hackathons'],
    bio: 'JPMC Code For Good winner. Made the transition from hardware coursework to top software roles. Can review your portfolio, GitHub, and hackathon prototypes.',
    rating: 4.96,
    reviewsCount: 35,
    slotsAvailable: 2,
    connected: false,
    verified: true
  },
  {
    id: 's_4yr_1',
    name: 'Kabir Sethi',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=250',
    branch: 'MEE',
    year: '4th Year',
    yearNumber: 4,
    cgpa: '8.74',
    deansList: false,
    achievement: 'Placed @ Tata Motors (EV Powertrain)',
    company: 'Tata Motors',
    hostel: 'Hostel B',
    societies: ['ASME TIET', 'BAJA SAE Racing'],
    expertise: ['Mechanical Core Placements', 'Thermodynamics', 'CAD & SolidWorks', 'Automotive Engineering'],
    bio: 'Placed at Tata Motors through on-campus recruitment. Happy to guide mechanical and core engineering juniors on technical tests, core interviews, and CAD modeling.',
    rating: 4.85,
    reviewsCount: 20,
    slotsAvailable: 3,
    connected: false,
    verified: true
  }
];

const INITIAL_QUESTIONS = [
  {
    id: 'q1',
    title: 'How should 3rd sem ENC students prepare for UCS411 (Data Structures) MST under Dr. Inderveer?',
    description: 'Our MST-1 is scheduled in 2 weeks. Syllabus covers Linked Lists, Stacks, Queues, Binary Trees, and AVL tree rotations. Are the textbook questions enough or does the professor repeat questions from past 3 years? Really nervous about the time complexity proofs.',
    authorName: 'TIETian_#412',
    authorRole: 'ENC 2nd Year',
    isAnonymous: true,
    branch: 'ENC',
    subject: 'UCS411',
    tags: ['UCS411', 'Data Structures', 'MST-1', 'ENC'],
    upvotes: 46,
    userUpvoted: false,
    category: 'Academics',
    hasAcceptedAnswer: true,
    timestamp: '2 hours ago',
    answers: [
      {
        id: 'a1',
        authorName: 'Priya Sharma',
        authorRole: 'COE 4th Year (Placed @ Microsoft)',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
        content: "Hi! Don't panic. Inderveer Sir's papers test conceptual depth over rote memorization. 1) Pay extreme attention to AVL tree double rotation algorithms (RL and LR) with dry-run diagrams. 2) Practice amortized complexity derivations. 3) 2022 & 2023 questions tested AVL balance factors heavily. I scored 28/30 in this MST using those concepts!",
        upvotes: 38,
        isAccepted: true,
        timestamp: '1 hour ago'
      },
      {
        id: 'a2',
        authorName: 'Arnav Singhal',
        authorRole: '3rd Year • COE',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
        content: "Adding to Priya's point: Make sure you understand the difference between recursive tree traversals vs iterative using custom stacks. He frequently asks 6-marker questions on converting recursion to iteration without using extra space.",
        upvotes: 14,
        isAccepted: false,
        timestamp: '45 mins ago'
      }
    ]
  },
  {
    id: 'q2',
    title: 'Which electives to pick in 5th Sem COE if aiming for Tier-1 Quant / HFT & FinTech roles?',
    description: 'Options are between High-Performance Computing (UCS615), Cryptography & Network Security, Financial Computing, and Deep Learning. Want to know what recruiters at DE Shaw, Tower Research, and JPMC look for during resume screening.',
    authorName: 'Rohan Gupta',
    authorRole: '2nd Year • COE',
    isAnonymous: false,
    branch: 'COE',
    subject: 'UCS615',
    tags: ['COE', 'Electives', 'HFT', 'FinTech', 'Placements'],
    upvotes: 39,
    userUpvoted: true,
    category: 'Placements',
    hasAcceptedAnswer: true,
    timestamp: '5 hours ago',
    answers: [
      {
        id: 'a3',
        authorName: 'Ananya Deshmukh',
        authorRole: '4th Year • ENC (Incoming JPMC)',
        authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
        content: 'Pick High-Performance Computing (UCS615) hands down! Quant firms and high-paying FinTech companies value concurrency, memory cache hierarchies, SIMD parallelism, and C++ memory models above all. Combine it with Financial Computing if you get the slot. It gives you a huge talking point in technical interviews.',
        upvotes: 27,
        isAccepted: true,
        timestamp: '3 hours ago'
      }
    ]
  },
  {
    id: 'q3',
    title: 'How realistic is it to maintain an 8.5+ CGPA in ENC while doing LeetCode and Web Dev?',
    description: 'Everyone says ENC has a brutal 3rd and 4th semester due to Microprocessors, Signals & Systems (UEC404), and Network Analysis. Looking for genuine advice from seniors on time management and semester planning.',
    authorName: 'TIETian_#109',
    authorRole: '2nd Year • ENC',
    isAnonymous: true,
    branch: 'ENC',
    subject: 'General ENC',
    tags: ['ENC', 'CGPA-Booster', 'TimeManagement', 'Placements'],
    upvotes: 72,
    userUpvoted: false,
    category: 'Academics',
    hasAcceptedAnswer: false,
    timestamp: '1 day ago',
    answers: [
      {
        id: 'a4',
        authorName: 'Kunal Verma',
        authorRole: "3rd Year • ENC (GSoC '25)",
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
        content: 'Totally realistic, but you cannot pull all-nighters before ESTs and expect an A-. 1) Treat lab evaluations seriously (they carry 40% weightage and give free marks if your lab record is neat). 2) Dedicate 1.5 hours daily to LeetCode in the morning before 8 AM classes at LP block. 3) Do not skip tutorial classes in Signals.',
        upvotes: 52,
        isAccepted: false,
        timestamp: '18 hours ago'
      }
    ]
  },
  {
    id: 'q4',
    title: 'Best quiet spots on campus during EST week? Is Central Library (Nava Nalanda) always packed?',
    description: 'By 9:00 AM, all seats in the Reading Hall of Central Library seem occupied. Are there other good study zones with strong Wi-Fi and power outlets near COS or G-Block?',
    authorName: 'Mehak Preet',
    authorRole: '1st Year • Common',
    isAnonymous: false,
    branch: 'Common',
    subject: 'Campus Life',
    tags: ['CampusLife', 'Library', 'StudySpots', 'ESTs'],
    upvotes: 28,
    userUpvoted: false,
    category: 'Campus Life',
    hasAcceptedAnswer: true,
    timestamp: '2 days ago',
    answers: [
      {
        id: 'a5',
        authorName: 'Simran Kaur',
        authorRole: '4th Year • CSBS',
        authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
        content: 'Pro-tip: 1) The 2nd floor silent reading zone in the old library wing usually has open cubicles. 2) Tan Hall / C-Hall classrooms are kept unlocked until 9 PM before exams and have AC + charging ports. 3) Nirvana cafe is okay for group study, but for pin-drop silence, go to Tan Hall tutorial rooms!',
        upvotes: 31,
        isAccepted: true,
        timestamp: '1 day ago'
      }
    ]
  },
  {
    id: 'q5',
    title: 'UES009 Mechanics Lab Viva: What questions do professors typically ask on trusses and friction?',
    description: 'First year students have our end-sem lab exam this Thursday in the Mechanics lab. What are the common viva questions asked by external professors?',
    authorName: 'TIETian_#882',
    authorRole: '1st Year • Common',
    isAnonymous: true,
    branch: 'Common',
    subject: 'UES009',
    tags: ['UES009', 'Mechanics', 'LabViva', 'Freshers'],
    upvotes: 53,
    userUpvoted: false,
    category: 'Academics',
    hasAcceptedAnswer: false,
    timestamp: '3 days ago',
    answers: []
  }
];

const INITIAL_CONVERSATIONS = [
  {
    id: 'c1',
    seniorId: 's1',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    role: '4th Year • COE · Microsoft',
    status: 'Online',
    lastMessage: 'Sure Srishti! Bring your printed resume to Nava Nalanda 2nd floor tomorrow at 5 PM.',
    timestamp: '14:25',
    unread: 1,
    messages: [
      { id: 'm1', sender: 'them', text: 'Hey Srishti! Saw your query regarding UCS411 and off-campus internship timelines.', timestamp: '14:10' },
      { id: 'm2', sender: 'me', text: 'Hi Priya didi! Yes, really stressed about balancing DSA practice with MST preparations.', timestamp: '14:15' },
      { id: 'm3', sender: 'them', text: 'Completely understandable. I went through the same in my 3rd semester.', timestamp: '14:18' },
      { id: 'm4', sender: 'me', text: 'Could you review my resume and suggest which projects to highlight for Microsoft and Cisco?', timestamp: '14:22' },
      { id: 'm5', sender: 'them', text: 'Sure Srishti! Bring your printed resume to Nava Nalanda 2nd floor tomorrow at 5 PM.', timestamp: '14:25' }
    ]
  },
  {
    id: 'c2',
    seniorId: 's2',
    name: 'Kunal Verma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    role: "3rd Year • ENC · GSoC '25",
    status: 'Away',
    lastMessage: 'Check out the Verilog study guide in the ENC group!',
    timestamp: 'Yesterday',
    unread: 0,
    messages: [
      { id: 'm20', sender: 'them', text: 'Hey! Are you in the ENC WhatsApp study group for Signals & Systems?', timestamp: 'Yesterday' },
      { id: 'm21', sender: 'me', text: 'Not yet bhaiya, could you share the invite link or course guidance?', timestamp: 'Yesterday' },
      { id: 'm22', sender: 'them', text: 'Check out the Verilog study guide in the ENC group!', timestamp: 'Yesterday' }
    ]
  }
];

const INITIAL_MENTORSHIPS = [
  {
    id: 'mb1',
    seniorName: 'Priya Sharma',
    seniorRole: '4th Year • COE · Microsoft',
    topic: 'Resume Review & 3rd Sem DSA Strategy',
    mode: 'In-Person (Central Library TAN Wing)',
    date: 'Tomorrow, Nov 14',
    time: '5:00 PM – 5:45 PM',
    status: 'Confirmed',
    venue: {
      location: 'Central Library (Nava Nalanda)',
      room: 'Discussion Room 3, 2nd Floor (TAN Wing)',
      campusZone: 'Academic Core Zone, TIET Patiala',
      landmark: 'Next to Silent Study Area & Book Stacks, 2nd Floor',
      instructions: 'Please bring your printed one-page resume and laptop. Arrive 5 minutes early.'
    }
  },
  {
    id: 'mb2',
    seniorName: 'Kunal Verma',
    seniorRole: "3rd Year • ENC · GSoC '25",
    topic: 'Surviving ENC Core Courses & Open Source',
    mode: 'In-Person (C-Block Room C-204)',
    date: 'Saturday, Nov 16',
    time: '4:00 PM – 4:30 PM',
    status: 'Upcoming',
    venue: {
      location: 'C-Block Academic Complex',
      room: 'Room C-204 (2nd Floor Discussion Area)',
      campusZone: 'Engineering Core (C-Block), TIET Patiala',
      landmark: 'Near Department Notice Board, East Staircase',
      instructions: 'Bring your laptop with your C++ code repository or GSoC draft ready for live walkthrough.'
    }
  }
];

const INITIAL_OPEN_SLOTS = [
  {
    id: 'slot_1',
    seniorName: 'Priya Sharma',
    seniorRole: '4th Year • COE · Microsoft',
    seniorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    courseCode: 'UCS411',
    courseName: 'Data Structures & Algorithms',
    topic: 'Inderveer MST PYQ Walkthrough & AVL Rotations',
    date: 'Friday, Nov 15',
    time: '4:30 PM – 5:15 PM',
    meetingType: 'In-Person',
    venue: {
      location: 'Central Library (Nava Nalanda / TAN Wing)',
      room: 'Discussion Room 2 (2nd Floor)'
    },
    meetLink: '',
    status: 'Available',
    claimedBy: null
  },
  {
    id: 'slot_2',
    seniorName: 'Kunal Verma',
    seniorRole: "3rd Year • ENC · GSoC '25",
    seniorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    courseCode: 'UEC404',
    courseName: 'Digital Electronic Circuits',
    topic: 'K-Map Minimization, Flip-Flops & Lab Viva Prep',
    date: 'Saturday, Nov 16',
    time: '3:00 PM – 3:45 PM',
    meetingType: 'Virtual',
    meetLink: 'meet.google.com/tiet-kunal-enc',
    venue: null,
    status: 'Available',
    claimedBy: null
  },
  {
    id: 'slot_3',
    seniorName: 'Rohan Mehra',
    seniorRole: '4th Year • COE · Amazon',
    seniorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    courseCode: 'UCS310',
    courseName: 'Database Management Systems',
    topic: 'B+ Tree Insertions, Normalization (3NF/BCNF) & SQL PYQs',
    date: 'Sunday, Nov 17',
    time: '5:00 PM – 5:45 PM',
    meetingType: 'In-Person',
    venue: {
      location: 'C-Block Academic Complex',
      room: 'Room C-204 (Discussion Area)'
    },
    meetLink: '',
    status: 'Available',
    claimedBy: null
  },
  {
    id: 'slot_4',
    seniorName: 'Arnav Kapoor',
    seniorRole: '4th Year • Mechanical · Tata Motors',
    seniorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    courseCode: 'UES009',
    courseName: 'Mechanics (1st Year Common)',
    topic: 'Truss Analysis, Friction Problems & Mechanics Lab Viva',
    date: 'Monday, Nov 18',
    time: '4:00 PM – 4:45 PM',
    meetingType: 'In-Person',
    venue: {
      location: 'Cafe Nirvana / COS Pavilion',
      room: 'Open Seating (Table 4)'
    },
    meetLink: '',
    status: 'Available',
    claimedBy: null
  }
];

const INITIAL_JUNIOR_HELP_REQUESTS = [
  {
    id: 'jreq_1',
    juniorName: 'Srishti',
    juniorYear: '2nd Year',
    juniorBranch: 'ENC',
    subject: 'UCS411',
    title: 'Need 30 mins to understand AVL tree deletion and Inderveer sir repeat MST questions',
    description: 'Having a lot of trouble with double rotations in AVL trees and red-black tree properties before our upcoming MST. Would love a quick 1:1 walkthrough with a 3rd/4th year senior who aced UCS411.',
    preferredMode: 'In-Person (Central Library TAN Wing)',
    preferredTime: 'Thursday or Friday afternoon',
    urgency: 'High (MSTs in 3 days)',
    status: 'Open',
    claimedBySenior: null,
    timestamp: '2 hours ago'
  },
  {
    id: 'jreq_2',
    juniorName: 'Aarav Gupta',
    juniorYear: '1st Year',
    juniorBranch: 'COE',
    subject: 'UES009',
    title: 'Mechanics Lab Viva preparation on method of joints & dry friction',
    description: 'First year Mechanics lab viva is this Thursday. Need a senior to drill common viva questions on method of joints and dry friction problems.',
    preferredMode: 'Virtual (Google Meet)',
    preferredTime: 'Wednesday evening (6:00 PM)',
    urgency: 'Medium',
    status: 'Open',
    claimedBySenior: null,
    timestamp: '4 hours ago'
  },
  {
    id: 'jreq_3',
    juniorName: 'Tanmay Jain',
    juniorYear: '2nd Year',
    juniorBranch: 'COPC',
    subject: 'UEC404',
    title: 'Digital Electronics: State table reduction & Sequential circuits',
    description: 'Stuck on Moore vs Mealy machine conversions and state reduction problems from last year tutorial sheet.',
    preferredMode: 'In-Person (C-Block C-204)',
    preferredTime: 'Friday after 4 PM',
    urgency: 'Normal',
    status: 'Claimed',
    claimedBySenior: 'Kunal Verma (3rd Year • ENC)',
    timestamp: 'Yesterday'
  }
];

const INITIAL_NOTIFICATIONS = [
  {
    id: 'n1',
    title: '1:1 Mentorship Confirmed',
    message: 'Kunal Verma accepted your session for Saturday at C-Block (Room C-204).',
    time: '15m ago',
    unread: true,
    type: 'mentorship',
    tab: 'mentorship'
  },
  {
    id: 'n2',
    title: 'Senior Answered Your Doubt',
    message: 'Priya Sharma (COE) replied to your question on UCS411 MST repeat PYQs.',
    time: '1h ago',
    unread: true,
    type: 'doubt',
    tab: 'ask'
  },
  {
    id: 'n3',
    title: '+25 Campus Karma Earned',
    message: 'Your answer on ENC core course electives was marked helpful by 3 students.',
    time: '3h ago',
    unread: false,
    type: 'karma',
    tab: 'profile'
  },
  {
    id: 'n4',
    title: 'Conquer ESTs: 2024 PYQs Live',
    message: 'Solved End-Sem question papers uploaded for UES009 & UCS411.',
    time: '1d ago',
    unread: false,
    type: 'academic',
    tab: 'ask'
  }
];

// ==========================================
// MAIN APP COMPONENT
// ==========================================

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'ask' | 'seniors' | 'mentorship' | 'messages' | 'profile'
  
  // App Live States
  const [questions, setQuestions] = useState(INITIAL_QUESTIONS);
  const [seniors, setSeniors] = useState(INITIAL_SENIORS);
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [activeChatId, setActiveChatId] = useState('c1');
  const [mentorshipBookings, setMentorshipBookings] = useState(INITIAL_MENTORSHIPS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationsRef = useRef(null);
  
  // Authentication State
  const [currentUser, setCurrentUser] = useState(DEFAULT_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [authMode, setAuthMode] = useState('profile'); // 'profile' | 'signin' | 'signup'

  // Sign Up Form States
  const [signUpName, setSignUpName] = useState('');
  const [signUpRoll, setSignUpRoll] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpYear, setSignUpYear] = useState('2nd Year');
  const [signUpBranch, setSignUpBranch] = useState('ENC');
  const [signUpNameError, setSignUpNameError] = useState('');
  const [signUpRollError, setSignUpRollError] = useState('');
  const [signUpEmailError, setSignUpEmailError] = useState('');

  // Sign In Form States
  const [signInEmail, setSignInEmail] = useState('srishti@thapar.edu');
  const [signInPassword, setSignInPassword] = useState('password123');
  const [signInEmailError, setSignInEmailError] = useState('');

  // Interactive UI Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedForumCategory, setSelectedForumCategory] = useState('All');
  const [forumSort, setForumSort] = useState('Latest'); // 'Latest' | 'Trending' | 'Unanswered'
  const [seniorBranchFilter, setSeniorBranchFilter] = useState('All');
  const [seniorDomainFilter, setSeniorDomainFilter] = useState('All');

  // Modals & Popups
  const [isPostDoubtOpen, setIsPostDoubtOpen] = useState(false);
  const [isMentorshipModalOpen, setIsMentorshipModalOpen] = useState(false);
  const [selectedVenueSession, setSelectedVenueSession] = useState(null);
  const [mentorshipTargetSenior, setMentorshipTargetSenior] = useState(null);
  const [activeQuestionThread, setActiveQuestionThread] = useState(null);
  
  // Forms States
  const [newDoubtTitle, setNewDoubtTitle] = useState('');
  const [newDoubtDesc, setNewDoubtDesc] = useState('');
  const [newDoubtSubject, setNewDoubtSubject] = useState('');
  const [newDoubtBranch, setNewDoubtBranch] = useState('ENC');
  const [isAnonymousDoubt, setIsAnonymousDoubt] = useState(true);
  
  // Mentorship Form
  const [mentorshipTopic, setMentorshipTopic] = useState('Resume & Portfolio Review');
  const [mentorshipSlot, setMentorshipSlot] = useState('Tomorrow 5:00 PM @ Library');
  const [mentorshipNote, setMentorshipNote] = useState('');

  // Proactive 1:1 Mentorship States
  const [openSlots, setOpenSlots] = useState(INITIAL_OPEN_SLOTS);
  const [juniorHelpRequests, setJuniorHelpRequests] = useState(INITIAL_JUNIOR_HELP_REQUESTS);
  const [slotCourseFilter, setSlotCourseFilter] = useState('All');
  const [hideClaimedSlots, setHideClaimedSlots] = useState(true);
  const [mentorshipHubTab, setMentorshipHubTab] = useState('claimable'); // 'claimable' | 'junior_board' | 'my_sessions'
  
  // Offer 1:1 Session Modal State (Triggered from Doubts Board)
  const [isOfferSessionModalOpen, setIsOfferSessionModalOpen] = useState(false);
  const [targetQuestionForOffer, setTargetQuestionForOffer] = useState(null);
  const [offerMeetingType, setOfferMeetingType] = useState('In-Person'); // 'In-Person' | 'Virtual'
  const [offerVenue, setOfferVenue] = useState('Central Library (Nava Nalanda / TAN Wing - Room 3)');
  const [offerSlotTime, setOfferSlotTime] = useState('Tomorrow 4:30 PM – 5:15 PM');
  const [offerNote, setOfferNote] = useState('');

  // Post Open Slot Modal State (For Seniors)
  const [isPostSlotModalOpen, setIsPostSlotModalOpen] = useState(false);
  const [newSlotCourseCode, setNewSlotCourseCode] = useState('UCS411');
  const [newSlotTopic, setNewSlotTopic] = useState('');
  const [newSlotMeetingType, setNewSlotMeetingType] = useState('In-Person');
  const [newSlotVenue, setNewSlotVenue] = useState('Central Library (Nava Nalanda / TAN Wing - Room 2)');
  const [newSlotDate, setNewSlotDate] = useState('Friday, Nov 15');
  const [newSlotTime, setNewSlotTime] = useState('4:30 PM – 5:15 PM');

  // Create Junior Help Request Modal State (For Juniors)
  const [isCreateHelpRequestModalOpen, setIsCreateHelpRequestModalOpen] = useState(false);
  const [newHelpSubject, setNewHelpSubject] = useState('UCS411');
  const [newHelpTitle, setNewHelpTitle] = useState('');
  const [newHelpDesc, setNewHelpDesc] = useState('');
  const [newHelpMode, setNewHelpMode] = useState('In-Person');
  const [newHelpUrgency, setNewHelpUrgency] = useState('High (Before MST)');

  // Helper boolean to detect if logged-in user is a Senior (3rd or 4th Year)
  const isSenior = (currentUser.yearNumber >= 3) || (parseInt(currentUser.year, 10) >= 3);

  // Chat message input
  const [chatInputText, setChatInputText] = useState('');
  const [answerInputText, setAnswerInputText] = useState('');

  // Global Toast Notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  // Close notifications dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };
    if (isNotificationsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotificationsOpen]);

  const unreadNotificationsCount = notifications.filter(n => n.unread).length;

  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    showToast('All notifications marked as read.');
  };

  const handleClearNotifications = () => {
    setNotifications([]);
    setIsNotificationsOpen(false);
    showToast('Notifications cleared.');
  };

  // 1. Claim Slot Handler (Enforces strict 1-on-1 limit: locks/hides slot from all other students)
  const handleClaimSlot = (slot) => {
    // Instantly lock and mark as claimed by current student
    setOpenSlots(prev => prev.map(s => {
      if (s.id === slot.id) {
        return {
          ...s,
          status: 'Claimed',
          claimedBy: {
            name: currentUser.name || 'Srishti',
            year: currentUser.year || '2nd Year',
            branch: currentUser.branch || 'ENC'
          }
        };
      }
      return s;
    }));

    const venueObj = slot.meetingType === 'Virtual'
      ? {
          location: 'Google Meet (Virtual Campus Room)',
          room: slot.meetLink || 'meet.google.com/tiet-snr-session',
          campusZone: 'SeniorSphere Video Bridge',
          landmark: 'Virtual 1:1 Senior Lounge',
          instructions: 'Join 2 minutes before the slot with your questions and notes ready.'
        }
      : (slot.venue || {
          location: 'Central Library (Nava Nalanda / TAN Wing)',
          room: 'Discussion Room 2 (2nd Floor)',
          campusZone: 'Academic Core Zone, TIET Patiala',
          landmark: 'Next to Silent Study Area & TAN Reference Section',
          instructions: 'Arrive 5 minutes early. Silence your phone.'
        });

    const newBooking = {
      id: 'mb_' + Date.now(),
      seniorName: slot.seniorName,
      seniorRole: slot.seniorRole,
      topic: `${slot.courseCode}: ${slot.topic}`,
      mode: slot.meetingType === 'Virtual' ? `Google Meet (${slot.meetLink || 'Virtual'})` : `In-Person (${venueObj.location})`,
      date: slot.date,
      time: slot.time,
      status: 'Confirmed',
      venue: venueObj
    };

    setMentorshipBookings(prev => [newBooking, ...prev]);
    showToast(`Slot claimed successfully! 1:1 Mentorship with ${slot.seniorName} confirmed for ${slot.date} (${slot.time}).`);

    setNotifications(prev => [
      {
        id: 'n_' + Date.now(),
        title: '1:1 Mentorship Confirmed',
        message: `Your session on ${slot.courseCode} with ${slot.seniorName} is locked in for ${slot.date} at ${slot.time}.`,
        time: 'Just now',
        unread: true,
        type: 'mentorship',
        tab: 'mentorship'
      },
      ...prev
    ]);
  };

  // 2. Accept Junior Help Request (Instant update from Open to Claimed)
  const handleAcceptJuniorRequest = (req) => {
    const seniorDisplayName = currentUser.name || 'Senior Mentor';
    
    setJuniorHelpRequests(prev => prev.map(r => {
      if (r.id === req.id) {
        return {
          ...r,
          status: 'Claimed',
          claimedBySenior: `${seniorDisplayName} (${currentUser.year || '3rd Year'} • ${currentUser.branch || 'ENC'})`
        };
      }
      return r;
    }));

    const isVirtual = (req.preferredMode || '').toLowerCase().includes('virtual');
    const newBooking = {
      id: 'mb_' + Date.now(),
      seniorName: seniorDisplayName,
      seniorRole: `${currentUser.year || '3rd Year'} • ${currentUser.branch || 'ENC'} (Mentor)`,
      topic: `${req.subject}: ${req.title}`,
      mode: isVirtual ? 'Google Meet (Virtual)' : 'In-Person (Central Library TAN Wing)',
      date: 'Confirmed (This Week)',
      time: req.preferredTime || 'Mutually Agreed Time',
      status: 'Confirmed',
      venue: {
        location: isVirtual ? 'Google Meet (Virtual Room)' : 'Central Library (Nava Nalanda / TAN Wing)',
        room: isVirtual ? 'meet.google.com/tiet-peer-mentorship' : 'Discussion Room 3, 2nd Floor',
        campusZone: 'TIET Patiala Campus',
        landmark: 'Mentorship Guild Station',
        instructions: `Mentorship session for junior ${req.juniorName} (${req.juniorYear} • ${req.juniorBranch}).`
      }
    };

    setMentorshipBookings(prev => [newBooking, ...prev]);
    showToast(`You accepted ${req.juniorName}'s help request on ${req.subject}! Session scheduled.`);

    setNotifications(prev => [
      {
        id: 'n_' + Date.now(),
        title: 'Junior Help Request Accepted',
        message: `You accepted ${req.juniorName}'s request for 1:1 assistance on ${req.subject}.`,
        time: 'Just now',
        unread: true,
        type: 'mentorship',
        tab: 'mentorship'
      },
      ...prev
    ]);
  };

  // 3. Open Offer 1:1 Session Modal for a specific Question
  const handleOpenOfferSessionModal = (q) => {
    // If user is a junior, switch them to senior profile for demo testing
    if (!isSenior) {
      handleSwitchAcademicYear('3rd Year');
      showToast('Switched to Senior Mentor mode (3rd Year ECE) to offer 1:1 session!');
    }
    setTargetQuestionForOffer(q);
    setOfferSlotTime('Tomorrow 4:30 PM – 5:15 PM');
    setOfferMeetingType('In-Person');
    setOfferVenue('Central Library (Nava Nalanda / TAN Wing - Room 3)');
    setOfferNote(`Hi ${q.authorName}, I saw your doubt on ${q.subject}. Let's do a 30-min walkthrough to review the repeat questions and core concepts!`);
    setIsOfferSessionModalOpen(true);
  };

  // 4. Submit Offer 1:1 Session Form
  const handleSubmitOfferSession = (e) => {
    e.preventDefault();
    if (!targetQuestionForOffer) return;

    const seniorName = currentUser.name || 'Senior Mentor';
    const isVirtual = offerMeetingType === 'Virtual';
    const mockMeetLink = `meet.google.com/tiet-mentor-${Math.random().toString(36).substring(7)}`;

    const venueObj = isVirtual
      ? {
          location: 'Google Meet (Virtual Room)',
          room: mockMeetLink,
          campusZone: 'SeniorSphere Video Bridge',
          landmark: 'Virtual 1:1 Senior Lounge',
          instructions: 'Join 2 minutes prior with camera and syllabus queries ready.'
        }
      : {
          location: offerVenue,
          room: offerVenue.includes('Library') ? 'Discussion Room 3, 2nd Floor' : (offerVenue.includes('C-Block') ? 'Room C-204' : 'Pavilion Table 4'),
          campusZone: 'Academic Core Zone, TIET Patiala',
          landmark: 'Designated Mentorship Station',
          instructions: 'Please arrive 5 minutes early. Bring notes or doubts checklist.'
        };

    const newBooking = {
      id: 'mb_' + Date.now(),
      seniorName: seniorName,
      seniorRole: `${currentUser.year || '4th Year'} • ${currentUser.branch || 'COE'} (Mentor)`,
      topic: `${targetQuestionForOffer.subject}: ${targetQuestionForOffer.title}`,
      mode: isVirtual ? `Google Meet (${mockMeetLink})` : `In-Person (${offerVenue})`,
      date: offerSlotTime.split(' ')[0] || 'Tomorrow',
      time: offerSlotTime,
      status: 'Confirmed',
      venue: venueObj
    };

    setMentorshipBookings(prev => [newBooking, ...prev]);
    setIsOfferSessionModalOpen(false);
    showToast(`1:1 Mentorship offer scheduled with ${targetQuestionForOffer.authorName}! Added to your sessions.`);

    setNotifications(prev => [
      {
        id: 'n_' + Date.now(),
        title: '1:1 Session Offer Confirmed',
        message: `You scheduled a 1:1 mentorship with ${targetQuestionForOffer.authorName} on "${targetQuestionForOffer.subject}".`,
        time: 'Just now',
        unread: true,
        type: 'mentorship',
        tab: 'mentorship'
      },
      ...prev
    ]);
  };

  // 5. Submit Post Open Slot Form (For Seniors)
  const handleSubmitPostSlot = (e) => {
    e.preventDefault();
    if (!newSlotTopic.trim()) {
      showToast('Please enter a topic for the open slot.', 'error');
      return;
    }

    const seniorName = currentUser.name || 'Priya Sharma';
    const seniorRole = `${currentUser.year || '4th Year'} • ${currentUser.branch || 'COE'}`;
    const isVirtual = newSlotMeetingType === 'Virtual';
    const mockMeetLink = `meet.google.com/tiet-${newSlotCourseCode.toLowerCase()}-${Math.random().toString(36).substring(7)}`;

    const venueObj = isVirtual ? null : {
      location: newSlotVenue,
      room: newSlotVenue.includes('Library') ? 'Discussion Room 2 (2nd Floor)' : (newSlotVenue.includes('C-Block') ? 'Room C-204' : 'Open Discussion Area')
    };

    const newSlot = {
      id: 'slot_' + Date.now(),
      seniorName: seniorName,
      seniorRole: seniorRole,
      seniorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      courseCode: newSlotCourseCode,
      courseName: newSlotCourseCode === 'UCS411' ? 'Data Structures & Algorithms' : (newSlotCourseCode === 'UES009' ? 'Mechanics' : 'Core Engineering'),
      topic: newSlotTopic.trim(),
      date: newSlotDate,
      time: newSlotTime,
      meetingType: newSlotMeetingType,
      venue: venueObj,
      meetLink: isVirtual ? mockMeetLink : '',
      status: 'Available',
      claimedBy: null
    };

    setOpenSlots(prev => [newSlot, ...prev]);
    setIsPostSlotModalOpen(false);
    setNewSlotTopic('');
    showToast(`New 1:1 slot posted for ${newSlotCourseCode}! Juniors can now claim it.`);

    setNotifications(prev => [
      {
        id: 'n_' + Date.now(),
        title: 'Open 1:1 Slot Published',
        message: `Your open slot for ${newSlotCourseCode} (${newSlotTime}) is now live for juniors to claim.`,
        time: 'Just now',
        unread: false,
        type: 'academic',
        tab: 'mentorship'
      },
      ...prev
    ]);
  };

  // 6. Submit Junior Help Request Form (For Juniors)
  const handleSubmitJuniorHelpRequest = (e) => {
    e.preventDefault();
    if (!newHelpTitle.trim() || !newHelpDesc.trim()) {
      showToast('Please provide a title and details of the help needed.', 'error');
      return;
    }

    const newReq = {
      id: 'jreq_' + Date.now(),
      juniorName: currentUser.name || 'Srishti',
      juniorYear: currentUser.year || '2nd Year',
      juniorBranch: currentUser.branch || 'ENC',
      subject: newHelpSubject,
      title: newHelpTitle.trim(),
      description: newHelpDesc.trim(),
      preferredMode: newHelpMode,
      preferredTime: 'This Week',
      urgency: newHelpUrgency,
      status: 'Open',
      claimedBySenior: null,
      timestamp: 'Just now'
    };

    setJuniorHelpRequests(prev => [newReq, ...prev]);
    setIsCreateHelpRequestModalOpen(false);
    setNewHelpTitle('');
    setNewHelpDesc('');
    showToast(`Help request submitted for ${newHelpSubject}! Visible on the Senior Help Requests Board.`);
  };

  // Filtered Open Slots (Strict 1-on-1 locking & course tagging)
  const filteredOpenSlots = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return openSlots.filter(slot => {
      if (hideClaimedSlots && slot.status === 'Claimed') {
        return false;
      }
      const matchCourse = slotCourseFilter === 'All' || slot.courseCode === slotCourseFilter;
      const matchSearch = query === '' ||
        slot.seniorName.toLowerCase().includes(query) ||
        slot.courseCode.toLowerCase().includes(query) ||
        slot.topic.toLowerCase().includes(query) ||
        (slot.meetingType && slot.meetingType.toLowerCase().includes(query));
      return matchCourse && matchSearch;
    });
  }, [openSlots, slotCourseFilter, hideClaimedSlots, searchQuery]);

  // Name Validation: Only alphabetic characters and spaces
  const handleSignUpNameChange = (val) => {
    setSignUpName(val);
    const trimmed = val.trim();
    if (trimmed.length === 0) {
      setSignUpNameError('');
    } else if (!/^[A-Za-z\s]+$/.test(val)) {
      setSignUpNameError('Name can only contain alphabetic letters and spaces');
    } else {
      setSignUpNameError('');
    }
  };

  // Roll Number Validation: Numbers only, exactly 10 digits
  const handleSignUpRollChange = (val) => {
    setSignUpRoll(val);
    const trimmed = val.trim();
    if (trimmed.length === 0) {
      setSignUpRollError('');
    } else if (!/^\d+$/.test(trimmed)) {
      setSignUpRollError('Roll number can only contain numbers');
    } else if (trimmed.length !== 10) {
      setSignUpRollError('Roll number must be exactly 10 digits long');
    } else {
      setSignUpRollError('');
    }
  };

  // Auth Handlers with @thapar.edu validation
  const handleSignUpEmailChange = (val) => {
    setSignUpEmail(val);
    const trimmed = val.trim().toLowerCase();
    if (trimmed.length === 0) {
      setSignUpEmailError('');
    } else if (!trimmed.endsWith('@thapar.edu')) {
      setSignUpEmailError('Please use your official Thapar email ID');
    } else {
      setSignUpEmailError('');
    }
  };

  const handleSignInEmailChange = (val) => {
    setSignInEmail(val);
    const trimmed = val.trim().toLowerCase();
    if (trimmed.length > 0 && !trimmed.endsWith('@thapar.edu')) {
      setSignInEmailError('Please use your official Thapar email ID');
    } else {
      setSignInEmailError('');
    }
  };

  // Disable Sign Up Submit button if any validation errors or incomplete fields
  const isSignUpDisabled =
    !signUpName.trim() ||
    Boolean(signUpNameError) ||
    !/^[A-Za-z\s]+$/.test(signUpName.trim()) ||
    !signUpRoll.trim() ||
    Boolean(signUpRollError) ||
    signUpRoll.trim().length !== 10 ||
    !/^\d{10}$/.test(signUpRoll.trim()) ||
    !signUpEmail.trim() ||
    Boolean(signUpEmailError) ||
    !signUpEmail.trim().toLowerCase().endsWith('@thapar.edu') ||
    !signUpPassword.trim();

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    const trimmedName = signUpName.trim();
    const trimmedRoll = signUpRoll.trim();
    const trimmedEmail = signUpEmail.trim().toLowerCase();

    // Enforce validations before processing
    if (!trimmedName || !/^[A-Za-z\s]+$/.test(trimmedName)) {
      setSignUpNameError('Name can only contain alphabetic letters and spaces');
      return;
    }
    if (!trimmedRoll || trimmedRoll.length !== 10 || !/^\d{10}$/.test(trimmedRoll)) {
      setSignUpRollError('Roll number must be exactly 10 digits long');
      return;
    }
    if (!trimmedEmail || !trimmedEmail.endsWith('@thapar.edu')) {
      setSignUpEmailError('Please use your official Thapar email ID');
      return;
    }
    if (!signUpPassword.trim()) {
      return;
    }

    const yearNum = parseInt(signUpYear, 10) || 2;
    const batchYear = 2031 - yearNum;

    const newUser = {
      name: trimmedName,
      rollNumber: trimmedRoll,
      email: trimmedEmail,
      year: signUpYear,
      yearNumber: yearNum,
      branch: signUpBranch,
      batch: `Batch of ${batchYear}`,
      hostel: signUpBranch === 'COE' || signUpBranch === 'CSBS' || signUpBranch === 'COPC' ? 'Hostel PG' : 'Hostel N',
      cgpa: '8.80',
      karma: 150
    };

    setCurrentUser(newUser);
    setIsAuthenticated(true);
    setAuthMode('profile');
    setSignUpNameError('');
    setSignUpRollError('');
    setSignUpEmailError('');
    showToast(`Account created successfully! Welcome, ${newUser.name} (${newUser.year} • ${newUser.branch}).`);
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    const trimmed = signInEmail.trim().toLowerCase();
    if (trimmed && !trimmed.endsWith('@thapar.edu')) {
      setSignInEmailError('Please use your official Thapar email ID');
      return;
    }
    setSignInEmailError('');
    setIsAuthenticated(true);
    setAuthMode('profile');
    showToast(`Signed in successfully as ${currentUser.name}!`);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setAuthMode('signin');
    showToast('Signed out of SeniorSphere.');
  };

  // Helper to switch academic year for instant testing of senior filtering
  const handleSwitchAcademicYear = (yearStr) => {
    const yearNum = parseInt(yearStr, 10);
    const batchMap = {
      '1st Year': 'Batch of 2030',
      '2nd Year': 'Batch of 2029',
      '3rd Year': 'Batch of 2028',
      '4th Year': 'Batch of 2027'
    };

    setCurrentUser(prev => ({
      ...prev,
      year: yearStr,
      yearNumber: yearNum,
      batch: batchMap[yearStr] || 'Batch of 2029'
    }));
    setIsAuthenticated(true);
    showToast(`Simulating as ${yearStr} student. "Find Seniors" is now filtered!`);
  };

  // Upvote Question Handler
  const handleToggleUpvoteQuestion = (qId) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === qId) {
        const nextUpvoted = !q.userUpvoted;
        return {
          ...q,
          userUpvoted: nextUpvoted,
          upvotes: nextUpvoted ? q.upvotes + 1 : q.upvotes - 1
        };
      }
      return q;
    }));
    
    if (activeQuestionThread && activeQuestionThread.id === qId) {
      setActiveQuestionThread(prev => ({
        ...prev,
        userUpvoted: !prev.userUpvoted,
        upvotes: !prev.userUpvoted ? prev.upvotes + 1 : prev.upvotes - 1
      }));
    }
  };

  // Submit New Doubt
  const handleCreateDoubt = (e) => {
    e.preventDefault();
    if (!newDoubtTitle.trim() || !newDoubtDesc.trim()) {
      showToast('Please provide both question title and description.', 'error');
      return;
    }

    const userName = isAuthenticated ? currentUser.name : 'Srishti';
    const userRole = isAuthenticated ? `${currentUser.branch} ${currentUser.year}` : 'ENC 2nd Year';

    const newQuestion = {
      id: 'q_' + Date.now(),
      title: newDoubtTitle.trim(),
      description: newDoubtDesc.trim(),
      authorName: isAnonymousDoubt ? 'TIETian_#' + Math.floor(100 + Math.random() * 900) : userName,
      authorRole: userRole,
      isAnonymous: isAnonymousDoubt,
      branch: newDoubtBranch,
      subject: newDoubtSubject.trim() || 'General TIET',
      tags: [newDoubtSubject.trim() || 'TIET', newDoubtBranch, 'AcademicDoubt'],
      upvotes: 1,
      userUpvoted: true,
      category: 'Academics',
      hasAcceptedAnswer: false,
      timestamp: 'Just now',
      answers: []
    };

    setQuestions([newQuestion, ...questions]);
    setIsPostDoubtOpen(false);
    setNewDoubtTitle('');
    setNewDoubtDesc('');
    setNewDoubtSubject('');
    showToast('Your doubt has been broadcasted to verified seniors!');
    setActiveTab('ask');
  };

  // Submit Answer to Active Question
  const handlePostAnswer = (e) => {
    e.preventDefault();
    if (!answerInputText.trim() || !activeQuestionThread) return;

    const newAns = {
      id: 'ans_' + Date.now(),
      authorName: 'Srishti',
      authorRole: 'ENC 2nd Year',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
      content: answerInputText.trim(),
      upvotes: 1,
      isAccepted: false,
      timestamp: 'Just now'
    };

    const updatedQuestions = questions.map(q => {
      if (q.id === activeQuestionThread.id) {
        return {
          ...q,
          answers: [...q.answers, newAns]
        };
      }
      return q;
    });

    setQuestions(updatedQuestions);
    setActiveQuestionThread(prev => ({
      ...prev,
      answers: [...prev.answers, newAns]
    }));
    setAnswerInputText('');
    showToast('Answer posted to discussion thread!');
  };

  // Connect with Senior
  const handleToggleConnectSenior = (seniorId) => {
    setSeniors(prev => prev.map(s => {
      if (s.id === seniorId) {
        const nextState = !s.connected;
        showToast(nextState ? `Connection request sent to ${s.name}!` : `Removed connection with ${s.name}.`);
        return { ...s, connected: nextState };
      }
      return s;
    }));
  };

  // Open Direct Message with Senior
  const handleOpenDirectChatWithSenior = (senior) => {
    let existing = conversations.find(c => c.seniorId === senior.id);
    if (!existing) {
      const newConv = {
        id: 'c_' + senior.id,
        seniorId: senior.id,
        name: senior.name,
        avatar: senior.avatar,
        role: `${senior.branch} ${senior.year} · ${senior.company || 'TIET'}`,
        status: 'Online',
        lastMessage: 'Conversation started.',
        timestamp: 'Just now',
        unread: 0,
        messages: [
          {
            id: 'init_1',
            sender: 'them',
            text: `Hi Srishti! Saw you wanted to connect. Feel free to ask any doubt regarding ${senior.branch} courses, placements, or campus life at TIET.`,
            timestamp: 'Just now'
          }
        ]
      };
      setConversations([newConv, ...conversations]);
      setActiveChatId(newConv.id);
    } else {
      setActiveChatId(existing.id);
    }
    setActiveTab('messages');
  };

  // Helper to retrieve detailed physical campus venue details for 1:1 sessions
  const getSessionVenue = (session) => {
    if (session?.venue) return session.venue;
    const loc = (session?.mode || session?.date || '').toLowerCase();
    if (loc.includes('tan') || loc.includes('nava nalanda') || loc.includes('library')) {
      return {
        location: 'Central Library (Nava Nalanda / TAN Wing)',
        room: 'Discussion Room 3, 2nd Floor (TAN Wing)',
        campusZone: 'Academic Core Zone, TIET Patiala',
        landmark: 'Next to Silent Study Area & TAN Reference Section',
        instructions: 'Please arrive promptly 5 minutes before scheduled start. Silence mobile devices.'
      };
    }
    if (loc.includes('c-block') || loc.includes('c-204')) {
      return {
        location: 'C-Block Academic Complex',
        room: 'Room C-204 (2nd Floor Discussion Area)',
        campusZone: 'Engineering Core (C-Block), TIET Patiala',
        landmark: 'Near Department Notice Board, East Staircase',
        instructions: 'Bring your laptop with code repository or syllabus queries ready for discussion.'
      };
    }
    if (loc.includes('nirvana') || loc.includes('cos')) {
      return {
        location: 'Cafe Nirvana / COS Pavilion',
        room: 'Open Discussion Seating Area (Table 4)',
        campusZone: 'Student Activity Hub (COS), TIET Patiala',
        landmark: 'Behind Student Activity Centre (COS) & Nirvana Cafe',
        instructions: 'Informal mentorship meetup. Grab a coffee or chai and review your roadmap.'
      };
    }
    if (loc.includes('google meet')) {
      return {
        location: 'Google Meet (Virtual Campus Room)',
        room: 'Online Meeting (meet.google.com/tiet-snr-enc)',
        campusZone: 'SeniorSphere Video Bridge',
        landmark: 'Virtual 1:1 Senior Lounge',
        instructions: 'Ensure your microphone and camera work properly. Join 2 minutes before the slot.'
      };
    }
    return {
      location: 'Central Library (Nava Nalanda / TAN Wing)',
      room: 'Discussion Room 3, 2nd Floor',
      campusZone: 'Academic Core Zone, TIET Patiala',
      landmark: 'Next to Silent Study Area & Book Stacks',
      instructions: 'Please arrive 5 minutes early. Bring printed resume or doubt checklist.'
    };
  };

  // Book 1:1 Mentorship Submit
  const handleBookMentorshipSubmit = (e) => {
    e.preventDefault();
    if (!mentorshipTargetSenior) return;

    let venueDetails = {
      location: 'Central Library (Nava Nalanda / TAN Wing)',
      room: 'Discussion Room 3, 2nd Floor',
      campusZone: 'Academic Core Zone, TIET Patiala',
      landmark: 'Next to Silent Study Area & Book Stacks',
      instructions: 'Please arrive 5 minutes early. Bring printed resume or doubt checklist.'
    };

    if (mentorshipSlot.includes('C-Block')) {
      venueDetails = {
        location: 'C-Block Academic Complex',
        room: 'Room C-204 (2nd Floor Discussion Area)',
        campusZone: 'Engineering Core (C-Block), TIET Patiala',
        landmark: 'Near Department Notice Board, East Staircase',
        instructions: 'Bring your laptop with code repository or notes ready.'
      };
    } else if (mentorshipSlot.includes('Cafe Nirvana') || mentorshipSlot.includes('COS')) {
      venueDetails = {
        location: 'Cafe Nirvana / COS Pavilion',
        room: 'Open Discussion Seating Area (Table 4)',
        campusZone: 'Student Activity Hub (COS), TIET Patiala',
        landmark: 'Adjacent to Student Activity Centre (COS) & Food Court',
        instructions: 'Informal mentorship meetup. Grab a coffee or chai and review your career roadmap.'
      };
    } else if (mentorshipSlot.includes('Google Meet')) {
      venueDetails = {
        location: 'Google Meet (Virtual Campus Room)',
        room: 'Online Video Link (meet.google.com/tiet-mentorship)',
        campusZone: 'SeniorSphere Video Bridge',
        landmark: 'Virtual 1:1 Senior Lounge',
        instructions: 'Join 2 minutes before the slot with your camera and notes app open.'
      };
    }

    const newBooking = {
      id: 'mb_' + Date.now(),
      seniorName: mentorshipTargetSenior.name,
      seniorRole: `${mentorshipTargetSenior.year} • ${mentorshipTargetSenior.branch} · ${mentorshipTargetSenior.company}`,
      topic: mentorshipTopic,
      mode: mentorshipSlot.includes('Google Meet') ? 'Google Meet (Virtual)' : `In-Person (${venueDetails.location})`,
      date: mentorshipSlot,
      time: 'Confirmed via TIET SeniorSphere',
      status: 'Confirmed',
      venue: venueDetails
    };

    setMentorshipBookings([newBooking, ...mentorshipBookings]);
    setIsMentorshipModalOpen(false);
    showToast(`1:1 Mentorship confirmed with ${mentorshipTargetSenior.name}! Venue: ${venueDetails.location} (${venueDetails.room}).`);
  };

  // Send Direct Message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInputText.trim()) return;

    const newMessage = {
      id: 'msg_' + Date.now(),
      sender: 'me',
      text: chatInputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === activeChatId) {
        return {
          ...conv,
          lastMessage: newMessage.text,
          timestamp: newMessage.timestamp,
          messages: [...conv.messages, newMessage]
        };
      }
      return conv;
    }));

    setChatInputText('');

    setTimeout(() => {
      setConversations(prev => prev.map(conv => {
        if (conv.id === activeChatId) {
          const autoReply = {
            id: 'reply_' + Date.now(),
            sender: 'them',
            text: 'Got it! I am reviewing your query right now. Will drop the exact solution in a bit.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          return {
            ...conv,
            lastMessage: autoReply.text,
            timestamp: autoReply.timestamp,
            messages: [...conv.messages, autoReply]
          };
        }
        return conv;
      }));
    }, 1200);
  };

  // Filtered Questions (dynamically reacts to global search bar & category/sorting)
  const filteredQuestions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return questions.filter(q => {
      const matchSearch = query === '' ||
        q.title.toLowerCase().includes(query) ||
        q.description.toLowerCase().includes(query) ||
        q.subject.toLowerCase().includes(query) ||
        q.branch.toLowerCase().includes(query) ||
        q.tags.some(t => t.toLowerCase().includes(query)) ||
        q.answers.some(a => a.content.toLowerCase().includes(query));

      const matchCategory = selectedForumCategory === 'All' || q.category === selectedForumCategory;
      return matchSearch && matchCategory;
    }).sort((a, b) => {
      if (forumSort === 'Trending') return b.upvotes - a.upvotes;
      if (forumSort === 'Unanswered') return a.answers.length - b.answers.length;
      return 0;
    });
  }, [questions, searchQuery, selectedForumCategory, forumSort]);

  // Filtered Seniors (Filtered dynamically by higher academic year & global search)
  const filteredSeniors = useMemo(() => {
    const userYearNum = isAuthenticated ? (currentUser.yearNumber || parseInt(currentUser.year, 10) || 2) : 1;
    const query = searchQuery.trim().toLowerCase();

    return seniors.filter(s => {
      // 1. DYNAMIC ACADEMIC YEAR FILTER:
      // Strictly only display seniors in higher academic years than the logged-in user.
      const seniorYearNum = s.yearNumber || parseInt(s.year, 10) || 4;
      const isHigherYear = userYearNum >= 4 ? seniorYearNum >= 4 : seniorYearNum > userYearNum;
      if (isAuthenticated && !isHigherYear) {
        return false;
      }

      // 2. Global Search Query Filter (name, company, branch, expertise, bio, achievement)
      const matchSearch = query === '' ||
        s.name.toLowerCase().includes(query) ||
        s.company.toLowerCase().includes(query) ||
        s.branch.toLowerCase().includes(query) ||
        s.achievement.toLowerCase().includes(query) ||
        s.bio.toLowerCase().includes(query) ||
        s.expertise.some(e => e.toLowerCase().includes(query));

      // 3. Branch Filter
      const matchBranch = seniorBranchFilter === 'All' || s.branch === seniorBranchFilter;

      // 4. Domain Filter
      const matchDomain = seniorDomainFilter === 'All' || s.expertise.some(e => e.toLowerCase().includes(seniorDomainFilter.toLowerCase()));

      return matchSearch && matchBranch && matchDomain;
    });
  }, [seniors, searchQuery, seniorBranchFilter, seniorDomainFilter, currentUser, isAuthenticated]);

  // Filtered Mentorship Bookings (for search in 1:1 mentorship hub)
  const filteredMentorships = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return mentorshipBookings;
    return mentorshipBookings.filter(b =>
      b.seniorName.toLowerCase().includes(query) ||
      b.seniorRole.toLowerCase().includes(query) ||
      b.topic.toLowerCase().includes(query) ||
      b.mode.toLowerCase().includes(query) ||
      (b.venue && (b.venue.location.toLowerCase().includes(query) || b.venue.room.toLowerCase().includes(query)))
    );
  }, [mentorshipBookings, searchQuery]);

  const activeConversation = conversations.find(c => c.id === activeChatId) || conversations[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col md:flex-row antialiased selection:bg-red-100 selection:text-red-950 font-sans">
      
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-amber-400/30 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <p className="text-sm font-medium">{toast.message}</p>
          <button onClick={() => setToast(null)} className="text-slate-400 hover:text-white p-1 ml-2">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Desktop Left Sidebar (Resources link completely removed) */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-white border-r border-slate-200/80 p-5 sticky top-0 h-screen justify-between z-20">
        <div>
          <div className="flex items-center gap-3 px-2 py-3 mb-6">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-red-950 via-red-900 to-red-800 flex items-center justify-center text-white shadow-md shadow-red-950/20">
              <GraduationCap className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">SeniorSphere</span>
              </div>
              <span className="text-[11px] font-bold text-red-900 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                TIET Patiala
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsPostDoubtOpen(true)}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-950 via-red-900 to-red-800 hover:from-red-900 hover:to-red-700 text-white font-medium py-3 px-4 rounded-xl shadow-md shadow-red-900/25 transition-all duration-200 active:scale-[0.98] mb-6 group cursor-pointer"
          >
            <Plus className="w-4 h-4 text-amber-300 group-hover:rotate-90 transition-transform duration-200" />
            <span>Ask a Doubt</span>
          </button>

          <nav className="space-y-1.5">
            {[
              { id: 'home', label: 'Home Feed', icon: Home },
              { id: 'ask', label: 'Doubt Forum', icon: HelpCircle, badge: questions.length },
              { id: 'seniors', label: 'Find Seniors', icon: Users },
              { id: 'mentorship', label: '1:1 Mentorship', icon: Calendar, badge: mentorshipBookings.length },
              { id: 'messages', label: 'Messages', icon: MessageSquare, unread: conversations.reduce((acc, c) => acc + (c.unread || 0), 0) },
              { id: 'profile', label: 'Profile', icon: User }
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setActiveQuestionThread(null);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-red-50 text-red-950 font-bold shadow-xs border border-red-200'
                      : 'text-slate-600 hover:bg-red-50/50 hover:text-red-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-red-900' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-amber-100 text-amber-950 border border-amber-300/60' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {item.unread > 0 && (
                    <span className="w-5 h-5 flex items-center justify-center text-[11px] font-black rounded-full bg-red-900 text-amber-300 shadow-xs">
                      {item.unread}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Mini Profile */}
        <div className="pt-4 border-t border-slate-100">
          <button
            onClick={() => {
              setActiveTab('profile');
              setActiveQuestionThread(null);
            }}
            className="w-full bg-slate-50/80 hover:bg-red-50/50 transition-colors p-3 rounded-2xl border border-slate-200/70 flex items-center justify-between gap-2 cursor-pointer text-left group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-900 to-red-950 text-amber-300 flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                {isAuthenticated && currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'G'}
              </div>
              <div className="text-left min-w-0">
                <p className="text-xs font-bold text-slate-900 leading-tight truncate">
                  {isAuthenticated ? currentUser.name : 'Guest Student'}
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  {isAuthenticated ? `${currentUser.year} • ${currentUser.branch}` : 'Click to Sign In'}
                </p>
              </div>
            </div>
            {isAuthenticated ? (
              <span className="text-[10px] text-red-900 font-bold group-hover:underline shrink-0">Profile</span>
            ) : (
              <LogIn className="w-3.5 h-3.5 text-red-900 shrink-0" />
            )}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-8">
        <header className="sticky top-0 z-50 bg-white border-b border-slate-200/80 px-3 sm:px-4 md:px-8 py-3 flex items-center justify-between gap-2.5 sm:gap-4 shadow-sm">
          {/* Mobile Brand Icon & Name */}
          <div className="flex items-center gap-2.5 md:hidden shrink-0">
            <div className="w-9 h-9 rounded-xl bg-red-950 flex items-center justify-center text-white shadow-xs shrink-0">
              <GraduationCap className="w-5 h-5 text-amber-300" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-base text-slate-900 leading-tight block">SeniorSphere</span>
              <span className="text-[10px] text-red-900 font-bold block -mt-0.5">TIET Campus</span>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 min-w-0 max-w-xl">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search doubts, seniors, course codes (UCS411)..."
              className="w-full pl-9 pr-8 py-2 bg-slate-100/90 hover:bg-slate-100 focus:bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 rounded-xl border border-transparent focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100 transition-all truncate"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0 relative z-50">
            {/* Ask a Doubt Plus Button (Mobile) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsPostDoubtOpen(true);
              }}
              className="md:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-red-900 hover:bg-red-950 active:scale-95 text-white flex items-center justify-center shadow-sm shadow-red-900/30 cursor-pointer pointer-events-auto touch-manipulation transition-all"
              title="Ask a Doubt"
              aria-label="Ask a Doubt"
            >
              <Plus className="w-5 h-5 stroke-[2.5] text-amber-300" />
            </button>

            {/* Notification Bell Dropdown Container */}
            <div ref={notificationsRef} className="relative">
              <button
                type="button"
                onClick={() => setIsNotificationsOpen(prev => !prev)}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-colors relative cursor-pointer ${
                  isNotificationsOpen
                    ? 'bg-red-50 text-red-900 ring-2 ring-red-200'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
                title="Notifications"
                aria-label="Notifications"
                aria-expanded={isNotificationsOpen}
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
                )}
              </button>

              {/* Notification Dropdown Menu */}
              {isNotificationsOpen && (
                <div
                  className="absolute right-0 top-full mt-2.5 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  style={{ minWidth: '320px', maxWidth: 'calc(100vw - 24px)' }}
                >
                  {/* Dropdown Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm">Notifications</h4>
                      {unreadNotificationsCount > 0 ? (
                        <span className="px-2 py-0.5 text-[10px] font-black bg-red-100 text-red-900 rounded-full border border-red-200">
                          {unreadNotificationsCount} New
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 text-[10px] font-semibold bg-slate-100 text-slate-600 rounded-full">
                          All Caught Up
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {unreadNotificationsCount > 0 && (
                        <button
                          type="button"
                          onClick={handleMarkAllNotificationsRead}
                          className="text-[11px] font-bold text-red-900 hover:text-red-950 hover:underline cursor-pointer transition-colors"
                        >
                          Mark all read
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setIsNotificationsOpen(false)}
                        className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-1 rounded-lg transition-colors cursor-pointer"
                        aria-label="Close notifications"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Notifications List */}
                  <div className="mt-2 max-h-80 overflow-y-auto divide-y divide-slate-100 space-y-1">
                    {notifications.length > 0 ? (
                      notifications.map((n) => {
                        let IconComponent = HelpCircle;
                        let iconBg = 'bg-red-50 text-red-900';

                        if (n.type === 'mentorship') {
                          IconComponent = Calendar;
                          iconBg = 'bg-amber-50 text-amber-800';
                        } else if (n.type === 'karma') {
                          IconComponent = Sparkles;
                          iconBg = 'bg-amber-100 text-amber-700';
                        } else if (n.type === 'academic') {
                          IconComponent = GraduationCap;
                          iconBg = 'bg-red-900 text-amber-300';
                        }

                        return (
                          <div
                            key={n.id}
                            onClick={() => {
                              if (n.tab) {
                                setActiveTab(n.tab);
                                setActiveQuestionThread(null);
                              }
                              setNotifications(prev =>
                                prev.map(item => item.id === n.id ? { ...item, unread: false } : item)
                              );
                              setIsNotificationsOpen(false);
                            }}
                            className={`p-2.5 rounded-xl transition-all cursor-pointer flex items-start gap-3 ${
                              n.unread
                                ? 'bg-red-50/40 hover:bg-red-50/70 border border-red-100/60'
                                : 'hover:bg-slate-50 border border-transparent'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center ${iconBg}`}>
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <p className="text-xs font-bold text-slate-900 truncate">{n.title}</p>
                                <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                              </div>
                              <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5 leading-relaxed">{n.message}</p>
                            </div>
                            {n.unread && (
                              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-8 text-center text-slate-400">
                        <Bell className="w-8 h-8 mx-auto mb-2 opacity-30" />
                        <p className="text-xs font-medium">No notifications right now</p>
                      </div>
                    )}
                  </div>

                  {/* Dropdown Footer */}
                  <div className="pt-2.5 mt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('ask');
                        setIsNotificationsOpen(false);
                      }}
                      className="text-[11px] font-bold text-red-900 hover:text-red-950 hover:underline cursor-pointer"
                    >
                      View Discussion Feed →
                    </button>
                    {notifications.length > 0 && (
                      <button
                        type="button"
                        onClick={handleClearNotifications}
                        className="text-[11px] text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Campus Tag (Desktop) */}
            <div className="hidden lg:flex items-center gap-1.5 bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-xl text-xs font-bold text-amber-950">
              <Building className="w-3.5 h-3.5 text-amber-700" />
              <span>Patiala Campus</span>
            </div>
          </div>
        </header>

        {/* Main Tab Render */}
        <main className="p-4 md:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'home' && renderHomeDashboard()}
          {activeTab === 'ask' && renderDoubtForum()}
          {activeTab === 'seniors' && renderSeniorsDirectory()}
          {activeTab === 'mentorship' && renderMentorshipHub()}
          {activeTab === 'messages' && renderMessagesInterface()}
          {activeTab === 'profile' && renderStudentProfile()}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Resources link completely removed) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200/80 py-2 px-2 z-30 flex items-center justify-around shadow-lg">
        {[
          { id: 'home', label: 'Home', icon: Home },
          { id: 'ask', label: 'Doubts', icon: HelpCircle },
          { id: 'seniors', label: 'Seniors', icon: Users },
          { id: 'mentorship', label: 'Mentors', icon: Calendar },
          { id: 'messages', label: 'Chat', icon: MessageSquare },
          { id: 'profile', label: 'Profile', icon: User }
        ].map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setActiveQuestionThread(null);
              }}
              className={`flex flex-col items-center gap-0.5 py-1 px-1.5 rounded-lg transition-colors cursor-pointer ${
                isActive ? 'text-red-900 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-red-900' : 'text-slate-400'}`} />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Modal: Post a Doubt */}
      {isPostDoubtOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-red-100 text-red-900 flex items-center justify-center">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Ask a TIET Senior</h3>
                  <p className="text-xs text-slate-500">Post openly or anonymously to verified branches</p>
                </div>
              </div>
              <button
                onClick={() => setIsPostDoubtOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateDoubt} className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Question Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How to prepare for UCS411 MST under Dr. Inderveer? Any repeat PYQs?"
                  value={newDoubtTitle}
                  onChange={(e) => setNewDoubtTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-600 focus:bg-white focus:ring-2 focus:ring-red-100"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Course Code / Subject
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. UCS411, UES009, UEC404"
                    value={newDoubtSubject}
                    onChange={(e) => setNewDoubtSubject(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-red-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Target Branch
                  </label>
                  <select
                    value={newDoubtBranch}
                    onChange={(e) => setNewDoubtBranch(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-red-600 focus:bg-white"
                  >
                    <option value="ENC">ENC (Electronics & Computer)</option>
                    <option value="COE">COE (Computer Engineering)</option>
                    <option value="CSBS">CSBS (Computer Sci & Business)</option>
                    <option value="ECE">ECE (Electronics & Comm)</option>
                    <option value="Common">Common (1st Year Freshers)</option>
                    <option value="Other">Other Engineering</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Detailed Explanation / Syllabus Context *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Mention your specific doubts, what you have already attempted, professor name, or exam timeline..."
                  value={newDoubtDesc}
                  onChange={(e) => setNewDoubtDesc(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-600 focus:bg-white resize-none"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-amber-50/50 border border-amber-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center">
                    {isAnonymousDoubt ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Post Anonymously</span>
                    <span className="text-[11px] text-slate-500">
                      {isAnonymousDoubt
                        ? 'Your name & roll number will be masked as TIETian_#XXX'
                        : `Post publicly as ${isAuthenticated ? currentUser.name : 'Srishti'} (${isAuthenticated ? currentUser.branch : 'ENC'} '${isAuthenticated ? ((currentUser.batch || '').slice(-2) || '29') : '29'})`}
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isAnonymousDoubt}
                  onChange={(e) => setIsAnonymousDoubt(e.target.checked)}
                  className="w-4 h-4 text-red-900 rounded-md focus:ring-red-800 cursor-pointer"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsPostDoubtOpen(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-red-900 hover:bg-red-950 rounded-xl shadow-md shadow-red-900/25 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-amber-300" />
                  <span>Publish Question</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Book Mentorship */}
      {isMentorshipModalOpen && mentorshipTargetSenior && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
              <div className="flex items-center gap-3">
                <img
                  src={mentorshipTargetSenior.avatar}
                  alt={mentorshipTargetSenior.name}
                  className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Request 1:1 Mentorship</h3>
                  <p className="text-xs text-red-900 font-bold">with {mentorshipTargetSenior.name} ({mentorshipTargetSenior.branch})</p>
                </div>
              </div>
              <button
                onClick={() => setIsMentorshipModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-200/60 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleBookMentorshipSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mentorship Domain / Focus
                </label>
                <select
                  value={mentorshipTopic}
                  onChange={(e) => setMentorshipTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-red-600 focus:bg-white font-medium"
                >
                  <option value="Resume & Portfolio Review">Resume & Portfolio Review (ATS & On-Campus)</option>
                  <option value="DSA & LeetCode Coding Roadmap">DSA & LeetCode Coding Roadmap</option>
                  <option value="MST & EST Academic Survival Strategy">MST & EST Academic Survival Strategy</option>
                  <option value="ENC Core to Software Transition">ENC Core to Software Transition</option>
                  <option value="Non-Tech & Consulting Prep">Non-Tech / Consulting Prep (Case Studies)</option>
                  <option value="TIET Campus Life & Society Guidance">TIET Campus Life & Society Guidance</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Preferred Time Slot & Campus Venue
                </label>
                <select
                  value={mentorshipSlot}
                  onChange={(e) => setMentorshipSlot(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-red-600 focus:bg-white font-medium"
                >
                  <option value="Tomorrow 5:00 PM @ Central Library (TAN Wing)">Tomorrow 5:00 PM @ Central Library (TAN Wing)</option>
                  <option value="Thursday 4:00 PM @ C-Block (Room C-204)">Thursday 4:00 PM @ C-Block (Room C-204)</option>
                  <option value="Friday 6:30 PM @ COS / Cafe Nirvana">Friday 6:30 PM @ COS / Cafe Nirvana</option>
                  <option value="Saturday 4:00 PM via Google Meet">Saturday 4:00 PM via Google Meet (Virtual)</option>
                  <option value="Sunday 11:00 AM via Google Meet">Sunday 11:00 AM via Google Meet (Virtual)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Specific questions you want to discuss
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. I am in 3rd semester ENC, having trouble managing time for UEC404 while practicing DSA on LeetCode..."
                  value={mentorshipNote}
                  onChange={(e) => setMentorshipNote(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-600 focus:bg-white resize-none"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/60 flex items-start gap-2 text-amber-900 text-[11px]">
                <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  TIET Mentorship sessions are strictly peer-to-peer and free of charge. Respect your senior's time and arrive promptly.
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsMentorshipModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-red-900 hover:bg-red-950 rounded-xl shadow-md shadow-red-900/25 transition-all"
                >
                  Confirm Slot Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Physical Campus Venue Details for 1:1 Mentorship */}
      {selectedVenueSession && (() => {
        const venue = getSessionVenue(selectedVenueSession);
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
              {/* Header */}
              <div className="px-6 py-4 bg-gradient-to-r from-red-950 via-red-900 to-rose-950 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300 border border-white/10">
                    <MapPin className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">Mentorship Campus Venue</h3>
                    <p className="text-xs text-amber-200">Physical navigation & meeting guidelines</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedVenueSession(null)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-amber-200 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4 text-slate-800">
                {/* Session Overview Card */}
                <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-red-950 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
                      {selectedVenueSession.status || 'Confirmed'}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {selectedVenueSession.date}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">
                    {selectedVenueSession.topic}
                  </h4>
                  <p className="text-xs text-red-900 font-bold">
                    Mentor: {selectedVenueSession.seniorName} ({selectedVenueSession.seniorRole})
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedVenueSession.time}</span>
                  </div>
                </div>

                {/* Venue Details Grid */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-red-50/60 border border-red-200/70">
                    <Building className="w-5 h-5 text-red-900 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] font-bold text-red-950 uppercase tracking-wider">Campus Location & Hall</p>
                      <p className="text-sm font-bold text-slate-900 mt-0.5">{venue.location}</p>
                      <p className="text-xs font-bold text-red-900 mt-0.5">{venue.room}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Campus Zone</p>
                      <p className="text-xs font-bold text-slate-800 mt-1">{venue.campusZone}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Landmark / Directions</p>
                      <p className="text-xs font-bold text-slate-800 mt-1">{venue.landmark}</p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-amber-50/70 border border-amber-200/60 rounded-xl">
                    <p className="text-[11px] font-bold text-amber-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Preparation & Arrival Instructions</span>
                    </p>
                    <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                      {venue.instructions}
                    </p>
                  </div>
                </div>

                {/* Footer button */}
                <div className="pt-2 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedVenueSession(null)}
                    className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-red-900 hover:bg-red-950 rounded-xl shadow-md shadow-red-900/25 transition-all cursor-pointer text-center"
                  >
                    Got It, See You There!
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Modal: Offer 1:1 Mentorship to Junior */}
      {isOfferSessionModalOpen && targetQuestionForOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-900 to-red-950 text-amber-300 flex items-center justify-center font-black shadow-xs">
                  <Calendar className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm md:text-base">Offer 1:1 Mentorship Session</h3>
                  <p className="text-xs text-red-900 font-bold">To: {targetQuestionForOffer.authorName} ({targetQuestionForOffer.authorRole})</p>
                </div>
              </div>
              <button
                onClick={() => setIsOfferSessionModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitOfferSession} className="p-6 overflow-y-auto space-y-4">
              {/* Question Reference Card */}
              <div className="p-3 bg-red-50/50 border border-red-200/60 rounded-xl">
                <span className="text-[10px] font-bold text-red-950 bg-red-100 px-2 py-0.5 rounded">
                  {targetQuestionForOffer.subject}
                </span>
                <p className="text-xs font-bold text-slate-900 mt-1 line-clamp-2">
                  "{targetQuestionForOffer.title}"
                </p>
              </div>

              {/* Meeting Type Toggle: In-Person vs Virtual */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Meeting Type *
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setOfferMeetingType('In-Person')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      offerMeetingType === 'In-Person'
                        ? 'bg-white text-red-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 text-red-900" />
                    <span>In-Person Campus</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOfferMeetingType('Virtual')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      offerMeetingType === 'Virtual'
                        ? 'bg-white text-red-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5 text-blue-600" />
                    <span>Virtual (Google Meet)</span>
                  </button>
                </div>
              </div>

              {/* Conditional Location / Link Display */}
              {offerMeetingType === 'In-Person' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Physical Campus Venue *
                  </label>
                  <select
                    value={offerVenue}
                    onChange={(e) => setOfferVenue(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-red-600 focus:bg-white font-medium"
                  >
                    <option value="Central Library (Nava Nalanda / TAN Wing - Room 3)">Central Library (Nava Nalanda / TAN Wing - Room 3)</option>
                    <option value="C-Block Academic Complex (Room C-204 Discussion Area)">C-Block Academic Complex (Room C-204)</option>
                    <option value="Cafe Nirvana / COS Pavilion (Table 4)">Cafe Nirvana / COS Pavilion (Table 4)</option>
                    <option value="B-Block Engineering Lounge">B-Block Engineering Lounge</option>
                  </select>
                </div>
              ) : (
                <div className="p-3 bg-blue-50 border border-blue-200/70 rounded-xl text-xs text-blue-900">
                  <div className="flex items-center gap-2 font-bold mb-1">
                    <Video className="w-4 h-4 text-blue-600" />
                    <span>Mock Google Meet Bridge</span>
                  </div>
                  <code className="text-[11px] font-mono bg-white px-2 py-1 rounded border border-blue-200 block text-blue-800">
                    meet.google.com/tiet-mentor-session
                  </code>
                  <p className="text-[11px] text-blue-700 mt-1">
                    Meeting link will be automatically pinned to both your schedule and the junior's profile.
                  </p>
                </div>
              )}

              {/* Proposed Time Slot */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Proposed Date & Time Slot *
                </label>
                <input
                  type="text"
                  required
                  value={offerSlotTime}
                  onChange={(e) => setOfferSlotTime(e.target.value)}
                  placeholder="e.g. Tomorrow 4:30 PM – 5:15 PM"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-red-600 focus:bg-white"
                />
              </div>

              {/* Note to Junior */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Personal Message / Preparation Note
                </label>
                <textarea
                  rows="2"
                  value={offerNote}
                  onChange={(e) => setOfferNote(e.target.value)}
                  placeholder="e.g. Bring your laptop and your written doubts on AVL deletions."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-red-600 focus:bg-white resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsOfferSessionModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-red-900 hover:bg-red-950 rounded-xl shadow-md shadow-red-900/25 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-amber-300" />
                  <span>Send 1:1 Offer & Schedule</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Post Open Claimable 1:1 Slot (For Seniors) */}
      {isPostSlotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-900 to-red-950 text-amber-300 flex items-center justify-center font-black shadow-xs">
                  <Plus className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm md:text-base">Post Open 1:1 Mentorship Slot</h3>
                  <p className="text-xs text-slate-500">Juniors can browse and claim this 1-on-1 session</p>
                </div>
              </div>
              <button
                onClick={() => setIsPostSlotModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitPostSlot} className="p-6 overflow-y-auto space-y-4">
              {/* Course Tagging */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Course Code Tag *
                </label>
                <select
                  value={newSlotCourseCode}
                  onChange={(e) => setNewSlotCourseCode(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-red-600 focus:bg-white font-medium"
                >
                  <option value="UCS411">UCS411 (Data Structures & Algorithms)</option>
                  <option value="UES009">UES009 (Mechanics - 1st Year Common)</option>
                  <option value="UEC404">UEC404 (Digital Electronic Circuits)</option>
                  <option value="UCS310">UCS310 (Database Management Systems)</option>
                  <option value="UCS505">UCS505 (Computer Networks)</option>
                  <option value="UES012">UES012 (Engineering Materials)</option>
                  <option value="GENERAL">General Mentorship / Roadmap & Placements</option>
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  Tagging allows juniors to filter open slots by the exact course they need help with.
                </p>
              </div>

              {/* Topic */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mentorship Topic / Focus Area *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Inderveer MST PYQs & AVL Rotations"
                  value={newSlotTopic}
                  onChange={(e) => setNewSlotTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-600 focus:bg-white"
                />
              </div>

              {/* Meeting Type Toggle */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Meeting Type *
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setNewSlotMeetingType('In-Person')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      newSlotMeetingType === 'In-Person'
                        ? 'bg-white text-red-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 text-red-900" />
                    <span>In-Person Campus</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewSlotMeetingType('Virtual')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      newSlotMeetingType === 'Virtual'
                        ? 'bg-white text-red-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5 text-blue-600" />
                    <span>Virtual (Google Meet)</span>
                  </button>
                </div>
              </div>

              {/* In-Person vs Virtual details */}
              {newSlotMeetingType === 'In-Person' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Physical Campus Venue *
                  </label>
                  <select
                    value={newSlotVenue}
                    onChange={(e) => setNewSlotVenue(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-red-600 focus:bg-white font-medium"
                  >
                    <option value="Central Library (Nava Nalanda / TAN Wing - Room 2)">Central Library (Nava Nalanda / TAN Wing - Room 2)</option>
                    <option value="C-Block Academic Complex (Room C-204)">C-Block Academic Complex (Room C-204)</option>
                    <option value="Cafe Nirvana / COS Pavilion (Table 4)">Cafe Nirvana / COS Pavilion (Table 4)</option>
                    <option value="B-Block Discussion Lounge">B-Block Discussion Lounge</option>
                  </select>
                </div>
              ) : (
                <div className="p-3 bg-blue-50 border border-blue-200/70 rounded-xl text-xs text-blue-900">
                  <div className="flex items-center gap-2 font-bold mb-1">
                    <Video className="w-4 h-4 text-blue-600" />
                    <span>Mock Google Meet Link</span>
                  </div>
                  <code className="text-[11px] font-mono bg-white px-2 py-1 rounded border border-blue-200 block text-blue-800">
                    meet.google.com/tiet-{newSlotCourseCode.toLowerCase()}-live
                  </code>
                  <p className="text-[11px] text-blue-700 mt-1">
                    Google Meet link will be provided to the junior the instant they claim this slot.
                  </p>
                </div>
              )}

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="text"
                    required
                    value={newSlotDate}
                    onChange={(e) => setNewSlotDate(e.target.value)}
                    placeholder="e.g. Friday, Nov 15"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-red-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Time Window *
                  </label>
                  <input
                    type="text"
                    required
                    value={newSlotTime}
                    onChange={(e) => setNewSlotTime(e.target.value)}
                    placeholder="e.g. 4:30 PM – 5:15 PM"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-red-600 focus:bg-white"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsPostSlotModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-red-900 hover:bg-red-950 rounded-xl shadow-md shadow-red-900/25 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-amber-300" />
                  <span>Publish 1:1 Slot</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Create Junior Help Request */}
      {isCreateHelpRequestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-900 to-red-950 text-amber-300 flex items-center justify-center font-black shadow-xs">
                  <HelpCircle className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm md:text-base">Request 1:1 Senior Help</h3>
                  <p className="text-xs text-slate-500">Post directly to the Senior Help Requests Board</p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateHelpRequestModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitJuniorHelpRequest} className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Course Code / Subject *
                </label>
                <select
                  value={newHelpSubject}
                  onChange={(e) => setNewHelpSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-red-600 focus:bg-white font-medium"
                >
                  <option value="UCS411">UCS411 (Data Structures & Algorithms)</option>
                  <option value="UES009">UES009 (Mechanics - 1st Year)</option>
                  <option value="UEC404">UEC404 (Digital Electronics)</option>
                  <option value="UCS310">UCS310 (DBMS)</option>
                  <option value="UCS505">UCS505 (Computer Networks)</option>
                  <option value="GENERAL">General Academic / Interview Guidance</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Summary of Help Needed *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Need help with AVL deletion & Inderveer repeat MST PYQs"
                  value={newHelpTitle}
                  onChange={(e) => setNewHelpTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Details & Specific Questions *
                </label>
                <textarea
                  rows="3"
                  required
                  placeholder="Describe where you are stuck, syllabus topics, or lab viva questions..."
                  value={newHelpDesc}
                  onChange={(e) => setNewHelpDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-600 focus:bg-white resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Preferred Mode
                  </label>
                  <select
                    value={newHelpMode}
                    onChange={(e) => setNewHelpMode(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-red-600 font-medium"
                  >
                    <option value="In-Person (Central Library TAN Wing)">In-Person (Central Library)</option>
                    <option value="In-Person (C-Block)">In-Person (C-Block)</option>
                    <option value="Virtual (Google Meet)">Virtual (Google Meet)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Urgency
                  </label>
                  <select
                    value={newHelpUrgency}
                    onChange={(e) => setNewHelpUrgency(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-red-600 font-medium"
                  >
                    <option value="High (MSTs in 2-3 Days)">High (MSTs in 2-3 Days)</option>
                    <option value="Medium (This Week)">Medium (This Week)</option>
                    <option value="Normal">Normal</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateHelpRequestModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-red-900 hover:bg-red-950 rounded-xl shadow-md shadow-red-900/25 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-300" />
                  <span>Submit Request to Board</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );

  // ==========================================
  // RENDER: HOME DASHBOARD
  // ==========================================
  function renderHomeDashboard() {
    return (
      <div className="space-y-8 animate-in fade-in duration-300">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-950 via-red-900 to-rose-950 text-white p-6 md:p-8 shadow-xl shadow-red-950/15 border border-red-800/40">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Thapar Institute Academic & Mentorship Network</span>
            </div>
            
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Connect with TIET Seniors. <br className="hidden sm:inline" />
              <span className="text-amber-300">Ask Doubts. Conquer ESTs.</span>
            </h1>

            <p className="text-slate-300 text-xs md:text-sm mt-3 leading-relaxed">
              {isAuthenticated ? (
                <>
                  Welcome back, <strong className="text-white">{currentUser.name}</strong>! You are viewing updates tailored for <span className="text-amber-200 font-semibold">{currentUser.year} • {currentUser.branch}</span>. Ask academic doubts, book 1:1 senior mentorships, or connect with verified seniors across TIET.
                </>
              ) : (
                <>
                  Welcome to <strong className="text-white">SeniorSphere</strong>! You are viewing the Thapar Institute academic & mentorship hub. Sign in to view mentors tailored for your academic year.
                </>
              )}
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-6">
              <button
                onClick={() => setIsPostDoubtOpen(true)}
                className="bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs md:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-red-900" />
                <span>Ask a Doubt Anonymously</span>
              </button>

              <button
                onClick={() => setActiveTab('seniors')}
                className="bg-red-950/70 hover:bg-red-950 text-amber-200 border border-amber-400/30 font-semibold text-xs md:text-sm px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Users className="w-4 h-4 text-amber-300" />
                <span>Browse Verified Seniors</span>
              </button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-red-800/40 grid grid-cols-3 gap-4 text-center">
            <div className="bg-slate-900/40 backdrop-blur-xs p-3 rounded-2xl border border-red-800/30">
              <p className="text-xl md:text-2xl font-black text-white">1,480+</p>
              <p className="text-[11px] text-amber-200 font-medium mt-0.5">Verified Seniors</p>
            </div>
            <div className="bg-slate-900/40 backdrop-blur-xs p-3 rounded-2xl border border-red-800/30">
              <p className="text-xl md:text-2xl font-black text-amber-300">98.2%</p>
              <p className="text-[11px] text-amber-200 font-medium mt-0.5">Doubt Resolution</p>
            </div>
            <div className="bg-slate-900/40 backdrop-blur-xs p-3 rounded-2xl border border-red-800/30">
              <p className="text-xl md:text-2xl font-black text-white">320+</p>
              <p className="text-[11px] text-amber-200 font-medium mt-0.5">1:1 Mentorships</p>
            </div>
          </div>
        </div>

        {/* Quick Filter Tag Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-slate-500 whitespace-nowrap flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-red-900" /> Popular Tags:
          </span>
          {[
            '#UCS411_DSA',
            '#ENC_Signals',
            '#MST1_Prep',
            '#UES009_Mechanics',
            '#Microsoft_Drive',
            '#TIET_Placements',
            '#Nava_Nalanda_Library'
          ].map(tag => (
            <button
              key={tag}
              onClick={() => {
                setSearchQuery(tag.replace('#', ''));
                setActiveTab('ask');
              }}
              className="text-xs font-semibold text-slate-600 bg-white hover:bg-red-50 hover:text-red-900 border border-slate-200 px-3 py-1.5 rounded-full transition-colors whitespace-nowrap cursor-pointer shadow-2xs"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Dashboard 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-red-900" />
                <h2 className="text-lg font-bold text-slate-900">
                  {searchQuery ? `Discussions Matching "${searchQuery}"` : 'Trending TIET Discussions'}
                </h2>
              </div>
              <button
                onClick={() => setActiveTab('ask')}
                className="text-xs font-bold text-red-900 hover:text-red-950 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View All ({filteredQuestions.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {searchQuery && (
              <div className="text-xs text-amber-950 bg-amber-50/80 border border-amber-200 p-3 rounded-2xl flex flex-wrap items-center justify-between gap-2 animate-in fade-in">
                <span>
                  Search Results: <strong>{filteredQuestions.length}</strong> doubt discussions and <strong>{filteredSeniors.length}</strong> seniors matching "{searchQuery}"
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveTab('seniors')}
                    className="text-xs font-bold text-red-900 hover:underline cursor-pointer"
                  >
                    View Seniors ({filteredSeniors.length}) →
                  </button>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    Clear search
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {filteredQuestions.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
                  <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-800">No discussions matching "{searchQuery}"</p>
                  <p className="text-xs text-slate-500 mt-1">Try another keyword or course code (e.g., UCS411, UEC404)</p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-3 text-xs font-bold text-red-900 hover:underline cursor-pointer"
                  >
                    Reset Search
                  </button>
                </div>
              ) : (
                filteredQuestions.slice(0, searchQuery ? 6 : 3).map(q => renderQuestionCard(q))
              )}
            </div>

            <div className="pt-4">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h2 className="text-lg font-bold text-slate-900">Recently Verified Solutions by Seniors</h2>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
                {questions.filter(q => q.hasAcceptedAnswer).slice(0, 2).map(q => {
                  const acceptedAns = q.answers.find(a => a.isAccepted) || q.answers[0];
                  return (
                    <div key={q.id} className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/60 hover:border-red-200 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-red-950 bg-red-100/80 border border-red-200/50 px-2.5 py-0.5 rounded-md">
                          {q.subject}
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Senior Endorsed
                        </span>
                      </div>
                      
                      <h4
                        onClick={() => {
                          setActiveQuestionThread(q);
                          setActiveTab('ask');
                        }}
                        className="text-sm font-bold text-slate-900 hover:text-red-900 cursor-pointer line-clamp-1 mb-2"
                      >
                        {q.title}
                      </h4>

                      {acceptedAns && (
                        <div className="pl-3 border-l-2 border-amber-400 text-xs text-slate-600 leading-relaxed italic line-clamp-2">
                          "{acceptedAns.content}"
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-200/60 text-[11px] text-slate-500">
                        <span className="font-semibold text-slate-700">Solved by {acceptedAns?.authorName}</span>
                        <span>{acceptedAns?.timestamp}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Top Mentors Widget */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-red-900" />
                  <h3 className="font-bold text-slate-900 text-sm">Top Mentors This Week</h3>
                </div>
                <button
                  onClick={() => setActiveTab('seniors')}
                  className="text-xs font-semibold text-red-900 hover:underline cursor-pointer"
                >
                  Browse all
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50/80 border border-dashed border-slate-200 text-center space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto border border-amber-200/60">
                  <Award className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">No Mentors Featured This Week</p>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Weekly mentor spotlights are curated every Monday based on junior ratings and resolved doubts. Connect directly with verified seniors from the directory.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('seniors')}
                  className="w-full py-2 bg-red-900 hover:bg-red-950 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  Browse Senior Directory
                </button>
              </div>
            </div>

            {/* Campus Tip Card */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 text-amber-900 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-amber-950">
                <AlertCircle className="w-4 h-4 text-amber-700" />
                <span>TIET Campus Tip:</span>
              </div>
              <p className="text-[11px] leading-relaxed text-amber-900">
                Facing difficulty in hostel room Wi-Fi near Hostel J/M? Use the Central Library Nava Nalanda reading pods — open till 11:30 PM with high-speed LAN access.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: QUESTION CARD (REUSABLE)
  // ==========================================
  function renderQuestionCard(q) {
    const isExpanded = activeQuestionThread?.id === q.id;

    return (
      <div
        key={q.id}
        className="bg-white rounded-2xl border border-slate-200/80 hover:border-red-300 p-5 shadow-xs transition-all duration-200"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[11px] font-bold text-red-950 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-lg">
                {q.subject}
              </span>
              <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-lg">
                {q.branch}
              </span>
              {q.hasAcceptedAnswer && (
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-lg flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Accepted Solution
                </span>
              )}
              {q.isAnonymous && (
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-lg flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" /> Anonymous
                </span>
              )}
            </div>

            <h3
              onClick={() => setActiveQuestionThread(isExpanded ? null : q)}
              className="text-sm md:text-base font-bold text-slate-900 hover:text-red-900 cursor-pointer leading-snug transition-colors"
            >
              {q.title}
            </h3>

            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-2">
              {q.description}
            </p>

            <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
              <span className="font-semibold text-slate-700">{q.authorName}</span>
              <span>•</span>
              <span>{q.authorRole}</span>
              <span>•</span>
              <span>{q.timestamp}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleToggleUpvoteQuestion(q.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                q.userUpvoted
                  ? 'bg-red-900 text-amber-300 shadow-xs'
                  : 'bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-900'
              }`}
            >
              <ThumbsUp className={`w-3.5 h-3.5 ${q.userUpvoted ? 'fill-amber-300' : ''}`} />
              <span>{q.upvotes}</span>
            </button>

            <button
              onClick={() => setActiveQuestionThread(isExpanded ? null : q)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-slate-500" />
              <span>{q.answers.length} Answers</span>
            </button>

            {/* Offer 1:1 Session Button (Requirement 1) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleOpenOfferSessionModal(q);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-50 hover:bg-amber-100 text-red-950 border border-amber-200 transition-all cursor-pointer shadow-2xs group"
              title="Offer a dedicated 1:1 Mentorship Session to this student"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-700 group-hover:scale-110 transition-transform" />
              <span>Offer 1:1 Session</span>
            </button>
          </div>

          <button
            onClick={() => setActiveQuestionThread(isExpanded ? null : q)}
            className="text-xs font-bold text-red-900 hover:text-red-950 flex items-center gap-1 cursor-pointer"
          >
            <span>{isExpanded ? 'Hide Thread' : 'Open Thread'}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {isExpanded && (
          <div className="mt-5 pt-4 border-t border-slate-200/80 space-y-4 animate-in fade-in duration-200">
            {/* Senior Mentorship Callout Banner */}
            <div className="p-3 bg-gradient-to-r from-red-50 to-amber-50/60 border border-red-200/60 rounded-xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-red-900 shrink-0" />
                <p className="text-xs text-slate-800">
                  <span className="font-bold text-red-950">Senior Mentorship:</span> Proactively help <strong>{q.authorName}</strong> by offering a 1-on-1 walkthrough.
                </p>
              </div>
              <button
                onClick={() => handleOpenOfferSessionModal(q)}
                className="px-3 py-1.5 text-xs font-bold text-white bg-red-900 hover:bg-red-950 rounded-lg shadow-xs cursor-pointer shrink-0"
              >
                Offer 1:1 Session
              </button>
            </div>

            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Discussion & Solutions ({q.answers.length})
            </h4>

            {q.answers.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-50 text-center text-xs text-slate-500">
                No solutions yet. Be the first senior or classmate to help!
              </div>
            ) : (
              <div className="space-y-3">
                {q.answers.map(ans => (
                  <div
                    key={ans.id}
                    className={`p-4 rounded-xl border text-xs leading-relaxed transition-all ${
                      ans.isAccepted
                        ? 'bg-amber-50/40 border-amber-200 shadow-2xs'
                        : 'bg-slate-50/70 border-slate-200/70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={ans.authorAvatar}
                          alt={ans.authorName}
                          className="w-6 h-6 rounded-full object-cover border border-slate-200"
                        />
                        <span className="font-bold text-slate-900">{ans.authorName}</span>
                        <span className="text-[11px] text-slate-500">({ans.authorRole})</span>
                      </div>
                      {ans.isAccepted && (
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified Solution
                        </span>
                      )}
                    </div>

                    <p className="text-slate-700 whitespace-pre-line mt-1">
                      {ans.content}
                    </p>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60 text-[11px] text-slate-500">
                      <span>{ans.timestamp}</span>
                      <span className="font-bold text-amber-800">👍 {ans.upvotes} seniors agreed</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handlePostAnswer} className="mt-3 pt-2">
              <div className="flex items-start gap-2">
                <textarea
                  rows={2}
                  value={answerInputText}
                  onChange={(e) => setAnswerInputText(e.target.value)}
                  placeholder="Know the solution? Write an answer with exam tips, code breakdown or book references..."
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-600 focus:bg-white resize-none"
                />
                <button
                  type="submit"
                  disabled={!answerInputText.trim()}
                  className="px-4 py-2 bg-red-900 hover:bg-red-950 disabled:bg-slate-300 text-white font-bold text-xs rounded-xl shadow-xs shrink-0 cursor-pointer transition-all self-end"
                >
                  Post Answer
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // RENDER: DOUBT FORUM VIEW
  // ==========================================
  function renderDoubtForum() {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">TIET Doubt Discussion Forum</h1>
            <p className="text-xs md:text-sm text-slate-500 mt-0.5">
              Crowdsource answers from seniors across COE, ENC, CSBS, and ECE
            </p>
          </div>

          <button
            onClick={() => setIsPostDoubtOpen(true)}
            className="self-start sm:self-auto bg-red-900 hover:bg-red-950 text-white font-bold text-xs md:text-sm px-4 py-2.5 rounded-xl shadow-md shadow-red-900/25 flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>Post a Question</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {['All', 'Academics', 'Placements', 'Campus Life'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedForumCategory(cat)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
                  selectedForumCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-500">Sort by:</span>
            {['Latest', 'Trending', 'Unanswered'].map(s => (
              <button
                key={s}
                onClick={() => setForumSort(s)}
                className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-colors ${
                  forumSort === s
                    ? 'bg-red-50 text-red-900 border border-red-200 font-bold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {searchQuery && (
          <div className="text-xs text-slate-600 flex items-center justify-between bg-amber-50/70 border border-amber-200 px-4 py-2.5 rounded-xl">
            <span>Showing questions matching query: <strong>"{searchQuery}"</strong></span>
            <button onClick={() => setSearchQuery('')} className="text-red-900 font-bold hover:underline cursor-pointer">
              Clear filter
            </button>
          </div>
        )}

        <div className="space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No questions found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                No discussions match your filter. Be the first to ask a doubt or query about your TIET courses!
              </p>
              <button
                onClick={() => setIsPostDoubtOpen(true)}
                className="mt-4 px-4 py-2 bg-red-900 hover:bg-red-950 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Ask This Doubt
              </button>
            </div>
          ) : (
            filteredQuestions.map(q => renderQuestionCard(q))
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: FIND SENIORS DIRECTORY
  // ==========================================
  function renderSeniorsDirectory() {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Find Your Senior Directory</h1>
            <p className="text-xs md:text-sm text-slate-500 mt-0.5">
              Connect with high-achieving TIET seniors placed at top tech & consulting companies
            </p>
          </div>
          <div className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl self-start sm:self-auto">
            <span>Showing {filteredSeniors.length} Verified Seniors</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Branch Filter
              </label>
              <select
                value={seniorBranchFilter}
                onChange={(e) => setSeniorBranchFilter(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-red-600"
              >
                <option value="All">All Branches</option>
                <option value="COPC">COPC (Computer Science Engineering(Patiala Campus))</option>
                <option value="ENC">ENC (Electronics & Computer)</option>
                <option value="COE">COE (Computer Engineering)</option>
                <option value="CSBS">CSBS (CS & Business Systems)</option>
                <option value="ECE">ECE (Electronics & Comm)</option>
                <option value="EEC">EEC (Electrical & Computer)</option>
                <option value="MEE">MEE (Mechanical Engineering)</option>
                <option value="CIE">CIE (Civil Engineering)</option>
                <option value="CHE">CHE (Chemical Engineering)</option>
                <option value="DSAI">DSAI (Data Science and Artificial Intelligence)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Domain / Expertise
              </label>
              <select
                value={seniorDomainFilter}
                onChange={(e) => setSeniorDomainFilter(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-red-600"
              >
                <option value="All">All Domains</option>
                <option value="DSA">DSA & Competitive Programming</option>
                <option value="System Design">System Design & Web Dev</option>
                <option value="Embedded">Embedded Systems & Hardware</option>
                <option value="Product">Product Management & Consulting</option>
                <option value="GSoC">GSoC & Open Source</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSeniorBranchFilter('All');
                  setSeniorDomainFilter('All');
                  setSearchQuery('');
                }}
                className="w-full py-2 px-3 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {searchQuery && (
          <div className="text-xs text-slate-600 flex items-center justify-between bg-amber-50/70 border border-amber-200 px-4 py-2.5 rounded-xl animate-in fade-in">
            <span>Showing verified seniors matching: <strong>"{searchQuery}"</strong> ({filteredSeniors.length} results)</span>
            <button onClick={() => setSearchQuery('')} className="text-red-900 font-bold hover:underline cursor-pointer">
              Clear search
            </button>
          </div>
        )}

        {filteredSeniors.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No seniors found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              No senior profiles match "{searchQuery}". Try searching by another course code, tech stack, or branch.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSeniorBranchFilter('All');
                setSeniorDomainFilter('All');
              }}
              className="mt-4 px-4 py-2 bg-red-900 hover:bg-red-950 text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Reset Filters & Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSeniors.map(senior => (
              <div
                key={senior.id}
                className="bg-white rounded-2xl border border-slate-200/80 hover:border-red-300 hover:shadow-md transition-all p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-3.5">
                    <div className="relative">
                      <img
                        src={senior.avatar}
                        alt={senior.name}
                        className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-2xs"
                      />
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <h3 className="font-extrabold text-slate-900 text-sm truncate">{senior.name}</h3>
                        {senior.verified && <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />}
                      </div>
                      <p className="text-xs font-semibold text-slate-600">
                        {senior.year} • {senior.branch}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-bold text-red-950 bg-red-50 px-2 py-0.5 rounded-md border border-red-200">
                          CGPA {senior.cgpa}
                        </span>
                      </div>
                    </div>
                  </div>

                <div className="mt-3.5 p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-red-900 shrink-0" />
                  <span className="text-xs font-bold text-slate-800 truncate">
                    {senior.achievement}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed line-clamp-3">
                  {senior.bio}
                </p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {senior.expertise.map((exp, idx) => (
                    <span key={idx} className="text-[10px] font-semibold text-red-950 bg-red-50/80 border border-red-100 px-2 py-0.5 rounded-md">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" /> {senior.rating} ({senior.reviewsCount} reviews)
                  </span>
                  <span className="text-amber-800 font-bold">{senior.slotsAvailable} slots this week</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleToggleConnectSenior(senior.id)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      senior.connected
                        ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        : 'bg-white border border-slate-200 text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <Check className={`w-3.5 h-3.5 ${senior.connected ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span>{senior.connected ? 'Connected' : 'Connect'}</span>
                  </button>

                  <button
                    onClick={() => handleOpenDirectChatWithSenior(senior)}
                    className="py-2 px-3 rounded-xl text-xs font-bold bg-slate-100 hover:bg-red-50 text-slate-800 hover:text-red-900 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-red-900" />
                    <span>Message</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    setMentorshipTargetSenior(senior);
                    setIsMentorshipModalOpen(true);
                  }}
                  className="w-full py-2 bg-red-900 hover:bg-red-950 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-amber-300" />
                  <span>Request 1:1 Mentorship</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    );
  }

  // ==========================================
  // RENDER: MENTORSHIP HUB
  // (Proactive 1:1 Mentorship, Claimable Slots, Junior Help Board)
  // ==========================================
  function renderMentorshipHub() {
    const availableSlotsCount = openSlots.filter(s => s.status === 'Available').length;
    const openRequestsCount = juniorHelpRequests.filter(r => r.status === 'Open').length;

    return (
      <div className="space-y-8 animate-in fade-in duration-300">
        {/* Hero Header Banner */}
        <div className="bg-gradient-to-r from-red-950 via-red-900 to-rose-950 text-white rounded-3xl p-6 md:p-8 shadow-lg border border-red-800/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-bold bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-400/40">
                TIET Peer Mentorship Guild
              </span>
              <h1 className="text-2xl md:text-3xl font-black mt-2 tracking-tight">
                One-on-One Senior Guidance
              </h1>
              <p className="text-slate-300 text-xs md:text-sm mt-2 leading-relaxed">
                Book dedicated 30 to 45 minute mentorship sessions with placed 3rd and 4th-year seniors. Sessions happen in-person at Central Library (Nava Nalanda Discussion Rooms), C-Block, or via Google Meet.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              {isSenior ? (
                <button
                  onClick={() => setIsPostSlotModalOpen(true)}
                  className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-red-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Post Open 1:1 Slot</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setIsCreateHelpRequestModalOpen(true)}
                    className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-red-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <HelpCircle className="w-4 h-4 stroke-[2.5]" />
                    <span>Request 1:1 Help</span>
                  </button>
                  <button
                    onClick={() => {
                      handleSwitchAcademicYear('3rd Year');
                      showToast('Switched to Senior Mentor mode (Kavya Singla - 3rd Year ECE)!');
                    }}
                    className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Simulate as a 3rd Year Senior to test posting slots and accepting requests"
                  >
                    <Users className="w-3.5 h-3.5 text-amber-300" />
                    <span>Switch to Senior View</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mentorship Hub Sub-Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setMentorshipHubTab('claimable')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                mentorshipHubTab === 'claimable'
                  ? 'bg-red-900 text-white shadow-sm shadow-red-900/25'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Claimable 1:1 Slots</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                mentorshipHubTab === 'claimable' ? 'bg-amber-400 text-red-950' : 'bg-slate-200 text-slate-700'
              }`}>
                {availableSlotsCount}
              </span>
            </button>

            <button
              onClick={() => setMentorshipHubTab('junior_board')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                mentorshipHubTab === 'junior_board'
                  ? 'bg-red-900 text-white shadow-sm shadow-red-900/25'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Junior Help Requests Board</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                mentorshipHubTab === 'junior_board' ? 'bg-amber-400 text-red-950' : 'bg-amber-100 text-amber-900'
              }`}>
                {openRequestsCount} Open
              </span>
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                Seniors
              </span>
            </button>

            <button
              onClick={() => setMentorshipHubTab('my_sessions')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                mentorshipHubTab === 'my_sessions'
                  ? 'bg-red-900 text-white shadow-sm shadow-red-900/25'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>My Scheduled Sessions</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                mentorshipHubTab === 'my_sessions' ? 'bg-amber-400 text-red-950' : 'bg-slate-200 text-slate-700'
              }`}>
                {filteredMentorships.length}
              </span>
            </button>
          </div>

          {/* Senior / Junior Role Indicator Pill */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Logged in as:</span>
            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
              isSenior
                ? 'bg-amber-50 text-amber-950 border-amber-200'
                : 'bg-slate-100 text-slate-800 border-slate-200'
            }`}>
              {currentUser.name} ({currentUser.year} • {currentUser.branch}) · {isSenior ? 'Senior Mentor 🎓' : 'Junior Student 🎒'}
            </span>
          </div>
        </div>

        {/* ==================================================== */}
        {/* SUB-TAB 1: CLAIMABLE 1:1 SLOTS (Strict 1-on-1 Limit) */}
        {/* ==================================================== */}
        {mentorshipHubTab === 'claimable' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
              {/* Course Tagging Filter Chips (Requirement 4) */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" />
                  Filter Course:
                </span>
                {['All', 'UCS411', 'UES009', 'UEC404', 'UCS310'].map(code => (
                  <button
                    key={code}
                    onClick={() => setSlotCourseFilter(code)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      slotCourseFilter === code
                        ? 'bg-red-900 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {code}
                  </button>
                ))}
              </div>

              {/* Strict 1-on-1 Limit Toggle */}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={hideClaimedSlots}
                    onChange={(e) => setHideClaimedSlots(e.target.checked)}
                    className="w-4 h-4 text-red-900 rounded focus:ring-red-800 cursor-pointer"
                  />
                  <span>Hide Claimed Slots (1-on-1 Limit)</span>
                </label>

                {isSenior && (
                  <button
                    onClick={() => setIsPostSlotModalOpen(true)}
                    className="text-xs font-bold text-red-900 hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Post Slot</span>
                  </button>
                )}
              </div>
            </div>

            {filteredOpenSlots.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No open 1:1 slots found</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  {slotCourseFilter !== 'All'
                    ? `No available slots currently tagged for course "${slotCourseFilter}".`
                    : 'All open mentorship slots have been claimed.'}
                </p>
                <div className="mt-4 flex items-center justify-center gap-3">
                  {slotCourseFilter !== 'All' && (
                    <button
                      onClick={() => setSlotCourseFilter('All')}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Reset Course Filter
                    </button>
                  )}
                  {isSenior ? (
                    <button
                      onClick={() => setIsPostSlotModalOpen(true)}
                      className="px-4 py-2 bg-red-900 hover:bg-red-950 text-white text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Post a 1:1 Slot Now
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsCreateHelpRequestModalOpen(true)}
                      className="px-4 py-2 bg-red-900 hover:bg-red-950 text-white text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Post Help Request to Seniors
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                {filteredOpenSlots.map(slot => (
                  <div
                    key={slot.id}
                    className={`bg-white rounded-2xl border p-5 shadow-xs flex flex-col justify-between transition-all ${
                      slot.status === 'Claimed'
                        ? 'border-slate-200 bg-slate-50/50 opacity-75'
                        : 'border-slate-200/90 hover:border-red-300 hover:shadow-md'
                    }`}
                  >
                    <div>
                      {/* Senior Profile & Tags */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={slot.seniorAvatar}
                            alt={slot.seniorName}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-2xs"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h3 className="font-extrabold text-slate-900 text-sm">{slot.seniorName}</h3>
                              <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                            </div>
                            <p className="text-xs font-medium text-slate-600">{slot.seniorRole}</p>
                          </div>
                        </div>

                        {/* Course Code Tag (Requirement 4) */}
                        <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-red-50 text-red-950 border border-red-200 shrink-0">
                          {slot.courseCode}
                        </span>
                      </div>

                      {/* Topic & Focus */}
                      <div className="mt-3.5">
                        <h4 className="text-sm font-bold text-slate-900">{slot.topic}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{slot.courseName}</p>
                      </div>

                      {/* Meeting Type & Venue Details (Requirement 3) */}
                      <div className="mt-3.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 font-bold text-slate-800">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{slot.date} · {slot.time}</span>
                          </span>

                          {/* Meeting Type Toggle Badge (Virtual vs In-Person) */}
                          {slot.meetingType === 'Virtual' ? (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                              <Video className="w-3 h-3 text-blue-600" />
                              <span>Virtual (Meet)</span>
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-amber-700" />
                              <span>In-Person</span>
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 text-slate-600 text-[11px] pt-0.5">
                          {slot.meetingType === 'Virtual' ? (
                            <>
                              <ExternalLink className="w-3 h-3 text-blue-500" />
                              <span className="truncate">Google Meet video room generated automatically</span>
                            </>
                          ) : (
                            <>
                              <MapPin className="w-3 h-3 text-red-900" />
                              <span className="truncate">{slot.venue?.location} ({slot.venue?.room})</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Strict 1-on-1 Limit Action Button */}
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      {slot.status === 'Available' ? (
                        <button
                          onClick={() => handleClaimSlot(slot)}
                          className="w-full py-2.5 bg-red-900 hover:bg-red-950 text-white rounded-xl text-xs font-bold shadow-md shadow-red-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                        >
                          <Calendar className="w-3.5 h-3.5 text-amber-300" />
                          <span>Claim 1:1 Slot (Instant Lock)</span>
                        </button>
                      ) : (
                        <div className="w-full py-2.5 bg-slate-100 rounded-xl text-xs font-bold text-slate-500 border border-slate-200 flex items-center justify-center gap-1.5 cursor-not-allowed">
                          <Lock className="w-3.5 h-3.5 text-slate-400" />
                          <span>Locked · Claimed by {slot.claimedBy?.name || 'Student'}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* SUB-TAB 2: JUNIOR HELP REQUESTS BOARD (Requirement 5) */}
        {/* ==================================================== */}
        {mentorshipHubTab === 'junior_board' && (
          <div className="space-y-6">
            {/* Senior Access Notice / Toggle */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-red-50/60 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-red-950 flex items-center justify-center font-black shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5 text-red-950" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    {isSenior ? 'Senior Mentor Guild Board' : 'Junior Academic Assistance Board'}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {isSenior
                      ? 'Review doubts and requests from 1st & 2nd-year juniors. Accept requests to schedule a 1:1 session.'
                      : 'You are viewing as a Junior. Submit your academic doubt or simulate as a Senior to accept requests.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {!isSenior ? (
                  <>
                    <button
                      onClick={() => setIsCreateHelpRequestModalOpen(true)}
                      className="px-3.5 py-2 bg-red-900 hover:bg-red-950 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5 text-amber-300" />
                      <span>Request 1:1 Help</span>
                    </button>
                    <button
                      onClick={() => {
                        handleSwitchAcademicYear('3rd Year');
                        showToast('Logged in as Kavya Singla (3rd Year Senior Mentor)!');
                      }}
                      className="px-3.5 py-2 bg-white hover:bg-amber-50 text-red-950 border border-amber-300 font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Switch to Senior Mode
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsPostSlotModalOpen(true)}
                    className="px-3.5 py-2 bg-red-900 hover:bg-red-950 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-300" />
                    <span>Post Open Slot</span>
                  </button>
                )}
              </div>
            </div>

            {/* Requests List */}
            <div className="space-y-4">
              {juniorHelpRequests.map(req => (
                <div
                  key={req.id}
                  className={`bg-white rounded-2xl border p-5 shadow-xs transition-all ${
                    req.status === 'Claimed'
                      ? 'border-emerald-200 bg-emerald-50/20'
                      : 'border-slate-200/90 hover:border-amber-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Course Code Tag */}
                        <span className="px-2.5 py-0.5 rounded-lg text-xs font-black bg-red-50 text-red-950 border border-red-200">
                          {req.subject}
                        </span>

                        {/* Instant Status Tag (Requirement 5) */}
                        {req.status === 'Open' ? (
                          <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1 animate-pulse">
                            <Clock className="w-3 h-3 text-amber-700" />
                            <span>Open Request</span>
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Claimed</span>
                          </span>
                        )}

                        <span className="text-[11px] font-semibold text-red-900 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                          {req.urgency}
                        </span>
                      </div>

                      <h3 className="text-sm md:text-base font-bold text-slate-900 mt-1">
                        {req.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {req.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] text-slate-500">
                        <span className="font-bold text-slate-800">Junior: {req.juniorName} ({req.juniorYear} • {req.juniorBranch})</span>
                        <span>•</span>
                        <span>Preferred: {req.preferredMode}</span>
                        <span>•</span>
                        <span>{req.timestamp}</span>
                      </div>
                    </div>

                    {/* Action Button: Senior Accept Request */}
                    <div className="sm:text-right shrink-0 pt-2 sm:pt-0">
                      {req.status === 'Open' ? (
                        <button
                          onClick={() => handleAcceptJuniorRequest(req)}
                          className="w-full sm:w-auto px-4 py-2 bg-red-900 hover:bg-red-950 text-white rounded-xl text-xs font-bold shadow-md shadow-red-900/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                          <span>Accept & Schedule 1:1</span>
                        </button>
                      ) : (
                        <div className="inline-flex flex-col sm:items-end">
                          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Claimed by {req.claimedBySenior || 'Senior Mentor'}</span>
                          </span>
                          <span className="text-[10px] text-slate-400 mt-1">Session pinned to schedule</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* SUB-TAB 3: MY SCHEDULED SESSIONS */}
        {/* ==================================================== */}
        {mentorshipHubTab === 'my_sessions' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-red-900" />
                <h2 className="text-lg font-bold text-slate-900">Confirmed 1:1 Mentorship Sessions</h2>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                {filteredMentorships.length} scheduled
              </span>
            </div>

            {searchQuery && (
              <div className="text-xs text-slate-600 flex items-center justify-between bg-amber-50/70 border border-amber-200 px-4 py-2.5 rounded-xl mb-4 animate-in fade-in">
                <span>Showing mentorship sessions matching: <strong>"{searchQuery}"</strong> ({filteredMentorships.length} results)</span>
                <button onClick={() => setSearchQuery('')} className="text-red-900 font-bold hover:underline cursor-pointer">
                  Clear filter
                </button>
              </div>
            )}

            {filteredMentorships.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
                <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-800">No scheduled sessions</p>
                <p className="text-xs text-slate-500 mt-1">Claim an open slot or accept a junior help request to get started.</p>
                <button
                  onClick={() => setMentorshipHubTab('claimable')}
                  className="mt-3 text-xs font-bold text-red-900 hover:underline cursor-pointer"
                >
                  Browse Claimable Slots →
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredMentorships.map(session => (
                  <div
                    key={session.id}
                    className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-red-950 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
                          {session.status}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">{session.date}</span>
                      </div>

                      <h3 className="font-bold text-slate-900 text-base mt-2.5">{session.topic}</h3>
                      <p className="text-xs text-red-900 font-semibold mt-0.5">With {session.seniorName} ({session.seniorRole})</p>

                      <div className="mt-3 p-3 rounded-xl bg-slate-50 text-xs text-slate-600 space-y-1">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{session.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-red-900" />
                          <span className="font-medium text-slate-700">{session.mode}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedVenueSession(session)}
                        className="text-xs font-bold text-red-900 hover:text-red-950 flex items-center gap-1.5 cursor-pointer"
                      >
                        <MapPin className="w-3.5 h-3.5 text-red-900" />
                        <span>View Venue Details</span>
                      </button>

                      <button
                        onClick={() => {
                          setMentorshipBookings(prev => prev.filter(b => b.id !== session.id));
                          showToast('Session cancelled.');
                        }}
                        className="text-xs font-medium text-slate-400 hover:text-slate-700 cursor-pointer"
                      >
                        Cancel Session
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // RENDER: MESSAGES INTERFACE
  // ==========================================
  function renderMessagesInterface() {
    return (
      <div className="h-[75vh] bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden flex flex-col md:flex-row animate-in fade-in duration-300">
        <div className="w-full md:w-80 border-r border-slate-200 flex flex-col bg-slate-50/50">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-bold text-slate-900 text-base">Direct Messages</h2>
            <span className="text-[11px] font-bold text-amber-950 bg-amber-100 border border-amber-300/60 px-2 py-0.5 rounded-full">
              {conversations.length} Active
            </span>
          </div>

          <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
            {conversations.map(conv => {
              const isSelected = conv.id === activeChatId;
              return (
                <button
                  key={conv.id}
                  onClick={() => setActiveChatId(conv.id)}
                  className={`w-full p-4 flex items-start gap-3 text-left transition-colors cursor-pointer ${
                    isSelected ? 'bg-white shadow-xs' : 'hover:bg-slate-100/70'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={conv.avatar}
                      alt={conv.name}
                      className="w-11 h-11 rounded-xl object-cover border border-slate-200"
                    />
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{conv.name}</h4>
                      <span className="text-[10px] text-slate-400">{conv.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-red-900 font-medium truncate">{conv.role}</p>
                    <p className="text-xs text-slate-500 truncate mt-1">{conv.lastMessage}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 flex flex-col h-full bg-white">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <img
                src={activeConversation.avatar}
                alt={activeConversation.name}
                className="w-10 h-10 rounded-xl object-cover border border-slate-200"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-slate-900 text-sm">{activeConversation.name}</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <p className="text-xs text-slate-500">{activeConversation.role} • {activeConversation.status}</p>
              </div>
            </div>

            <button
              onClick={() => {
                const target = seniors.find(s => s.id === activeConversation.seniorId);
                if (target) {
                  setMentorshipTargetSenior(target);
                  setIsMentorshipModalOpen(true);
                }
              }}
              className="px-3 py-1.5 text-xs font-bold text-red-950 bg-red-50 hover:bg-red-100 rounded-xl border border-red-200 transition-colors"
            >
              Book 1:1 Session
            </button>
          </div>

          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/30">
            {activeConversation.messages.map(msg => {
              const isMe = msg.sender === 'me';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[75%] p-3.5 rounded-2xl text-xs md:text-sm leading-relaxed ${
                      isMe
                        ? 'bg-red-900 text-white rounded-br-xs shadow-xs'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-2xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                </div>
              );
            })}
          </div>

          <div className="px-6 py-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none bg-slate-50/50">
            {[
              'Can we meet at COS Food Street?',
              'Thanks a lot for the advice!',
              'Which courses need the most focus?',
              'Could you review my resume?'
            ].map((quick, idx) => (
              <button
                key={idx}
                onClick={() => setChatInputText(quick)}
                className="text-[11px] font-semibold text-slate-600 bg-white hover:bg-red-50 hover:text-red-900 border border-slate-200 px-3 py-1 rounded-full whitespace-nowrap cursor-pointer transition-colors"
              >
                {quick}
              </button>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 flex items-center gap-3 bg-white">
            <input
              type="text"
              value={chatInputText}
              onChange={(e) => setChatInputText(e.target.value)}
              placeholder={`Message ${activeConversation.name}...`}
              className="flex-1 px-4 py-2.5 bg-slate-100 border border-transparent focus:border-red-400 focus:bg-white rounded-xl text-xs md:text-sm text-slate-800 focus:outline-none transition-all"
            />
            <button
              type="submit"
              disabled={!chatInputText.trim()}
              className="p-2.5 rounded-xl bg-red-900 hover:bg-red-950 disabled:bg-slate-300 text-white shadow-xs transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4 text-amber-300" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: PROFILE & AUTHENTICATION
  // ==========================================
  function renderStudentProfile() {
    return (
      <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
        
        {/* Header with Title and Sign In / Sign Out actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <User className="w-6 h-6 text-red-900" />
              <span>{isAuthenticated && authMode === 'profile' ? 'Student Profile' : 'TIET Authentication'}</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-500 mt-0.5">
              {isAuthenticated && authMode === 'profile'
                ? 'Manage your TIET student credentials, academic standing, and activity'
                : 'Sign in with your official Thapar webmail or create a new student account'}
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            {isAuthenticated ? (
              <button
                type="button"
                onClick={handleSignOut}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setAuthMode('signin')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-900 hover:bg-red-950 shadow-xs shadow-red-900/20 transition-colors cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>

        {/* AUTH FORMS (SIGN IN / SIGN UP) */}
        {(!isAuthenticated || authMode !== 'profile') ? (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
            {/* Tabs for Sign In vs Sign Up */}
            <div className="flex items-center p-1.5 bg-slate-100 rounded-2xl w-full sm:w-fit mb-6">
              <button
                type="button"
                onClick={() => setAuthMode('signin')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  authMode === 'signin' ? 'bg-white text-red-950 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('signup')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  authMode === 'signup' ? 'bg-white text-red-950 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Sign Up (New Student)</span>
              </button>
            </div>

            {/* SIGN UP FORM COMPONENT */}
            {authMode === 'signup' && (
              <form onSubmit={handleSignUpSubmit} className="space-y-4 max-w-xl">
                <div className="border-b border-slate-100 pb-3 mb-2">
                  <h3 className="font-bold text-slate-900 text-base">Create Student Account</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Official Thapar credentials enable tailored senior doubt matching
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Srishti"
                      value={signUpName}
                      onChange={(e) => handleSignUpNameChange(e.target.value)}
                      className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white transition-all ${
                        signUpNameError
                          ? 'border-red-500 ring-2 ring-red-100 bg-red-50/20'
                          : 'border-slate-200 focus:border-red-600 focus:ring-2 focus:ring-red-100'
                      }`}
                    />
                    {signUpNameError && (
                      <p className="text-xs text-red-600 font-semibold mt-1.5 flex items-center gap-1.5 animate-in fade-in">
                        <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                        <span>{signUpNameError}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Roll Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 1023034121"
                      value={signUpRoll}
                      onChange={(e) => handleSignUpRollChange(e.target.value)}
                      className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white transition-all ${
                        signUpRollError
                          ? 'border-red-500 ring-2 ring-red-100 bg-red-50/20'
                          : 'border-slate-200 focus:border-red-600 focus:ring-2 focus:ring-red-100'
                      }`}
                    />
                    {signUpRollError && (
                      <p className="text-xs text-red-600 font-semibold mt-1.5 flex items-center gap-1.5 animate-in fade-in">
                        <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                        <span>{signUpRollError}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Email with @thapar.edu validation */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Official Thapar Email ID *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. srishti@thapar.edu"
                      value={signUpEmail}
                      onChange={(e) => handleSignUpEmailChange(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white transition-all ${
                        signUpEmailError
                          ? 'border-red-500 ring-2 ring-red-100 bg-red-50/20'
                          : 'border-slate-200 focus:border-red-600 focus:ring-2 focus:ring-red-100'
                      }`}
                    />
                  </div>
                  {signUpEmailError && (
                    <p className="text-xs text-red-600 font-semibold mt-1.5 flex items-center gap-1.5 animate-in fade-in">
                      <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      <span>{signUpEmailError}</span>
                    </p>
                  )}
                  <p className="text-[11px] text-slate-400 mt-1">
                    Only verified students with @thapar.edu addresses can register.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Create a secure password"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-600 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Current Year Dropdown */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Current Year *
                    </label>
                    <select
                      value={signUpYear}
                      onChange={(e) => setSignUpYear(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-red-600 focus:bg-white font-medium"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>

                  {/* Branch Dropdown for TIET Branches */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Branch (TIET) *
                    </label>
                    <select
                      value={signUpBranch}
                      onChange={(e) => setSignUpBranch(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-red-600 focus:bg-white font-medium"
                    >
                      {TIET_BRANCHES.map(b => (
                        <option key={b.code} value={b.code}>{b.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSignUpDisabled}
                    className={`w-full py-3 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 ${
                      isSignUpDisabled
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                        : 'bg-red-900 hover:bg-red-950 text-white shadow-md shadow-red-900/25 cursor-pointer active:scale-[0.99]'
                    }`}
                  >
                    <UserPlus className="w-4 h-4 text-amber-300" />
                    <span>Create Account & Enter SeniorSphere</span>
                  </button>
                </div>
              </form>
            )}

            {/* SIGN IN FORM COMPONENT */}
            {authMode === 'signin' && (
              <div className="space-y-6 max-w-xl">
                <form onSubmit={handleSignInSubmit} className="space-y-4">
                  <div className="border-b border-slate-100 pb-3 mb-2">
                    <h3 className="font-bold text-slate-900 text-base">Sign In to Your Account</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Use your official @thapar.edu student credentials
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Official Thapar Email ID *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="email"
                        required
                        placeholder="e.g. srishti@thapar.edu"
                        value={signInEmail}
                        onChange={(e) => handleSignInEmailChange(e.target.value)}
                        className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white transition-all ${
                          signInEmailError
                            ? 'border-red-500 ring-2 ring-red-100 bg-red-50/20'
                            : 'border-slate-200 focus:border-red-600 focus:ring-2 focus:ring-red-100'
                        }`}
                      />
                    </div>
                    {signInEmailError && (
                      <p className="text-xs text-red-600 font-semibold mt-1.5 flex items-center gap-1.5 animate-in fade-in">
                        <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                        <span>{signInEmailError}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Password *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-600 focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-red-900 hover:bg-red-950 text-white font-bold text-sm rounded-xl shadow-md shadow-red-900/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <LogIn className="w-4 h-4 text-amber-300" />
                    <span>Sign In</span>
                  </button>
                </form>

                {/* Quick One-Click Demo Logins */}
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                    Or Quick Demo Sign-In (Test Different Academic Years):
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { name: 'Srishti', yr: '2nd Year', branch: 'ENC', roll: '102303412', email: 'srishti@thapar.edu' },
                      { name: 'Aarav Gupta', yr: '1st Year', branch: 'COE', roll: '102403011', email: 'aarav.g@thapar.edu' },
                      { name: 'Kavya Singla', yr: '3rd Year', branch: 'ECE', roll: '102203189', email: 'kavya.s@thapar.edu' },
                      { name: 'Rishi Kumar', yr: '4th Year', branch: 'CSBS', roll: '102103450', email: 'rishi.k@thapar.edu' }
                    ].map(demo => (
                      <button
                        key={demo.name}
                        type="button"
                        onClick={() => {
                          const yearNum = parseInt(demo.yr, 10);
                          const batchMap = {
                            '1st Year': 'Batch of 2030',
                            '2nd Year': 'Batch of 2029',
                            '3rd Year': 'Batch of 2028',
                            '4th Year': 'Batch of 2027'
                          };
                          setCurrentUser({
                            name: demo.name,
                            rollNumber: demo.roll,
                            email: demo.email,
                            year: demo.yr,
                            yearNumber: yearNum,
                            branch: demo.branch,
                            batch: batchMap[demo.yr],
                            hostel: demo.branch === 'COE' || demo.branch === 'CSBS' ? 'Hostel PG' : 'Hostel N',
                            cgpa: '8.85',
                            karma: 300
                          });
                          setIsAuthenticated(true);
                          setAuthMode('profile');
                          showToast(`Signed in as ${demo.name} (${demo.yr} • ${demo.branch})!`);
                        }}
                        className="p-2.5 text-left rounded-xl bg-slate-50 hover:bg-red-50/70 border border-slate-200/80 transition-all cursor-pointer"
                      >
                        <p className="text-xs font-bold text-slate-800">{demo.name}</p>
                        <p className="text-[11px] text-red-900 font-semibold">{demo.yr} • {demo.branch}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* LOGGED-IN PROFILE VIEW */
          <>
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-xs relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-red-900 to-red-950 text-amber-300 flex items-center justify-center font-black text-2xl shadow-md">
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-xl md:text-2xl font-black text-slate-900">{currentUser.name}</h1>
                    <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      TIET Roll: {currentUser.rollNumber}
                    </span>
                    <span className="text-xs font-bold text-red-900 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full">
                      {currentUser.email}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-600 mt-1">
                    {currentUser.year} • {currentUser.branch} • {currentUser.batch}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-3 mt-3 text-xs">
                    <span className="font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                      Current CGPA: {currentUser.cgpa || '8.84'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-100 text-center">
                <div className="p-3 rounded-xl bg-slate-50">
                  <p className="text-lg font-black text-slate-900">{questions.length}</p>
                  <p className="text-[11px] text-slate-500 font-medium">Doubts Asked</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50">
                  <p className="text-lg font-black text-slate-900">{mentorshipBookings.length}</p>
                  <p className="text-[11px] text-slate-500 font-medium">1:1 Mentorships</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50">
                  <p className="text-lg font-black text-amber-600">{currentUser.karma || 420}</p>
                  <p className="text-[11px] text-slate-500 font-medium">Campus Karma</p>
                </div>
              </div>
            </div>

            {/* My Active Questions in Forum */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
              <h3 className="font-bold text-slate-900 text-sm mb-4 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-red-900" />
                <span>My Recent Activity</span>
              </h3>

              <div className="space-y-3">
                {questions.slice(0, 2).map(q => (
                  <div key={q.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-red-900 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                        {q.subject}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 mt-1">{q.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{q.timestamp} • {q.answers.length} Answers</p>
                    </div>
                    <button
                      onClick={() => {
                        setActiveQuestionThread(q);
                        setActiveTab('ask');
                      }}
                      className="px-3 py-1.5 text-xs font-bold bg-white hover:bg-red-50 text-red-900 border border-slate-200 rounded-xl cursor-pointer"
                    >
                      View Doubt
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}
