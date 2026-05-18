import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const body = await req.json()

  const existingUser = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  })

  if (existingUser) {
    return Response.json(
      { error: "Пользователь уже существует" },
      { status: 400 }
    )
  }

  const role = "admin"

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password,
      role,
    },
  })

  return Response.json(user)
}