"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { Compass, Mail, Lock, AlertCircle, Loader2, ArrowRight, UserPlus, LogIn, CheckCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Clear errors when toggling tabs
  useEffect(() => {
    setError("");
    setSuccess("");
    setPassword("");
    setConfirmPassword("");
  }, [isLogin]);

  // Handle Auth
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        // Login Flow
        await api.login(email, password);
        setSuccess("Login realizado com sucesso! Redirecionando...");
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        // Register Flow
        await api.register(email, password);
        setSuccess("Conta criada com sucesso! Faça seu login.");
        setIsLogin(true);
      }
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao realizar a autenticação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-12 bg-zinc-950 font-sans text-white overflow-hidden">
      {/* Visual Section - Left Side */}
      <div className="hidden md:flex md:col-span-6 lg:col-span-7 bg-cover bg-center relative items-center justify-center p-12 overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/60 via-indigo-950/80 to-zinc-950 z-0" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse delay-700" />

        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] z-0" />

        <div className="relative z-10 max-w-lg space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Compass className="h-6 w-6 text-white animate-spin-slow" />
            </div>
            <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Voyager
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Planeje sua próxima{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                jornada épica
              </span>
              .
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Organize seus destinos favoritos, crie roteiros estruturados por dias e adicione atividades personalizadas em uma interface simples e moderna.
            </p>
          </div>

          {/* Floating Glassmorphic UI mock for rich aesthetics */}
          <div className="border border-white/10 bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-2xl space-y-4 max-w-sm transform hover:scale-[1.02] transition-transform duration-300">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">Próxima Viagem</p>
                <h3 className="text-lg font-bold text-white">Férias em Paris</h3>
              </div>
              <span className="text-xs bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/30">
                Em 14 dias
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-zinc-300 bg-white/5 p-2 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Torre Eiffel & Museu do Louvre</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-300 bg-white/5 p-2 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-indigo-400" />
                <span>Passeio de Barco pelo Rio Sena</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section - Right Side */}
      <div className="col-span-1 md:col-span-6 lg:col-span-5 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 relative">
        <div className="absolute top-10 right-10 md:hidden flex items-center gap-2">
          <Compass className="h-6 w-6 text-cyan-400 animate-spin-slow" />
          <span className="text-lg font-bold tracking-tight text-white">VouAgir</span>
        </div>

        <div className="max-w-md w-full mx-auto space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight">
              {isLogin ? "Bem-vindo de volta" : "Crie sua conta"}
            </h2>
            <p className="text-zinc-400 text-sm">
              {isLogin
                ? "Entre com suas credenciais para gerenciar seus planos de viagem."
                : "Comece a planejar suas viagens de forma estruturada hoje mesmo."}
            </p>
          </div>

          {/* Form Tabs Switcher */}
          <div className="flex bg-zinc-900 p-1 rounded-xl border border-white/5">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${isLogin
                  ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg"
                  : "text-zinc-400 hover:text-white"
                }`}
            >
              Entrar
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${!isLogin
                  ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg"
                  : "text-zinc-400 hover:text-white"
                }`}
            >
              Criar Conta
            </button>
          </div>

          {/* Notification Alerts */}
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-950/40 border border-red-500/30 rounded-xl text-red-200 text-sm animate-shake">
              <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-3 p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-emerald-200 text-sm">
              <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Endereço de E-mail
              </label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-3.5 h-5 w-5 text-zinc-500 group-focus-within:text-cyan-400 transition-colors" />
                <input
                  type="email"
                  placeholder="exemplo@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full bg-zinc-900 border border-white/5 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl py-3.5 pl-11 pr-4 text-sm outline-none transition-all duration-300 disabled:opacity-50 text-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Senha
              </label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-3.5 h-5 w-5 text-zinc-500 group-focus-within:text-cyan-400 transition-colors" />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full bg-zinc-900 border border-white/5 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl py-3.5 pl-11 pr-4 text-sm outline-none transition-all duration-300 disabled:opacity-50 text-white"
                  required
                />
              </div>
            </div>

            {/* Confirm Password Field for Registration */}
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Confirmar Senha
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-3.5 h-5 w-5 text-zinc-500 group-focus-within:text-cyan-400 transition-colors" />
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                    className="w-full bg-zinc-900 border border-white/5 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl py-3.5 pl-11 pr-4 text-sm outline-none transition-all duration-300 disabled:opacity-50 text-white"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : isLogin ? (
                <>
                  <LogIn className="h-5 w-5" />
                  <span>Entrar na Conta</span>
                </>
              ) : (
                <>
                  <UserPlus className="h-5 w-5" />
                  <span>Registrar Agora</span>
                </>
              )}
            </button>
          </form>

          <div className="text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              disabled={loading}
              className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors font-medium inline-flex items-center gap-1 cursor-pointer"
            >
              {isLogin ? "Não possui conta? Crie uma aqui" : "Já possui uma conta? Entre aqui"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
