"use client"

import { useSearchParams } from "next/navigation"

import Container from "@/components/ui/Container"

const masters = [
  {
    id: 1,
    name: "Александр Петров",
    role: "Специалист по ремонту смартфонов",
    specialization: "Смартфоны",
    experience: "7 лет опыта",
    rating: "4.9",
    description:
      "Специализируется на ремонте iPhone, Samsung и других мобильных устройств премиального сегмента.",
  },
  {
    id: 2,
    name: "Дмитрий Волков",
    role: "Инженер по ремонту ноутбуков",
    specialization: "Ноутбуки",
    experience: "10 лет опыта",
    rating: "5.0",
    description:
      "Проводит диагностику и сложный ремонт ноутбуков, рабочих станций и игровых систем.",
  },
  {
    id: 3,
    name: "Егор Смирнов",
    role: "Apple-специалист",
    specialization: "Apple-устройства",
    experience: "6 лет опыта",
    rating: "4.8",
    description:
      "Работает с техникой Apple: MacBook, iPhone, iPad и другими устройствами экосистемы.",
  },
]

export default function MastersPage() {
  const searchParams = useSearchParams()

  const selectedService =
    searchParams.get("service") || "Ремонт устройства"

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
                      {master.role}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-5 flex flex-wrap items-center gap-3">
                <div className="rounded-full border border-black/5 bg-black/[0.03] px-4 py-2 text-sm font-medium text-zinc-500">
                  ⭐ {master.rating}
                </div>

                <div className="rounded-full border border-black/5 bg-black/[0.03] px-4 py-2 text-sm font-medium text-zinc-500">
                  {master.experience}
                </div>

                <div className="rounded-full border border-black/5 bg-zinc-900 px-4 py-2 text-sm font-medium text-white">
                  {master.specialization}
                </div>
              </div>

              <p className="flex-1 leading-8 text-zinc-500">
                {master.description}
              </p>

              <div className="mt-10">
                <a
                  href={`/booking?master=${encodeURIComponent(master.name)}&service=${encodeURIComponent(selectedService)}`}
                  className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:opacity-80"
                >
                  Оформить заявку
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </main>
  )
}