import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function OnboardingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { count } = await supabase.from('accounts').select('id', { count:'exact', head:true }).eq('user_id', user.id)
  if ((count ?? 0) > 0) redirect('/')
  return (
    <main className="main" style={{maxWidth:620}}>
      <div className="card" style={{marginTop:'9vh'}}>
        <div className="eyebrow">PREMIÈRE ÉTAPE</div>
        <h1 style={{fontSize:30,margin:'6px 0'}}>Commençons par ton argent.</h1>
        <p className="muted">Ajoute ton premier compte. Tu pourras ensuite enregistrer chaque revenu et chaque dépense, même 1 FCFA.</p>
        <form action="/api/accounts" method="post" style={{display:'grid',gap:13,marginTop:24}}>
          <label>Nom du compte<input name="name" required placeholder="Ex. Compte principal" /></label>
          <label>Type<select name="account_type" defaultValue="bank"><option value="bank">Banque</option><option value="mobile_money">Mobile Money</option><option value="cash">Espèces</option><option value="savings">Épargne</option><option value="investment">Investissement</option><option value="other">Autre</option></select></label>
          <label>Solde actuel (FCFA)<input name="opening_balance" type="number" min="0" step="1" required placeholder="0" /></label>
          <button className="btn primary" type="submit">Créer mon compte →</button>
        </form>
      </div>
    </main>
  )
}
