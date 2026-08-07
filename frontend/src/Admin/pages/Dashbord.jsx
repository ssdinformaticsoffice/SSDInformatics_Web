import {
  FileText,
  Users,
  MessageSquare,
  Briefcase,
} from "lucide-react";

const Dashboard = () => {
  const cards = [
    {
      title: "Total Pages",
      count: "6",
      icon: FileText,
    },
    {
      title: "Services",
      count: "9",
      icon: Briefcase,
    },
    {
      title: "Contact Messages",
      count: "24",
      icon: MessageSquare,
    },
    {
      title: "Users",
      count: "120",
      icon: Users,
    },
  ];

  return (
    <>
      {/* Cards */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        {cards.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="bg-white p-5 sm:p-6 rounded-2xl shadow hover:shadow-xl transition"
            >
              <Icon className="text-blue-700 mb-4" size={35} />

              <h3 className="text-gray-500">{item.title}</h3>

              <p className="text-3xl font-bold mt-2">{item.count}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="mt-8 sm:mt-10 bg-white rounded-2xl shadow p-5 sm:p-6">
        <h3 className="text-xl font-bold mb-5">Recent Activity</h3>

        <ul className="space-y-3 text-gray-600">
          <li>✔ New contact message received</li>
          <li>✔ Service page updated</li>
          <li>✔ About section modified</li>
        </ul>
      </div>
    </>
  );
};

export default Dashboard;