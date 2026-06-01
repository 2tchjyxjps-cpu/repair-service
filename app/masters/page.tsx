"use client"

export const dynamic = "force-dynamic"

import {
  Suspense,
  useEffect,
  useState,
} from "react"

import { useRouter, useSearchParams } from "next/navigation"

import Container from "@/components/ui/Container"

function MastersContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [masters, setMasters] =
    useState<any[]>([])

  useEffect(() => {
    async function loadMasters() {
      try {
        const response = await fetch("/api/masters", {
          cache: "no-store",
        })

        const data = await response.json()

        if (Array.isArray(data)) {
          setMasters(data)
        } else if (Array.isArray(data?.masters)) {
          setMasters(data.masters)
        } else {
          setMasters([])
        }
      } catch (error) {
        console.error("Ошибка загрузки мастеров", error)
        setMasters([])
      }
    }

    loadMasters()
  }, [])

  const selectedService =
    searchParams.get("service") || "Ремонт устройства"

  const handleBooking = (masterName: string) => {
    const rawUser = localStorage.getItem("user")

    if (!rawUser) {
      router.push("/login")
      return
    }

    try {
      const user = JSON.parse(rawUser)

      if (!user || !user.id) {
        router.push("/login")
        return
      }
    } catch {
      router.push("/login")
      return
    }

    router.push(
      `/booking?master=${encodeURIComponent(masterName)}&service=${encodeURIComponent(selectedService)}`
    )
  }

  return (
    <main className="min-h-screen bg-[#f5f3ef] pb-32 pt-24">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex rounded-full border border-black/5 bg-white/70 px-5 py-2 text-sm font-medium text-zinc-500 shadow-sm backdrop-blur">
            Команда специалистов
          </div>

          <h1 className="text-5xl font-semibold leading-[1] tracking-tight text-zinc-900 md:text-7xl">
            Профессиональные
            <span className="mt-2 block text-zinc-400">
              мастера по ремонту
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-zinc-500 md:text-xl">
            Выберите подходящего специалиста,
            ознакомьтесь со специализацией мастеров,
            опытом работы и оформите заявку онлайн.
          </p>
        </div>

        {masters.length === 0 && (
          <div className="mt-20 rounded-[32px] border border-black/5 bg-white/70 p-8 text-center text-zinc-500">
            Мастера временно недоступны
          </div>
        )}

        <div className="mt-20 grid gap-6 lg:grid-cols-3">
          {masters.map((master) => (
            <div
              key={master.id}
              className="group flex flex-col rounded-[36px] border border-black/5 bg-white/70 p-8 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-8 flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 text-xl font-semibold text-white">
                    {master.name.charAt(0)}
                  </div>

                  <div>
                    <div className="text-2xl font-semibold tracking-tight text-zinc-900">
                      {master.name}
                    </div>

                    <div className="mt-1 text-sm font-medium text-zinc-400">
                      Мастер сервисного центра
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-5 flex flex-wrap items-center gap-3">
                <div className="rounded-full border border-black/5 bg-black/[0.03] px-4 py-2 text-sm font-medium text-zinc-500">
                  ⭐ 5.0
                </div>

                <div className="rounded-full border border-black/5 bg-black/[0.03] px-4 py-2 text-sm font-medium text-zinc-500">
                  Опытный специалист
                </div>

                <div className="rounded-full border border-black/5 bg-zinc-900 px-4 py-2 text-sm font-medium text-white">
                  Ремонт техники
                </div>
              </div>

              <p className="flex-1 leading-8 text-zinc-500">
                Специалист сервисного центра, выполняющий диагностику и ремонт техники различных категорий.
              </p>

              <div className="mt-10">
                <button
                  onClick={() => handleBooking(master.name)}
                  className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:opacity-80"
                >
                  Оформить заявку
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </main>
  )
}

export default function MastersPage() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <MastersContent />
    </Suspense>
  )
}