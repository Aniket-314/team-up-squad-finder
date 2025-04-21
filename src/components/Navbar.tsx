
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, User, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/context/AppContext";

export default function Navbar() {
  const { getUnreadMessagesCount, currentUser } = useApp();
  const unreadCount = getUnreadMessagesCount();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-teamup-purple text-white font-bold">TU</div>
          <span className="text-xl font-bold bg-gradient-to-r from-teamup-purple to-teamup-blue bg-clip-text text-transparent">
            TeamUp
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-teamup-purple transition-colors">
            Find Teammates
          </Link>
          <Link to="/hackathons" className="text-gray-600 hover:text-teamup-purple transition-colors">
            Hackathons
          </Link>
          <Link to="/messages" className="text-gray-600 hover:text-teamup-purple transition-colors">
            Messages
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/messages" className="relative md:hidden">
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-teamup-purple">
              <MessageCircle size={20} />
            </Button>
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                {unreadCount}
              </Badge>
            )}
          </Link>
          <Link to="/hackathons" className="md:hidden">
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-teamup-purple">
              <Calendar size={20} />
            </Button>
          </Link>
          <Link to="/profile">
            <div className="flex items-center gap-2">
              <div className="rounded-full w-8 h-8 overflow-hidden border border-gray-200">
                {currentUser?.avatar ? (
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-teamup-purple flex items-center justify-center text-white">
                    <User size={16} />
                  </div>
                )}
              </div>
              <span className="hidden md:inline text-sm font-medium">
                {currentUser?.name ?? "My Profile"}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
