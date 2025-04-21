
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useApp } from "@/context/AppContext";
import { Status } from "@/types";
import { Github, Linkedin, MapPin, User } from "lucide-react";
import HackathonCard from "@/components/HackathonCard";

const ProfilePage = () => {
  const { currentUser, getUserHackathons, updateUserStatus } = useApp();

  if (!currentUser) {
    return <div>Loading profile...</div>;
  }

  const userHackathons = getUserHackathons(currentUser.id);
  
  const statusOptions: Status[] = [
    "Looking for teammates",
    "Open to opportunities",
    "Team formed",
    "Not available"
  ];

  const handleStatusChange = (value: string) => {
    updateUserStatus(value as Status);
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
        <p className="text-gray-600">
          Manage your information and see upcoming hackathons.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-24 h-24 relative mb-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  <AvatarFallback className="text-2xl">
                    <User size={32} />
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle>{currentUser.name}</CardTitle>
              <CardDescription>{currentUser.role}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <MapPin size={16} className="mr-2 text-gray-500" />
                  <span>{currentUser.location}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {currentUser.github && (
                    <a
                      href={`https://github.com/${currentUser.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-teamup-purple hover:underline"
                    >
                      <Github size={16} />
                      <span>GitHub</span>
                    </a>
                  )}
                  {currentUser.linkedin && (
                    <a
                      href={`https://linkedin.com/in/${currentUser.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-teamup-purple hover:underline"
                    >
                      <Linkedin size={16} />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2">Your Status</h3>
                  <Select
                    value={currentUser.status}
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-1">
                    {currentUser.skills.map((skill) => (
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
                    {currentUser.interests.map((interest) => (
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
                  <p className="text-sm text-gray-600">{currentUser.bio}</p>
                </div>

                <Button className="w-full bg-teamup-purple hover:bg-teamup-purple/90">
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Hackathons</CardTitle>
              <CardDescription>
                Hackathons you're participating in or interested in.
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
                  <p className="text-gray-600 mb-4">
                    You haven't joined any hackathons yet. Browse hackathons to find
                    ones you're interested in.
                  </p>
                  <Button
                    variant="outline"
                    className="border-teamup-purple text-teamup-purple hover:bg-teamup-purple hover:text-white"
                    asChild
                  >
                    <a href="/hackathons">Find Hackathons</a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
