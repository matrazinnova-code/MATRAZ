import { createClient } from '@/lib/supabase/server'
import ContactsTable from '@/components/contacts/ContactsTable'
import type { Contact } from '@/lib/supabase/database.types'

export default async function ContactsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: contacts = [] } = await supabase
    .from('contacts')
    .select('*, company:companies(*)')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })

  return (
    <div style={{ padding: '28px 32px 56px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 26, gap: 24 }}>
        <div>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15 }}>Contactos</div>
          <div style={{ color: 'var(--muted)', fontSize: 13.5, marginTop: 6 }}>
            {contacts?.length ?? 0} contactos en total
          </div>
        </div>
      </div>

      <ContactsTable contacts={(contacts ?? []) as Contact[]} />
    </div>
  )
}
