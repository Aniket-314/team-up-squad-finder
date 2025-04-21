
import Layout from "@/components/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useApp } from "@/context/AppContext";
import { Github, Linkedin, MapPin, MessageCircle, User } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import HackathonCard from "@/components/HackathonCard";

const UserProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { getUserById, getUserHackathons } = useApp();
  const navigate = useNavigate();

  const user = id ? getUserById(id) : undefined;
  
  if (!user) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">User not found</h2>
          <p className="text-gray-600 mb-4">The user profile you're looking for doesn't exist.</p>
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="border-teamup-purple text-teamup-purple hover:bg-teamup-purple hover:text-white"
          >
            Back to Home
          </Button>
        </div>
      </Layout>
    );
  }

  const userHackathons = getUserHackathons(user.id);

  const handleSendMessage = () => {
    navigate(`/messages?user=${user.id}`);
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
        <p className="text-gray-600">{user.role}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-24 h-24 relative mb-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-2xl">
                    <User size={32} />
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.role}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <MapPin size={16} className="mr-2 text-gray-500" />
                  <span>{user.location}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {user.github && (
                    <a
                      href={`https://github.com/${user.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-teamup-purple hover:underline"
                    >
                      <Github size={16} />
                      <span>GitHub</span>
                    </a>
                  )}
                  {user.linkedin && (
                    <a
                      href={`https://linkedin.com/in/${user.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-teamup-purple hover:underline"
                    >
                      <Linkedin size={16} />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>

                <div
                  className={`px-3 py-2 rounded-full text-sm inline-block ${
                    user.status === "Looking for teammates"
                      ? "bg-green-100 text-green-800 animate-pulse-light"
                      : user.status === "Open to opportunities"
                      ? "bg-blue-100 text-blue-800"
                      : user.status === "Team formed"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {user.status}
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-1">
                    {user.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="bg-teamup-soft-blue text-teamup-blue border-none"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Interests</h3>
                  <div className="flex flex-wrap gap-1">
                    {user.interests.map((interest) => (
                      <Badge
                        key={interest}
                        variant="outline"
                        className="bg-teamup-light-purple text-teamup-dark-purple border-none"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2">About</h3>
                  <p className="text-sm text-gray-600">{user.bio}</p>
                </div>

                <Button
                  className="w-full bg-teamup-purple hover:bg-teamup-purple/90"
                  onClick={handleSendMessage}
                >
                  <MessageCircle size={16} className="mr-2" />
                  Connect
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{user.name}'s Hackathons</CardTitle>
              <CardDescription>
                Hackathons they're participating in or interested in.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {userHackathons.length > 0 ? (
                <div className="space-y-6">
                  {userHackathons.map((hackathon) => (
                    <HackathonCard key={hackathon.id} hackathon={hackathon} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    No hackathons yet
                  </h3>
                  <p className="text-gray-600">
                    This user hasn't joined any hackathons yet.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfilePage;
