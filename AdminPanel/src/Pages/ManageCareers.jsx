import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  BriefcaseBusiness,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  MapPin,
  Building2,
  Clock3,
  UserRound,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL  ;

const initialForm = {
  title: "",
  department: "",
  location: "",
  type: "",
  experience: "",
  description: "",
  skills: "",
  status: "open",
};

const ManageCareers = () => {
  const [careers, setCareers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);

  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCareer, setEditingCareer] = useState(null);

  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState("");

  // =====================================================
  // Auth Config
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
  // Fetch All Careers
  // =====================================================

  const fetchCareers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${API_URL}/careers/all`,
        getAuthConfig()
      );

      if (response.data.success) {
        setCareers(response.data.data || []);
      } else {
        setCareers([]);
      }
    } catch (error) {
      console.error("Fetch Careers Error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load career positions."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  // =====================================================
  // Search
  // =====================================================

  const filteredCareers = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) {
      return careers;
    }

    return careers.filter((career) => {
      return (
        career.title?.toLowerCase().includes(searchText) ||
        career.department?.toLowerCase().includes(searchText) ||
        career.location?.toLowerCase().includes(searchText) ||
        career.type?.toLowerCase().includes(searchText)
      );
    });
  }, [careers, search]);

  // =====================================================
  // Open Add Modal
  // =====================================================

  const openAddModal = () => {
    setEditingCareer(null);
    setForm(initialForm);
    setFormError("");
    setIsModalOpen(true);
  };

  // =====================================================
  // Open Edit Modal
  // =====================================================

  const openEditModal = (career) => {
    setEditingCareer(career);

    setForm({
      title: career.title || "",
      department: career.department || "",
      location: career.location || "",
      type: career.type || "",
      experience: career.experience || "",
      description: career.description || "",
      skills: Array.isArray(career.skills)
        ? career.skills.join(", ")
        : "",
      status: career.status || "open",
    });

    setFormError("");
    setIsModalOpen(true);
  };

  // =====================================================
  // Close Modal
  // =====================================================

  const closeModal = () => {
    if (submitLoading) return;

    setIsModalOpen(false);
    setEditingCareer(null);
    setForm(initialForm);
    setFormError("");
  };

  // =====================================================
  // Handle Input
  // =====================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formError) {
      setFormError("");
    }
  };

  // =====================================================
  // Submit Career
  // =====================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !form.title.trim() ||
      !form.department.trim() ||
      !form.location.trim() ||
      !form.type.trim() ||
      !form.experience.trim() ||
      !form.description.trim() ||
      !form.skills.trim()
    ) {
      setFormError("Please fill all required fields.");
      return;
    }

    const skills = form.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    if (skills.length === 0) {
      setFormError("Please add at least one skill.");
      return;
    }

    try {
      setSubmitLoading(true);
      setFormError("");

      const payload = {
        title: form.title.trim(),
        department: form.department.trim(),
        location: form.location.trim(),
        type: form.type.trim(),
        experience: form.experience.trim(),
        description: form.description.trim(),
        skills,
        status: form.status,
      };

      let response;

      // Edit
      if (editingCareer) {
        response = await axios.patch(
          `${API_URL}/careers/${editingCareer._id}`,
          payload,
          getAuthConfig()
        );
      }

      // Create
      else {
        response = await axios.post(
          `${API_URL}/careers`,
          payload,
          getAuthConfig()
        );
      }

      if (response.data.success) {
        if (editingCareer) {
          setCareers((prev) =>
            prev.map((career) =>
              career._id === editingCareer._id
                ? response.data.data
                : career
            )
          );
        } else {
          setCareers((prev) => [
            response.data.data,
            ...prev,
          ]);
        }

        closeModal();
      }
    } catch (error) {
      console.error("Save Career Error:", error);

      setFormError(
        error.response?.data?.message ||
          "Unable to save career position."
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  // =====================================================
  // Delete Career
  // =====================================================

  const deleteCareer = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this career position?"
    );

    if (!confirmed) return;

    try {
      setDeleteLoading(id);

      const response = await axios.delete(
        `${API_URL}/careers/${id}`,
        getAuthConfig()
      );

      if (response.data.success) {
        setCareers((prev) =>
          prev.filter((career) => career._id !== id)
        );
      }
    } catch (error) {
      console.error("Delete Career Error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to delete career position."
      );
    } finally {
      setDeleteLoading(null);
    }
  };

  // =====================================================
  // Statistics
  // =====================================================

  const totalCareers = careers.length;

  const openCareers = careers.filter(
    (career) => career.status === "open"
  ).length;

  const closedCareers = careers.filter(
    (career) => career.status === "closed"
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
            Loading career positions...
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
              Manage Careers
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Create and manage the job positions displayed on
              the public career page.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/10 transition hover:-translate-y-0.5 hover:shadow-cyan-500/20"
          >
            <Plus size={18} />
            Add New Job
          </button>
        </div>
      </div>

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-red-500/20 bg-red-500/5 px-5 py-4">
          <p className="text-sm text-red-300">
            {error}
          </p>

          <button
            type="button"
            onClick={fetchCareers}
            className="rounded-lg bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-300 hover:bg-red-500/20"
          >
            Retry
          </button>
        </div>
      )}

      {/* =====================================================
          STATS
      ===================================================== */}

      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500">
                Total Positions
              </p>

              <h3 className="mt-2 text-3xl font-black text-white">
                {totalCareers}
              </h3>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <BriefcaseBusiness size={20} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500">
                Open Positions
              </p>

              <h3 className="mt-2 text-3xl font-black text-white">
                {openCareers}
              </h3>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 size={20} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500">
                Closed Positions
              </p>

              <h3 className="mt-2 text-3xl font-black text-white">
                {closedCareers}
              </h3>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
              <XCircle size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          SEARCH
      ===================================================== */}

      <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
        <div className="relative">
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
            placeholder="Search jobs by title, department, location..."
            className="w-full rounded-xl border border-slate-800 bg-slate-900 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500/50"
          />
        </div>
      </div>

      {/* =====================================================
          CAREER LIST
      ===================================================== */}

      {filteredCareers.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/50 px-6 py-20 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-slate-600">
            <BriefcaseBusiness size={25} />
          </div>

          <h3 className="mt-4 text-base font-bold text-slate-300">
            No Career Positions Found
          </h3>

          <p className="mt-2 text-sm text-slate-600">
            Create your first job position using the button
            above.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCareers.map((career) => (
            <div
              key={career._id}
              className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5 transition hover:border-slate-700 sm:p-6"
            >
              <div className="flex flex-col gap-5 xl:flex-row xl:items-center">
                {/* Job Icon */}

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                  <BriefcaseBusiness size={24} />
                </div>

                {/* Job Information */}

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-bold text-white">
                      {career.title}
                    </h2>

                    <span
                      className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                        career.status === "open"
                          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                          : "border-red-500/20 bg-red-500/10 text-red-400"
                      }`}
                    >
                      {career.status}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Building2 size={14} />
                      {career.department}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} />
                      {career.location}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Clock3 size={14} />
                      {career.type}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <UserRound size={14} />
                      {career.experience}
                    </span>
                  </div>

                  <p className="mt-3 line-clamp-2 max-w-4xl text-sm leading-6 text-slate-500">
                    {career.description}
                  </p>

                  {/* Skills */}

                  {career.skills?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {career.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-400"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}

                <div className="flex shrink-0 items-center gap-2 border-t border-slate-800 pt-4 xl:border-l xl:border-t-0 xl:pl-5 xl:pt-0">
                  <button
                    type="button"
                    onClick={() =>
                      openEditModal(career)
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400"
                    title="Edit Job"
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      deleteCareer(career._id)
                    }
                    disabled={
                      deleteLoading === career._id
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                    title="Delete Job"
                  >
                    {deleteLoading === career._id ? (
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />
                    ) : (
                      <Trash2 size={17} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =====================================================
          ADD / EDIT MODAL
      ===================================================== */}

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="relative max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-700 bg-[#07101f] shadow-2xl">
            {/* Header */}

            <div className="flex items-start justify-between border-b border-slate-800 px-5 py-5 sm:px-7">
              <div>
                <p className="text-xs font-bold uppercase tracking-[2px] text-cyan-400">
                  Recruitment
                </p>

                <h2 className="mt-2 text-2xl font-black text-white">
                  {editingCareer
                    ? "Edit Job Position"
                    : "Add New Job"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  This position will appear on the public
                  Career page when status is open.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={submitLoading}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 transition hover:text-white disabled:opacity-50"
              >
                <X size={19} />
              </button>
            </div>

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="max-h-[calc(92vh-110px)] overflow-y-auto p-5 sm:p-7"
            >
              {formError && (
                <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-300">
                  {formError}
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                {/* Title */}

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-semibold text-slate-400">
                    Job Title *
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. Frontend Developer"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-700 focus:border-blue-500/50"
                  />
                </div>

                {/* Department */}

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-400">
                    Department *
                  </label>

                  <input
                    type="text"
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    placeholder="e.g. Engineering"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-700 focus:border-blue-500/50"
                  />
                </div>

                {/* Location */}

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-400">
                    Location *
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Lucknow / Remote"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-700 focus:border-blue-500/50"
                  />
                </div>

                {/* Job Type */}

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-400">
                    Job Type *
                  </label>

                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3.5 text-sm text-white outline-none focus:border-blue-500/50"
                  >
                    <option value="">
                      Select job type
                    </option>
                    <option value="Full Time">
                      Full Time
                    </option>
                    <option value="Part Time">
                      Part Time
                    </option>
                    <option value="Internship">
                      Internship
                    </option>
                    <option value="Contract">
                      Contract
                    </option>
                    <option value="Remote">
                      Remote
                    </option>
                  </select>
                </div>

                {/* Experience */}

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-400">
                    Experience *
                  </label>

                  <select
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3.5 text-sm text-white outline-none focus:border-blue-500/50"
                  >
                    <option value="">
                      Select experience
                    </option>
                    <option value="Fresher">
                      Fresher
                    </option>
                    <option value="0-1 Years">
                      0-1 Years
                    </option>
                    <option value="1-2 Years">
                      1-2 Years
                    </option>
                    <option value="2-4 Years">
                      2-4 Years
                    </option>
                    <option value="4+ Years">
                      4+ Years
                    </option>
                  </select>
                </div>

                {/* Status */}

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-400">
                    Status *
                  </label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3.5 text-sm text-white outline-none focus:border-blue-500/50"
                  >
                    <option value="open">
                      Open — Show on Career Page
                    </option>

                    <option value="closed">
                      Closed — Hide from Career Page
                    </option>
                  </select>
                </div>

                {/* Skills */}

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-400">
                    Skills *
                  </label>

                  <input
                    type="text"
                    name="skills"
                    value={form.skills}
                    onChange={handleChange}
                    placeholder="React, JavaScript, Tailwind"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-700 focus:border-blue-500/50"
                  />

                  <p className="mt-1.5 text-[11px] text-slate-600">
                    Separate skills with commas.
                  </p>
                </div>

                {/* Description */}

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-semibold text-slate-400">
                    Job Description *
                  </label>

                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Describe the role, responsibilities and expectations..."
                    className="w-full resize-none rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3.5 text-sm leading-6 text-white outline-none placeholder:text-slate-700 focus:border-blue-500/50"
                  />
                </div>
              </div>

              {/* Buttons */}

              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={submitLoading}
                  className="rounded-xl border border-slate-800 bg-slate-900 px-6 py-3.5 text-sm font-semibold text-slate-400 transition hover:text-white disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitLoading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitLoading ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />

                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={18} />

                      {editingCareer
                        ? "Update Job"
                        : "Create Job"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCareers;