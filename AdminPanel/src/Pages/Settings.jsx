import { useEffect, useState } from "react";
import axios from "axios";

const Settings = () => {
  const [settings, setSettings] = useState({
    companyName: "",
    websiteName: "",
    email: "",
    phone: "",
    address: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    footerText: "",
  });

  // Get Settings
  const fetchSettings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/settings"
      );

      if (res.data.data) {
        setSettings(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/settings",
        settings
      );

      alert("Settings Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
        Website Settings
      </h1>

      <p className="text-slate-500 mt-2 mb-8">
        Manage your company details, contact information and social media links.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl bg-slate-900 rounded-2xl shadow-xl border border-slate-700 p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.keys(settings).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium text-slate-300 mb-2 capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </label>

              <input
                type="text"
                name={key}
                value={settings[key]}
                onChange={handleChange}
                placeholder={`Enter ${key.replace(/([A-Z])/g, " $1")}`}
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  bg-slate-800
                  border
                  border-slate-700
                  text-white
                  placeholder:text-slate-500
                  outline-none
                  transition
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/30
                "
              />
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              font-semibold
              px-8
              py-3
              rounded-xl
              transition
              shadow-lg
            "
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;