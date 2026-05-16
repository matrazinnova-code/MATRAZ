# Matraz Innova CRM — Setup

## 1. Instalar dependencias

```bash
npm install
```

## 2. Configurar Supabase

Abre `.env.local` y rellena tus credenciales:

```
NEXT_PUBLIC_SUPABASE_URL=https://TU_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=TU_ANON_KEY
```

Las credenciales las encuentras en: **app.supabase.com → Tu proyecto → Settings → API**

## 3. Crear la base de datos

Ve a **app.supabase.com → SQL Editor** y pega el contenido de [`supabase/schema.sql`](supabase/schema.sql). Ejecútalo completo.

El schema crea:
- `profiles` — auto-creado en el signup vía trigger
- `companies` — empresas cliente
- `contacts` — contactos individuales con vertical y estado
- `deals` — oportunidades con stage del pipeline
- `activities` — timeline de actividades por contacto/deal

Todo con **Row Level Security** activado (cada usuario ve solo sus datos).

## 4. Arrancar en local

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) y regístrate con tu email.

## 5. Habilitar Realtime (opcional)

En **Supabase → Database → Replication**, activa las tablas `contacts`, `deals` y `activities` para actualizaciones en tiempo real.

## Estructura del proyecto

```
app/
├── (auth)/           Login y registro
│   ├── login/
│   └── register/
└── (crm)/            App principal (requiere auth)
    ├── page.tsx       Dashboard con KPIs reales
    ├── contacts/      Lista + detalle + timeline
    ├── pipeline/      Kanban con drag & drop
    └── deals/new/     Formulario de nuevo deal

components/
├── dashboard/         KpiCard, RevenueChart, PipelineDonut, TopDeals
├── contacts/          ContactsTable, Timeline, AddContactModal
├── pipeline/          KanbanBoard, KanbanColumn, DealCard
├── deals/             NewDealForm
├── layout/            Sidebar, Topbar
└── ui/                Icons, Badge

lib/
├── supabase/          client.ts, server.ts, database.types.ts
└── actions.ts         Server Actions (CRUD completo)

supabase/
└── schema.sql         Schema completo con RLS y triggers
```

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** + CSS Variables (brand Matraz Innova v2.0)
- **Supabase** (Auth + PostgreSQL + Realtime)
- **@dnd-kit/core** (Kanban drag & drop)
