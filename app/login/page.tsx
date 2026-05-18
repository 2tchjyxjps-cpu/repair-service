"use client"

import { loginUser } from "@/lib/auth"
import { useState } from "react"

import Container from "@/components/ui/Container"
import Button from "@/components/ui/Button"

export default function LoginPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Заполните все поля")
      return
    }

    const response = await fetch("/api/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      alert(data.error)
      return
    }

    loginUser(data)

    window.location.href = "/dashboard"
  }

  return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden bg-[#f5f3ef] px-6 py-20">
      <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-white blur-3xl" />

      <Container>
        <div className="mx-auto max-w-xl rounded-[40px] border border-black/5 bg-white/70 p-10 shadow-sm backdrop-blur md:p-14">
          <div className="mb-12 text-center">
            <div className="mb-6 inline-flex rounded-full border border-black/5 bg-black/[0.03] px-5 py-2 text-sm font-medium text-zinc-500">
              Repair Service
            </div>

            <h1 className="text-5xl font-semibold leading-[0.95] tracking-tight text-zinc-900 md:text-6xl">
              Вход
              <span className="mt-2 block text-zinc-400">
                в личный кабинет
              </span>
            </h1>
          </div>

          <div className="space-y-6">

            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Электронная почта"
                className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-lg text-zinc-900 outline-none transition focus:border-zinc-900"
              />
            </div>

            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль"
                className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-lg text-zinc-900 outline-none transition focus:border-zinc-900"
              />
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleLogin}
                className="w-full rounded-2xl bg-zinc-900 px-6 py-4 text-lg font-medium text-white transition hover:opacity-90"
              >
                Войти
              </button>
            </div>

            <div className="text-center text-sm text-zinc-400">
              Нет аккаунта?
              <a
                href="/register"
                className="ml-2 font-medium text-zinc-900 transition hover:opacity-60"
              >
                Регистрация
              </a>
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}