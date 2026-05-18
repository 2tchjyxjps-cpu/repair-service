"use client"

import { useEffect, useState } from "react"

import Container from "@/components/ui/Container"

import type { RepairRequest } from "@/lib/requests"

type Props = {
  params: Promise<{
    id: string
  }>
}

export default function RequestPage({
  params,
}: Props) {
  const [request, setRequest] =
    useState<RepairRequest | null>(null)

  useEffect(() => {
    async function loadRequest() {
      const resolvedParams = await params

      const response = await fetch("/api/requests")

      const requests = await response.json()

      const foundRequest = requests.find(
        (item: any) => item.id === resolvedParams.id
      )

      if (foundRequest) {
        setRequest(foundRequest)
      }
    }

    loadRequest()
  }, [params])

  if (!request) {
    return (
      <main className="min-h-screen bg-[#f5f3ef] py-24">
        <Container>
          <div className="text-center text-zinc-500">
            Загрузка заявки...
          </div>
        </Container>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f5f3ef] py-24">
      <Container>
        <div className="mx-auto max-w-5xl rounded-[40px] border border-black/5 bg-white/70 p-10 shadow-sm backdrop-blur md:p-14">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <div className="rounded-full border border-black/5 bg-black/[0.03] px-4 py-2 text-sm font-medium text-zinc-500">
              {request.id}
            </div>

            <div className="rounded-full border border-black/5 bg-black/[0.03] px-4 py-2 text-sm font-medium text-zinc-500">
              {request.status}
            </div>
          </div>

          <h1 className="text-5xl font-semibold tracking-tight text-zinc-900">
            {request.device}
          </h1>

          <div className="mt-4 text-xl text-zinc-500">
            {request.service}
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            <div>
              <div className="mb-2 text-sm uppercase tracking-[0.15em] text-zinc-400">
                Клиент
              </div>

              <div className="text-2xl font-medium text-zinc-900">
                {request.client?.name || "Клиент"}
              </div>
            </div>

            <div>
              <div className="mb-2 text-sm uppercase tracking-[0.15em] text-zinc-400">
                Телефон
              </div>

              <div className="text-2xl font-medium text-zinc-900">
                Не указан
              </div>
            </div>

            <div>
              <div className="mb-2 text-sm uppercase tracking-[0.15em] text-zinc-400">
                Мастер
              </div>

              <div className="text-2xl font-medium text-zinc-900">
                {request.master}
              </div>
            </div>

            <div>
              <div className="mb-2 text-sm uppercase tracking-[0.15em] text-zinc-400">
                Дата заявки
              </div>

              <div className="text-2xl font-medium text-zinc-900">
                {request.date}
              </div>
            </div>

            <div>
              <div className="mb-2 text-sm uppercase tracking-[0.15em] text-zinc-400">
                Стоимость ремонта
              </div>

              <div className="text-2xl font-medium text-zinc-900">
                {request.price
                  ? `${request.price} ₽`
                  : "Не указана"}
              </div>
            </div>
          </div>

          <div className="mt-14">
            <div className="mb-4 text-sm uppercase tracking-[0.15em] text-zinc-400">
              Описание проблемы
            </div>

            <div className="rounded-[28px] border border-black/5 bg-black/[0.02] p-8 text-lg leading-8 text-zinc-600">
              {request.comment}
            </div>
          </div>

          <div className="mt-14">
            <div className="mb-4 text-sm uppercase tracking-[0.15em] text-zinc-400">
              Дополнительный комментарий
            </div>

            <div className="rounded-[28px] border border-black/5 bg-black/[0.02] p-8 text-lg leading-8 text-zinc-600">
              {request.comment || "Комментарий отсутствует"}
            </div>
          </div>

          <div className="mt-14">
            <div className="mb-4 text-sm uppercase tracking-[0.15em] text-zinc-400">
              История заявки
            </div>

            <div className="space-y-3">
              {Array.isArray(request.history) &&
              request.history.length > 0 ? (
                request.history.map(
                  (event: string, index: number) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-black/5 bg-black/[0.02] px-5 py-4 text-sm text-zinc-600"
                    >
                      {event}
                    </div>
                  )
                )
              ) : (
                <div className="rounded-2xl border border-black/5 bg-black/[0.02] px-5 py-4 text-sm text-zinc-600">
                  История изменений пока отсутствует
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}