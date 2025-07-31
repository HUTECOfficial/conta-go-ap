# 🚀 Guía de Despliegue - Conta-Go

## Variables de Entorno Requeridas

Para que tu aplicación funcione en producción, necesitas configurar estas variables de entorno:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=tu_clave_secreta_stripe_aqui

# Price IDs de Stripe (obtén estos desde tu dashboard de Stripe)
STRIPE_DIGITAL_PRICE_ID=tu_price_id_plan_digital
STRIPE_PERSONAL_PRICE_ID=tu_price_id_plan_personal

# URL de tu aplicación
NEXT_PUBLIC_BASE_URL=https://tudominio.vercel.app
```

## 🌐 Despliegue en Vercel

1. **Conecta tu repositorio a Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Haz clic en "New Project"
   - Conecta tu repositorio de GitHub
   - Selecciona `conta-go-ap`

2. **Configura las variables de entorno:**
   - En el dashboard de Vercel, ve a Settings > Environment Variables
   - Agrega cada variable de la lista de arriba
   - Asegúrate de marcar "Production", "Preview" y "Development"

3. **Despliega:**
   - Haz clic en "Deploy"
   - ¡Tu aplicación estará lista en minutos!

## 🌐 Despliegue en Netlify

1. **Conecta tu repositorio a Netlify:**
   - Ve a [netlify.com](https://netlify.com)
   - Haz clic en "New site from Git"
   - Conecta tu repositorio de GitHub

2. **Configura las variables de entorno:**
   - En el dashboard de Netlify, ve a Site settings > Environment variables
   - Agrega cada variable de la lista de arriba

3. **Despliega:**
   - Netlify desplegará automáticamente

## ✅ Funcionalidades Listas

- ✅ Stripe Checkout para Plan Digital ($300 MXN/mes)
- ✅ Stripe Checkout para Plan Personal ($500 MXN/mes)
- ✅ Páginas de éxito y cancelación
- ✅ Redirección automática al dashboard
- ✅ Manejo de errores y estados de carga

## 🔧 Pruebas

Una vez desplegado, puedes probar:
1. Hacer clic en los botones de los planes
2. Completar el proceso de pago en Stripe
3. Verificar la redirección de vuelta a tu aplicación

¡Tu aplicación está lista para recibir pagos reales!
