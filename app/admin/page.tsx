"use client"

import { useEffect, useState } from "react"

import Container from "@/components/ui/Container"
import Button from "@/components/ui/Button"

import type { RepairRequest } from "@/lib/requests"

export default function AdminPage() {
  const [requests, setRequests] =
    useState<RepairRequest[]>([])

  const [search, setSearch] = useState("")

  const [statusFilter, setStatusFilter] =
    useState("Все статусы")

  const [masterFilter, setMasterFilter] =
    useState("Все мастера")

  useEffect(() => {
    async function loadRequests() {
      const response = await fetch("/api/requests")

      const data = await response.json()

      setRequests(data)
    }

    loadRequests()
  }, [])

  const handleStatusChange = async (
    id: string,
    status: string
  ) => {
    await fetch(`/api/requests/${id}`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        status,
      }),
    })

    const response = await fetch("/api/requests")

    const data = await response.json()

    setRequests(data)
  }

  const handleMasterChange = async (
    id: string,
    master: string
  ) => {
    await fetch(`/api/requests/${id}`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        master,
      }),
    })

    const response = await fetch("/api/requests")

    const data = await response.json()

    setRequests(data)
  }

  const handlePriceChange = async (
    id: string,
    price: string
  ) => {
    await fetch(`/api/requests/${id}`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        price,
      }),
    })

    const response = await fetch("/api/requests")

    const data = await response.json()

    setRequests(data)
  }

  const masters = [
    "Не назначен",
    "Александр Петров",
    "Дмитрий Волков",
    "Егор Смирнов",
  ]

  const filteredRequests = requests.filter(
    (request) => {
      const matchesSearch =
        request.id
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        request.device
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (request.client?.name || "")
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesStatus =
        statusFilter === "Все статусы"
          ? true
          : request.status === statusFilter

      const matchesMaster =
        masterFilter === "Все мастера"
          ? true
          : request.master === masterFilter

      return (
        matchesSearch &&
        matchesStatus &&
        matchesMaster
      )
    }
  )

  return (
    <main className="min-h-screen bg-[#f5f3ef] py-24">
      <Container>
        <div className="mb-20 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-black/5 bg-white/70 px-5 py-2 text-sm font-medium text-zinc-500 backdrop-blur">
              Admin Panel
            </div>

            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-zinc-900 md:text-7xl">
              Управление
              <span className="block text-zinc-300">
                сервисными заявками
              </span>
            </h1>
          </div>

          <Button>
            Новая заявка
          </Button>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="rounded-[36px] border border-black/5 bg-white/70 p-8 shadow-sm backdrop-blur md:p-10">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium uppercase tracking-[0.15em] text-zinc-400">
                  Активные
                </div>

                <div className="mt-3 text-5xl font-semibold tracking-tight text-zinc-900">
                  {
                    requests.filter(
                      (request) =>
                        request.status !== "Выдано"
                    ).length
                  }
                </div>
              </div>

              <div className="rounded-full border border-black/5 bg-black/[0.03] px-4 py-2 text-sm font-medium text-zinc-500">
                +3 за день
              </div>
            </div>

            <p className="text-lg leading-8 text-zinc-500">
              Текущие заявки, находящиеся
              в обработке сервисного центра.
            </p>
          </div>

          <div className="rounded-[36px] border border-black/5 bg-zinc-900 p-8 text-white shadow-sm md:p-10">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium uppercase tracking-[0.15em] text-zinc-500">
                  Мастера
                </div>

                <div className="mt-3 text-5xl font-semibold tracking-tight">
                  {
                    new Set(
                      requests
                        .map((request) => request.master)
                        .filter(
                          (master) =>
                            master !== "Не назначен"
                        )
                    ).size
                  }
                </div>
              </div>

              <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-zinc-300">
                online
              </div>
            </div>

            <p className="text-lg leading-8 text-zinc-400">
              Специалисты, назначенные
              на выполнение ремонтных работ.
            </p>
          </div>

          <div className="rounded-[36px] border border-black/5 bg-white/70 p-8 shadow-sm backdrop-blur md:p-10">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium uppercase tracking-[0.15em] text-zinc-400">
                  Завершено
                </div>

                <div className="mt-3 text-5xl font-semibold tracking-tight text-zinc-900">
                  {
                    requests.filter(
                      (request) =>
                        request.status === "Готово"
                    ).length
                  }
                </div>
              </div>

              <div className="rounded-full border border-black/5 bg-black/[0.03] px-4 py-2 text-sm font-medium text-zinc-500">
                май 2026
              </div>
            </div>

            <p className="text-lg leading-8 text-zinc-500">
              Успешно выполненные заявки
              в рамках текущего периода.
            </p>
          </div>
        </div>

        <div className="mt-16 rounded-[36px] border border-black/5 bg-white/70 p-8 shadow-sm backdrop-blur md:p-10">
          <div className="grid gap-4 lg:grid-cols-3">
            <input
              type="text"
              placeholder="Поиск по ID, клиенту или устройству"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="rounded-2xl border border-black/10 bg-white px-5 py-4 text-sm text-zinc-700 outline-none"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="rounded-2xl border border-black/10 bg-white px-5 py-4 text-sm text-zinc-700 outline-none"
            >
              <option>Все статусы</option>
              <option>Новая заявка</option>
              <option>Диагностика</option>
              <option>В ремонте</option>
              <option>Готово</option>
              <option>Выдано</option>
            </select>

            <select
              value={masterFilter}
              onChange={(e) =>
                setMasterFilter(e.target.value)
              }
              className="rounded-2xl border border-black/10 bg-white px-5 py-4 text-sm text-zinc-700 outline-none"
            >
              <option>Все мастера</option>

              {masters.map((master) => (
                <option
                  key={master}
                  value={master}
                >
                  {master}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              className="rounded-[36px] border border-black/5 bg-white/70 p-8 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl md:p-10"
            >
              <div className="flex flex-col gap-10 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex-1">
                  <div className="mb-5 flex flex-wrap items-center gap-3">
                    <div className="rounded-full border border-black/5 bg-black/[0.03] px-4 py-2 text-sm font-medium text-zinc-500">
                      {request.id}
                    </div>

                    <select
                      value={request.status}
                      onChange={(e) =>
                        handleStatusChange(
                          request.id,
                          e.target.value
                        )
                      }
                      className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-zinc-700 outline-none"
                    >
                      <option>Новая заявка</option>
                      <option>Диагностика</option>
                      <option>В ремонте</option>
                      <option>Готово</option>
                      <option>Выдано</option>
                    </select>
                  </div>

                  <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
                    {request.device}
                  </h2>

                  <div className="mt-4 text-lg leading-8 text-zinc-500">
                    {request.service}
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-4 xl:min-w-[760px]">
                  <div>
                    <div className="mb-2 text-sm font-medium uppercase tracking-[0.15em] text-zinc-400">
                      Клиент
                    </div>

                    <div className="text-lg font-medium text-zinc-900">
                      {request.client?.name || "Клиент"}
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 text-sm font-medium uppercase tracking-[0.15em] text-zinc-400">
                      Мастер
                    </div>

                    <select
                      value={request.master}
                      onChange={(e) =>
                        handleMasterChange(
                          request.id,
                          e.target.value
                        )
                      }
                      className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-medium text-zinc-700 outline-none"
                    >
                      {masters.map((master) => (
                        <option
                          key={master}
                          value={master}
                        >
                          {master}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <div className="mb-2 text-sm font-medium uppercase tracking-[0.15em] text-zinc-400">
                      Стоимость
                    </div>

                    <input
                      type="text"
                      defaultValue={request.price || ""}
                      placeholder="Введите цену"
                      onBlur={(e) =>
                        handlePriceChange(
                          request.id,
                          e.target.value
                        )
                      }
                      className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-medium text-zinc-700 outline-none"
                    />
                  </div>

                  <div>
                    <div className="mb-2 text-sm font-medium uppercase tracking-[0.15em] text-zinc-400">
                      Статус
                    </div>

                    <div className="text-lg font-medium text-zinc-900">
                      {request.status}
                    </div>

                    <div className="mt-2 text-sm text-zinc-400">
                      Статус обновляется в реальном времени
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredRequests.length === 0 && (
            <div className="rounded-[36px] border border-dashed border-black/10 bg-white/50 p-16 text-center text-zinc-400">
              Заявки не найдены
            </div>
          )}
        </div>
      </Container>
    </main>
  )
}