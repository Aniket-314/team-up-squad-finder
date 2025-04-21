
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useApp } from "@/context/AppContext";
import { Interest, Skill } from "@/types";
import { Filter } from "lucide-react";
import { Badge } from "./ui/badge";

const skillOptions: Skill[] = [
  "Frontend",
  "Backend",
  "Full Stack",
  "UI/UX",
  "Design",
  "Mobile",
  "Machine Learning",
  "AI",
  "Data Science",
  "DevOps",
  "Blockchain",
  "AR/VR",
  "Game Development",
  "IoT",
  "Cybersecurity"
];

const interestOptions: Interest[] = [
  "AI/ML",
  "Web3",
  "Climate Tech",
  "Fintech",
  "EdTech",
  "Health Tech",
  "Social Impact",
  "AR/VR",
  "Gaming",
  "Mobile Apps",
  "E-commerce",
  "Productivity",
  "Entertainment"
];

export default function UserFilters() {
  const { 
    searchTerm, 
    setSearchTerm, 
    selectedSkills, 
    setSelectedSkills, 
    selectedInterests, 
    setSelectedInterests,
    selectedLocation,
    setSelectedLocation
  } = useApp();

  const toggleSkill = (skill: Skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const toggleInterest = (interest: Interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const clearFilters = () => {
    setSelectedSkills([]);
    setSelectedInterests([]);
    setSelectedLocation("");
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by name, role, or bio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              Filters
              {(selectedSkills.length > 0 || selectedInterests.length > 0 || selectedLocation) && (
                <Badge variant="secondary" className="ml-1">
                  {selectedSkills.length + selectedInterests.length + (selectedLocation ? 1 : 0)}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filter Teammates</SheetTitle>
              <SheetDescription>
                Find your perfect teammate by filtering skills, interests, and location.
              </SheetDescription>
            </SheetHeader>
            <div className="py-4 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="City, Country"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Skills</Label>
                  {selectedSkills.length > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setSelectedSkills([])}
                      className="h-auto py-0 text-xs text-teamup-purple hover:text-teamup-purple/80"
                    >
                      Clear
                    </Button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillOptions.map((skill) => (
                    <Badge
                      key={skill}
                      variant={selectedSkills.includes(skill) ? "default" : "outline"}
                      className={
                        selectedSkills.includes(skill)
                          ? "bg-teamup-purple hover:bg-teamup-purple/80 cursor-pointer"
                          : "hover:bg-teamup-purple/10 cursor-pointer"
                      }
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Interests</Label>
                  {selectedInterests.length > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setSelectedInterests([])}
                      className="h-auto py-0 text-xs text-teamup-purple hover:text-teamup-purple/80"
                    >
                      Clear
                    </Button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((interest) => (
                    <Badge
                      key={interest}
                      variant={selectedInterests.includes(interest) ? "default" : "outline"}
                      className={
                        selectedInterests.includes(interest)
                          ? "bg-teamup-blue hover:bg-teamup-blue/80 cursor-pointer"
                          : "hover:bg-teamup-blue/10 cursor-pointer"
                      }
                      onClick={() => toggleInterest(interest)}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <SheetFooter>
              <Button variant="outline" onClick={clearFilters}>Clear All Filters</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      {(selectedSkills.length > 0 || selectedInterests.length > 0 || selectedLocation) && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-500">Active filters:</span>
          {selectedLocation && (
            <Badge 
              variant="secondary" 
              className="flex items-center gap-1"
              onClick={() => setSelectedLocation("")}
            >
              Location: {selectedLocation}
              <span className="cursor-pointer">×</span>
            </Badge>
          )}
          {selectedSkills.map(skill => (
            <Badge 
              key={skill} 
              variant="secondary" 
              className="bg-teamup-soft-blue text-teamup-blue flex items-center gap-1"
              onClick={() => toggleSkill(skill)}
            >
              {skill}
              <span className="cursor-pointer">×</span>
            </Badge>
          ))}
          {selectedInterests.map(interest => (
            <Badge 
              key={interest} 
              variant="secondary" 
              className="bg-teamup-light-purple text-teamup-dark-purple flex items-center gap-1"
              onClick={() => toggleInterest(interest)}
            >
              {interest}
              <span className="cursor-pointer">×</span>
            </Badge>
          ))}
          <Button 
            variant="ghost" 
            className="h-7 px-2 text-xs text-gray-500"
            onClick={clearFilters}
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
