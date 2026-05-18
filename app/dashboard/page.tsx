"use client"

import { useEffect, useState } from "react"

import Container from "@/components/ui/Container"
import Button from "@/components/ui/Button"

import type { RepairRequest } from "@/lib/requests"

import { getCurrentUser } from "@/lib/auth"

export default function DashboardPage() {
  const [requests, setRequests] = useState<RepairRequest[]>([])
  const user = getCurrentUser()

  useEffect(() => {
    async function loadRequests() {
      const response = await fetch("/api/requests")

      const allRequests = await response.json()

      if (!user) {
        setRequests([])
        return
      }

      if (user.role === "master") {
        const filteredRequests = allRequests.filter(
          (request: any) =>
            request.master
              ?.toLowerCase()
              .includes(user.name.toLowerCase())
        )

        setRequests(filteredRequests)
        return
      }

      if (user.role === "client") {
        const filteredRequests = allRequests.filter(
          (request: any) =>
            request.clientId === user.id
        )

        setRequests(filteredRequests)
        return
      }

      setRequests(allRequests)
    }

    loadRequests()
  }, [user?.role, user?.id, user?.name])

  async function handleStatusChange(
    id: string,
    status: string
  ) {
    await fetch(`/api/requests/${id}`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        status,
      }),
    })

    window.location.reload()
  }

  return (
    <main className="min-h-screen bg-[#f5f3ef] py-24">
      <Container>
        <div className="mb-20 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-black/5 bg-white/70 px-5 py-2 text-sm font-medium text-zinc-500 backdrop-blur">
              {user?.role === "master"
                ? "Панель мастера"
                : "Личный кабинет"}
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-zinc-900 md:text-7xl">
              Repair
              <span className="block text-zinc-300">
                dashboard system
              </span>
            </h1>
          </div>

          <Button href="/booking">
            Новая заявка
          </Button>
        </div>

        {requests.length === 0 ? (
          <div className="rounded-[36px] border border-dashed border-black/10 bg-white/50 p-16 text-center backdrop-blur">
            <div className="text-2xl font-semibold text-zinc-900">
              Пока нет заявок
            </div>

            <div className="mt-4 text-lg text-zinc-500">
              Создайте первую заявку на ремонт,
              чтобы она появилась в dashboard.
            </div>

            <div className="mt-8 flex justify-center">
              <Button href="/booking">
                Создать заявку
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {requests.map((request) => (
              <div
                key={request.id}
                className="rounded-[36px] border border-black/5 bg-white/70 p-8 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl md:p-10"
              >
                <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="mb-5 flex flex-wrap items-center gap-3">
                      <div className="rounded-full border border-black/5 bg-black/[0.03] px-4 py-2 text-sm font-medium text-zinc-500">
                        {request.id}
                      </div>

                      {user?.role === "master" ? (
                        <select
                          value={request.status}
                          onChange={(e) =>
                            handleStatusChange(
                              request.id,
                              e.target.value
                            )
                          }
                          className="rounded-full border border-black/5 bg-black/[0.03] px-4 py-2 text-sm font-medium text-zinc-500 outline-none"
                        >
                          <option>Новая</option>
                          <option>Диагностика</option>
                          <option>В ремонте</option>
                          <option>Готово</option>
                          <option>Выдано</option>
                        </select>
                      ) : (
                        <div className="rounded-full border border-black/5 bg-black/[0.03] px-4 py-2 text-sm font-medium text-zinc-500">
                          {request.status}
                        </div>
                      )}
                    </div>

                    <a
                      href={`/dashboard/${request.id}`}
                      className="block transition hover:opacity-60"
                    >
                      <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
                        {request.device}
                      </h2>
                    </a>

                    <div className="mt-4 text-lg leading-8 text-zinc-500">
                      {request.service}
                    </div>

                    <div className="mt-3 text-sm text-zinc-400">
                      Назначенный мастер: {request.master}
                    </div>

                    <div className="mt-8">
                      <Button href={`/dashboard/${request.id}`} variant="secondary">
                        Открыть заявку
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2 lg:min-w-[340px]">
                    <div>
                      <div className="mb-2 text-sm font-medium uppercase tracking-[0.15em] text-zinc-400">
                        Ответственный мастер
                      </div>

                      <div className="text-lg font-medium text-zinc-900">
                        {request.master}
                      </div>
                    </div>

                    <div>
                      <div className="mb-2 text-sm font-medium uppercase tracking-[0.15em] text-zinc-400">
                        Дата создания
                      </div>

                      <div className="text-lg font-medium text-zinc-900">
                        {request.date}
                      </div>
                    </div>

                    <div>
                      <div className="mb-2 text-sm font-medium uppercase tracking-[0.15em] text-zinc-400">
                        Стоимость ремонта
                      </div>

                      <div className="text-lg font-medium text-zinc-900">
                        {request.price
                          ? `${request.price} ₽`
                          : "Не указана"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </main>
  )
}