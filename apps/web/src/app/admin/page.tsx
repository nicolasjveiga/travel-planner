"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { ShieldCheck, ArrowLeft, Loader2, MapPin, CalendarDays, User, Users } from "lucide-react";

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

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const init = async () => {
      if (!api.isAuthenticated()) {
        router.push("/login");
        return;
      }

      try {
        const profile = await api.getProfile();
        if (profile.role !== "ADMIN") {
          router.push("/");
          return;
        }

        setUser(profile);
        const tripsData = await api.getTrips();
        setTrips(tripsData);
      } catch (err: any) {
        api.removeToken();
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [router]);

  const handleBack = () => {
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white font-sans">
        <Loader2 className="h-10 w-10 text-cyan-400 animate-spin" />
        <p className="mt-4 text-zinc-400">Carregando painel de administração...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      <header className="sticky top-0 z-40 bg-zinc-950/95 border-b border-white/5 px-6 py-4 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-widest text-cyan-400 font-bold">Admin</p>
              <h1 className="text-2xl font-extrabold">Painel de Administração</h1>
              <p className="text-zinc-400 text-sm">Acesso restrito para administradores. Aqui são exibidas todas as viagens cadastradas.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar ao Dashboard
            </button>
            <div className="bg-zinc-900 border border-white/5 rounded-2xl px-4 py-3 text-sm text-zinc-300">
              <span className="font-semibold text-white">{user?.email}</span>
              <span className="ml-2">({user?.role})</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-zinc-900 border border-white/5 rounded-3xl p-6">
            <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Total de viagens</p>
            <p className="mt-4 text-4xl font-extrabold text-white">{trips.length}</p>
          </div>
          <div className="bg-zinc-900 border border-white/5 rounded-3xl p-6">
            <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Usuário administrador</p>
            <p className="mt-4 text-2xl font-semibold text-white">{user?.email}</p>
          </div>
          <div className="bg-zinc-900 border border-white/5 rounded-3xl p-6">
            <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Acesso</p>
            <p className="mt-4 text-2xl font-semibold text-white">Completo</p>
          </div>
        </section>

        <section className="bg-zinc-900 border border-white/5 rounded-3xl p-6">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold">Viagens de todos os usuários</h2>
              <p className="text-zinc-400 text-sm">Apenas admins conseguem visualizar todas as viagens cadastradas.</p>
            </div>
            <div className="inline-flex items-center gap-2 text-zinc-300 text-sm">
              <Users className="h-4 w-4" />
              {trips.length} viagens
            </div>
          </div>

          <div className="grid gap-4">
            {trips.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-white/10 p-8 text-center text-zinc-400">
                Nenhuma viagem encontrada.
              </div>
            ) : (
              trips.map((trip) => (
                <div key={trip.id} className="rounded-3xl border border-white/5 bg-zinc-950/70 p-5 hover:border-white/10 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-zinc-400 uppercase tracking-wider font-semibold">
                        <MapPin className="h-4 w-4" />
                        <span>Destino: {trip.destination}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-white">{trip.title}</h3>
                      <p className="text-sm text-zinc-400">Viagem do usuário #{trip.userId}</p>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                        <CalendarDays className="h-4 w-4" />
                        {new Date(trip.startDate).toLocaleDateString("pt-BR")} - {new Date(trip.endDate).toLocaleDateString("pt-BR")}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
