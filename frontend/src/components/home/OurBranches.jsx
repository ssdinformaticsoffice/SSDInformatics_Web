import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  GitBranch,
} from "lucide-react";

const OurBranches = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get(`${API_URL}/branches`);

        if (response.data.success) {
          setBranches(response.data.data || []);
        }
      } catch (error) {
        console.error("Fetch Branches Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, [API_URL]);

  // Don't show empty section
  if (!loading && branches.length === 0) {
    return null;
  }

  return (
    <section className="overflow-hidden bg-slate-950 py-8 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">

        {/* Heading */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 font-semibold uppercase tracking-[0.2em] text-blue-400">
            <GitBranch size={15} />
            Our Branches
          </span>

          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Our Presence Across Locations
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Connect with us through our branches and discover
            our growing presence across different locations.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-12 flex justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-blue-400" />
          </div>
        )}

        {/* Branch Cards */}
        {!loading && branches.length > 0 && (
        <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
            {branches.map((branch, index) => (
              <motion.div
                key={branch._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-slate-900"
              >
                {/* Glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl transition duration-500 group-hover:bg-cyan-500/15" />

                {/* Branch Header */}
                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 transition group-hover:bg-blue-500/15 group-hover:text-cyan-400">
                      <MapPin size={22} />
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white sm:text-lg">
                        {branch.name}
                      </h3>

                      <p className="mt-1 text-xs font-medium uppercase tracking-wider text-blue-400">
                        {branch.city}
                      </p>
                    </div>
                  </div>

                  {/* Google Maps */}
                  {branch.mapLink && (
                    <a
                      href={branch.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View on Google Maps"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-800 bg-slate-950 text-slate-400 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400"
                    >
                      <ExternalLink size={15} />
                    </a>
                  )}
                </div>

                {/* Address */}
                <div className="relative mt-5 border-t border-slate-800 pt-4">
                  <div className="flex gap-3">
                    <MapPin
                      size={17}
                      className="mt-0.5 shrink-0 text-slate-500"
                    />

                    <p className="text-sm leading-6 text-slate-400">
                      {branch.address}
                    </p>
                  </div>
                </div>

                {/* Contact */}
                {(branch.phone || branch.email) && (
                  <div className="relative mt-4 space-y-2">
                    {branch.phone && (
                      <a
                        href={`tel:${branch.phone}`}
                        className="flex items-center gap-3 text-sm text-slate-400 transition hover:text-blue-400"
                      >
                        <Phone size={15} />
                        <span>{branch.phone}</span>
                      </a>
                    )}

                    {branch.email && (
                      <a
                        href={`mailto:${branch.email}`}
                        className="flex items-center gap-3 text-sm text-slate-400 transition hover:text-blue-400"
                      >
                        <Mail size={15} />
                        <span className="truncate">
                          {branch.email}
                        </span>
                      </a>
                    )}
                  </div>
                )}

                {/* Bottom Accent */}
                <div className="mt-4 h-px w-full bg-gradient-to-r from-blue-500/40 via-cyan-400/20 to-transparent" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OurBranches;