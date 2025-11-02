# 🦹‍♂️ Gestión de Minions – Proyecto Técnico

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
cd gestion-minions
npm install
```

Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en:  
👉 [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Tecnologías principales

- **Next.js 15** – Framework de React para SSR y SSG  
- **React 19** – Librería base de la UI  
- **Redux Toolkit + React Redux** – Gestión de estado global  
- **TailwindCSS 4** – Estilos  
- **HeroUI + Heroicons** – Componentes y librerías de iconos  

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

## 🧩 Custom Hook

Se implementó un hook personalizado:

### `useMinion`

Encapsula la lógica de gestión de Minions (filtros, búsqueda y sincronización con Redux).  
Este hook permite reutilizar la lógica en distintos componentes y evita duplicación de código.

---

## 📂 Estructura del proyecto

```bash
├── app/
│   ├── page.tsx          # Página principal con listado y filtros
│   ├── minion/[id].tsx   # Vista de detalle/edición de un Minion
│
├── components/
│   ├── MinionCard.tsx    # Tarjeta individual de Minion
│   ├── MinionForm.tsx    # Formulario de creación/edición
│   ├── Filters.tsx       # Filtros por idioma y habilidades
│
├── hooks/
│   └── useMinion.ts      # Custom hook para lógica de Minions
│
├── store/
│   ├── index.ts          # Configuración de Redux store
│   └── minionsSlice.ts   # Reducer y acciones de Minions
│
├── styles/
│   └── globals.css       # Estilos globales con Tailwind
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

## 🧪 Ejemplo de uso

- Filtrar Minions por idioma: selecciona "Minionés Español"  
- Filtrar por habilidades: marca "Mecánico" y "Químico"  
- Buscar por nombre: escribe "Kevin" en el buscador  
- Crear un nuevo Minion: botón **+ Añadir nuevo Minion**  

---

