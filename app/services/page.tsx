import Container from "@/components/ui/Container"
import Button from "@/components/ui/Button"

const services = [
  {
    id: 1,
    category: "Смартфоны",
    title: "Замена дисплея",
    description:
      "Профессиональная замена экранов смартфонов с использованием качественных комплектующих.",
    price: "от 4 990 ₽",
    duration: "1–2 часа",
  },
  {
    id: 2,
    category: "Ноутбуки",
    title: "Чистка системы охлаждения",
    description:
      "Профилактическое обслуживание ноутбуков с полной очисткой системы охлаждения и заменой термопасты.",
    price: "от 3 490 ₽",
    duration: "до 2 часов",
  },
  {
    id: 3,
    category: "Apple",
    title: "Замена аккумулятора",
    description:
      "Замена аккумуляторов iPhone и MacBook с диагностикой устройства перед ремонтом.",
    price: "от 5 990 ₽",
    duration: "1 час",
  },
  {
    id: 4,
    category: "Планшеты",
    title: "Ремонт разъёма зарядки",
    description:
      "Восстановление и замена разъёмов питания и зарядки планшетов различных брендов.",
    price: "от 2 990 ₽",
    duration: "до 3 часов",
  },
  {
    id: 5,
    category: "Диагностика",
    title: "Комплексная диагностика",
    description:
      "Выявление неисправностей техники с подготовкой рекомендаций по дальнейшему ремонту.",
    price: "Бесплатно",
    duration: "30 минут",
  },
  {
    id: 6,
    category: "Компьютеры",
    title: "Модернизация ПК",
    description:
      "Подбор и установка комплектующих для повышения производительности компьютера.",
    price: "от 6 990 ₽",
    duration: "до 1 дня",
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#f5f3ef] pb-32 pt-24">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex rounded-full border border-black/5 bg-white/70 px-5 py-2 text-sm font-medium text-zinc-500 shadow-sm backdrop-blur">
            Каталог услуг
          </div>

          <h1 className="text-5xl font-semibold leading-[1] tracking-tight text-zinc-900 md:text-7xl">
            Ремонт техники
            <span className="mt-2 block text-zinc-400">
              в цифровом формате
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-zinc-500 md:text-xl">
            Выберите необходимую услугу, ознакомьтесь со стоимостью
            и сроками ремонта, а затем найдите подходящего мастера.
          </p>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col rounded-[32px] border border-black/5 bg-white/70 p-8 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-8 flex items-center justify-between gap-3">
                <div className="rounded-full border border-black/5 bg-black/[0.03] px-4 py-2 text-sm font-medium text-zinc-500">
                  {service.category}
                </div>

                <div className="text-sm font-medium text-zinc-400">
                  {service.duration}
                </div>
              </div>

              <h2 className="mb-4 text-3xl font-semibold tracking-tight text-zinc-900 transition group-hover:text-black">
                {service.title}
              </h2>

              <p className="flex-1 leading-8 text-zinc-500">
                {service.description}
              </p>

              <div className="mt-10 flex items-end justify-between gap-4">
                <div>
                  <div className="mb-1 text-sm font-medium text-zinc-400">
                    Стоимость
                  </div>

                  <div className="text-3xl font-semibold tracking-tight text-zinc-900">
                    {service.price}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  href={`/masters?service=${encodeURIComponent(service.title)}`}
                  variant="secondary"
                >
                  Выбрать мастера
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </main>
  )
}