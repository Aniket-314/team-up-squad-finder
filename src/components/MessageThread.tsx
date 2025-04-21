
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { Send, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface MessageThreadProps {
  selectedUserId: string | null;
}

export default function MessageThread({ selectedUserId }: MessageThreadProps) {
  const [newMessage, setNewMessage] = useState("");
  const { currentUserId, getConversation, sendMessage, markMessageAsRead, getUserById } = useApp();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const selectedUser = selectedUserId ? getUserById(selectedUserId) : null;
  const conversation = selectedUserId 
    ? getConversation(currentUserId, selectedUserId)
    : [];

  // Mark messages from the selected user as read
  useEffect(() => {
    if (selectedUserId) {
      conversation
        .filter(m => m.sender === selectedUserId && !m.read)
        .forEach(m => markMessageAsRead(m.id));
    }
  }, [selectedUserId, conversation]);

  // Scroll to bottom when conversation changes
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [conversation]);

  const handleSendMessage = () => {
    if (!selectedUserId || !newMessage.trim()) return;
    
    sendMessage(selectedUserId, newMessage.trim());
    setNewMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!selectedUserId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 border rounded-r-lg">
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800">Your Messages</h3>
          <p className="text-gray-500 mt-2">Select a conversation or start a new one</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full border rounded-r-lg overflow-hidden">
      <div className="flex items-center p-3 border-b">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={selectedUser?.avatar} alt={selectedUser?.name} />
          <AvatarFallback>
            <User size={14} />
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{selectedUser?.name}</div>
          <div className="text-xs text-gray-500">{selectedUser?.role}</div>
        </div>
      </div>
      
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {conversation.length > 0 ? (
            conversation.map((message) => {
              const isCurrentUser = message.sender === currentUserId;
              const messageUser = getUserById(message.sender);
              
              return (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    isCurrentUser ? "justify-end" : "justify-start"
                  )}
                >
                  <div className="flex items-end gap-2 max-w-[80%]">
                    {!isCurrentUser && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={messageUser?.avatar} alt={messageUser?.name} />
                        <AvatarFallback>
                          <User size={12} />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <div
                        className={cn(
                          "px-4 py-2 rounded-lg",
                          isCurrentUser
                            ? "bg-teamup-purple text-white rounded-br-none"
                            : "bg-gray-200 text-gray-800 rounded-bl-none"
                        )}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <div
                        className={cn(
                          "text-xs mt-1",
                          isCurrentUser ? "text-right" : "text-left"
                        )}
                      >
                        <span className="text-gray-500">
                          {format(parseISO(message.timestamp), "h:mm a")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-500 py-8">
              No messages yet. Start the conversation!
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="p-3 border-t">
        <div className="flex gap-2">
          <Textarea
            placeholder="Type your message..."
            className="min-h-[60px] resize-none"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            className="bg-teamup-purple hover:bg-teamup-purple/90"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}

function MessageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
