"use client"

import { useState } from "react"

import Container from "@/components/ui/Container"
import Button from "@/components/ui/Button"
import { loginUser } from "@/lib/auth"

export default function RegisterPage() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("Заполните все поля")
      return
    }

    if (password !== confirmPassword) {
      alert("Пароли не совпадают")
      return
    }

    const response = await fetch("/api/register", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
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
              Регистрация
              <span className="mt-2 block text-zinc-400">
                нового аккаунта
              </span>
            </h1>
          </div>

          <div className="space-y-6">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Имя пользователя"
              className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-lg text-zinc-900 outline-none transition focus:border-zinc-900"
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Электронная почта"
              className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-lg text-zinc-900 outline-none transition focus:border-zinc-900"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
              className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-lg text-zinc-900 outline-none transition focus:border-zinc-900"
            />

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Повторите пароль"
              className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-lg text-zinc-900 outline-none transition focus:border-zinc-900"
            />

            <div className="pt-4">
              <Button onClick={handleRegister}>
                Создать аккаунт
              </Button>
            </div>

            <div className="text-center text-sm text-zinc-400">
              Уже есть аккаунт?

              <a
                href="/login"
                className="ml-2 font-medium text-zinc-900 transition hover:opacity-60"
              >
                Войти
              </a>
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}