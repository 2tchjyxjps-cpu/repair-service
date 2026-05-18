import { prisma } from "@/lib/prisma"

export async function GET() {
  const masters =
    await prisma.user.findMany({
      where: {
        role: "MASTER",
      },
    })

  return Response.json(masters)
}

export async function POST(
  req: Request
) {
  const body = await req.json()

  const master =
    await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,

        specialization:
          body.specialization,

        description:
          body.description,

        role: "MASTER",
      },
    })

  return Response.json(master)
}