import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'
import type { Profile } from '@/lib/supabase/database.types'

export default async function CRMLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div className="hex-bg" />
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex',
        minHeight: '100vh',
      }}>
        <Sidebar profile={profile as Profile | null} />
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
          <Topbar />
          <main style={{ flex: 1 }}>
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
