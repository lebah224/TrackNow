import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function NewTransactionPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const params = await searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [{ data: accounts }, { data: categories }] = await Promise.all([
    supabase.from('accounts').select('id,name').eq('user_id', user.id).eq('is_active', true).order('name'),
    supabase.from('categories').select('id,name,kind').or(`user_id.eq.${user.id},is_system.eq.true`).order('name')
  ])

  const type = params.type === 'income' ? 'income' : 'expense'
  const filtered = (categories ?? []).filter(c => c.kind === type || c.kind === 'other')

  return (
    <main className="main" style={{ maxWidth: 650 }}>
      <div className="card" style={{ marginTop: '7vh' }}>
        <div className="eyebrow">TRACKNOW · MOUVEMENT</div>
        <h1 style={{ fontSize: 28, margin: '6px 0' }}>
          Enregistrer {type === 'income' ? 'un revenu' : 'une dépense'}
        </h1>
        <p className="muted">Même 1 FCFA mérite d'être tracé.</p>

        <form action="/api/transactions" method="post" style={{ display: 'grid', gap: 13, marginTop: 22 }}>
          <input type="hidden" name="type" value={type} />
          <label>Montant (FCFA)<input name="amount" type="number" min="1" step="1" required placeholder="Ex. 1500" autoFocus /></label>
          <label>Compte<select name="account_id" required><option value="">Choisir un compte</option>{(accounts ?? []).map(a => <option key={a.id} value={a.id}>{a.name}</option>)}</select></label>
          <label>Catégorie<select name="category_id"><option value="">Sans catégorie</option>{filtered.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
          <label>Description<input name="description" placeholder={type === 'income' ? 'Ex. Salaire du mois' : 'Ex. Taxi pour le travail'} /></label>
          <label>Date<input name="occurred_at" type="datetime-local" /></label>
          <button className="btn primary" type="submit">Enregistrer {type === 'income' ? 'le revenu' : 'la dépense'} →</button>
        </form>

        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <a className="btn" href="/transactions?type=income">+ Revenu</a>
          <a className="btn" href="/transactions?type=expense">− Dépense</a>
        </div>
      </div>
    </main>
  )
}
