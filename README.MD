# Logistics Shipping Frontend

Frontend del sistema de gestión de envíos logísticos. Permite a los usuarios cotizar, crear, monitorear y consultar el estado de sus envíos en tiempo real.

---

## Tecnologías

- **React** (v18+)
- **Vite** (builder ultrarrápido)
- **TypeScript**
- **Material UI** (UI Framework)
- **React Router** (navegación)
- **Axios** (peticiones HTTP)
- **Socket.IO Client** (actualizaciones en tiempo real)
- **Formik + Yup** (formularios y validaciones)
- **React Context** (estado global)
- **JWT** (autenticación)

---

## Estructura del Proyecto

```
public/
src/
├── assets/          # Imágenes, íconos, etc.
├── components/      # Componentes reutilizables
├── context/         # Contexto global (Auth, App)
├── pages/           # Vistas del sistema (Login, Cotizar, Envíos)
├── router/          # Definición de rutas
├── services/        # Integración con WebSocket y APIs
└── main.tsx         # Entrypoint del frontend
```

---

## Instalación

```bash
git clone https://github.com/logistics-shipping-platform/logistics-shipping-frontend.git
cd logistics-shipping-frontend
npm install
```

---

## Ejecución

```bash
npm run dev
```

El sistema estará disponible en: [http://localhost:5173](http://localhost:5173)

---

## Variables de Entorno

Crea `.env` y ajusta los valores:

```env
VITE_API_URL=http://localhost:3000/api
VITE_WS_URL=ws://localhost:3000/ws
```

---

## Funcionalidades

- Cotización de envíos según dimensiones y peso.
- Registro de nuevos envíos.
- Consulta de envíos realizados por usuario.
- WebSocket para actualizaciones de estado en tiempo real.
- Login con JWT.
- Auto-refresh de sesión.

---

---

## Scripts útiles

| Script            | Descripción                         |
|-------------------|-------------------------------------|
| `npm run dev`     | Modo desarrollo                     |
| `npm run build`   | Compila para producción             |
| `npm run preview` | Previsualiza el build               |

---

## Backend relacionado

Este frontend consume la API documentada en:  
➡️ [logistics-shipping-backend](https://github.com/logistics-shipping-platform/logistics-shipping-backend)

---
