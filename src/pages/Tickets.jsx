/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

import {
  Edit,
  Trash2,
  PlusCircle,
  ChevronLeft,
  Search,
  Filter,
  AlertCircle,
  Clock,
  CheckCircle2,
  X,
} from "lucide-react";

import { getTickets, saveTickets } from "../utils/ticketUtils";

export default function Tickets() {

  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", status: "open" });
  const [editing, setEditing] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showForm, setShowForm] = useState(false);


  useEffect(() => setTickets(getTickets()), []);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return toast.error("Title is required");

    if (!["open", "in_progress", "closed"].includes(form.status))
      return toast.error("Invalid status");

    const updated = [...tickets];
    if (editing) {
      const idx = updated.findIndex((t) => t.id === editing);
      updated[idx] = { ...updated[idx], ...form };
      toast.success("Ticket updated!");
    } else {
      updated.push({ id: Date.now(), ...form });
      toast.success("Ticket created!");
    }

    saveTickets(updated);
    setTickets(updated);
    resetForm();
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this ticket?")) return;
    const updated = tickets.filter((t) => t.id !== id);
    saveTickets(updated);
    setTickets(updated);
    toast.success("Ticket deleted!");
  };

  const handleEdit = (ticket) => {
    setForm(ticket);
    setEditing(ticket.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setForm({ title: "", description: "", status: "open" });
    setEditing(null);
    setShowForm(false);
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || ticket.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "open":
        return <AlertCircle className="w-4 h-4" />;
      case "in_progress":
        return <Clock className="w-4 h-4" />;
      case "closed":
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-orange-50 text-orange-700 border-orange-100";
      case "in_progress":
        return "bg-yellow-50 text-yellow-700 border-yellow-100";
      case "closed":
        return "bg-green-50 text-green-700 border-green-100";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

 
  return (
    <>
      {/* <Navbar /> */}

      <section className="max-w-5xl mx-auto px-6 py-8 mt-20 bg-whit rounded-3xl border border-gray-200 shadow-sm my-12">
       
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-gray-600  hover:text-gray-800 transition-colors mb-12 font-medium"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Ticket Management
              </h1>
              <p className="text-gray-600">
                Manage and track all your support tickets in one place
              </p>
            </div>

            <button
              onClick={() => setShowForm(!showForm)}
              className="mt-4 md:mt-0 inline-flex items-center gap-2 bg-gray-800 cursor-pointer hover:from-gray-700 hover:to-gray-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <PlusCircle className="w-5 h-5" />
              Create New Ticket
            </button>
          </div>
        </div>

     
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl  p-6 mb-8 border border-gray-200"
          >
            <div className="flex  items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <PlusCircle className="w-6 h-6 text-gray-700" />
                {editing ? "Edit Ticket" : "Create New Ticket"}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <InputField
                  label="Title *"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Enter ticket title"
                />
                <SelectField
                  label="Status"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full border border-gray-200 bg-gray-50 p-3 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  placeholder="Describe the ticket details..."
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-linear-to-r from-gray-700 to-gray-600 hover:from-gray-700 hover:to-gray-700 text-white font-semibold rounded-lg px-6 py-3 transition-all shadow-md hover:shadow-lg"
                >
                  {editing ? "Update Ticket" : "Create Ticket"}
                </button>
                {editing && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        )}

       
        <div className="bg-white rounded-xl  border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FilterSelect
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            />
          </div>
        </div>

        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-gray-200  transition-all p-6 group"
              >
                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                    t.status
                  )} mb-3`}
                >
                  {getStatusIcon(t.status)}
                  {t.status.replace("_", " ").toUpperCase()}
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {t.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {t.description || "No description provided"}
                </p>

                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleEdit(t)}
                    className="flex-1 flex items-center justify-center gap-2 text-gray-600 cursor-pointer  px-4 py-2 rounded-lg transition-colors font-medium"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white cursor-pointer hover:text-red-400 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <EmptyState showForm={showForm} onCreate={() => setShowForm(true)} />
          )}
        </div>
      </section>
    </>
  );
}


function InputField({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        className="w-full border border-gray-200 bg-gray-50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

function SelectField({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="w-full border border-gray-200 bg-gray-50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
      >
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>
    </div>
  );
}

function SearchBar({ value, onChange }) {
  return (
    <div className="flex-1 relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search tickets..."
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
      />
    </div>
  );
}

function FilterSelect({ value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <Filter className="w-5 h-5 text-gray-500" />
      <select
        value={value}
        onChange={onChange}
        className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
      >
        <option value="all">All Status</option>
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>
    </div>
  );
}

function EmptyState({ showForm, onCreate }) {
  return (
    <div className="col-span-full text-center py-16">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
        <AlertCircle className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {showForm ? "No tickets found" : "No tickets yet"}
      </h3>
      <p className="text-gray-600 mb-6">
        {showForm
          ? "Try adjusting your search or filter criteria"
          : "Create your first ticket to get started"}
      </p>
      {!showForm && (
        <button
          onClick={onCreate}
          className="inline-flex items-center gap-2 bg-linear-to-r from-gray-600 to-gray-600 hover:from-gray-700 hover:to-gray-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          <PlusCircle className="w-5 h-5" />
          Create New Ticket
        </button>
      )}
    </div>
  );
}
