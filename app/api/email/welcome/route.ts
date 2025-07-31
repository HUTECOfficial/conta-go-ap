import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json()

    // Validaciones básicas
    if (!name || !email) {
      return NextResponse.json({ error: "Nombre y correo electrónico son obligatorios" }, { status: 400 })
    }

    // En una aplicación real, aquí se usaría un servicio de correo como SendGrid, Mailgun, etc.
    // Por ahora, simulamos el envío del correo
    console.log(`Enviando correo de bienvenida a ${name} (${email})`)

    // Simulamos el contenido del correo
    const emailContent = {
      to: email,
      subject: "¡Bienvenido a ContaGo!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #006450; color: white; padding: 20px; text-align: center;">
            <h1>ContaGo</h1>
          </div>
          <div style="padding: 20px; border: 1px solid #eee;">
            <h2>¡Hola ${name}!</h2>
            <p>Gracias por registrarte en ContaGo. Estamos emocionados de tenerte con nosotros.</p>
            <p>Con ContaGo, podrás gestionar tus declaraciones fiscales, facturas y más de manera sencilla y segura.</p>
            <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
            <div style="margin-top: 30px; text-align: center;">
              <a href="https://contago.com/dashboard" style="background-color: #006450; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Ir a mi cuenta</a>
            </div>
          </div>
          <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
            <p>© 2024 ContaGo. Todos los derechos reservados.</p>
          </div>
        </div>
      `,
    }

    // En una aplicación real, aquí se enviaría el correo
    // Por ahora, solo mostramos que se ha "enviado"
    console.log("Correo enviado:", emailContent)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Error al enviar el correo:", error)
    return NextResponse.json({ error: "Error al enviar el correo de bienvenida" }, { status: 500 })
  }
}

