"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import {
  Compass,
  LogOut,
  Plus,
  Search,
  Calendar,
  MapPin,
  Trash2,
  Edit3,
  Loader2,
  X,
  AlertCircle,
  TrendingUp,
  Map,
  CheckCircle2,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

interface Trip {
  id: number;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  userId: number;
}

interface UserProfile {
  id: number;
  email: string;
  role: string;
}

export default function DashboardPage() {
  const router = useRouter();

  // Auth states
  const [user, setUser] = useState<UserProfile | null>(null);
  const [authChecking, setAuthChecking] = useState(true);

  // Trips data states
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loadingTrips, setLoadingTrips] = useState(true);
  const [destinationFilter, setDestinationFilter] = useState("");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit">("create");
  const [editingTripId, setEditingTripId] = useState<number | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState("");
  const [formDestination, setFormDestination] = useState("");
  const [formStartDate, setFormStartDate] = useState("");
  const [formEndDate, setFormEndDate] = useState("");
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  // Delete Dialog states
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingTripId, setDeletingTripId] = useState<number | null>(null);
  const [deletingTripTitle, setDeletingTripTitle] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Check Auth and Load Data
  useEffect(() => {
    if (!api.isAuthenticated()) {
      router.push("/login");
      return;
    }

    const initDashboard = async () => {
      try {
        const profile = await api.getProfile();
        setUser(profile);
        setAuthChecking(false);
        fetchTrips();
      } catch (err) {
        api.removeToken();
        router.push("/login");
      }
    };

    initDashboard();
  }, []);

  // Fetch Trips
  const fetchTrips = async (dest = destinationFilter) => {
    setLoadingTrips(true);
    try {
      const data = await api.getTrips(dest || undefined);
      setTrips(data);
    } catch (err) {
      console.error("Erro ao carregar viagens:", err);
    } finally {
      setLoadingTrips(false);
    }
  };

  // Trigger search on debounce or manual trigger
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTrips(destinationFilter);
  };

  // Clear Search filter
  const handleClearSearch = () => {
    setDestinationFilter("");
    fetchTrips("");
  };

  // Logout
  const handleLogout = () => {
    api.removeToken();
    router.push("/login");
  };

  // Open Create Modal
  const openCreateModal = () => {
    setModalType("create");
    setEditingTripId(null);
    setFormTitle("");
    setFormDestination("");
    setFormStartDate("");
    setFormEndDate("");
    setFormError("");
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (trip: Trip) => {
    setModalType("edit");
    setEditingTripId(trip.id);
    setFormTitle(trip.title);
    setFormDestination(trip.destination);

    // Format ISO string to YYYY-MM-DD for date inputs
    const start = new Date(trip.startDate).toISOString().split("T")[0];
    const end = new Date(trip.endDate).toISOString().split("T")[0];
    setFormStartDate(start);
    setFormEndDate(end);
    setFormError("");
    setIsModalOpen(true);
  };

  // Submit Modal Form (Create/Edit)
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!formTitle.trim() || !formDestination.trim() || !formStartDate || !formEndDate) {
      setFormError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const start = new Date(formStartDate);
    const end = new Date(formEndDate);

    if (end < start) {
      setFormError("A data de término não pode ser anterior à data de início.");
      return;
    }

    setFormLoading(true);

    try {
      if (modalType === "create") {
        await api.createTrip(formTitle, formDestination, formStartDate, formEndDate);
      } else if (modalType === "edit" && editingTripId !== null) {
        await api.updateTrip(editingTripId, {
          title: formTitle,
          destination: formDestination,
          startDate: formStartDate,
          endDate: formEndDate,
        });
      }
      setIsModalOpen(false);
      fetchTrips(destinationFilter);
    } catch (err: any) {
      setFormError(err.message || "Erro ao salvar os detalhes da viagem.");
    } finally {
      setFormLoading(false);
    }
  };

  // Open Delete Confirmation Dialog
  const openDeleteDialog = (trip: Trip) => {
    setDeletingTripId(trip.id);
    setDeletingTripTitle(trip.title);
    setIsDeleteOpen(true);
  };

  // Confirm Trip Deletion
  const handleDeleteConfirm = async () => {
    if (deletingTripId === null) return;

    setDeleteLoading(true);
    try {
      await api.deleteTrip(deletingTripId);
      setIsDeleteOpen(false);
      setDeletingTripId(null);
      fetchTrips(destinationFilter);
    } catch (err) {
      alert("Ocorreu um erro ao excluir a viagem.");
    } finally {
      setDeleteLoading(false);
    }
  };

  // Date Formatting Helper
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
  };

  // Trip Status Helper
  const getTripStatus = (startStr: string, endStr: string) => {
    const now = new Date();
    // Normalize now to date only
    now.setHours(0, 0, 0, 0);

    const start = new Date(startStr);
    const end = new Date(endStr);

    if (end < now) {
      return { label: "Concluída", classes: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" };
    } else if (start <= now && end >= now) {
      return { label: "Em andamento", classes: "bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse" };
    } else {
      return { label: "Próxima", classes: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" };
    }
  };

  if (authChecking) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center font-sans text-white">
        <Loader2 className="h-10 w-10 text-cyan-400 animate-spin" />
        <span className="mt-4 text-zinc-400 text-sm font-semibold tracking-wide">Carregando painel seguro...</span>
      </div>
    );
  }

  // Dashboard Stats Calculations
  const totalTrips = trips.length;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const upcomingTrips = trips.filter(t => new Date(t.startDate) > now).length;
  const ongoingTrips = trips.filter(t => new Date(t.startDate) <= now && new Date(t.endDate) >= now).length;
  const completedTrips = trips.filter(t => new Date(t.endDate) < now).length;

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans flex flex-col">
      {/* Sticky Glassmorphic Navbar */}
      <header className="sticky top-0 z-40 bg-zinc-950/70 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center shadow-md shadow-indigo-500/10">
            <Compass className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Voyager
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Conta ativa</span>
            <span className="text-sm text-zinc-300 font-medium">{user?.email}</span>
          </div>
          {user?.role === 'ADMIN' && (
            <button
              onClick={() => router.push('/admin')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-cyan-500/10 hover:border-cyan-500/20 hover:text-cyan-300 transition-all duration-300 text-sm font-semibold cursor-pointer"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Admin</span>
            </button>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 transition-all duration-300 text-sm font-semibold cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>Sair</span>
          </button>
        </div>
      </header>

      {/* Main Dashboard Panel */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 space-y-8">

        {/* KPI / Dashboard Summary Widget cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-zinc-900 border border-white/5 rounded-2xl p-5 flex items-center justify-between hover:border-white/10 transition-colors">
            <div className="space-y-1">
              <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Total de Viagens</span>
              <p className="text-3xl font-extrabold">{totalTrips}</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <Map className="h-6 w-6" />
            </div>
          </div>

          <div className="bg-zinc-900 border border-white/5 rounded-2xl p-5 flex items-center justify-between hover:border-white/10 transition-colors">
            <div className="space-y-1">
              <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Próximas Viagens</span>
              <p className="text-3xl font-extrabold">{upcomingTrips}</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <CalendarDays className="h-6 w-6" />
            </div>
          </div>

          <div className="bg-zinc-900 border border-white/5 rounded-2xl p-5 flex items-center justify-between hover:border-white/10 transition-colors">
            <div className="space-y-1">
              <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Em Andamento</span>
              <p className="text-3xl font-extrabold">{ongoingTrips}</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>

          <div className="bg-zinc-900 border border-white/5 rounded-2xl p-5 flex items-center justify-between hover:border-white/10 transition-colors">
            <div className="space-y-1">
              <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Concluídas</span>
              <p className="text-3xl font-extrabold">{completedTrips}</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="h-6 w-6" />
            </div>
          </div>
        </section>

        {/* Action Header & Search Area */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md flex items-center relative group">
            <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-zinc-500 group-focus-within:text-cyan-400 transition-colors" />
            <input
              type="text"
              placeholder="Buscar viagem por destino..."
              value={destinationFilter}
              onChange={(e) => setDestinationFilter(e.target.value)}
              className="w-full bg-zinc-900 border border-white/5 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl py-3.5 pl-11 pr-16 text-sm outline-none transition-all duration-300 text-white"
            />
            {destinationFilter && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-12 text-zinc-500 hover:text-white text-xs font-semibold cursor-pointer"
              >
                Limpar
              </button>
            )}
            <button
              type="submit"
              className="absolute right-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold transition-colors cursor-pointer border border-white/5"
            >
              Ir
            </button>
          </form>

          <button
            onClick={openCreateModal}
            className="px-5 py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
          >
            <Plus className="h-5 w-5" />
            <span>Adicionar Viagem</span>
          </button>
        </section>

        {/* Trips list grid / skeleton loaders */}
        <section>
          {loadingTrips ? (
            /* Skeleton Loading Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-zinc-900 border border-white/5 rounded-2xl h-56 animate-pulse p-6 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="h-4 bg-white/10 rounded w-1/4" />
                    <div className="h-6 bg-white/10 rounded w-3/4" />
                    <div className="h-4 bg-white/10 rounded w-1/2" />
                  </div>
                  <div className="h-10 bg-white/10 rounded w-full" />
                </div>
              ))}
            </div>
          ) : trips.length === 0 ? (
            /* Empty State Container */
            <div className="border border-white/5 bg-zinc-900/40 rounded-3xl p-12 text-center max-w-xl mx-auto space-y-6">
              <div className="h-16 w-16 bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 rounded-2xl flex items-center justify-center text-cyan-400 mx-auto">
                <Map className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Nenhuma viagem encontrada</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {destinationFilter
                    ? "Nenhum resultado corresponde ao filtro de destino selecionado. Tente alterar sua pesquisa."
                    : "Você ainda não tem nenhuma viagem cadastrada. Crie uma nova viagem para começar a planejar seu roteiro!"}
                </p>
              </div>
              {!destinationFilter && (
                <button
                  onClick={openCreateModal}
                  className="px-5 py-3 bg-white text-zinc-950 hover:bg-zinc-200 font-bold rounded-xl transition-all duration-300 cursor-pointer text-sm shadow-md inline-flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Criar minha primeira viagem
                </button>
              )}
            </div>
          ) : (
            /* Trips Grid Layout */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.map((trip) => {
                const status = getTripStatus(trip.startDate, trip.endDate);

                // Deterministic gradient selection based on trip ID
                const gradients = [
                  "from-indigo-600/50 to-cyan-500/20 border-indigo-500/30",
                  "from-teal-600/50 to-emerald-500/20 border-teal-500/30",
                  "from-purple-600/50 to-pink-500/20 border-purple-500/30",
                  "from-blue-600/50 to-indigo-500/20 border-blue-500/30"
                ];
                const gradientClass = gradients[trip.id % gradients.length];

                return (
                  <article
                    key={trip.id}
                    className="bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Card Top / Title */}
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-start gap-2">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${status.classes}`}>
                          {status.label}
                        </span>

                        <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-semibold bg-white/5 py-1 px-2.5 rounded-full">
                          <Calendar className="h-3.5 w-3.5 text-cyan-400" />
                          <span>
                            {Math.ceil(
                              (new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) /
                              (1000 * 60 * 60 * 24)
                            ) + 1}{" "}
                            dias
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-xl font-bold tracking-tight text-white line-clamp-1">{trip.title}</h4>
                        <div className="flex items-center gap-1.5 text-zinc-400 text-sm font-medium">
                          <MapPin className="h-4 w-4 text-cyan-400 shrink-0" />
                          <span className="line-clamp-1">{trip.destination}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 text-zinc-500 text-xs font-semibold pt-1 border-t border-white/5">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                        </span>
                      </div>
                    </div>

                    {/* Card Actions Panel */}
                    <div className="px-6 py-4 bg-zinc-950/40 border-t border-white/5 flex items-center justify-end gap-2.5">
                      <button
                        onClick={() => openEditModal(trip)}
                        className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:text-cyan-400 transition-all cursor-pointer"
                        title="Editar Viagem"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => openDeleteDialog(trip)}
                        className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 transition-all cursor-pointer"
                        title="Excluir Viagem"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* CRUD Create/Edit Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />

          {/* Form Card */}
          <div className="relative bg-zinc-900 border border-white/10 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-6 animate-scaleUp">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">
                {modalType === "create" ? "Adicionar Nova Viagem" : "Editar Viagem"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-zinc-500 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {formError && (
              <div className="flex items-center gap-3 p-4 bg-red-950/40 border border-red-500/30 rounded-xl text-red-200 text-xs">
                <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Título da Viagem <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: Férias de Verão, Viagem de Negócios"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  disabled={formLoading}
                  className="w-full bg-zinc-950 border border-white/5 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl py-3 px-4 text-sm outline-none transition-all duration-300 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Destino <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: Paris, Rio de Janeiro, Tokyo"
                  value={formDestination}
                  onChange={(e) => setFormDestination(e.target.value)}
                  disabled={formLoading}
                  className="w-full bg-zinc-950 border border-white/5 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl py-3 px-4 text-sm outline-none transition-all duration-300 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Data de Início <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formStartDate}
                    onChange={(e) => setFormStartDate(e.target.value)}
                    disabled={formLoading}
                    className="w-full bg-zinc-950 border border-white/5 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl py-3 px-4 text-sm outline-none transition-all duration-300 text-white select-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Data de Término <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formEndDate}
                    onChange={(e) => setFormEndDate(e.target.value)}
                    disabled={formLoading}
                    className="w-full bg-zinc-950 border border-white/5 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl py-3 px-4 text-sm outline-none transition-all duration-300 text-white select-none"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={formLoading}
                  className="px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-sm font-semibold cursor-pointer transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {formLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : modalType === "create" ? (
                    "Adicionar"
                  ) : (
                    "Salvar"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsDeleteOpen(false)} />

          {/* Dialog Card */}
          <div className="relative bg-zinc-900 border border-white/10 rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Trash2 className="h-5 w-5 text-red-500" />
                <span>Confirmar Exclusão</span>
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Tem certeza que deseja excluir a viagem <span className="font-semibold text-white">"{deletingTripTitle}"</span>? Esta ação não pode ser desfeita.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                disabled={deleteLoading}
                className="px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-sm font-semibold cursor-pointer transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deleteLoading}
                className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-red-500/10 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                {deleteLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Confirmar Exclusão"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
