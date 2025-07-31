// Datos simulados para métricas de usuario
export async function getUserMetrics(userId: string) {
  // Simular retraso
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Datos mensuales simulados
  const monthlyData = [
    { name: "Ene", facturas: 12, declaraciones: 1 },
    { name: "Feb", facturas: 19, declaraciones: 1 },
    { name: "Mar", facturas: 15, declaraciones: 1 },
    { name: "Abr", facturas: 21, declaraciones: 1 },
    { name: "May", facturas: 18, declaraciones: 1 },
    { name: "Jun", facturas: 24, declaraciones: 1 },
  ]

  // Datos financieros simulados
  const financialData = [
    { name: "Ingresos", value: 75000 },
    { name: "Gastos", value: 45000 },
    { name: "Impuestos", value: 12000 },
  ]

  return {
    monthlyData,
    totalDocuments: 109,
    totalDeclarations: 6,
    financialData,
    taxesPaid: 12000,
  }
}

// Datos simulados para métricas de administrador
export async function getAdminMetrics() {
  // Simular retraso
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Datos mensuales simulados
  const monthlyData = [
    { name: "Ene", usuarios: 15, declaraciones: 15, facturas: 180 },
    { name: "Feb", usuarios: 18, declaraciones: 18, facturas: 220 },
    { name: "Mar", usuarios: 25, declaraciones: 25, facturas: 280 },
    { name: "Abr", usuarios: 32, declaraciones: 32, facturas: 310 },
    { name: "May", usuarios: 38, declaraciones: 38, facturas: 350 },
    { name: "Jun", usuarios: 42, declaraciones: 42, facturas: 390 },
  ]

  // Datos de distribución de planes
  const plansData = [
    { name: "Plan Digital", value: 65 },
    { name: "Plan Emprendedor", value: 25 },
    { name: "Plan Empresarial", value: 10 },
  ]

  return {
    monthlyData,
    usersCount: 42,
    documentsCount: 1730,
    declarationsCount: 170,
    plansData,
    revenue: 126000,
  }
}

