type Props = {
  params: Promise<{
    id: string
  }>
}
export async function PATCH(
  req: Request,
  { params }: Props
) {
  const body = await req.json()

  const resolvedParams = await params

  const currentRequest =
    await prisma.repairRequest.findUnique({
      where: {
        id: resolvedParams.id,
      },
    })

  if (!currentRequest) {
    return Response.json(
      { error: "Заявка не найдена" },
      { status: 404 }
    )
  }

  const history = Array.isArray(
    currentRequest.history
  )
    ? currentRequest.history
    : []

  const timestamp =
    new Date().toLocaleString("ru-RU")

  if (
    body.status &&
    body.status !== currentRequest.status
  ) {
    history.push(
      `${timestamp} — статус изменен на "${body.status}"`
    )
  }

  if (
    body.master &&
    body.master !== currentRequest.master
  ) {
    history.push(
      `${timestamp} — назначен мастер "${body.master}"`
    )
  }

  if (
    body.price &&
    body.price !== currentRequest.price
  ) {
    history.push(
      `${timestamp} — установлена цена ${body.price} ₽`
    )
  }

  const updatedRequest =
    await prisma.repairRequest.update({
      where: {
        id: resolvedParams.id,
      },

      data: {
        status:
          body.status ??
          currentRequest.status,

        master:
          body.master ??
          currentRequest.master,

        price:
          body.price ??
          currentRequest.price,

        history,
      },
    })

  return Response.json(updatedRequest)
}