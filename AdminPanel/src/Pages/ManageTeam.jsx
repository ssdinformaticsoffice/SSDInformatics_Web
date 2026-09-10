import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  X,
  UserRound,
  Loader2,
  UsersRound,
  CheckCircle2,
  XCircle,
  Link as LinkIcon,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL  ;

const initialForm = {
  name: "",
  designation: "",
  department: "",
  bio: "",
  linkedin: "",
  email: "",
  order: 0,
  status: "active",
  image: null,
};

const ManageTeam = () => {
  const [team, setTeam] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const [form, setForm] = useState(initialForm);

  const [deleteLoading, setDeleteLoading] = useState(null);

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
  // Fetch Team
  // =====================================================

  const fetchTeam = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${API_URL}/team/all`,
        getAuthConfig()
      );

      if (response.data.success) {
        setTeam(response.data.data || []);
      }
    } catch (error) {
      console.error("Fetch Team Error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load team members."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  // =====================================================
  // Form Change
  // =====================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // Image Change
  // =====================================================

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Check image type
    if (!file.type.startsWith("image/")) {
      setError(
        "Please select a valid image file."
      );
      return;
    }

    // Maximum 5MB
    if (file.size > 5 * 1024 * 1024) {
      setError(
        "Image size must be less than 5MB."
      );
      return;
    }

    setError("");

    setForm((prev) => ({
      ...prev,
      image: file,
    }));
  };

  // =====================================================
  // Open Add Modal
  // =====================================================

  const openAddModal = () => {
    setEditingMember(null);
    setForm(initialForm);
    setError("");
    setSuccess("");
    setIsModalOpen(true);
  };

  // =====================================================
  // Open Edit Modal
  // =====================================================

  const openEditModal = (member) => {
    setEditingMember(member);

    setForm({
      name: member.name || "",
      designation: member.designation || "",
      department: member.department || "",
      bio: member.bio || "",
      linkedin: member.linkedin || "",
      email: member.email || "",
      order: member.order || 0,
      status: member.status || "active",
      image: null,
    });

    setError("");
    setSuccess("");
    setIsModalOpen(true);
  };

  // =====================================================
  // Close Modal
  // =====================================================

  const closeModal = () => {
    if (saving) return;

    setIsModalOpen(false);
    setEditingMember(null);
    setForm(initialForm);
    setError("");
    setSuccess("");
  };

  // =====================================================
  // Submit
  // =====================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.designation.trim()
    ) {
      setError(
        "Name and designation are required."
      );
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      // =====================================================
      // FormData
      // =====================================================

      const formData = new FormData();

      formData.append(
        "name",
        form.name.trim()
      );

      formData.append(
        "designation",
        form.designation.trim()
      );

      formData.append(
        "department",
        form.department.trim()
      );

      formData.append(
        "bio",
        form.bio.trim()
      );

      formData.append(
        "linkedin",
        form.linkedin.trim()
      );

      formData.append(
        "email",
        form.email.trim()
      );

      formData.append(
        "order",
        Number(form.order) || 0
      );

      formData.append(
        "status",
        form.status
      );

      // =====================================================
      // Image
      // =====================================================

      if (form.image) {
        formData.append(
          "image",
          form.image
        );
      }

      let response;

      // =====================================================
      // UPDATE
      // =====================================================

      if (editingMember) {
        response = await axios.patch(
          `${API_URL}/team/${editingMember._id}`,
          formData,
          getAuthConfig()
        );
      }

      // =====================================================
      // CREATE
      // =====================================================

      else {
        response = await axios.post(
          `${API_URL}/team`,
          formData,
          getAuthConfig()
        );
      }

      if (response.data.success) {
        setSuccess(
          editingMember
            ? "Team member updated successfully."
            : "Team member added successfully."
        );

        await fetchTeam();

        setTimeout(() => {
          setIsModalOpen(false);
          setEditingMember(null);
          setForm(initialForm);
          setSuccess("");
        }, 500);
      }
    } catch (error) {
      console.error(
        "Save Team Member Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to save team member."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // Delete
  // =====================================================

  const deleteMember = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this team member?"
    );

    if (!confirmed) return;

    try {
      setDeleteLoading(id);
      setError("");

      const response = await axios.delete(
        `${API_URL}/team/${id}`,
        getAuthConfig()
      );

      if (response.data.success) {
        setTeam((prev) =>
          prev.filter(
            (member) => member._id !== id
          )
        );

        setSuccess(
          "Team member deleted successfully."
        );

        setTimeout(() => {
          setSuccess("");
        }, 2500);
      }
    } catch (error) {
      console.error(
        "Delete Team Member Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to delete team member."
      );
    } finally {
      setDeleteLoading(null);
    }
  };

  // =====================================================
  // Search
  // =====================================================

  const filteredTeam = useMemo(() => {
    const query = search
      .toLowerCase()
      .trim();

    if (!query) return team;

    return team.filter((member) => {
      return (
        member.name
          ?.toLowerCase()
          .includes(query) ||
        member.designation
          ?.toLowerCase()
          .includes(query) ||
        member.department
          ?.toLowerCase()
          .includes(query)
      );
    });
  }, [team, search]);

  // =====================================================
  // Statistics
  // =====================================================

  const totalMembers = team.length;

  const activeMembers = team.filter(
    (member) => member.status === "active"
  ).length;

  const inactiveMembers = team.filter(
    (member) => member.status === "inactive"
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

            Loading team members...
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
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">

          <div>
            <p className="text-xs font-bold uppercase tracking-[3px] text-cyan-400">
              Team Management
            </p>

            <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">
              Our Team
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Manage the people displayed in the Our
              Team section of your website.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/10 transition hover:-translate-y-0.5"
          >
            <Plus size={18} />
            Add Team Member
          </button>

        </div>
      </div>

      {/* =====================================================
          ALERTS
      ===================================================== */}

      {error && (
        <div className="mb-5 flex items-center justify-between gap-4 rounded-2xl border border-red-500/20 bg-red-500/5 px-5 py-4">

          <p className="text-sm text-red-300">
            {error}
          </p>

          <button
            type="button"
            onClick={() => setError("")}
            className="text-red-400 hover:text-red-300"
          >
            <X size={17} />
          </button>

        </div>
      )}

      {success && (
        <div className="mb-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-5 py-4 text-sm text-emerald-300">
          {success}
        </div>
      )}

      {/* =====================================================
          STATS
      ===================================================== */}

      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium text-slate-500">
                Total Members
              </p>

              <h3 className="mt-2 text-3xl font-black text-white">
                {totalMembers}
              </h3>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <UsersRound size={20} />
            </div>

          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium text-slate-500">
                Active
              </p>

              <h3 className="mt-2 text-3xl font-black text-white">
                {activeMembers}
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
              <p className="text-xs font-medium text-slate-500">
                Inactive
              </p>

              <h3 className="mt-2 text-3xl font-black text-white">
                {inactiveMembers}
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
            placeholder="Search by name, designation or department..."
            className="w-full rounded-xl border border-slate-800 bg-slate-900 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500/50"
          />

        </div>
      </div>

      {/* =====================================================
          TEAM TABLE
      ===================================================== */}

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/50">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60">

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Member
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Designation
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Department
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Order
                </th>

                <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredTeam.length > 0 ? (
                filteredTeam.map((member) => (
                  <tr
                    key={member._id}
                    className="border-b border-slate-800/70 transition hover:bg-slate-900/60"
                  >

                    {/* MEMBER */}

                    <td className="px-5 py-5">

                      <div className="flex items-center gap-3">

                        {member.image?.url ? (
                          <img
                            src={member.image.url}
                            alt={member.name}
                            className="h-11 w-11 rounded-xl object-cover"
                          />
                        ) : (
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                            <UserRound size={19} />
                          </div>
                        )}

                        <div className="min-w-0">

                          <p className="truncate text-sm font-bold text-white">
                            {member.name}
                          </p>

                          {member.email && (
                            <p className="mt-1 truncate text-xs text-slate-500">
                              {member.email}
                            </p>
                          )}

                        </div>

                      </div>

                    </td>

                    {/* DESIGNATION */}

                    <td className="px-5 py-5">
                      <p className="text-sm font-semibold text-slate-300">
                        {member.designation}
                      </p>
                    </td>

                    {/* DEPARTMENT */}

                    <td className="px-5 py-5">
                      <p className="text-sm text-slate-400">
                        {member.department || "—"}
                      </p>
                    </td>

                    {/* STATUS */}

                    <td className="px-5 py-5">

                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${
                          member.status === "active"
                            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                            : "border-red-500/20 bg-red-500/10 text-red-400"
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />

                        {member.status}
                      </span>

                    </td>

                    {/* ORDER */}

                    <td className="px-5 py-5">

                      <span className="text-sm text-slate-400">
                        {member.order}
                      </span>

                    </td>

                    {/* ACTIONS */}

                    <td className="px-5 py-5">

                      <div className="flex justify-end gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            openEditModal(member)
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400"
                          title="Edit"
                        >
                          <Edit3 size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteMember(member._id)
                          }
                          disabled={
                            deleteLoading ===
                            member._id
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                          title="Delete"
                        >
                          {deleteLoading ===
                          member._id ? (
                            <Loader2
                              size={16}
                              className="animate-spin"
                            />
                          ) : (
                            <Trash2 size={16} />
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
                        <UsersRound size={25} />
                      </div>

                      <h3 className="mt-4 text-base font-bold text-slate-300">
                        No Team Members Found
                      </h3>

                      <p className="mt-2 text-sm text-slate-600">
                        Add your first team member to get
                        started.
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
          ADD / EDIT MODAL
      ===================================================== */}

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

          <div className="relative max-h-[92vh] w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-700 bg-[#07101f] shadow-2xl">

            {/* HEADER */}

            <div className="flex items-start justify-between border-b border-slate-800 px-5 py-5 sm:px-7">

              <div>

                <p className="text-xs font-bold uppercase tracking-[2px] text-cyan-400">
                  Team Management
                </p>

                <h2 className="mt-2 text-2xl font-black text-white">
                  {editingMember
                    ? "Edit Team Member"
                    : "Add Team Member"}
                </h2>

              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 transition hover:text-white disabled:opacity-50"
              >
                <X size={19} />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="max-h-[calc(92vh-100px)] overflow-y-auto p-5 sm:p-7"
            >

              <div className="grid gap-5 sm:grid-cols-2">

                {/* NAME */}

                <div>

                  <label className="mb-2 block text-xs font-semibold text-slate-400">
                    Full Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-700 focus:border-blue-500/50"
                  />

                </div>

                {/* DESIGNATION */}

                <div>

                  <label className="mb-2 block text-xs font-semibold text-slate-400">
                    Designation *
                  </label>

                  <input
                    type="text"
                    name="designation"
                    value={form.designation}
                    onChange={handleChange}
                    placeholder="e.g. Senior Developer"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-700 focus:border-blue-500/50"
                  />

                </div>

                {/* DEPARTMENT */}

                <div>

                  <label className="mb-2 block text-xs font-semibold text-slate-400">
                    Department
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

                {/* EMAIL */}

                <div>

                  <label className="mb-2 block text-xs font-semibold text-slate-400">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="member@example.com"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-700 focus:border-blue-500/50"
                  />

                </div>

                {/* LINKEDIN */}

                <div>

                  <label className="mb-2 block text-xs font-semibold text-slate-400">
                    LinkedIn URL
                  </label>

                  <div className="relative">

                    <LinkIcon
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600"
                    />

                    <input
                      type="url"
                      name="linkedin"
                      value={form.linkedin}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full rounded-xl border border-slate-800 bg-slate-950/70 py-3.5 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-700 focus:border-blue-500/50"
                    />

                  </div>

                </div>

                {/* PROFILE IMAGE */}

                <div>

                  <label className="mb-2 block text-xs font-semibold text-slate-400">
                    Profile Image
                  </label>

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleImageChange}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-3 text-sm text-slate-400 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-500/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-400 hover:file:bg-blue-500/20"
                  />

                  {/* NEW IMAGE SELECTED */}

                  {form.image && (
                    <div className="mt-3 flex items-center gap-3">

                      <img
                        src={URL.createObjectURL(
                          form.image
                        )}
                        alt="Selected"
                        className="h-14 w-14 rounded-xl object-cover"
                      />

                      <div className="min-w-0">

                        <p className="truncate text-xs font-medium text-emerald-400">
                          {form.image.name}
                        </p>

                        <p className="mt-1 text-[11px] text-slate-600">
                          New image selected
                        </p>

                      </div>

                    </div>
                  )}

                  {/* EXISTING IMAGE */}

                  {!form.image &&
                    editingMember &&
                    editingMember.image?.url && (
                      <div className="mt-3 flex items-center gap-3">

                        <img
                          src={editingMember.image.url}
                          alt={editingMember.name}
                          className="h-14 w-14 rounded-xl object-cover"
                        />

                        <p className="text-xs text-slate-500">
                          Current profile image
                        </p>

                      </div>
                    )}

                  <p className="mt-2 text-[11px] text-slate-600">
                    JPG, PNG or WEBP • Maximum 5MB
                  </p>

                </div>

                {/* ORDER */}

                <div>

                  <label className="mb-2 block text-xs font-semibold text-slate-400">
                    Display Order
                  </label>

                  <input
                    type="number"
                    name="order"
                    value={form.order}
                    onChange={handleChange}
                    min="0"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3.5 text-sm text-white outline-none focus:border-blue-500/50"
                  />

                </div>

                {/* STATUS */}

                <div>

                  <label className="mb-2 block text-xs font-semibold text-slate-400">
                    Status
                  </label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3.5 text-sm text-white outline-none focus:border-blue-500/50"
                  >
                    <option value="active">
                      Active
                    </option>

                    <option value="inactive">
                      Inactive
                    </option>
                  </select>

                </div>

              </div>

              {/* BIO */}

              <div className="mt-5">

                <label className="mb-2 block text-xs font-semibold text-slate-400">
                  Short Bio
                </label>

                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Write a short introduction..."
                  className="w-full resize-none rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3.5 text-sm leading-6 text-white outline-none placeholder:text-slate-700 focus:border-blue-500/50"
                />

              </div>

              {/* SUBMIT */}

              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-xl border border-slate-800 bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-400 transition hover:text-white disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {saving ? (
                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />

                      Saving...
                    </>
                  ) : (
                    <>
                      {editingMember
                        ? "Update Member"
                        : "Add Member"}
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

export default ManageTeam;