// Tipos para los usuarios
export type UserProfile = {
  id: string
  name: string
  email: string
  hasEfirma: boolean
  lineaCaptura: string
  isAdmin: boolean
  created_at?: string
}

// Datos simulados
const USERS: UserProfile[] = [
  {
    id: "admin-id",
    name: "Ana Gómez",
    email: "admin@contago.com",
    hasEfirma: true,
    lineaCaptura: "",
    isAdmin: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "user-id",
    name: "Juan Pérez",
    email: "usuario@contago.com",
    hasEfirma: false,
    lineaCaptura: "LC-2023-001-002-003",
    isAdmin: false,
    created_at: new Date().toISOString(),
  },
]

// Simulación de sesión - Inicializamos con un usuario para pruebas rápidas
let currentUser: UserProfile | null = null

// Funciones de autenticación simplificadas
export async function signIn(email: string, password: string) {
  // Sin retrasos simulados para que sea instantáneo

  // Verificación directa para los usuarios de prueba
  if (email === "admin@contago.com" && password === "admin123") {
    currentUser = USERS[0]
    // Guardar en localStorage para persistencia
    localStorage.setItem("currentUser", JSON.stringify(currentUser))
    return { user: { id: currentUser.id, email }, profile: currentUser }
  } else if (email === "usuario@contago.com" && password === "usuario123") {
    currentUser = USERS[1]
    // Guardar en localStorage para persistencia
    localStorage.setItem("currentUser", JSON.stringify(currentUser))
    return { user: { id: currentUser.id, email }, profile: currentUser }
  }

  throw new Error("Invalid login credentials")
}

export async function signUp(name: string, email: string, password: string) {
  // Verificar si el usuario ya existe
  const existingUser = USERS.find(user => user.email === email)
  if (existingUser) {
    throw new Error("Ya existe un usuario con este email")
  }

  // Validaciones básicas
  if (password.length < 6) {
    throw new Error("La contraseña debe tener al menos 6 caracteres")
  }

  if (!email.includes("@")) {
    throw new Error("Email inválido")
  }

  // Crear nuevo usuario
  const newUser: UserProfile = {
    id: `user-${Date.now()}`,
    name,
    email,
    hasEfirma: false,
    lineaCaptura: `LC-${Date.now()}`,
    isAdmin: false,
    created_at: new Date().toISOString(),
  }

  // Agregar a la lista de usuarios (en una app real esto sería una base de datos)
  USERS.push(newUser)

  // Iniciar sesión automáticamente después del registro
  currentUser = newUser
  localStorage.setItem("currentUser", JSON.stringify(currentUser))

  return { user: { id: newUser.id, email }, profile: newUser }
}

export async function signOut() {
  // Sin retrasos simulados
  currentUser = null
  // Limpiar localStorage
  localStorage.removeItem("currentUser")
}

export async function getCurrentUser() {
  // Sin retrasos simulados

  // Intentar recuperar de localStorage primero
  const storedUser = localStorage.getItem("currentUser")
  if (storedUser) {
    try {
      currentUser = JSON.parse(storedUser)
    } catch (e) {
      console.error("Error parsing stored user:", e)
      localStorage.removeItem("currentUser")
    }
  }

  if (!currentUser) {
    return { user: null, profile: null }
  }

  return {
    user: { id: currentUser.id, email: currentUser.email },
    profile: currentUser,
  }
}

// Datos simulados para documentos
export type Document = {
  id: string
  user_id: string
  name: string
  path: string
  size: number
  type: string
  created_at: string
}

const DOCUMENTS: Document[] = [
  {
    id: "doc-1",
    user_id: "user-id",
    name: "factura_enero_2024.pdf",
    path: "/documents/factura_enero_2024.pdf",
    size: 1200000,
    type: "application/pdf",
    created_at: "2024-01-15T10:30:00Z",
  },
  {
    id: "doc-2",
    user_id: "user-id",
    name: "recibo_luz_febrero_2024.pdf",
    path: "/documents/recibo_luz_febrero_2024.pdf",
    size: 850000,
    type: "application/pdf",
    created_at: "2024-02-10T14:45:00Z",
  },
  {
    id: "doc-3",
    user_id: "user-id",
    name: "contrato_arrendamiento_2024.pdf",
    path: "/documents/contrato_arrendamiento_2024.pdf",
    size: 2100000,
    type: "application/pdf",
    created_at: "2024-03-01T09:15:00Z",
  },
]

