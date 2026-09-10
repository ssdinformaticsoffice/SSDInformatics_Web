import { useEffect, useState } from "react";
import axios from "axios";

import {
  Mail,
  Clock,
  AlertCircle,
  CheckCircle,
  MessageCircle,
} from "lucide-react";

const ManageContact = () => {
  const [contacts, setContacts] = useState([]);

  // ================================
  // Fetch Contacts
  // ================================

  useEffect(() => {
    fetchContacts();
  }, []);


  const API_URL = import.meta.env.VITE_API_URL  ;
  
  const fetchContacts = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/contact`
      );

      setContacts(res.data.data || []);
    } catch (error) {
      console.log("Contact Fetch Error:", error);
    }
  };

  // ================================
  // Today's Messages
  // ================================

  const todaysMessages = contacts.filter(
    (contact) =>
      new Date(contact.createdAt).toDateString() ===
      new Date().toDateString()
  ).length;

  // ================================
  // Unread Messages
  // ================================

  const unreadMessages = contacts.filter(
    (contact) => !contact.read
  ).length;

  return (
    <div className="relative w-full min-h-full bg-[#0b1628] text-white overflow-hidden">

      {/* ================================
          Background Decoration
      ================================= */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div
          className="
            absolute
            -top-32
            -right-32
            w-72
            h-72
            bg-blue-600/10
            rounded-full
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-32
            -left-32
            w-80
            h-80
            bg-indigo-600/10
            rounded-full
            blur-3xl
          "
        />

        <div
          className="
            absolute
            top-40
            left-1/2
            -translate-x-1/2
            w-[500px]
            h-[500px]
            border
            border-blue-500/5
            rounded-full
          "
        />
      </div>

      {/* ================================
          Main Container
      ================================= */}

      <div
        className="
          relative
          z-10
          w-full
          max-w-none
          mx-auto
          px-3
          sm:px-4
          md:px-5
          lg:px-6
          xl:px-8
          py-4
          sm:py-5
          lg:py-6
        "
      >

        {/* ================================
            Header
        ================================= */}

        <div className="text-center mb-5 sm:mb-6 lg:mb-7">

          {/* Badge */}

          <div
            className="
              inline-flex
              items-center
              gap-2
              px-3
              py-1.5
              sm:px-4
              sm:py-2
              bg-white/5
              rounded-full
              border
              border-white/10
            "
          >
            <MessageCircle
              size={15}
              className="text-blue-400"
            />

            <span className="text-blue-200/70 text-xs sm:text-sm font-medium">
              Contact Messages
            </span>
          </div>

          {/* Heading */}

          <h1
            className="
              mt-3
              text-2xl
              sm:text-3xl
              md:text-4xl
              lg:text-5xl
              font-bold
              tracking-tight
            "
          >
            Contact{" "}
            <span
              className="
                text-transparent
                bg-clip-text
                bg-gradient-to-r
                from-blue-400
                to-indigo-400
              "
            >
              Management
            </span>
          </h1>

          {/* Description */}

          <p
            className="
              mt-2
              text-blue-200/50
              text-xs
              sm:text-sm
              md:text-base
              max-w-2xl
              mx-auto
              px-2
            "
          >
            Manage and view all incoming messages from
            your website visitors in one place.
          </p>

        </div>

        {/* ================================
            Stats Cards
        ================================= */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-3
            sm:gap-4
            mb-5
            sm:mb-6
          "
        >

          {/* Total Messages */}

          <div
            className="
              bg-[#172338]
              border
              border-white/10
              rounded-xl
              p-4
              sm:p-5
              shadow-lg
              min-w-0
            "
          >
            <div className="flex items-center justify-between gap-3">

              <div className="min-w-0">
                <p className="text-blue-200/50 text-xs sm:text-sm">
                  Total Messages
                </p>

                <p className="text-2xl sm:text-3xl font-bold mt-1">
                  {contacts.length}
                </p>
              </div>

              <div
                className="
                  w-10
                  h-10
                  sm:w-11
                  sm:h-11
                  bg-blue-500/20
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  flex-shrink-0
                "
              >
                <Mail
                  className="text-blue-400"
                  size={21}
                />
              </div>

            </div>
          </div>

          {/* Unread */}

          <div
            className="
              bg-[#172338]
              border
              border-white/10
              rounded-xl
              p-4
              sm:p-5
              shadow-lg
              min-w-0
            "
          >
            <div className="flex items-center justify-between gap-3">

              <div className="min-w-0">
                <p className="text-blue-200/50 text-xs sm:text-sm">
                  Unread
                </p>

                <p className="text-2xl sm:text-3xl font-bold mt-1">
                  {unreadMessages}
                </p>
              </div>

              <div
                className="
                  w-10
                  h-10
                  sm:w-11
                  sm:h-11
                  bg-yellow-500/20
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  flex-shrink-0
                "
              >
                <AlertCircle
                  className="text-yellow-400"
                  size={21}
                />
              </div>

            </div>
          </div>

          {/* Today's Messages */}

          <div
            className="
              bg-[#172338]
              border
              border-white/10
              rounded-xl
              p-4
              sm:p-5
              shadow-lg
              min-w-0
            "
          >
            <div className="flex items-center justify-between gap-3">

              <div className="min-w-0">
                <p className="text-blue-200/50 text-xs sm:text-sm">
                  Today's Messages
                </p>

                <p className="text-2xl sm:text-3xl font-bold mt-1">
                  {todaysMessages}
                </p>
              </div>

              <div
                className="
                  w-10
                  h-10
                  sm:w-11
                  sm:h-11
                  bg-green-500/20
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  flex-shrink-0
                "
              >
                <CheckCircle
                  className="text-green-400"
                  size={21}
                />
              </div>

            </div>
          </div>

          {/* Last Message */}

          <div
            className="
              bg-[#172338]
              border
              border-white/10
              rounded-xl
              p-4
              sm:p-5
              shadow-lg
              min-w-0
            "
          >
            <div className="flex items-center justify-between gap-3">

              <div className="min-w-0">

                <p className="text-blue-200/50 text-xs sm:text-sm">
                  Last Message
                </p>

                <p
                  className="
                    text-base
                    sm:text-lg
                    font-semibold
                    mt-1
                    truncate
                  "
                >
                  {contacts[0]?.name || "No messages"}
                </p>

              </div>

              <div
                className="
                  w-10
                  h-10
                  sm:w-11
                  sm:h-11
                  bg-purple-500/20
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  flex-shrink-0
                "
              >
                <Clock
                  className="text-purple-400"
                  size={21}
                />
              </div>

            </div>
          </div>

        </div>

        {/* ================================
            Recent Messages
        ================================= */}

        <div
          className="
            bg-[#172338]
            border
            border-white/10
            rounded-xl
            shadow-xl
            overflow-hidden
            w-full
          "
        >

          {/* Header */}

          <div
            className="
              px-4
              py-4
              sm:px-5
              sm:py-5
              border-b
              border-white/10
              flex
              items-center
              justify-between
              gap-3
            "
          >

            <div className="flex items-center gap-2 min-w-0">

              <Mail
                className="text-blue-400 flex-shrink-0"
                size={21}
              />

              <h2
                className="
                  text-base
                  sm:text-lg
                  font-bold
                  truncate
                "
              >
                Recent Messages
              </h2>

              <span
                className="
                  hidden
                  sm:inline-flex
                  text-xs
                  text-blue-200/50
                  bg-white/5
                  px-2.5
                  py-1
                  rounded-full
                  whitespace-nowrap
                "
              >
                {contacts.length} total
              </span>

            </div>

            <span
              className="
                sm:hidden
                text-xs
                text-blue-200/50
                bg-white/5
                px-2
                py-1
                rounded-full
                flex-shrink-0
              "
            >
              {contacts.length}
            </span>

          </div>

          {/* ================================
              Mobile Cards
          ================================= */}

          <div
            className="
              block
              md:hidden
              p-3
              sm:p-4
              space-y-3
            "
          >

            {contacts.slice(0, 5).map((item) => (

              <div
                key={item._id}
                className="
                  bg-[#1d2a3f]
                  border
                  border-white/10
                  rounded-xl
                  p-4
                  overflow-hidden
                "
              >

                {/* Name / Date */}

                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-3
                  "
                >

                  <div className="min-w-0">

                    <h3
                      className="
                        font-semibold
                        text-sm
                        sm:text-base
                        truncate
                      "
                    >
                      {item.name}
                    </h3>

                    <p
                      className="
                        text-xs
                        sm:text-sm
                        text-blue-200/50
                        truncate
                        mt-1
                      "
                    >
                      {item.email}
                    </p>

                  </div>

                  <span
                    className="
                      text-[10px]
                      sm:text-xs
                      text-blue-200/40
                      flex-shrink-0
                    "
                  >
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}
                  </span>

                </div>

                {/* Message */}

                <p
                  className="
                    mt-3
                    text-xs
                    sm:text-sm
                    text-blue-200/60
                    line-clamp-2
                    break-words
                  "
                >
                  {item.message}
                </p>

                {/* Subject / Phone */}

                <div
                  className="
                    mt-3
                    flex
                    flex-wrap
                    gap-2
                  "
                >

                  {item.subject && (
                    <span
                      className="
                        max-w-full
                        px-2
                        py-1
                        bg-white/5
                        rounded-lg
                        text-[10px]
                        sm:text-xs
                        text-blue-200/50
                        break-all
                      "
                    >
                      {item.subject}
                    </span>
                  )}

                  {item.phone && (
                    <span
                      className="
                        max-w-full
                        px-2
                        py-1
                        bg-white/5
                        rounded-lg
                        text-[10px]
                        sm:text-xs
                        text-blue-200/50
                        break-all
                      "
                    >
                      {item.phone}
                    </span>
                  )}

                </div>

              </div>

            ))}

            {contacts.length === 0 && (
              <div
                className="
                  py-10
                  text-center
                  text-blue-200/40
                  text-sm
                "
              >
                No messages received yet.
              </div>
            )}

          </div>

          {/* ================================
              Desktop Table
          ================================= */}

          <div className="hidden md:block w-full overflow-x-auto">

            <table
              className="
                w-full
                table-fixed
                text-left
                text-white
              "
            >

              <thead className="bg-white/10">

                <tr>

                  <th className="px-4 py-3 text-xs lg:text-sm font-semibold text-blue-200/60 w-[15%]">
                    Name
                  </th>

                  <th className="px-4 py-3 text-xs lg:text-sm font-semibold text-blue-200/60 w-[20%]">
                    Email
                  </th>

                  <th className="px-4 py-3 text-xs lg:text-sm font-semibold text-blue-200/60 w-[15%]">
                    Phone
                  </th>

                  <th className="px-4 py-3 text-xs lg:text-sm font-semibold text-blue-200/60 w-[15%]">
                    Subject
                  </th>

                  <th className="px-4 py-3 text-xs lg:text-sm font-semibold text-blue-200/60 w-[20%]">
                    Message
                  </th>

                  <th className="px-4 py-3 text-xs lg:text-sm font-semibold text-blue-200/60 w-[15%]">
                    Date
                  </th>

                </tr>

              </thead>

              <tbody>

                {contacts.map((item) => (

                  <tr
                    key={item._id}
                    className="
                      border-t
                      border-white/5
                      hover:bg-white/5
                      transition-colors
                    "
                  >

                    <td className="px-4 py-4 font-medium text-sm truncate">
                      {item.name}
                    </td>

                    <td className="px-4 py-4 text-blue-200/50 text-sm truncate">
                      {item.email}
                    </td>

                    <td className="px-4 py-4 text-blue-200/50 text-sm truncate">
                      {item.phone}
                    </td>

                    <td className="px-4 py-4 text-blue-200/50 text-sm truncate">
                      {item.subject}
                    </td>

                    <td className="px-4 py-4 text-blue-200/50 text-sm truncate">
                      {item.message}
                    </td>

                    <td className="px-4 py-4 text-blue-200/40 text-sm whitespace-nowrap">
                      {new Date(
                        item.createdAt
                      ).toLocaleDateString()}
                    </td>

                  </tr>

                ))}

                {contacts.length === 0 && (
                  <tr>

                    <td
                      colSpan="6"
                      className="
                        p-8
                        text-center
                        text-blue-200/40
                      "
                    >
                      No messages received yet.
                    </td>

                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ManageContact;