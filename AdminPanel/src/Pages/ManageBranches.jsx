import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  X,
  MapPin,
  Loader2,
  GitBranch,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const initialForm = {
  name: "",
  city: "",
  address: "",
  phone: "",
  email: "",
  mapLink: "",
  order: 0,
  status: "active",
};

const ManageBranches = () => {
  const [branches, setBranches] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);

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
  // Fetch Branches
  // =====================================================

  const fetchBranches = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${API_URL}/branches/all`,
        getAuthConfig()
      );

      if (response.data.success) {
        setBranches(response.data.data || []);
      }
    } catch (error) {
      console.error("Fetch Branches Error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load branches."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
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
  // Open Add Modal
  // =====================================================

  const openAddModal = () => {
    setEditingBranch(null);
    setForm(initialForm);
    setError("");
    setSuccess("");
    setIsModalOpen(true);
  };

  // =====================================================
  // Open Edit Modal
  // =====================================================

  const openEditModal = (branch) => {
    setEditingBranch(branch);

    setForm({
      name: branch.name || "",
      city: branch.city || "",
      address: branch.address || "",
      phone: branch.phone || "",
      email: branch.email || "",
      mapLink: branch.mapLink || "",
      order: branch.order || 0,
      status: branch.status || "active",
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
    setEditingBranch(null);
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
      !form.city.trim() ||
      !form.address.trim()
    ) {
      setError(
        "Branch name, city and address are required."
      );
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        name: form.name.trim(),
        city: form.city.trim(),
        address: form.address.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        mapLink: form.mapLink.trim(),
        order: Number(form.order) || 0,
        status: form.status,
      };

      let response;

      // =====================================================
      // UPDATE
      // =====================================================

      if (editingBranch) {
        response = await axios.patch(
          `${API_URL}/branches/${editingBranch._id}`,
          payload,
          getAuthConfig()
        );
      }

      // =====================================================
      // CREATE
      // =====================================================

      else {
        response = await axios.post(
          `${API_URL}/branches`,
          payload,
          getAuthConfig()
        );
      }

      if (response.data.success) {
        setSuccess(
          editingBranch
            ? "Branch updated successfully."
            : "Branch added successfully."
        );

        await fetchBranches();

        setTimeout(() => {
          setIsModalOpen(false);
          setEditingBranch(null);
          setForm(initialForm);
          setSuccess("");
        }, 500);
      }
    } catch (error) {
      console.error(
        "Save Branch Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to save branch."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // Delete
  // =====================================================

  const deleteBranch = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this branch?"
    );

    if (!confirmed) return;

    try {
      setDeleteLoading(id);
      setError("");

      const response = await axios.delete(
        `${API_URL}/branches/${id}`,
        getAuthConfig()
      );

      if (response.data.success) {
        setBranches((prev) =>
          prev.filter((branch) => branch._id !== id)
        );

        setSuccess(
          "Branch deleted successfully."
        );

        setTimeout(() => {
          setSuccess("");
        }, 2500);
      }
    } catch (error) {
      console.error(
        "Delete Branch Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to delete branch."
      );
    } finally {
      setDeleteLoading(null);
    }
  };

  // =====================================================
  // Search
  // =====================================================

  const filteredBranches = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return branches;

    return branches.filter((branch) => {
      return (
        branch.name?.toLowerCase().includes(query) ||
        branch.city?.toLowerCase().includes(query) ||
        branch.address?.toLowerCase().includes(query)
      );
    });
  }, [branches, search]);

  // =====================================================
  // Statistics
  // =====================================================

  const totalBranches = branches.length;

  const activeBranches = branches.filter(
    (branch) => branch.status === "active"
  ).length;

  const inactiveBranches = branches.filter(
    (branch) => branch.status === "inactive"
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

            Loading branches...
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
              Branch Management
            </p>

            <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">
              Our Branches
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Manage the branches displayed on the
              public website.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/10 transition hover:-translate-y-0.5"
          >
            <Plus size={18} />
            Add Branch
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
                Total Branches
              </p>

              <h3 className="mt-2 text-3xl font-black text-white">
                {totalBranches}
              </h3>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <GitBranch size={20} />
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
                {activeBranches}
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
                {inactiveBranches}
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
            placeholder="Search by branch name, city or address..."
            className="w-full rounded-xl border border-slate-800 bg-slate-900 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500/50"
          />

        </div>
      </div>

      {/* =====================================================
          BRANCH TABLE
      ===================================================== */}

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/50">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1000px]">

            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60">

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Branch
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  City
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Contact
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

              {filteredBranches.length > 0 ? (
                filteredBranches.map((branch) => (
                  <tr
                    key={branch._id}
                    className="border-b border-slate-800/70 transition hover:bg-slate-900/60"
                  >

                    {/* BRANCH */}

                    <td className="px-5 py-5">
                      <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                          <MapPin size={19} />
                        </div>

                        <div className="min-w-0">

                          <p className="truncate text-sm font-bold text-white">
                            {branch.name}
                          </p>

                          <p className="mt-1 max-w-[260px] truncate text-xs text-slate-500">
                            {branch.address}
                          </p>

                        </div>

                      </div>
                    </td>

                    {/* CITY */}

                    <td className="px-5 py-5">
                      <p className="text-sm font-semibold text-slate-300">
                        {branch.city}
                      </p>
                    </td>

                    {/* CONTACT */}

                    <td className="px-5 py-5">
                      <div className="space-y-1">

                        {branch.phone && (
                          <p className="flex items-center gap-2 text-xs text-slate-400">
                            <Phone size={13} />
                            {branch.phone}
                          </p>
                        )}

                        {branch.email && (
                          <p className="flex items-center gap-2 text-xs text-slate-400">
                            <Mail size={13} />
                            {branch.email}
                          </p>
                        )}

                        {!branch.phone &&
                          !branch.email && (
                            <span className="text-sm text-slate-600">
                              —
                            </span>
                          )}

                      </div>
                    </td>

                    {/* STATUS */}

                    <td className="px-5 py-5">

                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${
                          branch.status === "active"
                            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                            : "border-red-500/20 bg-red-500/10 text-red-400"
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />

                        {branch.status}
                      </span>

                    </td>

                    {/* ORDER */}

                    <td className="px-5 py-5">
                      <span className="text-sm text-slate-400">
                        {branch.order}
                      </span>
                    </td>

                    {/* ACTIONS */}

                    <td className="px-5 py-5">

                      <div className="flex justify-end gap-2">

                        {branch.mapLink && (
                          <a
                            href={branch.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 transition hover:border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-400"
                            title="Open Map"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            openEditModal(branch)
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400"
                          title="Edit"
                        >
                          <Edit3 size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteBranch(branch._id)
                          }
                          disabled={
                            deleteLoading === branch._id
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                          title="Delete"
                        >
                          {deleteLoading === branch._id ? (
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
                        <GitBranch size={25} />
                      </div>

                      <h3 className="mt-4 text-base font-bold text-slate-300">
                        No Branches Found
                      </h3>

                      <p className="mt-2 text-sm text-slate-600">
                        Add your first branch to get
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
                  Branch Management
                </p>

                <h2 className="mt-2 text-2xl font-black text-white">
                  {editingBranch
                    ? "Edit Branch"
                    : "Add Branch"}
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

                {/* BRANCH NAME */}

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-400">
                    Branch Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Lucknow Branch"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-700 focus:border-blue-500/50"
                  />
                </div>

                {/* CITY */}

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-400">
                    City *
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="e.g. Lucknow"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-700 focus:border-blue-500/50"
                  />
                </div>

                {/* PHONE */}

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-400">
                    Phone
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
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
                    placeholder="branch@example.com"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-700 focus:border-blue-500/50"
                  />
                </div>

                {/* MAP LINK */}

                <div className="sm:col-span-2">

                  <label className="mb-2 block text-xs font-semibold text-slate-400">
                    Google Maps URL
                  </label>

                  <div className="relative">

                    <MapPin
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600"
                    />

                    <input
                      type="url"
                      name="mapLink"
                      value={form.mapLink}
                      onChange={handleChange}
                      placeholder="https://maps.google.com/..."
                      className="w-full rounded-xl border border-slate-800 bg-slate-950/70 py-3.5 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-700 focus:border-blue-500/50"
                    />

                  </div>

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

              {/* ADDRESS */}

              <div className="mt-5">

                <label className="mb-2 block text-xs font-semibold text-slate-400">
                  Full Address *
                </label>

                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Enter complete branch address..."
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
                      {editingBranch
                        ? "Update Branch"
                        : "Add Branch"}
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

export default ManageBranches;