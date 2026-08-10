import {
  FileText,
  Users,
  MessageSquare,
  Briefcase,
  Activity,
  CheckCircle,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Zap,
  Shield,
  Database,
} from "lucide-react";

const Dashboard = () => {
  const cards = [
    {
      title: "Total Pages",
      count: "6",
      icon: FileText,
      trend: "+12%",
      color: "from-cyan-500 to-blue-600",
      bgColor: "bg-cyan-500/10",
      iconColor: "text-cyan-400",
    },
    {
      title: "Services",
      count: "9",
      icon: Briefcase,
      trend: "+8%",
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-400",
    },
    {
      title: "Contact Messages",
      count: "24",
      icon: MessageSquare,
      trend: "+5",
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-400",
    },
    {
      title: "Users",
      count: "120",
      icon: Users,
      trend: "+18%",
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      title: "New contact message received",
      time: "2 minutes ago",
      type: "message",
      status: "completed",
    },
    {
      id: 2,
      title: "Service page updated",
      time: "15 minutes ago",
      type: "update",
      status: "completed",
    },
    {
      id: 3,
      title: "About section modified",
      time: "1 hour ago",
      type: "edit",
      status: "completed",
    },
    {
      id: 4,
      title: "New user registered",
      time: "3 hours ago",
      type: "user",
      status: "pending",
    },
  ];

  const getStatusIcon = (status) => {
    return status === "completed" ? (
      <CheckCircle className="w-4 h-4 text-emerald-400" />
    ) : (
      <Clock className="w-4 h-4 text-amber-400" />
    );
  };

  const getStatusColor = (status) => {
    return status === "completed" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400";
  };

  return (
    <div className="w-full px-4 sm:px-5 md:px-6 lg:px-8 py-4 sm:py-5 md:py-6 lg:py-8 min-w-0 max-w-full overflow-x-hidden">
      
      {/* ================================
          PAGE HEADER
      ================================= */}
      
      <div className="mb-6 sm:mb-8 lg:mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Dashboard
            </h1>
            <p className="text-blue-200/50 text-sm sm:text-base mt-1">
              Welcome back! Here's what's happening with your website.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-blue-200/60 text-xs font-medium whitespace-nowrap">All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================================
          DASHBOARD CARDS - Glassmorphism
      ================================= */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-4
          sm:gap-5
          lg:gap-6
          w-full
          min-w-0
        "
      >
        {cards.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="
                group
                w-full
                min-w-0
                max-w-full
                relative
                overflow-hidden
                rounded-2xl
                transition-all
                duration-300
                hover:scale-[1.02]
                hover:shadow-2xl
                bg-[#0a1628]/60
                backdrop-blur-xl
                border
                border-blue-500/10
                shadow-lg
                hover:border-cyan-400/30
              "
            >
              {/* Card Background Gradient - Glass effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20`}></div>
              
              {/* Glass overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
              
              {/* Card Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Card Content */}
              <div className="relative p-4 sm:p-5 lg:p-6">
                {/* Top Row - Icon & Trend */}
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className={`p-2.5 sm:p-3 rounded-xl ${item.bgColor} backdrop-blur-sm border border-white/5`}>
                    <Icon
                      className={`${item.iconColor} w-5 h-5 sm:w-6 sm:h-6`}
                      strokeWidth={2}
                    />
                  </div>
                  <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full px-2.5 py-1 border border-white/5">
                    <TrendingUp className="w-3 h-3 text-white/70" />
                    <span className="text-white/70 text-xs font-medium">{item.trend}</span>
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="
                    text-blue-100/80
                    text-xs
                    sm:text-sm
                    font-medium
                    tracking-wide
                    uppercase
                    truncate
                  "
                >
                  {item.title}
                </h3>

                {/* Count & Action */}
                <div className="flex items-end justify-between mt-1 sm:mt-2">
                  <p
                    className="
                      text-2xl
                      sm:text-3xl
                      lg:text-4xl
                      font-bold
                      text-white
                      tracking-tight
                    "
                  >
                    {item.count}
                  </p>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="w-5 h-5 text-white/60" />
                  </div>
                </div>

                {/* Bottom Glow Line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================================
          RECENT ACTIVITY & STATS
      ================================= */}

      <div className="mt-6 sm:mt-8 lg:mt-10 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 w-full min-w-0">
        
        {/* Recent Activity - Takes 2 columns on large screens */}
        <div className="lg:col-span-2 w-full min-w-0">
          <div
            className="
              bg-[#0a1628]/60
              backdrop-blur-xl
              rounded-2xl
              shadow-xl
              border
              border-blue-500/10
              overflow-hidden
              w-full
              min-w-0
              max-w-full
            "
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 lg:p-6 border-b border-blue-500/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/10">
                  <Activity className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white">
                    Recent Activity
                  </h3>
                  <p className="text-blue-200/40 text-xs">
                    Latest updates from your website
                  </p>
                </div>
              </div>
              <button className="text-cyan-400/60 hover:text-cyan-400 text-xs font-medium transition-colors">
                View All
              </button>
            </div>

            {/* Activity List */}
            <ul className="divide-y divide-blue-500/5">
              {recentActivities.map((activity) => (
                <li
                  key={activity.id}
                  className="
                    flex
                    items-center
                    justify-between
                    p-4
                    sm:p-5
                    hover:bg-white/5
                    transition-colors
                    duration-200
                    group
                  "
                >
                  <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1">
                    <div className="mt-0.5 flex-shrink-0">
                      {getStatusIcon(activity.status)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm sm:text-base text-white/90 truncate">
                        {activity.title}
                      </p>
                      <p className="text-xs text-blue-200/40 mt-0.5">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-3">
                    <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full ${getStatusColor(activity.status)}`}>
                      {activity.status === "completed" ? "Completed" : "Pending"}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick Stats - Takes 1 column on large screens */}
        <div className="lg:col-span-1 w-full min-w-0">
          <div
            className="
              bg-[#0a1628]/60
              backdrop-blur-xl
              rounded-2xl
              shadow-xl
              border
              border-blue-500/10
              overflow-hidden
              w-full
              min-w-0
              max-w-full
              h-full
            "
          >
            {/* Header */}
            <div className="p-4 sm:p-5 lg:p-6 border-b border-blue-500/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/10">
                  <Zap className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white">
                    Quick Stats
                  </h3>
                  <p className="text-blue-200/40 text-xs">
                    System overview
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="p-4 sm:p-5 lg:p-6 space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-500/5 rounded-xl border border-blue-500/5 hover:border-cyan-400/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyan-500/10 rounded-lg">
                    <Database className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-blue-200/60 text-xs">Total Data</p>
                    <p className="text-white font-semibold text-sm">2.4 GB</p>
                  </div>
                </div>
                <span className="text-emerald-400 text-xs font-medium">+12%</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-500/5 rounded-xl border border-blue-500/5 hover:border-cyan-400/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <Shield className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-blue-200/60 text-xs">Security Score</p>
                    <p className="text-white font-semibold text-sm">98%</p>
                  </div>
                </div>
                <span className="text-emerald-400 text-xs font-medium">Excellent</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-500/5 rounded-xl border border-blue-500/5 hover:border-cyan-400/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-500/10 rounded-lg">
                    <Clock className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-blue-200/60 text-xs">Uptime</p>
                    <p className="text-white font-semibold text-sm">99.9%</p>
                  </div>
                </div>
                <span className="text-emerald-400 text-xs font-medium">Live</span>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-blue-200/40 mb-1.5">
                  <span>Storage Used</span>
                  <span>65%</span>
                </div>
                <div className="w-full h-1.5 bg-blue-500/10 rounded-full overflow-hidden">
                  <div className="h-full w-[65%] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================
          FOOTER NOTE
      ================================= */}
      
      <div className="mt-6 sm:mt-8 text-center">
        <p className="text-blue-200/20 text-[10px] sm:text-xs tracking-widest">
          © 2026 SSD INFORMATICS. All rights reserved.
        </p>
      </div>

    </div>
  );
};

export default Dashboard;