// Funciones para gestionar documentos
export async function uploadDocument(userId: string, file: File) {
  // Simular retraso
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const newDoc: Document = {
    id: `doc-${Date.now()}`,
    user_id: userId,
    name: file.name,
    path: `/documents/${file.name}`,
    size: file.size,
    type: file.type,
    created_at: new Date().toISOString(),
  }

  DOCUMENTS.push(newDoc)
  return newDoc
}

export async function getUserDocuments(userId: string) {
  // Simular retraso
  await new Promise((resolve) => setTimeout(resolve, 500))

  return DOCUMENTS.filter((doc) => doc.user_id === userId).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  )
}

// Datos simulados para declaraciones
export type Declaration = {
  id: string
  user_id: string
  title: string
  date: string
  status: string
  details?: string
  created_at: string
}

const DECLARATIONS: Declaration[] = [
  {
    id: "dec-1",
    user_id: "user-id",
    title: "Declaración Mensual - Marzo 2024",
    date: "2024-04-10T00:00:00Z",
    status: "Procesada",
    details: "Declaración mensual correspondiente a marzo de 2024",
    created_at: "2024-04-10T10:30:00Z",
  },
  {
    id: "dec-2",
    user_id: "user-id",
    title: "Declaración Mensual - Febrero 2024",
    date: "2024-03-10T00:00:00Z",
    status: "Procesada",
    details: "Declaración mensual correspondiente a febrero de 2024",
    created_at: "2024-03-10T09:45:00Z",
  },
  {
    id: "dec-3",
    user_id: "user-id",
    title: "Declaración Mensual - Enero 2024",
    date: "2024-02-10T00:00:00Z",
    status: "Procesada",
    details: "Declaración mensual correspondiente a enero de 2024",
    created_at: "2024-02-10T11:20:00Z",
  },
  {
    id: "dec-4",
    user_id: "user-id",
    title: "Declaración Anual - 2023",
    date: "2024-03-30T00:00:00Z",
    status: "En revisión",
    details: "Declaración anual correspondiente al ejercicio fiscal 2023",
    created_at: "2024-03-30T15:10:00Z",
  },
]

// Funciones para gestionar declaraciones
export async function getUserDeclarations(userId: string) {
  // Simular retraso
  await new Promise((resolve) => setTimeout(resolve, 500))

  return DECLARATIONS.filter((dec) => dec.user_id === userId).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  )
}

// Datos simulados para historial
export type HistoryItem = {
  id: string
  user_id: string
  action: string
  date: string
}

const HISTORY: HistoryItem[] = [
  {
    id: "hist-1",
    user_id: "user-id",
    action: "Factura generada",
    date: "2024-05-15T14:30:00Z",
  },
  {
    id: "hist-2",
    user_id: "user-id",
    action: "Declaración mensual presentada",
    date: "2024-05-10T09:15:00Z",
  },
  {
    id: "hist-3",
    user_id: "user-id",
    action: "Archivo subido: recibo_luz_abril_2024.pdf",
    date: "2024-05-05T11:45:00Z",
  },
  {
    id: "hist-4",
    user_id: "user-id",
    action: "Consulta fiscal realizada",
    date: "2024-05-02T16:20:00Z",
  },
  {
    id: "hist-5",
    user_id: "user-id",
    action: "Actualización de datos personales",
    date: "2024-04-28T10:00:00Z",
  },
]

export async function getUserHistory(userId: string) {
  // Simular retraso
  await new Promise((resolve) => setTimeout(resolve, 500))

  return HISTORY.filter((item) => item.user_id === userId).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
}

export async function addHistoryItem(userId: string, action: string) {
  const newItem: HistoryItem = {
    id: `hist-${Date.now()}`,
    user_id: userId,
    action,
    date: new Date().toISOString(),
  }

  HISTORY.push(newItem)
  return newItem
}

// Funciones para administradores
export async function getAllUsers() {
  // Simular retraso
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [...USERS]
}

export async function updateUserLineaCaptura(userId: string, lineaCaptura: string) {
  // Simular retraso
  await new Promise((resolve) => setTimeout(resolve, 800))

  const userIndex = USERS.findIndex((user) => user.id === userId)
  if (userIndex !== -1) {
    USERS[userIndex].lineaCaptura = lineaCaptura
    return true
  }

  return false
}

export async function updateUserEfirma(userId: string, hasEfirma: boolean) {
  // Simular retraso
  await new Promise((resolve) => setTimeout(resolve, 800))

  const userIndex = USERS.findIndex((user) => user.id === userId)
  if (userIndex !== -1) {
    USERS[userIndex].hasEfirma = hasEfirma
    return true
  }

  return false
}

