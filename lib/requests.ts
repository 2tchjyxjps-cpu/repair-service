export type RepairRequest = {
  id: string
  name: string
  phone: string
  device: string
  service?: string
  problem: string
  comment: string
  clientId?: string
  clientName?: string
  status: string
  master: string
  price?: string
  date: string
  history?: string[]
}

const STORAGE_KEY = "repair_requests"

export function getRequests(): RepairRequest[] {
  if (typeof window === "undefined") {
    return []
  }

  const data = localStorage.getItem(STORAGE_KEY)

  return data ? JSON.parse(data) : []
}

export function createRequest(request: RepairRequest) {
  const requests = getRequests()

  requests.unshift(request)

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(requests)
  )
}

export function updateRequestStatus(
  id: string,
  status: string
) {
  const requests = getRequests()

  const updatedRequests = requests.map((request) =>
    request.id === id
      ? {
          ...request,
          status,
          history: [
            ...(request.history || []),
            `${new Date().toLocaleTimeString("ru-RU")} — статус изменен на "${status}"`,
          ],
        }
      : request
  )

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedRequests)
  )
}

export function updateRequestMaster(
  id: string,
  master: string
) {
  const requests = getRequests()

  const updatedRequests = requests.map((request) =>
    request.id === id
      ? {
          ...request,
          master,
          history: [
            ...(request.history || []),
            `${new Date().toLocaleTimeString("ru-RU")} — назначен мастер "${master}"`,
          ],
        }
      : request
  )

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedRequests)
  )
}