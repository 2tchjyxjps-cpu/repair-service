import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const body = await req.json()

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  })

  if (!user) {
    return Response.json(
      { error: "Пользователь не найден" },
      { status: 404 }
    )
  }

  if (user.password !== body.password) {
    return Response.json(
      { error: "Неверный пароль" },
      { status: 400 }
    )
  }

  return Response.json(user)
}