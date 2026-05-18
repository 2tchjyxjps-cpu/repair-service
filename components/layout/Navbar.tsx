"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import Container from "../ui/Container"
import Button from "../ui/Button"

import {
  getCurrentUser,
  logoutUser,
  type AuthUser,
} from "@/lib/auth"

export default function Navbar() {
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    const syncUser = () => {
      setUser(getCurrentUser())
    }

    syncUser()

    window.addEventListener("storage", syncUser)

    return () => {
      window.removeEventListener("storage", syncUser)
    }
  }, [])

  const handleLogout = () => {
    logoutUser()
    window.location.href = "/"
  }

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f5f3ef]/80 backdrop-blur-2xl">
      <Container>
        <div className="flex h-24 items-center justify-between">
          <Link
            href="/"
            className="text-xl font-semibold tracking-[-0.04em] text-zinc-900 transition hover:opacity-60"
          >
            RepairService
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            <Link
              href="/"
              className="text-sm font-medium text-zinc-400 transition hover:text-zinc-900"
            >
              Главная
            </Link>

            <Link
              href="/services"
              className="text-sm font-medium text-zinc-400 transition hover:text-zinc-900"
            >
              Услуги
            </Link>

            <Link
              href="/masters"
              className="text-sm font-medium text-zinc-400 transition hover:text-zinc-900"
            >
              Мастера
            </Link>

            {user && user.role !== "admin" && (
              <Link
                href="/dashboard"
                className="text-sm font-medium text-zinc-400 transition hover:text-zinc-900"
              >
                Dashboard
              </Link>
            )}

            {user?.role === "admin" && (
              <Link
                href="/admin"
                className="text-sm font-medium text-zinc-400 transition hover:text-zinc-900"
              >
                Админ
              </Link>
            )}
          </nav>

          {!user ? (
            <div className="flex items-center gap-3">
              <Button href="/login" variant="secondary">
                Войти
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="hidden text-right lg:block">
                <div className="text-sm font-semibold text-zinc-900">
                  {user?.name}
                </div>

                <div className="text-xs uppercase tracking-[0.15em] text-zinc-400">
                  {user?.role?.toUpperCase()}
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-black"
              >
                Выйти
              </button>
            </div>
          )}
        </div>
      </Container>
    </header>
  )
}