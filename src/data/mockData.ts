
import { Hackathon, Message, User, UserHackathon } from "@/types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Alex Johnson",
    role: "Full Stack Developer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "San Francisco, USA",
    skills: ["Frontend", "Backend", "UI/UX"],
    interests: ["AI/ML", "Fintech", "Social Impact"],
    experience: "5 years",
    status: "Looking for teammates",
    github: "alexjohnson",
    linkedin: "alex-johnson",
    bio: "Full stack developer with a passion for building products that make a difference. Experienced in React, Node.js, and Python."
  },
  {
    id: "2",
    name: "Sarah Chen",
    role: "UI/UX Designer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "New York, USA",
    skills: ["Design", "UI/UX", "Frontend"],
    interests: ["Health Tech", "EdTech", "Social Impact"],
    experience: "3 years",
    status: "Looking for teammates",
    github: "sarahchen",
    linkedin: "sarah-chen",
    bio: "Designer with a focus on creating intuitive and accessible experiences. I believe in user-centered design and iterative processes."
  },
  {
    id: "3",
    name: "Miguel Reyes",
    role: "Machine Learning Engineer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Toronto, Canada",
    skills: ["Machine Learning", "AI", "Data Science"],
    interests: ["AI/ML", "Health Tech", "Climate Tech"],
    experience: "4 years",
    status: "Open to opportunities",
    github: "miguelreyes",
    linkedin: "miguel-reyes",
    bio: "ML engineer with expertise in computer vision and NLP. I love tackling complex problems and turning data into insights."
  },
  {
    id: "4",
    name: "Priya Patel",
    role: "Backend Developer",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "London, UK",
    skills: ["Backend", "DevOps", "Cybersecurity"],
    interests: ["Fintech", "Web3", "Cybersecurity"],
    experience: "6 years",
    status: "Team formed",
    github: "priyapatel",
    linkedin: "priya-patel",
    bio: "Backend developer specialized in scalable architectures and security. Experience with Go, Rust, and distributed systems."
  },
  {
    id: "5",
    name: "David Kim",
    role: "Mobile Developer",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Seoul, South Korea",
    skills: ["Mobile", "Frontend", "UI/UX"],
    interests: ["Mobile Apps", "Gaming", "AR/VR"],
    experience: "2 years",
    status: "Looking for teammates",
    github: "davidkim",
    linkedin: "david-kim",
    bio: "Mobile developer with expertise in React Native and Swift. Passionate about creating smooth, intuitive mobile experiences."
  },
  {
    id: "6",
    name: "Emma Wilson",
    role: "Data Scientist",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Berlin, Germany",
    skills: ["Data Science", "Machine Learning", "AI"],
    interests: ["AI/ML", "Climate Tech", "Health Tech"],
    experience: "4 years",
    status: "Open to opportunities",
    github: "emmawilson",
    linkedin: "emma-wilson",
    bio: "Data scientist with a background in statistical modeling and machine learning. Experienced in Python, R, and TensorFlow."
  }
];

export const mockHackathons: Hackathon[] = [
  {
    id: "1",
    name: "TechCrunch Disrupt Hackathon",
    startDate: "2025-05-15",
    endDate: "2025-05-17",
    location: "San Francisco, USA",
    description: "Join the largest hackathon on the West Coast with over 1,000 hackers, designers, and innovators.",
    website: "https://techcrunch.com/events/disrupt-sf/hackathon/",
    themes: ["AI/ML", "Fintech", "Social Impact"],
    isVirtual: false
  },
  {
    id: "2",
    name: "ETHGlobal",
    startDate: "2025-06-20",
    endDate: "2025-06-22",
    location: "Online",
    description: "The world's largest Ethereum hackathon with over $100k in prizes and grants.",
    website: "https://ethglobal.co",
    themes: ["Web3", "Fintech", "Social Impact"],
    isVirtual: true
  },
  {
    id: "3",
    name: "Climate Hack",
    startDate: "2025-07-10",
    endDate: "2025-07-12",
    location: "London, UK",
    description: "Tackle climate change with innovative tech solutions. Prizes for the most impactful projects.",
    website: "https://climatehack.io",
    themes: ["Climate Tech", "IoT", "AI/ML"],
    isVirtual: false
  },
  {
    id: "4",
    name: "HealthTech Innovate",
    startDate: "2025-08-05",
    endDate: "2025-08-07",
    location: "Boston, USA",
    description: "Create solutions for healthcare challenges with mentorship from industry leaders.",
    website: "https://healthtechinnovate.org",
    themes: ["Health Tech", "AI/ML", "Mobile Apps"],
    isVirtual: false
  },
  {
    id: "5",
    name: "Global AI Hackathon",
    startDate: "2025-09-12",
    endDate: "2025-09-14",
    location: "Online",
    description: "24 cities, 24 hours, one mission: advance AI for good.",
    website: "https://ai-hackathon.org",
    themes: ["AI/ML", "Social Impact", "Health Tech"],
    isVirtual: true
  }
];

export const mockUserHackathons: UserHackathon[] = [
  { userId: "1", hackathonId: "1", status: "Participating" },
  { userId: "1", hackathonId: "3", status: "Interested" },
  { userId: "2", hackathonId: "1", status: "Participating" },
  { userId: "2", hackathonId: "4", status: "Interested" },
  { userId: "3", hackathonId: "1", status: "Interested" },
  { userId: "3", hackathonId: "5", status: "Participating" },
  { userId: "4", hackathonId: "2", status: "Participating" },
  { userId: "5", hackathonId: "1", status: "Interested" },
  { userId: "5", hackathonId: "5", status: "Participating" },
  { userId: "6", hackathonId: "3", status: "Participating" },
  { userId: "6", hackathonId: "5", status: "Interested" }
];

export const mockMessages: Message[] = [
  {
    id: "1",
    sender: "2",
    recipient: "1",
    content: "Hi, I saw you're participating in the TechCrunch hackathon. I'm a UI/UX designer and would love to team up!",
    timestamp: "2025-04-20T13:45:00Z",
    read: true
  },
  {
    id: "2",
    sender: "1",
    recipient: "2",
    content: "Hey Sarah! That sounds great. I'm looking for a designer. What kind of projects are you interested in?",
    timestamp: "2025-04-20T14:10:00Z",
    read: true
  },
  {
    id: "3",
    sender: "2",
    recipient: "1",
    content: "I'm really interested in fintech and health tech projects. I have experience designing for financial apps and telemedicine platforms.",
    timestamp: "2025-04-20T14:25:00Z",
    read: true
  },
  {
    id: "4",
    sender: "3",
    recipient: "1",
    content: "Hello! I noticed we're both interested in the Climate Hack. I'm an ML engineer and could help with data analysis. Would you be interested in forming a team?",
    timestamp: "2025-04-21T09:15:00Z",
    read: false
  }
];

export const currentUserId = "1";
