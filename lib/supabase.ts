export type Declaration = {
  id: string
  user_id: string
  title: string
  date: string
  status: string
  details?: string
  created_at: string
}

export async function getUserDeclarations(userId: string): Promise<Declaration[]> {
  console.log("getUserDeclarations called with userId:", userId)
  return []
}

