"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import Container from "@/components/ui/Container"
import Button from "@/components/ui/Button"


import { getCurrentUser } from "@/lib/auth"

export default function BookingPage() {
  const searchParams = useSearchParams()

  const selectedMasterParam = searchParams.get("master")
  const selectedServiceParam = searchParams.get("service")

  const selectedMaster =
    selectedMasterParam && selectedMasterParam.trim().length > 0
      ? selectedMasterParam
      : "Не назначен"

  const [selectedService, setSelectedService] =
    useState(
      selectedServiceParam &&
        selectedServiceParam.trim().length > 0
        ? selectedServiceParam
        : ""
    )

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [device, setDevice] = useState("")
  const [problem, setProblem] = useState("")
  const [comment, setComment] = useState("")

  const [services, setServices] =
    useState<any[]>([])

  useEffect(() => {
    async function loadServices() {
      const response = await fetch(
        "/api/services"
      )

      const data = await response.json()

      setServices(data)
    }

    loadServices()
  }, [])

  const handleSubmit = async () => {
    if (!name || !phone || !device || !problem || !comment) {
      alert("Заполните все поля")
      return
    }

    const user = getCurrentUser()

    if (!user) {
      alert("Войдите в аккаунт")
      return
    }

    const response = await fetch("/api/requests", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        device,
        service: selectedService,
        master: selectedMaster,
        comment: `${problem}\n\n${comment}`,
        clientId: user.id,
      }),
    })

    if (!response.ok) {
      alert("Ошибка создания заявки")
      return
    }

    alert("Заявка успешно отправлена")

    window.location.href = "/dashboard"
  }
  return (
    <main className="min-h-screen bg-[#f5f3ef] pb-32 pt-24">
      <Container>
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-4xl">
            <div className="mb-8 inline-flex rounded-full border border-black/5 bg-white/70 px-5 py-2 text-sm font-medium text-zinc-500 shadow-sm backdrop-blur">
              Онлайн-заявка
            </div>

            <h1 className="text-5xl font-semibold leading-[1] tracking-tight text-zinc-900 md:text-7xl">
              Оформление
              <span className="mt-2 block text-zinc-400">
                заявки на ремонт
              </span>
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-zinc-500 md:text-xl">
              Заполните информацию об устройстве и проблеме,
              после чего заявка будет передана выбранному специалисту.
            </p>

            <div className="mt-6 rounded-2xl border border-black/5 bg-white/70 px-5 py-4 text-sm text-zinc-500 shadow-sm backdrop-blur">
              selected master: {selectedMaster}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
            <div className="rounded-[36px] border border-black/5 bg-white/70 p-8 shadow-sm backdrop-blur">
              <div className="mb-10 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-zinc-400">
                    Услуга
                  </div>

                  <div className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">
                    {selectedService}
                  </div>
                </div>

                <div className="rounded-full border border-black/5 bg-black/[0.03] px-4 py-2 text-sm font-medium text-zinc-500">
                  1–2 часа
                </div>
              </div>

              <div className="mb-10 rounded-[28px] border border-black/5 bg-black/[0.02] p-6">
                <div className="mb-5 text-sm font-medium text-zinc-400">
                  Специалист
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 text-xl font-semibold text-white">
                    {selectedMaster.charAt(0)}
                  </div>

                  <div>
                    <div className="text-2xl font-semibold tracking-tight text-zinc-900">
                      {selectedMaster}
                    </div>

                    <div className="mt-1 text-sm font-medium text-zinc-400">
                      Специалист сервиса
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="mb-2 text-sm font-medium text-zinc-400">
                    Стоимость
                  </div>

                  <div className="text-4xl font-semibold tracking-tight text-zinc-900">
                    от 4 990 ₽
                  </div>
                </div>

                <div>
                  <div className="mb-2 text-sm font-medium text-zinc-400">
                    Формат работы
                  </div>

                  <div className="text-lg leading-8 text-zinc-500">
                    Онлайн-оформление заявки с последующим подтверждением ремонта.
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[36px] border border-black/5 bg-white/70 p-8 shadow-sm backdrop-blur md:p-10">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <label className="mb-3 block text-sm font-medium text-zinc-500">
                    Имя клиента
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Введите имя"
                    className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-zinc-900 outline-none transition focus:border-zinc-900"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-zinc-500">
                    Контактный телефон
                  </label>

                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (999) 999-99-99"
                    className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-zinc-900 outline-none transition focus:border-zinc-900"
                  />
                </div>
              </div>


              <div className="mt-8">
                <label className="mb-3 block text-sm font-medium text-zinc-500">
                  Устройство
                </label>

                <input
                  type="text"
                  value={device}
                  onChange={(e) => setDevice(e.target.value)}
                  placeholder="Например: iPhone 15 Pro"
                  className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-zinc-900 outline-none transition focus:border-zinc-900"
                />
              </div>

              <div className="mt-8">
                <label className="mb-3 block text-sm font-medium text-zinc-500">
                  Описание проблемы
                </label>

                <textarea
                  rows={6}
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder="Опишите неисправность устройства"
                  className="w-full resize-none rounded-2xl border border-black/10 bg-white px-5 py-4 text-zinc-900 outline-none transition focus:border-zinc-900"
                />
              </div>

              <div className="mt-8">
                <label className="mb-3 block text-sm font-medium text-zinc-500">
                  Дополнительный комментарий
                </label>

                <textarea
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Дополнительная информация по заявке"
                  className="w-full resize-none rounded-2xl border border-black/10 bg-white px-5 py-4 text-zinc-900 outline-none transition focus:border-zinc-900"
                />
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
                <div className="max-w-md text-sm leading-7 text-zinc-400">
                  После отправки заявки специалист свяжется с вами
                  для подтверждения ремонта и уточнения деталей.
                </div>

                <Button onClick={handleSubmit}>
                  Отправить заявку
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}