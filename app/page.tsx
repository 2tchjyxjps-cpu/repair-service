import Container from "@/components/ui/Container"
import Button from "@/components/ui/Button"

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-[#f5f3ef] text-zinc-900">
      <section className="relative min-h-[92vh] border-b border-black/5">
        <div className="absolute left-1/2 top-0 -z-10 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-white blur-3xl" />

        <Container className="flex min-h-[92vh] flex-col justify-center py-24">
          <div className="max-w-6xl">
            <div className="mb-10 inline-flex rounded-full border border-black/5 bg-white/80 px-5 py-2 text-sm font-medium text-zinc-500 backdrop-blur">
              digital repair platform
            </div>

            <h1 className="max-w-6xl text-[56px] font-semibold leading-[0.9] tracking-[-0.04em] text-zinc-900 md:text-[110px]">
              Ремонт техники
              <span className="block text-zinc-300">
                в современном
              </span>
              цифровом сервисе
            </h1>

            <div className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_420px] lg:items-end">
              <p className="max-w-2xl text-xl leading-9 text-zinc-500 md:text-2xl md:leading-10">
                Платформа для поиска мастеров,
                онлайн-заявок и контроля ремонта
                в единой цифровой системе.
              </p>

              <div className="flex flex-wrap gap-4 lg:justify-end">
                <Button href="/services" variant="secondary">
                  Услуги
                </Button>

                <Button href="/masters" variant="secondary">
                  Мастера
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-32">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[40px] border border-black/5 bg-white/70 p-10 shadow-sm backdrop-blur md:p-14">
              <div className="mb-20 text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
                О платформе
              </div>

              <h2 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-zinc-900 md:text-6xl">
                Онлайн-система
                для взаимодействия
                клиентов и мастеров
              </h2>
            </div>

            <div className="flex flex-col justify-between rounded-[40px] border border-black/5 bg-zinc-900 p-10 text-white shadow-sm md:p-14">
              <div>
                <div className="mb-20 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
                  Возможности
                </div>

                <div className="space-y-6 text-2xl font-medium leading-tight md:text-3xl">
                  <div>Поиск специалистов</div>
                  <div>Оформление заявок</div>
                  <div>Контроль ремонта</div>
                </div>
              </div>

              <div className="mt-16 text-base leading-8 text-zinc-400">
                Пользователь получает доступ
                к цифровому сервису ремонта техники
                с единым интерфейсом взаимодействия.
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}