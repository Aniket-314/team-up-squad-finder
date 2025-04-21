
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { User } from "@/types";
import { MessageCircle, Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

interface UserCardProps {
  user: User;
  onSendMessage: (userId: string) => void;
}

export default function UserCard({ user, onSendMessage }: UserCardProps) {
  const statusColors = {
    "Looking for teammates": "bg-green-100 text-green-800 animate-pulse-light",
    "Open to opportunities": "bg-blue-100 text-blue-800",
    "Team formed": "bg-yellow-100 text-yellow-800",
    "Not available": "bg-gray-100 text-gray-800"
  };

  const statusColor = statusColors[user.status] || "bg-gray-100 text-gray-800";

  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="p-4 flex flex-row items-center gap-4 border-b">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <Link to={`/user/${user.id}`} className="font-semibold text-lg hover:text-teamup-purple">
            {user.name}
          </Link>
          <p className="text-sm text-gray-500">{user.role}</p>
          <p className="text-sm text-gray-500">{user.location}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-1">
        <div className="mb-4">
          <p className="text-sm line-clamp-3">{user.bio}</p>
        </div>
        <div className="space-y-3">
          <div>
            <h4 className="text-xs text-gray-500 uppercase mb-1">Skills</h4>
            <div className="flex flex-wrap gap-1">
              {user.skills.map(skill => (
                <Badge key={skill} variant="outline" className="bg-teamup-soft-blue text-teamup-blue border-none">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs text-gray-500 uppercase mb-1">Interests</h4>
            <div className="flex flex-wrap gap-1">
              {user.interests.map(interest => (
                <Badge key={interest} variant="outline" className="bg-teamup-light-purple text-teamup-dark-purple border-none">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t flex justify-between items-center">
        <div className={`px-2 py-1 rounded-full text-xs ${statusColor}`}>
          {user.status}
        </div>
        <div className="flex gap-2">
          {user.github && (
            <a href={`https://github.com/${user.github}`} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-teamup-purple">
                <Github size={16} />
              </Button>
            </a>
          )}
          {user.linkedin && (
            <a href={`https://linkedin.com/in/${user.linkedin}`} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-teamup-purple">
                <Linkedin size={16} />
              </Button>
            </a>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            className="text-teamup-purple hover:bg-teamup-purple hover:text-white border-teamup-purple"
            onClick={() => onSendMessage(user.id)}
          >
            <MessageCircle size={16} className="mr-1" />
            Connect
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
