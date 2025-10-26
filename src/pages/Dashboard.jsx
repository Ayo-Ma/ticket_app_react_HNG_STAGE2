import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getTickets } from "../utils/ticketUtils";
import {
  Ticket,
  CheckCircle2,
  Clock,
  AlertCircle,
  LogOut,
  Plus,
  ArrowRight,
  Activity,
} from "lucide-react";
import Footer from "../components/Footer";

export default function Dashboard() {
  const { logout, user } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);

  useEffect(() => setTickets(getTickets()), []);

  const total = tickets.length;
  const open = tickets.filter((t) => t.status === "open").length;
  const resolved = tickets.filter((t) => t.status === "closed").length;
  const inProgress = tickets.filter((t) => t.status === "in-progress").length;

  const recentTickets = tickets.slice(0, 5);
  const resolutionRate = total > 0 ? ((resolved / total) * 100).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold bg-linear-to-r from-gray-600 to-gray-600 bg-clip-text text-transparent">
                TicketApp
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-700">
                    {user.email}
                  </p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <div className="w-10 h-10 bg-linear-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {user.email.charAt(0)}
                </div>
              </div>
              <button
                onClick={logout}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
      
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user.email.split(" ")[0]} 👋
          </h2>
          <p className="text-gray-600">
            Here's what's happening with your tickets today.
          </p>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          <div className="bg-white rounded-2xl p-6   border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gray-100 rounded-xl">
                <Ticket className="w-6 h-6 text-gray-600" />
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                +12%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              Total Tickets
            </h3>
            <p className="text-3xl font-bold text-gray-900">{total}</p>
          </div>

          <div className="bg-white rounded-2xl p-6  border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
             
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              Open Tickets
            </h3>
            <p className="text-3xl font-bold text-gray-900">{open}</p>
          </div>

          {/* In Progress */}
          <div className="bg-white rounded-2xl p-6   border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
             
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              In Progress
            </h3>
            <p className="text-3xl font-bold text-gray-900">{inProgress}</p>
          </div>

    
          <div className="bg-white rounded-2xl p-6   border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                {resolutionRate}%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Resolved</h3>
            <p className="text-3xl font-bold text-gray-900">{resolved}</p>
          </div>
        </div>

        
        <div className="grid lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Recent Tickets
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Latest support requests
                  </p>
                </div>
                <Link
                  to="/tickets"
                  className="text-gray-600 hover:text-gray-700 font-medium text-sm flex items-center space-x-1"
                >
                  <span>View all</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="p-6">
              {recentTickets.length > 0 ? (
                <div className="space-y-4">
                  {recentTickets.map((ticket, index) => (
                    <div
                      key={ticket.id || index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            ticket.status === "open"
                              ? "bg-orange-500"
                              : ticket.status === "in-progress"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                        ></div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {ticket.title || "Untitled Ticket"}
                          </p>
                          <p className="text-sm text-gray-500">
                            {ticket.description?.substring(0, 50)}...
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          ticket.status === "open"
                            ? "bg-orange-100 text-orange-700"
                            : ticket.status === "in-progress"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {ticket.status || "unknown"}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Ticket className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No tickets yet</p>
                </div>
              )}
            </div>
          </div>


          <div className="space-y-6">
            
            <div className=" bg-gray-800 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
            
                <Link
                  to="/tickets"
                  className="flex items-center justify-between p-4 bg-white/10 backdrop-blur rounded-xl hover:bg-white/20 transition-colors"
                >
                  <span className="font-medium">Manage Tickets</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Activity className="w-5 h-5 text-slate-600" />
                </div>
                <h3 className="font-bold text-gray-900">Performance</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      Resolution Rate
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {resolutionRate}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-linear-to-r from-slate-600 to-slate-800 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${resolutionRate}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      Active Tickets
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {total > 0 ? ((open / total) * 100).toFixed(0) : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-linear-to-r from-orange-500 to-red-600 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${total > 0 ? (open / total) * 100 : 0}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
