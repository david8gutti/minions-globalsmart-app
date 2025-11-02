# 🦹‍♂️ Gestión de Minions

Este proyecto es una aplicación desarrollada con **Next.js** y **Redux** para la gestión de Minions.  
Forma parte de una prueba técnica cuyo objetivo es organizar, filtrar y administrar Minions con distintas habilidades e idiomas, permitiendo además realizar operaciones CRUD (crear, editar, eliminar) sobre ellos.

---

## 🚀 Requisitos previos

- [Node.js](https://nodejs.org/) (v18 o superior recomendado)  
- npm, yarn, pnpm o bun como gestor de paquetes  

---

## ⚙️ Instalación y ejecución

Clona el repositorio e instala las dependencias:

```bash
git clone <url-del-repo>
cd minions-globalsmart-app
npm install
```

Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en:  
👉 [http://localhost:3000](http://localhost:3000)

---

## 🔑 Configuración de entorno

Este proyecto utiliza variables de entorno para definir la URL base de la API de Minions.

1. Copia el archivo `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

2. Completa los valores necesarios en `.env.local`.  
   Ejemplo:

```env
# URL base de la API de JSONPlaceholder
NEXT_PUBLIC_API_URL=https://jsonplaceholder.typicode.com
```

---

## 🛠️ Tecnologías principales

- **Next.js 15** – Framework de React para SSR y SSG   
- **Redux Toolkit + React Redux** – Gestión de estado global  
- **TailwindCSS 4** – Estilos  
- **HeroUI + Heroicons** – Componentes y librerías de iconos  
- **Biome** – Análisis y formateo del codigo  

---

## 📌 Funcionalidades implementadas

- **Listado de Minions** con paginación desde API  
- **Filtros combinados** por:
  - Idioma (selección única)  
  - Habilidades (selección múltiple)  
  - Buscador por nombre (case-insensitive)  
- **Vista de detalle** de cada Minion  
- **Edición de Minions** con formulario editable  
- **Creación de nuevos Minions** desde cero  
- **Eliminación con confirmación** antes de borrar del store  
- **Gestión de estado con Redux** (todos los cambios se mantienen en la sesión)  

---

## 📂 Estructura del proyecto

```bash
src/
├── app/
│   ├── page.tsx              # Página principal con listado y filtros
│   ├── new/page.tsx          # Vista para crear un nuevo Minion
│   ├── [id]/page.tsx         # Vista de detalle/edición de un Minion
│   ├── api/               # Endpoints de API internos
│       ├── minion/route.ts
│       ├── minions/route.ts
│       └── minionPic/route.ts
│   ├── layout.tsx
│   └── providers.tsx
│
├── components/
│   ├── minionCard.tsx
│   ├── minionForm.tsx
│   ├── minionTable.tsx
│   ├── deleteModal.tsx
│   └── themeSwitcher.tsx
│
├── hooks/
│   ├── useMinions.tsx
│   └── useFilteredMinions.tsx
│
├── redux/
│   ├── minionsSlice.tsx
│   ├── store.ts
│   └── storeProvider.tsx
│
├── types/
│   └── minion.ts
│
├── styles/
│   └── globals.css
│
└── utils/
    └── string.ts
```

---

## 📖 Notas de implementación

- Los datos se cargan desde la API:  
  - `GET /getMinions?page=<número>`  
  - `GET /getMinion?id=<id>`  
  - `GET /getMinionPic?id=<id>`  
- Los cambios (crear, editar, eliminar) **solo se reflejan en Redux**, no en la API.  
- Se usaron **hooks de React**:  
  - `useState` → estados locales de UI  
  - `useEffect` → fetch de datos y sincronización  
  - `useMemo` → optimización de filtros  
  - `useCallback` → funciones memorizadas para evitar renders innecesarios  

---

