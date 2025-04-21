
import { createContext, useContext, useState } from "react";
import { Hackathon, Interest, Message, Skill, User, UserHackathon } from "@/types";
import { currentUserId, mockHackathons, mockMessages, mockUserHackathons, mockUsers } from "@/data/mockData";
import { toast } from "@/components/ui/sonner";

interface AppContextType {
  users: User[];
  hackathons: Hackathon[];
  userHackathons: UserHackathon[];
  messages: Message[];
  currentUser: User | undefined;
  currentUserId: string;
  filteredUsers: User[];
  searchTerm: string;
  selectedSkills: Skill[];
  selectedInterests: Interest[];
  selectedLocation: string;
  setSearchTerm: (term: string) => void;
  setSelectedSkills: (skills: Skill[]) => void;
  setSelectedInterests: (interests: Interest[]) => void;
  setSelectedLocation: (location: string) => void;
  sendMessage: (recipientId: string, content: string) => void;
  markMessageAsRead: (messageId: string) => void;
  joinHackathon: (hackathonId: string) => void;
  leaveHackathon: (hackathonId: string) => void;
  updateUserStatus: (status: User['status']) => void;
  getUnreadMessagesCount: () => number;
  getUserHackathons: (userId: string) => Hackathon[];
  getUserById: (userId: string) => User | undefined;
  getConversation: (userId1: string, userId2: string) => Message[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [hackathons, setHackathons] = useState<Hackathon[]>(mockHackathons);
  const [userHackathons, setUserHackathons] = useState<UserHackathon[]>(mockUserHackathons);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  const currentUser = users.find(user => user.id === currentUserId);

  // Filter users based on search term and filters
  const filteredUsers = users.filter(user => {
    // Don't show current user in the list
    if (user.id === currentUserId) return false;

    // Text search
    const matchesSearch = searchTerm === "" || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase());

    // Skills filter
    const matchesSkills = selectedSkills.length === 0 || 
      selectedSkills.some(skill => user.skills.includes(skill));

    // Interests filter
    const matchesInterests = selectedInterests.length === 0 || 
      selectedInterests.some(interest => user.interests.includes(interest));

    // Location filter
    const matchesLocation = selectedLocation === "" || 
      user.location.toLowerCase().includes(selectedLocation.toLowerCase());

    return matchesSearch && matchesSkills && matchesInterests && matchesLocation;
  });

  // Send a message to another user
  const sendMessage = (recipientId: string, content: string) => {
    const newMessage = {
      id: (messages.length + 1).toString(),
      sender: currentUserId,
      recipient: recipientId,
      content,
      timestamp: new Date().toISOString(),
      read: false
    };
    setMessages([...messages, newMessage]);
    toast.success("Message sent!");
  };

  // Mark a message as read
  const markMessageAsRead = (messageId: string) => {
    setMessages(messages.map(message => 
      message.id === messageId ? { ...message, read: true } : message
    ));
  };

  // Join a hackathon
  const joinHackathon = (hackathonId: string) => {
    const existingEntry = userHackathons.find(
      uh => uh.userId === currentUserId && uh.hackathonId === hackathonId
    );

    if (existingEntry) {
      setUserHackathons(userHackathons.map(uh => 
        uh.userId === currentUserId && uh.hackathonId === hackathonId
          ? { ...uh, status: "Participating" }
          : uh
      ));
    } else {
      setUserHackathons([
        ...userHackathons,
        { userId: currentUserId, hackathonId, status: "Participating" }
      ]);
    }
    toast.success("You are now participating in this hackathon!");
  };

  // Leave a hackathon
  const leaveHackathon = (hackathonId: string) => {
    setUserHackathons(userHackathons.filter(
      uh => !(uh.userId === currentUserId && uh.hackathonId === hackathonId)
    ));
    toast.success("You are no longer participating in this hackathon");
  };

  // Update user status
  const updateUserStatus = (status: User['status']) => {
    setUsers(users.map(user => 
      user.id === currentUserId ? { ...user, status } : user
    ));
    toast.success(`Status updated to: ${status}`);
  };

  // Get unread messages count
  const getUnreadMessagesCount = () => {
    return messages.filter(m => m.recipient === currentUserId && !m.read).length;
  };

  // Get user's hackathons
  const getUserHackathons = (userId: string) => {
    const userHackathonIds = userHackathons
      .filter(uh => uh.userId === userId)
      .map(uh => uh.hackathonId);
    
    return hackathons.filter(h => userHackathonIds.includes(h.id));
  };

  // Get user by ID
  const getUserById = (userId: string) => {
    return users.find(user => user.id === userId);
  };

  // Get conversation between two users
  const getConversation = (userId1: string, userId2: string) => {
    return messages.filter(
      m => (m.sender === userId1 && m.recipient === userId2) || 
           (m.sender === userId2 && m.recipient === userId1)
    ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  };

  const contextValue: AppContextType = {
    users,
    hackathons,
    userHackathons,
    messages,
    currentUser,
    currentUserId,
    filteredUsers,
    searchTerm,
    selectedSkills,
    selectedInterests,
    selectedLocation,
    setSearchTerm,
    setSelectedSkills,
    setSelectedInterests,
    setSelectedLocation,
    sendMessage,
    markMessageAsRead,
    joinHackathon,
    leaveHackathon,
    updateUserStatus,
    getUnreadMessagesCount,
    getUserHackathons,
    getUserById,
    getConversation
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
