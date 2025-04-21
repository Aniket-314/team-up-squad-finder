
import Layout from "@/components/Layout";
import UserCard from "@/components/UserCard";
import UserFilters from "@/components/UserFilters";
import { useApp } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { filteredUsers } = useApp();
  const navigate = useNavigate();

  const handleSendMessage = (userId: string) => {
    navigate(`/messages?user=${userId}`);
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Find Your Perfect Teammate</h1>
        <p className="text-gray-600">
          Connect with skilled hackers, designers, and innovators for your next hackathon.
        </p>
      </div>

      <UserFilters />

      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onSendMessage={handleSendMessage}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-800 mb-2">No matches found</h3>
          <p className="text-gray-600">Try adjusting your filters to find more teammates</p>
        </div>
      )}
    </Layout>
  );
};

export default Index;
