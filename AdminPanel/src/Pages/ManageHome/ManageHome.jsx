import { useState } from "react";
import { Save, Image, Link, Type, FileText } from "lucide-react";
import axios from "axios";
import Stats from "./Stats";


const ManageHome = () => {
  const [homeData, setHomeData] = useState({
    title: "",
    description: "",
    image: "",
    buttonText: "",
    buttonLink: "",
  });

  const handleChange = (e) => {
    setHomeData({
      ...homeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/home",
        homeData,
      );

      alert(response.data.message);

      setHomeData({
        title: "",
        description: "",
        image: "",
        buttonText: "",
        buttonLink: "",
      });
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Manage Home Page</h1>

          <p className="text-slate-400 mt-2">
            Update your website homepage content from admin panel
          </p>
        </div>

        {/* Form Card */}

        <div className="bg-slate-800 rounded-3xl shadow-2xl p-5 sm:p-8 border border-slate-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}

            <div>
              <label className="text-slate-200 font-medium flex items-center gap-2">
                <Type size={18} />
                Hero Title
              </label>

              <input
                name="title"
                value={homeData.title}
                onChange={handleChange}
                placeholder="Enter hero title"
                className="w-full mt-3 bg-slate-700 text-white placeholder-slate-400 border border-slate-600 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description */}

            <div>
              <label className="text-slate-200 font-medium flex items-center gap-2">
                <FileText size={18} />
                Description
              </label>

              <textarea
                name="description"
                value={homeData.description}
                onChange={handleChange}
                placeholder="Enter homepage description"
                rows="5"
                className="w-full mt-3 bg-slate-700 text-white placeholder-slate-400 border border-slate-600 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Image */}

            <div>
              <label className="text-slate-200 font-medium flex items-center gap-2">
                <Image size={18} />
                Hero Image URL
              </label>

              <input
                name="image"
                value={homeData.image}
                onChange={handleChange}
                placeholder="Paste image URL"
                className="w-full mt-3 bg-slate-700 text-white placeholder-slate-400 border border-slate-600 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Button */}

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-slate-200 font-medium">
                  Button Text
                </label>

                <input
                  name="buttonText"
                  value={homeData.buttonText}
                  onChange={handleChange}
                  placeholder="Contact Us"
                  className="w-full mt-3 bg-slate-700 text-white placeholder-slate-400 border border-slate-600 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-slate-200 font-medium flex items-center gap-2">
                  <Link size={18} />
                  Button Link
                </label>

                <input
                  name="buttonLink"
                  value={homeData.buttonLink}
                  onChange={handleChange}
                  placeholder="/contact"
                  className="w-full mt-3 bg-slate-700 text-white placeholder-slate-400 border border-slate-600 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Save Button */}

            <button
              type="submit"
              className="flex min-h-12 items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
            >
              <Save size={20} />
              Save Changes
            </button>
          </form>
        </div>
       <Stats/>
      </div>
    </div>
  );
};

export default ManageHome;

