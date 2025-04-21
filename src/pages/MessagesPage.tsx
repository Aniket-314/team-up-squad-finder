
import ConversationsList from "@/components/ConversationsList";
import Layout from "@/components/Layout";
import MessageThread from "@/components/MessageThread";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const MessagesPage = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const location = useLocation();

  // Check if a user ID was passed in the URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userParam = params.get("user");
    if (userParam) {
      setSelectedUserId(userParam);
    }
  }, [location]);

  return (
    <Layout className="max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Messages</h1>
        <p className="text-gray-600">
          Connect with potential teammates and discuss collaboration opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 h-[600px] mb-6">
        <div className="lg:col-span-1 h-full">
          <ConversationsList 
            selectedUserId={selectedUserId}
            onSelectUser={setSelectedUserId}
          />
        </div>
        <div className="lg:col-span-2 h-full">
          <MessageThread selectedUserId={selectedUserId} />
        </div>
      </div>
    </Layout>
  );
};

export default MessagesPage;
