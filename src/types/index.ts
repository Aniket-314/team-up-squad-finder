
export type Skill = 
  | 'Frontend' 
  | 'Backend' 
  | 'Full Stack' 
  | 'UI/UX' 
  | 'Design' 
  | 'Mobile'
  | 'Machine Learning' 
  | 'AI' 
  | 'Data Science' 
  | 'DevOps'
  | 'Blockchain' 
  | 'AR/VR' 
  | 'Game Development'
  | 'IoT'
  | 'Cybersecurity';

export type Interest = 
  | 'AI/ML' 
  | 'Web3' 
  | 'Climate Tech' 
  | 'Fintech' 
  | 'EdTech' 
  | 'Health Tech'
  | 'Social Impact' 
  | 'AR/VR' 
  | 'Gaming' 
  | 'Mobile Apps'
  | 'E-commerce' 
  | 'Productivity' 
  | 'Entertainment';

export type Status = 
  | 'Looking for teammates' 
  | 'Open to opportunities' 
  | 'Team formed' 
  | 'Not available';

export interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
  location: string;
  skills: Skill[];
  interests: Interest[];
  experience: string;
  status: Status;
  github?: string;
  linkedin?: string;
  bio: string;
}

export interface Hackathon {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  website: string;
  themes: Interest[];
  isVirtual: boolean;
}

export interface Message {
  id: string;
  sender: string;
  recipient: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface UserHackathon {
  userId: string;
  hackathonId: string;
  status: 'Interested' | 'Participating' | 'Completed';
  teamId?: string;
}

export interface Team {
  id: string;
  name: string;
  hackathonId: string;
  members: string[];
  lookingFor?: Skill[];
  projectIdea?: string;
}
