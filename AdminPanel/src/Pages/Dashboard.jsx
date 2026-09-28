import { useEffect, useState } from "react";
import axios from "axios";

import {
  Users,
  MessageSquare,
  Briefcase,
  Activity,
  CheckCircle,
  ArrowUpRight,
  TrendingUp,
  Zap,
  GitBranch,
} from "lucide-react";

const Dashboard = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [dashboardData, setDashboardData] = useState({
    contacts: 0,
    applications: 0,
    careers: 0,
    team: 0,
    branches: 0,
  });

  const [loading, setLoading] = useState(true);

  // ================================
  // Auth Config
  // ================================

  const getAuthConfig = () => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // ================================
  // Fetch Dashboard Data
  // ================================

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [
        contactsResponse,
        applicationsResponse,
        careersResponse,
        teamResponse,
        branchesResponse,
      ] = await Promise.all([
        axios.get(`${API_URL}/contact`),

        axios.get(
          `${API_URL}/career-applications`,
          getAuthConfig()
        ),

        axios.get(
          `${API_URL}/careers/all`,
          getAuthConfig()
        ),

        axios.get(
          `${API_URL}/team/all`,
          getAuthConfig()
        ),

        axios.get(
          `${API_URL}/branches/all`,
          getAuthConfig()
        ),
      ]);

      setDashboardData({
        contacts: contactsResponse.data?.data?.length || 0,
        applications:
          applicationsResponse.data?.data?.length || 0,
        careers: careersResponse.data?.data?.length || 0,
        team: teamResponse.data?.data?.length || 0,
        branches: branchesResponse.data?.data?.length || 0,
      });
    } catch (error) {
      console.error(
        "Dashboard Data Fetch Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // ================================
  // Dashboard Cards
  // ================================

  const cards = [
    {
      title: "Contact Messages",
      count: loading ? "..." : dashboardData.contacts,
      icon: MessageSquare,
      trend: "Live",
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-400",
    },
    {
      title: "Career Applications",
      count: loading ? "..." : dashboardData.applications,
      icon: Briefcase,
      trend: "Live",
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-400",
    },
    {
      title: "Careers",
      count: loading ? "..." : dashboardData.careers,
      icon: Briefcase,
      trend: "Live",
      color: "from-cyan-500 to-blue-600",
      bgColor: "bg-cyan-500/10",
      iconColor: "text-cyan-400",
    },
    {
      title: "Team Members",
      count: loading ? "..." : dashboardData.team,
      icon: Users,
      trend: "Live",
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
    },
    {
      title: "Branches",
      count: loading ? "..." : dashboardData.branches,
      icon: GitBranch,
      trend: "Live",
      color: "from-orange-500 to-amber-600",
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-400",
    },
  ];

  // ================================
  // Recent Activity
  // ================================

  const recentActivities = [
    {
      id: 1,
      title: "Contact messages",
      time: `${dashboardData.contacts} total messages`,
      status: "completed",
    },
    {
      id: 2,
      title: "Career applications",
      time: `${dashboardData.applications} total applications`,
      status: "completed",
    },
    {
      id: 3,
      title: "Career positions",
      time: `${dashboardData.careers} total positions`,
      status: "completed",
    },
    {
      id: 4,
      title: "Team members",
      time: `${dashboardData.team} total members`,
      status: "completed",
    },
    {
      id: 5,
      title: "Branches",
      time: `${dashboardData.branches} total branches`,
      status: "completed",
    },
  ];

  // ================================
  // Status Icon
  // ================================

  const getStatusIcon = (status) => {
    return status === "completed" ? (
      <CheckCircle className="w-4 h-4 text-emerald-400" />
    ) : null;
  };

  // ================================
  // Status Color
  // ================================

  const getStatusColor = (status) => {
    return status === "completed"
      ? "bg-emerald-500/10 text-emerald-400"
      : "bg-amber-500/10 text-amber-400";
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

              <span className="text-blue-200/60 text-xs font-medium whitespace-nowrap">
                All Systems Operational
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================================
          DASHBOARD CARDS
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
              {/* Card Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20`}
              ></div>

              {/* Glass Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>

              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Card Content */}
              <div className="relative p-4 sm:p-5 lg:p-6">

                {/* Icon & Trend */}
                <div className="flex items-start justify-between mb-3 sm:mb-4">

                  <div
                    className={`p-2.5 sm:p-3 rounded-xl ${item.bgColor} backdrop-blur-sm border border-white/5`}
                  >
                    <Icon
                      className={`${item.iconColor} w-5 h-5 sm:w-6 sm:h-6`}
                      strokeWidth={2}
                    />
                  </div>

                  <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full px-2.5 py-1 border border-white/5">
                    <TrendingUp className="w-3 h-3 text-white/70" />

                    <span className="text-white/70 text-xs font-medium">
                      {item.trend}
                    </span>
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

                {/* Count */}
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

                {/* Bottom Glow */}
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

        {/* Recent Activity */}

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
                    Overview of your active modules
                  </p>
                </div>

              </div>

            </div>

            {/* Activities */}

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

                    <span
                      className={`text-[10px] font-medium px-2.5 py-1 rounded-full ${getStatusColor(
                        activity.status
                      )}`}
                    >
                      Active
                    </span>

                  </div>

                </li>
              ))}

            </ul>
          </div>
        </div>

        {/* Quick Stats */}

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
                    Active modules overview
                  </p>
                </div>

              </div>

            </div>

            {/* Stats */}

            <div className="p-4 sm:p-5 lg:p-6 space-y-4">

              {/* Contact */}

              <div className="flex items-center justify-between p-3 bg-blue-500/5 rounded-xl border border-blue-500/5 hover:border-cyan-400/20 transition-colors">

                <div className="flex items-center gap-3">

                  <div className="p-2 bg-cyan-500/10 rounded-lg">
                    <MessageSquare className="w-4 h-4 text-cyan-400" />
                  </div>

                  <div>
                    <p className="text-blue-200/60 text-xs">
                      Contact Messages
                    </p>

                    <p className="text-white font-semibold text-sm">
                      {loading ? "..." : dashboardData.contacts}
                    </p>
                  </div>

                </div>

                <span className="text-emerald-400 text-xs font-medium">
                  Live
                </span>

              </div>

              {/* Applications */}

              <div className="flex items-center justify-between p-3 bg-blue-500/5 rounded-xl border border-blue-500/5 hover:border-cyan-400/20 transition-colors">

                <div className="flex items-center gap-3">

                  <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <Briefcase className="w-4 h-4 text-emerald-400" />
                  </div>

                  <div>
                    <p className="text-blue-200/60 text-xs">
                      Career Applications
                    </p>

                    <p className="text-white font-semibold text-sm">
                      {loading ? "..." : dashboardData.applications}
                    </p>
                  </div>

                </div>

                <span className="text-emerald-400 text-xs font-medium">
                  Live
                </span>

              </div>

              {/* Careers */}

              <div className="flex items-center justify-between p-3 bg-blue-500/5 rounded-xl border border-blue-500/5 hover:border-cyan-400/20 transition-colors">

                <div className="flex items-center gap-3">

                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Briefcase className="w-4 h-4 text-purple-400" />
                  </div>

                  <div>
                    <p className="text-blue-200/60 text-xs">
                      Career Positions
                    </p>

                    <p className="text-white font-semibold text-sm">
                      {loading ? "..." : dashboardData.careers}
                    </p>
                  </div>

                </div>

                <span className="text-emerald-400 text-xs font-medium">
                  Live
                </span>

              </div>

              {/* Team */}

              <div className="flex items-center justify-between p-3 bg-blue-500/5 rounded-xl border border-blue-500/5 hover:border-cyan-400/20 transition-colors">

                <div className="flex items-center gap-3">

                  <div className="p-2 bg-amber-500/10 rounded-lg">
                    <Users className="w-4 h-4 text-amber-400" />
                  </div>

                  <div>
                    <p className="text-blue-200/60 text-xs">
                      Team Members
                    </p>

                    <p className="text-white font-semibold text-sm">
                      {loading ? "..." : dashboardData.team}
                    </p>
                  </div>

                </div>

                <span className="text-emerald-400 text-xs font-medium">
                  Live
                </span>

              </div>

              {/* Branches */}

              <div className="flex items-center justify-between p-3 bg-blue-500/5 rounded-xl border border-blue-500/5 hover:border-cyan-400/20 transition-colors">

                <div className="flex items-center gap-3">

                  <div className="p-2 bg-orange-500/10 rounded-lg">
                    <GitBranch className="w-4 h-4 text-orange-400" />
                  </div>

                  <div>
                    <p className="text-blue-200/60 text-xs">
                      Branches
                    </p>

                    <p className="text-white font-semibold text-sm">
                      {loading ? "..." : dashboardData.branches}
                    </p>
                  </div>

                </div>

                <span className="text-emerald-400 text-xs font-medium">
                  Live
                </span>

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