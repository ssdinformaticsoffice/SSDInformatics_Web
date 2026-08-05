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
    footerText: ""
  });


  // get settings
  const fetchSettings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/settings"
      );

      if(res.data.data){
        setSettings(res.data.data);
      }

    } catch(error){
      console.log(error);
    }
  };


  useEffect(()=>{
    fetchSettings();
  },[]);



  const handleChange=(e)=>{
    setSettings({
      ...settings,
      [e.target.name]: e.target.value
    });
  };



  const handleSubmit=async(e)=>{
    e.preventDefault();

    try{

      await axios.post(
        "http://localhost:5000/api/settings",
        settings
      );

      alert("Settings Updated");

    }catch(error){
      console.log(error);
    }

  };



  return (

    <div className="p-4 sm:p-6 lg:p-8">

      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        Website Settings
      </h1>


      <form 
      onSubmit={handleSubmit}
      className="bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-2xl space-y-4 max-w-3xl"
      >


      {
        Object.keys(settings).map((key)=>(

          <input
          key={key}
          name={key}
          value={settings[key]}
          onChange={handleChange}
          placeholder={key}
          className="
          w-full min-h-11 p-3 rounded-lg
          bg-white/20
          text-white
          placeholder:text-blue-100
          border border-white/20
          "
          />

        ))
      }



      <button
      className="
      bg-blue-600 
      hover:bg-blue-700
      text-white
      w-full sm:w-auto px-6 py-3
      rounded-lg
      "
      >
        Save Settings
      </button>


      </form>

    </div>

  )
}

export default Settings;
