import { createClient } from '@/lib/supabase/server'
import NewDealForm from '@/components/deals/NewDealForm'
import type { Contact, Company } from '@/lib/supabase/database.types'

export default async function NewDealPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [{ data: contacts }, { data: companies }] = await Promise.all([
    supabase.from('contacts').select('id, name, vertical').eq('user_id', user!.id).order('name'),
    supabase.from('companies').select('id, name').eq('user_id', user!.id).order('name'),
  ])

  return (
    <div style={{ padding: '28px 32px 56px' }}>
      <NewDealForm
        contacts={(contacts ?? []) as Pick<Contact, 'id' | 'name' | 'vertical'>[]}
        companies={(companies ?? []) as Pick<Company, 'id' | 'name'>[]}
      />
    </div>
  )
}
