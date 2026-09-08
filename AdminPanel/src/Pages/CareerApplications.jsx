import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Search,
  Eye,
  Trash2,
  CheckCircle2,
  Clock3,
  XCircle,
  BriefcaseBusiness,
  MapPin,
  Mail,
  Phone,
  FileText,
  X,
  UserRound,
  CalendarDays,
  Loader2,
  Filter,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL  || "http://localhost:5000/api";


const STATUS_OPTIONS = [
  "Applied",
  "Shortlisted",
  "Interview",
  "Selected",
  "Rejected",
];

const getStatusClass = (status) => {
  switch (status) {
    case "Applied":
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";

    case "Shortlisted":
      return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";

    case "Interview":
      return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";

    case "Selected":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";

    case "Rejected":
      return "bg-red-500/10 text-red-400 border-red-500/20";

    default:
      return "bg-slate-500/10 text-slate-400 border-slate-500/20";
  }
};

const CareerApplications = () => {
  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(null);
  const [statusLoading, setStatusLoading] = useState(null);
  const [readLoading, setReadLoading] = useState(null);

  // =====================================================
  // Axios Config
  // =====================================================

  const getAuthConfig = () => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // =====================================================
  // Fetch Applications
  // =====================================================

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${API_URL}/career-applications`,
        getAuthConfig()
      );

      if (response.data.success) {
        setApplications(response.data.data || []);
      } else {
        setApplications([]);
      }
    } catch (err) {
      console.error("Fetch Applications Error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load career applications."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // =====================================================
  // Search + Filter
  // =====================================================

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        application.name?.toLowerCase().includes(searchText) ||
        application.email?.toLowerCase().includes(searchText) ||
        application.jobId?.title
          ?.toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        application.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, search, statusFilter]);

  // =====================================================
  // View Application
  // =====================================================

  const viewApplication = async (id) => {
    try {
      setViewLoading(true);

      const response = await axios.get(
        `${API_URL}/career-applications/${id}`,
        getAuthConfig()
      );

      if (response.data.success) {
        setSelectedApplication(response.data.data);

        // Mark as read automatically
        await markAsRead(id, false);
      }
    } catch (err) {
      console.error("View Application Error:", err);

      alert(
        err.response?.data?.message ||
          "Unable to load application."
      );
    } finally {
      setViewLoading(false);
    }
  };

  // =====================================================
  // Mark As Read
  // =====================================================

  const markAsRead = async (id, showLoader = true) => {
    try {
      if (showLoader) {
        setReadLoading(id);
      }

      const response = await axios.patch(
        `${API_URL}/career-applications/${id}/read`,
        {},
        getAuthConfig()
      );

      if (response.data.success) {
        setApplications((prev) =>
          prev.map((item) =>
            item._id === id
              ? {
                  ...item,
                  isRead: true,
                }
              : item
          )
        );

        setSelectedApplication((prev) =>
          prev?._id === id
            ? {
                ...prev,
                isRead: true,
              }
            : prev
        );
      }
    } catch (err) {
      console.error("Mark Read Error:", err);

      if (showLoader) {
        alert(
          err.response?.data?.message ||
            "Unable to mark application as read."
        );
      }
    } finally {
      if (showLoader) {
        setReadLoading(null);
      }
    }
  };

  // =====================================================
  // Update Status
  // =====================================================

  const updateStatus = async (id, status) => {
    try {
      setStatusLoading(id);

      const response = await axios.patch(
        `${API_URL}/career-applications/${id}/status`,
        {
          status,
        },
        getAuthConfig()
      );

      if (response.data.success) {
        const updatedApplication = response.data.data;

        setApplications((prev) =>
          prev.map((item) =>
            item._id === id
              ? updatedApplication
              : item
          )
        );

        setSelectedApplication((prev) =>
          prev?._id === id
            ? updatedApplication
            : prev
        );
      }
    } catch (err) {
      console.error("Update Status Error:", err);

      alert(
        err.response?.data?.message ||
          "Unable to update application status."
      );
    } finally {
      setStatusLoading(null);
    }
  };

  // =====================================================
  // Delete Application
  // =====================================================

  const deleteApplication = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmed) return;

    try {
      setDeleteLoading(id);

      const response = await axios.delete(
        `${API_URL}/career-applications/${id}`,
        getAuthConfig()
      );

      if (response.data.success) {
        setApplications((prev) =>
          prev.filter((item) => item._id !== id)
        );

        if (selectedApplication?._id === id) {
          setSelectedApplication(null);
        }
      }
    } catch (err) {
      console.error("Delete Application Error:", err);

      alert(
        err.response?.data?.message ||
          "Unable to delete application."
      );
    } finally {
      setDeleteLoading(null);
    }
  };

  // =====================================================
  // Statistics
  // =====================================================

  const totalApplications = applications.length;

  const unreadApplications = applications.filter(
    (item) => !item.isRead
  ).length;

  const shortlistedApplications = applications.filter(
    (item) => item.status === "Shortlisted"
  ).length;

  const selectedApplications = applications.filter(
    (item) => item.status === "Selected"
  ).length;

  // =====================================================
  // Loading
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-full bg-[#0b1628] p-5 sm:p-6 lg:p-8">
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <Loader2
              size={20}
              className="animate-spin text-blue-400"
            />
            Loading applications...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#0b1628] p-4 sm:p-6 lg:p-8">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-7">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[3px] text-cyan-400">
              Recruitment
            </p>

            <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">
              Career Applications
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Manage job applications, review candidates and
              update application status.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">
            <BriefcaseBusiness
              size={18}
              className="text-blue-400"
            />

            <span className="text-sm font-semibold text-slate-300">
              {totalApplications} Applications
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-red-500/20 bg-red-500/5 px-5 py-4">
          <p className="text-sm text-red-300">{error}</p>

          <button
            type="button"
            onClick={fetchApplications}
            className="rounded-lg bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-500/20"
          >
            Retry
          </button>
        </div>
      )}

      {/* =====================================================
          STAT CARDS
      ===================================================== */}

      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total */}

        <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">
                Total Applications
              </p>

              <h3 className="mt-2 text-3xl font-black text-white">
                {totalApplications}
              </h3>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <BriefcaseBusiness size={20} />
            </div>
          </div>
        </div>

        {/* Unread */}

        <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">
                Unread
              </p>

              <h3 className="mt-2 text-3xl font-black text-white">
                {unreadApplications}
              </h3>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400">
              <Clock3 size={20} />
            </div>
          </div>
        </div>

        {/* Shortlisted */}

        <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">
                Shortlisted
              </p>

              <h3 className="mt-2 text-3xl font-black text-white">
                {shortlistedApplications}
              </h3>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
              <CheckCircle2 size={20} />
            </div>
          </div>
        </div>

        {/* Selected */}

        <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">
                Selected
              </p>

              <h3 className="mt-2 text-3xl font-black text-white">
                {selectedApplications}
              </h3>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          FILTER BAR
      ===================================================== */}

      <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
        <div className="flex flex-col gap-3 lg:flex-row">
          {/* Search */}

          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search by name, email or job..."
              className="w-full rounded-xl border border-slate-800 bg-slate-900 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/50"
            />
          </div>

          {/* Status */}

          <div className="relative lg:w-56">
            <Filter
              size={17}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              className="w-full appearance-none rounded-xl border border-slate-800 bg-slate-900 py-3 pl-10 pr-4 text-sm text-white outline-none transition focus:border-blue-500/50"
            >
              <option value="All">All Status</option>

              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* =====================================================
          TABLE
      ===================================================== */}

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/50">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px]">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60">
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Candidate
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Position
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Experience
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Applied
                </th>

                <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredApplications.length > 0 ? (
                filteredApplications.map((application) => (
                  <tr
                    key={application._id}
                    className={`border-b border-slate-800/70 transition hover:bg-slate-900/60 ${
                      !application.isRead
                        ? "bg-blue-500/[0.025]"
                        : ""
                    }`}
                  >
                    {/* Candidate */}

                    <td className="px-5 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                          <UserRound size={19} />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="truncate text-sm font-bold text-white">
                              {application.name}
                            </p>

                            {!application.isRead && (
                              <span className="h-2 w-2 shrink-0 rounded-full bg-blue-400" />
                            )}
                          </div>

                          <p className="mt-1 truncate text-xs text-slate-500">
                            {application.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Position */}

                    <td className="px-5 py-5">
                      <p className="text-sm font-semibold text-slate-300">
                        {application.jobId?.title ||
                          "Unknown Position"}
                      </p>

                      <p className="mt-1 text-xs text-slate-600">
                        {application.jobId?.department ||
                          "—"}
                      </p>
                    </td>

                    {/* Experience */}

                    <td className="px-5 py-5">
                      <span className="text-sm text-slate-400">
                        {application.experience}
                      </span>
                    </td>

                    {/* Status */}

                    <td className="px-5 py-5">
                      <select
                        value={application.status}
                        disabled={
                          statusLoading === application._id
                        }
                        onChange={(event) =>
                          updateStatus(
                            application._id,
                            event.target.value
                          )
                        }
                        className={`rounded-full border px-3 py-1.5 text-xs font-bold outline-none ${getStatusClass(
                          application.status
                        )} ${
                          statusLoading ===
                          application._id
                            ? "cursor-wait opacity-60"
                            : "cursor-pointer"
                        }`}
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option
                            key={status}
                            value={status}
                            className="bg-slate-900 text-white"
                          >
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Applied */}

                    <td className="px-5 py-5">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <CalendarDays size={14} />

                        {new Date(
                          application.createdAt
                        ).toLocaleDateString()}
                      </div>
                    </td>

                    {/* Actions */}

                    <td className="px-5 py-5">
                      <div className="flex items-center justify-end gap-2">
                        {/* View */}

                        <button
                          type="button"
                          onClick={() =>
                            viewApplication(
                              application._id
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400"
                          title="View Application"
                        >
                          <Eye size={17} />
                        </button>

                        {/* Read */}

                        {!application.isRead && (
                          <button
                            type="button"
                            onClick={() =>
                              markAsRead(
                                application._id
                              )
                            }
                            disabled={
                              readLoading ===
                              application._id
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 transition hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-400 disabled:opacity-50"
                            title="Mark as Read"
                          >
                            {readLoading ===
                            application._id ? (
                              <Loader2
                                size={16}
                                className="animate-spin"
                              />
                            ) : (
                              <CheckCircle2 size={17} />
                            )}
                          </button>
                        )}

                        {/* Delete */}

                        <button
                          type="button"
                          onClick={() =>
                            deleteApplication(
                              application._id
                            )
                          }
                          disabled={
                            deleteLoading ===
                            application._id
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                          title="Delete Application"
                        >
                          {deleteLoading ===
                          application._id ? (
                            <Loader2
                              size={16}
                              className="animate-spin"
                            />
                          ) : (
                            <Trash2 size={17} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-20 text-center"
                  >
                    <div className="flex flex-col items-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-slate-600">
                        <BriefcaseBusiness size={25} />
                      </div>

                      <h3 className="mt-4 text-base font-bold text-slate-300">
                        No Applications Found
                      </h3>

                      <p className="mt-2 text-sm text-slate-600">
                        Try changing your search or status
                        filter.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* =====================================================
          APPLICATION MODAL
      ===================================================== */}

      {selectedApplication && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-700 bg-[#07101f] shadow-2xl">
            {/* Header */}

            <div className="flex items-start justify-between border-b border-slate-800 px-5 py-5 sm:px-7">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[2px] text-cyan-400">
                  Job Application
                </p>

                <h2 className="mt-2 truncate text-2xl font-black text-white">
                  {selectedApplication.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedApplication.jobId?.title ||
                    "Unknown Position"}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedApplication(null)
                }
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 transition hover:text-white"
              >
                <X size={19} />
              </button>
            </div>

            {/* Body */}

            <div className="max-h-[calc(90vh-100px)] overflow-y-auto p-5 sm:p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Email */}

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="flex items-center gap-3">
                    <Mail
                      size={18}
                      className="text-blue-400"
                    />

                    <div className="min-w-0">
                      <p className="text-xs text-slate-600">
                        Email
                      </p>

                      <p className="mt-1 break-all text-sm font-medium text-slate-300">
                        {selectedApplication.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone */}

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="flex items-center gap-3">
                    <Phone
                      size={18}
                      className="text-cyan-400"
                    />

                    <div>
                      <p className="text-xs text-slate-600">
                        Phone
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-300">
                        {selectedApplication.phone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Position */}

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="flex items-center gap-3">
                    <BriefcaseBusiness
                      size={18}
                      className="text-blue-400"
                    />

                    <div>
                      <p className="text-xs text-slate-600">
                        Position
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-300">
                        {selectedApplication.jobId
                          ?.title || "—"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Location */}

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="flex items-center gap-3">
                    <MapPin
                      size={18}
                      className="text-emerald-400"
                    />

                    <div>
                      <p className="text-xs text-slate-600">
                        Location
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-300">
                        {selectedApplication.jobId
                          ?.location || "—"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Experience */}

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <div>
                    <p className="text-xs text-slate-600">
                      Candidate Experience
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-300">
                      {selectedApplication.experience}
                    </p>
                  </div>
                </div>

                {/* Status */}

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs text-slate-600">
                    Application Status
                  </p>

                  <div className="mt-2">
                    <select
                      value={
                        selectedApplication.status
                      }
                      disabled={
                        statusLoading ===
                        selectedApplication._id
                      }
                      onChange={(event) =>
                        updateStatus(
                          selectedApplication._id,
                          event.target.value
                        )
                      }
                      className={`rounded-full border px-3 py-1.5 text-xs font-bold outline-none ${getStatusClass(
                        selectedApplication.status
                      )}`}
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option
                          key={status}
                          value={status}
                          className="bg-slate-900 text-white"
                        >
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Resume */}

              <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                      <FileText size={20} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-slate-600">
                        Resume
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-slate-300">
                        {selectedApplication.resume
                          ?.fileName || "Resume"}
                      </p>
                    </div>
                  </div>

                  {selectedApplication.resume
                    ?.fileUrl && (
                    <a
                      href={
                        selectedApplication.resume
                          .fileUrl
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5"
                    >
                      <FileText size={17} />
                      View Resume
                    </a>
                  )}
                </div>
              </div>

              {/* Cover Letter */}

              <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Cover Letter
                </p>

                <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-400">
                  {selectedApplication.coverLetter}
                </p>
              </div>

              {/* Job Details */}

              <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Job Details
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-slate-600">
                      Department
                    </p>

                    <p className="mt-1 text-sm text-slate-300">
                      {selectedApplication.jobId
                        ?.department || "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-600">
                      Job Type
                    </p>

                    <p className="mt-1 text-sm text-slate-300">
                      {selectedApplication.jobId
                        ?.type || "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-600">
                      Required Experience
                    </p>

                    <p className="mt-1 text-sm text-slate-300">
                      {selectedApplication.jobId
                        ?.experience || "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-600">
                      Applied On
                    </p>

                    <p className="mt-1 text-sm text-slate-300">
                      {new Date(
                        selectedApplication.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>

                {selectedApplication.jobId
                  ?.description && (
                  <div className="mt-5 border-t border-slate-800 pt-5">
                    <p className="text-xs text-slate-600">
                      Job Description
                    </p>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {
                        selectedApplication.jobId
                          .description
                      }
                    </p>
                  </div>
                )}

                {selectedApplication.jobId?.skills
                  ?.length > 0 && (
                  <div className="mt-5">
                    <p className="text-xs text-slate-600">
                      Skills
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedApplication.jobId.skills.map(
                        (skill) => (
                          <span
                            key={skill}
                            className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-400"
                          >
                            {skill}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Delete */}

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() =>
                    deleteApplication(
                      selectedApplication._id
                    )
                  }
                  disabled={
                    deleteLoading ===
                    selectedApplication._id
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-5 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
                >
                  {deleteLoading ===
                  selectedApplication._id ? (
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                  ) : (
                    <Trash2 size={17} />
                  )}

                  Delete Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerApplications;