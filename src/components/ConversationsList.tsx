
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import { format, isToday, parseISO } from "date-fns";
import { User } from "lucide-react";
import { useState } from "react";

interface ConversationsListProps {
  selectedUserId: string | null;
  onSelectUser: (userId: string) => void;
}

export default function ConversationsList({ selectedUserId, onSelectUser }: ConversationsListProps) {
  const { messages, users, currentUserId, getUserById } = useApp();
  const [searchTerm, setSearchTerm] = useState("");

  // Get all unique user IDs the current user has conversations with
  const conversationUserIds = [...new Set(
    messages
      .filter(m => m.sender === currentUserId || m.recipient === currentUserId)
      .map(m => m.sender === currentUserId ? m.recipient : m.sender)
  )];

  // Get the latest message for each conversation
  const conversations = conversationUserIds.map(userId => {
    const userMessages = messages.filter(
      m => (m.sender === currentUserId && m.recipient === userId) || 
           (m.sender === userId && m.recipient === currentUserId)
    );
    
    // Sort messages by timestamp (newest first)
    const sortedMessages = [...userMessages].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    const latestMessage = sortedMessages[0];
    const unreadCount = sortedMessages.filter(m => m.recipient === currentUserId && !m.read).length;
    
    return {
      userId,
      latestMessage,
      unreadCount
    };
  });

  // Sort conversations by latest message timestamp (newest first)
  const sortedConversations = [...conversations].sort(
    (a, b) => new Date(b.latestMessage.timestamp).getTime() - new Date(a.latestMessage.timestamp).getTime()
  );

  // Filter conversations by search term
  const filteredConversations = sortedConversations.filter(convo => {
    const user = getUserById(convo.userId);
    if (!user) return false;
    
    return user.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const formatMessageTime = (timestamp: string) => {
    const date = parseISO(timestamp);
    if (isToday(date)) {
      return format(date, "h:mm a");
    }
    return format(date, "MMM d");
  };

  return (
    <div className="flex flex-col h-full border rounded-l-lg overflow-hidden">
      <div className="p-3 border-b">
        <input
          type="text"
          placeholder="Search conversations..."
          className="w-full px-3 py-2 text-sm bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-teamup-purple"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ScrollArea className="flex-1">
        <div className="divide-y">
          {filteredConversations.length > 0 ? (
            filteredConversations.map(({ userId, latestMessage, unreadCount }) => {
              const user = getUserById(userId);
              if (!user) return null;
              
              const isSelected = selectedUserId === userId;
              
              return (
                <Button
                  key={userId}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start p-3 h-auto rounded-none",
                    isSelected ? "bg-gray-100" : "",
                    unreadCount > 0 ? "bg-teamup-soft-blue/30" : ""
                  )}
                  onClick={() => onSelectUser(userId)}
                >
                  <div className="flex w-full">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        <User size={14} />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <span className="font-medium truncate">{user.name}</span>
                        <span className="text-xs text-gray-500">
                          {formatMessageTime(latestMessage.timestamp)}
                        </span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <p className="text-sm text-gray-500 truncate">
                          {latestMessage.sender === currentUserId ? "You: " : ""}
                          {latestMessage.content}
                        </p>
                        {unreadCount > 0 && (
                          <span className="ml-2 bg-teamup-purple text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Button>
              );
            })
          ) : (
            <div className="p-4 text-center text-gray-500">
              {searchTerm ? "No conversations match your search" : "No conversations yet"}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
