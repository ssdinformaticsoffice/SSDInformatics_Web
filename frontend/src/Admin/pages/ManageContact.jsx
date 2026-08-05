import { useEffect, useState } from "react";
import axios from "axios";

const ManageContact = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contact");
      setContacts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Manage Contact</h1>

      <p className="mb-6">
        Total Messages: <strong>{contacts.length}</strong>
      </p>

      <div className="md:hidden space-y-4">
        {contacts.map((item) => (
          <div
            key={item._id}
            className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-4 text-white"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="font-semibold break-words">{item.name}</h2>
                <p className="text-sm text-blue-100 break-words">{item.email}</p>
              </div>

              <span className="text-xs text-blue-100 flex-shrink-0">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="mt-4 grid gap-3 text-sm">
              <p className="break-words">
                <span className="font-semibold text-white">Phone: </span>
                {item.phone}
              </p>

              <p className="break-words">
                <span className="font-semibold text-white">Subject: </span>
                {item.subject}
              </p>

              <p className="break-words text-blue-100">
                <span className="font-semibold text-white">Message: </span>
                {item.message}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block overflow-x-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20">
        <table className="w-full min-w-[760px] text-left text-white">
          <thead className="bg-white/20">
            <tr>
              <th className="p-4 text-sm font-semibold">Name</th>
              <th className="p-4 text-sm font-semibold">Email</th>
              <th className="p-4 text-sm font-semibold">Phone</th>
              <th className="p-4 text-sm font-semibold">Subject</th>
              <th className="p-4 text-sm font-semibold">Message</th>
              <th className="p-4 text-sm font-semibold">Date</th>
            </tr>
          </thead>

          <tbody>
            {contacts.map((item) => (
              <tr
                key={item._id}
                className="border-t border-white/20 hover:bg-white/10 transition"
              >
                <td className="p-4 font-medium break-words">{item.name}</td>

                <td className="p-4 text-blue-100 break-words">{item.email}</td>

                <td className="p-4 break-words">{item.phone}</td>

                <td className="p-4 break-words">{item.subject}</td>

                <td className="p-4 max-w-xs text-blue-100 break-words">{item.message}</td>

                <td className="p-4">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageContact;
