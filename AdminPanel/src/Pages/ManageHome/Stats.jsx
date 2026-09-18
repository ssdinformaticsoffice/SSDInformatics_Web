import React, { useState, useEffect } from "react";
import { Save } from "lucide-react";
import axios from "axios";

const Stats = () => {
  const [statsData, setStatsData] = useState({
    number: "",
    title: "",
    icon: "",
    order: "",
  });

  const [stats, setStats] = useState([]);

  const getStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/stats");
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  const handleChange = (e) => {
    setStatsData({
      ...statsData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/stats",
        statsData
      );

      alert(response.data.message || "Stats Added Successfully");

      getStats();

      setStatsData({
        number: "",
        title: "",
        icon: "",
        order: "",
      });
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">
          Manage Stats
        </h1>

        {/* Form */}
        <div className="bg-slate-800 rounded-3xl p-5 sm:p-8 border border-slate-700">

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              name="number"
              value={statsData.number}
              onChange={handleChange}
              placeholder="150+"
              className="w-full bg-slate-700 text-white p-3 rounded-xl border border-slate-600"
            />

            <input
              type="text"
              name="title"
              value={statsData.title}
              onChange={handleChange}
              placeholder="Projects Completed"
              className="w-full bg-slate-700 text-white p-3 rounded-xl border border-slate-600"
            />

            <input
              type="text"
              name="icon"
              value={statsData.icon}
              onChange={handleChange}
              placeholder="Briefcase"
              className="w-full bg-slate-700 text-white p-3 rounded-xl border border-slate-600"
            />

            <input
              type="number"
              name="order"
              value={statsData.order}
              onChange={handleChange}
              placeholder="1"
              className="w-full bg-slate-700 text-white p-3 rounded-xl border border-slate-600"
            />

            <button
              type="submit"
              className="flex min-h-12 items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
            >
              <Save size={20} />
              Save Stats
            </button>

          </form>

        </div>

        {/* Stats List */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {stats.map((item) => (
            <div
              key={item._id}
              className="bg-slate-800 p-5 sm:p-6 rounded-2xl text-white"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-blue-400">
                {item.number}
              </h2>

              <p className="mt-2 text-lg">
                {item.title}
              </p>

              <p className="text-sm text-slate-400 mt-2">
                Icon: {item.icon}
              </p>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default Stats;
