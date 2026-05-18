import { prisma } from "@/lib/prisma"

export async function GET() {
  const requests = await prisma.repairRequest.findMany({
    include: {
      client: true,
    },
  })

  return Response.json(requests)
}

export async function POST(req: Request) {
  const body = await req.json()

  const request = await prisma.repairRequest.create({
    data: {
      device: body.device,
      service: body.service,
      status: "Новая",
      master: body.master,
      comment: body.comment || "",
      date: new Date().toISOString(),

      clientId: body.clientId,
    },
  })

  return Response.json(request)
}