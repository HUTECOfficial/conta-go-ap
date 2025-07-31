# Configuración de Stripe para Conta-Go

## 🚀 Resumen
Tu aplicación ya tiene integrada la funcionalidad de Stripe para procesar pagos de los planes Digital ($300 MXN/mes) y Personal ($500 MXN/mes).

## 📋 Pasos para Configurar Stripe

### 1. Crear Cuenta en Stripe
1. Ve a [https://stripe.com](https://stripe.com)
2. Crea una cuenta o inicia sesión
3. Activa tu cuenta para México (MXN)

### 2. Obtener las Claves API
1. Ve al [Dashboard de Stripe](https://dashboard.stripe.com/apikeys)
2. Copia tu **Clave Secreta** (sk_test_...)
3. Guárdala de forma segura

### 3. Crear los Productos y Precios
1. Ve a [Productos](https://dashboard.stripe.com/products) en tu dashboard
2. Crea dos productos:

#### Plan Digital
- **Nombre**: Plan Digital
- **Descripción**: Ideal para trabajadores de plataformas digitales
- **Precio**: $300 MXN/mes (recurrente)
- **Copia el Price ID** (price_...)

#### Plan Personal  
- **Nombre**: Plan Personal
- **Descripción**: Servicio estándar para personas
- **Precio**: $500 MXN/mes (recurrente)
- **Copia el Price ID** (price_...)

### 4. Configurar Variables de Entorno

#### Para Desarrollo Local:
1. Copia `env.example` como `.env.local`
2. Completa las variables:
```bash
STRIPE_SECRET_KEY=sk_test_tu_clave_secreta_aqui
STRIPE_DIGITAL_PRICE_ID=price_id_del_plan_digital
STRIPE_PERSONAL_PRICE_ID=price_id_del_plan_personal
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

#### Para Producción (Vercel/Netlify):
Configura las mismas variables en el panel de control de tu plataforma de hosting.

## 🌐 Despliegue

### Opción 1: Vercel (Recomendado)
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en el dashboard
3. Despliega automáticamente

### Opción 2: Netlify
1. Conecta tu repositorio a Netlify
2. Configura las variables de entorno
3. Despliega automáticamente

## ✅ Funcionalidades Implementadas

- ✅ Checkout de Stripe para ambos planes
- ✅ Página de éxito después del pago
- ✅ Página de cancelación si el usuario cancela
- ✅ Estados de carga en los botones
- ✅ Manejo de errores
- ✅ Redirección automática al dashboard después del pago

## 🔧 Flujo de Pago

1. Usuario hace clic en "Comenzar prueba gratuita" o "Comenzar ahora"
2. Se crea una sesión de checkout en Stripe
3. Usuario es redirigido a Stripe Checkout
4. Después del pago exitoso → `/success`
5. Si cancela → `/cancel`

## 🛡️ Seguridad

- Las claves secretas nunca se exponen al frontend
- Todas las transacciones se procesan de forma segura por Stripe
- SSL/HTTPS automático en las plataformas de hosting

## 📞 Soporte

Si tienes problemas:
1. Verifica que las variables de entorno estén correctas
2. Revisa los logs en tu plataforma de hosting
3. Consulta la documentación de Stripe: [https://stripe.com/docs](https://stripe.com/docs)
