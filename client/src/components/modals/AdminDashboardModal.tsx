import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { SecretMessage, ServiceOrder } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface AdminDashboardModalProps {
  onClose: () => void;
}

export default function AdminDashboardModal({ onClose }: AdminDashboardModalProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("messages");
  const [messages, setMessages] = useLocalStorage<SecretMessage[]>("berlinnad_secretMessages", []);
  const [orders, setOrders] = useLocalStorage<ServiceOrder[]>("berlinnad_serviceOrders", []);

  const handleDeleteMessage = (id: string) => {
    setMessages(messages.filter(msg => msg.id !== id));
    toast({
      title: "Message deleted",
      description: "The message has been removed."
    });
  };

  const handleCompleteOrder = (id: string) => {
    setOrders(orders.map(order => 
      order.id === id ? {...order, completed: true} : order
    ));
    toast({
      title: "Order marked complete",
      description: "The service order has been marked as completed."
    });
  };

  const handleDeleteOrder = (id: string) => {
    setOrders(orders.filter(order => order.id !== id));
    toast({
      title: "Order deleted",
      description: "The order has been removed from the system."
    });
  };

  return (
    <Modal title="ADMIN DASHBOARD" onClose={onClose} maxWidth="max-w-3xl">
      <div className="flex mb-4 border-b border-gray-700">
        <button 
          className={`py-2 px-4 ${activeTab === "messages" ? "border-b-2 border-[#C41E3A]" : ""}`}
          onClick={() => setActiveTab("messages")}
        >
          Secret Messages
        </button>
        <button 
          className={`py-2 px-4 ${activeTab === "orders" ? "border-b-2 border-[#C41E3A]" : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          Service Orders
        </button>
      </div>
      
      {/* Secret Messages Tab */}
      {activeTab === "messages" && (
        <div className="space-y-4">
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div key={msg.id} className="bg-[#800020] bg-opacity-10 p-4 rounded-md">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400 text-sm">
                    Anonymous • {new Date(msg.date).toLocaleDateString()}
                  </span>
                  <div>
                    <button 
                      className="text-sm text-gray-400 hover:text-red-500 ml-2"
                      onClick={() => handleDeleteMessage(msg.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p>{msg.text}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No messages received yet.</p>
          )}
        </div>
      )}
      
      {/* Service Orders Tab */}
      {activeTab === "orders" && (
        <div className="space-y-4">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="bg-[#800020] bg-opacity-10 p-4 rounded-md">
                <div className="flex justify-between mb-2">
                  <span className="font-bold">{order.name}</span>
                  <span className="text-gray-400 text-sm">
                    {new Date(order.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="mb-1"><span className="text-gray-400">WhatsApp:</span> {order.whatsapp}</div>
                <div className="mb-1"><span className="text-gray-400">Service:</span> {order.service}</div>
                <p className="text-sm bg-gray-900 p-2 rounded mt-2">{order.details}</p>
                <div className="flex justify-end mt-3">
                  {!order.completed && (
                    <button 
                      className="text-sm text-gray-400 hover:text-green-500 mr-3"
                      onClick={() => handleCompleteOrder(order.id)}
                    >
                      Mark Complete
                    </button>
                  )}
                  <button 
                    className="text-sm text-gray-400 hover:text-red-500"
                    onClick={() => handleDeleteOrder(order.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No service orders received yet.</p>
          )}
        </div>
      )}
    </Modal>
  );
}
