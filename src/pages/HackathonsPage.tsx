
import HackathonCard from "@/components/HackathonCard";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/context/AppContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HackathonsPage = () => {
  const { hackathons, userHackathons, currentUserId } = useApp();

  const participatingHackathonIds = userHackathons
    .filter(uh => uh.userId === currentUserId && uh.status === "Participating")
    .map(uh => uh.hackathonId);

  const interestedHackathonIds = userHackathons
    .filter(uh => uh.userId === currentUserId && uh.status === "Interested")
    .map(uh => uh.hackathonId);

  const participatingHackathons = hackathons.filter(h => 
    participatingHackathonIds.includes(h.id)
  );

  const interestedHackathons = hackathons.filter(h => 
    interestedHackathonIds.includes(h.id)
  );

  const otherHackathons = hackathons.filter(h => 
    !participatingHackathonIds.includes(h.id) && !interestedHackathonIds.includes(h.id)
  );

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Hackathons</h1>
        <p className="text-gray-600">
          Find upcoming hackathons and connect with potential teammates.
        </p>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All Hackathons</TabsTrigger>
          <TabsTrigger value="participating">
            Participating 
            {participatingHackathons.length > 0 && (
              <Badge className="ml-2 bg-teamup-purple">{participatingHackathons.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="interested">
            Interested
            {interestedHackathons.length > 0 && (
              <Badge className="ml-2 bg-teamup-blue">{interestedHackathons.length}</Badge>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hackathons.map((hackathon) => (
              <HackathonCard key={hackathon.id} hackathon={hackathon} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="participating">
          {participatingHackathons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {participatingHackathons.map((hackathon) => (
                <HackathonCard key={hackathon.id} hackathon={hackathon} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-800 mb-2">Not participating in any hackathons yet</h3>
              <p className="text-gray-600">Join hackathons to see them listed here</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="interested">
          {interestedHackathons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interestedHackathons.map((hackathon) => (
                <HackathonCard key={hackathon.id} hackathon={hackathon} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-800 mb-2">No hackathons marked as interested</h3>
              <p className="text-gray-600">Explore hackathons and mark them as interested</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {otherHackathons.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Discover More Hackathons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherHackathons.map((hackathon) => (
              <HackathonCard key={hackathon.id} hackathon={hackathon} />
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default HackathonsPage;
