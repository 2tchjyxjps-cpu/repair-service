
import { prisma } from "@/lib/prisma"

type Props = {
  params: Promise<{
    id: string
  }>
}

export async function DELETE(
  req: Request,
  { params }: Props
) {
  const resolvedParams = await params

  await prisma.user.delete({
    where: {
      id: resolvedParams.id,
    },
  })

  return Response.json({
    success: true,
  })
}