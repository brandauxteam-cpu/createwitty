// Course package data — highlights (shown on cards) + full curriculum (shown in modal)
export const COURSES = [
  {
    id: 'p1',
    tag: 'Package 1',
    meta: '8 Weeks • 40 Hrs',
    title: 'Digital Marketing Professional',
    fullTitle: 'Complete Digital Marketing Professional Program',
    price: '₹14,990',
    enrollValue: 'Complete Digital Marketing Professional Program (₹14,990)',
    highlight: false,
    points: [
      'SEO (Basic to Advanced) + Local SEO',
      'Google Ads + Meta Ads (FB & Instagram)',
      'Social Media, Content & Email Marketing',
      'GA4, Search Console & Reporting',
      'Internship + Job Assistance + Certificate',
    ],
    sections: [
      {
        heading: 'What you’ll learn',
        items: [
          'Live Online Classes', 'SEO (Basic to Advanced)', 'Google Ads', 'Meta Ads (FB & Instagram)',
          'Social Media Marketing', 'WordPress Website Basics', 'Content Marketing', 'Email Marketing',
          'Google Analytics (GA4)', 'Google Search Console', 'Local SEO', 'Canva for Marketing',
          'Lead Generation', 'Landing Page Basics', 'Reporting & Analytics', 'Weekly Assignments',
          'Live Project Exposure', 'Mock Interviews', 'Resume Building', 'Course Completion Certificate',
          'Internship Opportunity', 'Job Assistance*',
        ],
      },
    ],
  },
  {
    id: 'p2',
    tag: 'Package 2',
    meta: '9 Weeks • 45 Hrs',
    title: 'Digital Marketing + AI',
    fullTitle: 'Digital Marketing + AI Foundation Program',
    price: '₹19,990',
    enrollValue: 'Digital Marketing + AI Foundation Program (₹19,990)',
    highlight: true,
    points: [
      'Everything in Package 1',
      'AI & Prompt Engineering for Marketing',
      'ChatGPT, AI Content, Image & Video',
      'AI for SEO, Social & Automation',
      'Advanced Portfolio + Internship',
    ],
    note: 'Includes everything in Package 1, plus the full AI Foundation track.',
    sections: [
      {
        heading: 'AI Foundation',
        items: [
          'Introduction to AI', 'Prompt Engineering', 'ChatGPT for Marketing', 'AI Content Creation',
          'AI Image Generation', 'AI Video Creation', 'AI for SEO', 'AI for Social Media',
          'AI Marketing Automation', 'AI Productivity Tools', 'AI-Powered Campaigns', 'Ethical AI Usage',
        ],
      },
      {
        heading: 'Additional Benefits',
        items: [
          'AI Project Assignments', 'AI Workflow Practice', 'Advanced Portfolio', 'Mock Interviews',
          'Internship Opportunity', 'Completion Certificate', 'Job Assistance*',
        ],
      },
    ],
  },
  {
    id: 'p3',
    tag: 'Package 3',
    meta: '11 Weeks',
    title: 'AI + Neuromarketing Master',
    fullTitle: 'DM + AI + Neuromarketing + Brand Management Master Program',
    price: '₹24,990',
    enrollValue: 'DM + AI + Neuromarketing + Brand Management Master Program (₹24,990)',
    highlight: false,
    points: [
      'Everything in Package 2',
      'Neuromarketing & Consumer Psychology',
      'Brand Strategy, Identity & Storytelling',
      'Personal & Corporate Branding',
      'Live Capstone + Premium Mentorship',
    ],
    note: 'Includes everything in Package 2, plus Neuromarketing, Brand Management & a live Capstone.',
    sections: [
      {
        heading: 'Neuromarketing',
        items: [
          'Consumer Psychology', 'Buying Behaviour', 'Emotional Marketing', 'Color Psychology',
          'Persuasion Techniques', 'Customer Journey Mapping', 'Behavioural Marketing', 'Sales Psychology',
          'Conversion Optimization',
        ],
      },
      {
        heading: 'Brand Management',
        items: [
          'Brand Strategy', 'Brand Positioning', 'Brand Identity', 'Brand Storytelling',
          'Brand Communication', 'Personal Branding', 'Corporate Branding', 'Reputation Management',
          'Campaign Planning', 'Brand Performance Analysis',
        ],
      },
      {
        heading: 'Capstone & Premium Benefits',
        items: [
          'End-to-End Campaign', 'Live Client Project', 'Team Collaboration', 'Campaign Presentation',
          'Premium Mentorship', 'Career Guidance', 'Resume & LinkedIn Optimization', 'HR & Technical Mocks',
          'Internship Opportunity', 'Completion Certificate',
        ],
      },
    ],
  },
]

export const ENROLL_OPTIONS = COURSES.map((c) => c.enrollValue).concat(['Not sure yet — please advise'])
