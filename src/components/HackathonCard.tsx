
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { Hackathon } from "@/types";
import { Calendar, Globe, MapPin } from "lucide-react";
import { Badge } from "./ui/badge";
import { format, parseISO } from "date-fns";

interface HackathonCardProps {
  hackathon: Hackathon;
}

export default function HackathonCard({ hackathon }: HackathonCardProps) {
  const { userHackathons, currentUserId, joinHackathon, leaveHackathon } = useApp();

  const userHackathon = userHackathons.find(
    uh => uh.userId === currentUserId && uh.hackathonId === hackathon.id
  );

  const isParticipating = userHackathon?.status === "Participating";
  const isInterested = userHackathon?.status === "Interested";

  const formattedStartDate = format(parseISO(hackathon.startDate), "MMM d, yyyy");
  const formattedEndDate = format(parseISO(hackathon.endDate), "MMM d, yyyy");

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="p-4 space-y-2 border-b">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{hackathon.name}</h3>
          {hackathon.isVirtual ? (
            <Badge variant="outline" className="bg-purple-100 text-teamup-purple border-none">
              Virtual
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-teamup-soft-blue text-blue-700 border-none">
              In-person
            </Badge>
          )}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar size={16} className="mr-1" />
          <span>{formattedStartDate} - {formattedEndDate}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <MapPin size={16} className="mr-1" />
          <span>{hackathon.location}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-1">
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {hackathon.description}
        </p>
        <div>
          <h4 className="text-xs text-gray-500 uppercase mb-1">Themes</h4>
          <div className="flex flex-wrap gap-1">
            {hackathon.themes.map(theme => (
              <Badge key={theme} variant="outline" className="bg-teamup-light-purple text-teamup-dark-purple border-none">
                {theme}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t flex justify-between">
        <a 
          href={hackathon.website} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center text-teamup-purple hover:underline"
        >
          <Globe size={16} className="mr-1" />
          Website
        </a>
        <div className="flex gap-2">
          {isParticipating ? (
            <Button 
              variant="outline" 
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              onClick={() => leaveHackathon(hackathon.id)}
            >
              Leave
            </Button>
          ) : (
            <Button 
              variant="default" 
              className="bg-teamup-purple hover:bg-teamup-purple/90"
              onClick={() => joinHackathon(hackathon.id)}
            >
              {isInterested ? "Join" : "Participate"}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
