import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

function money(value: number) {
  return `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(value)} FCFA`
}

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return (
      <main className="main" style={{maxWidth:1000}}>
        <div className="card" style={{marginTop:'12vh',textAlign:'center',padding:'48px 28px'}}>
          <div className="logo" style={{margin:'0 auto 18px'}}>T</div>
          <div className="eyebrow">TRACKNOW</div>
          <div className="title">Construis ton futur.</div>
          <p className="muted" style={{maxWidth:620,margin:'14px auto 24px'}}>Chaque franc est tracé. Chaque décision compte. TrackNow réunit finances, discipline, carrière et projection du futur dans un seul système.</p>
          <Link className="btn primary" href="/login">Commencer</Link>
        </div>
      </main>
    )
  }

  const [{ data: accounts }, { data: transactions }, { data: goals }] = await Promise.all([
    supabase.from('accounts').select('id,name,account_type,opening_balance').eq('user_id', user.id).eq('is_active', true),
    supabase.from('transactions').select('id,type,amount,description,occurred_at').eq('user_id', user.id).order('occurred_at', { ascending: false }).limit(6),
    supabase.from('goals').select('id,name,target_amount,current_amount,status').eq('user_id', user.id).eq('status','active').limit(4),
  ])

  const income = (transactions ?? []).filter(t => t.type === 'income').reduce((s,t) => s + Number(t.amount),0)
  const expenses = (transactions ?? []).filter(t => t.type === 'expense').reduce((s,t) => s + Number(t.amount),0)
  const balance = (accounts ?? []).reduce((s,a) => s + Number(a.opening_balance),0) + income - expenses
  const saving = Math.max(0, income - expenses)
  const displayName = user.user_metadata?.display_name || user.email?.split('@')[0] || 'membre'

  return <div className="app">
    <aside className="side"><div className="brand"><div className="logo">T</div> TRACKNOW</div><nav className="nav"><a className="active" href="#">⌂ &nbsp; Accueil</a><a href="#argent">▣ &nbsp; Argent</a><a href="#progression">↗ &nbsp; Progression</a><a href="#futur">◈ &nbsp; Futur</a><a href="#profil">◯ &nbsp; Moi</a></nav></aside>
    <main className="main">
      <header className="top"><div><div className="eyebrow">Tableau de bord</div><div className="title">Bonjour, {displayName} 👋</div></div><Link className="btn primary" href="#argent">+ Mouvement</Link></header>
      <section className="grid two">
        <div className="card"><div className="cardhead"><h2>Santé financière</h2><span className="chip">En construction</span></div><div className="score"><div className="ring"><b>—</b></div><div><div className="eyebrow">TrackNow Score</div><h2 style={{fontSize:22,margin:'5px 0'}}>Bâtisseur</h2><p className="muted" style={{fontSize:12}}>Le score sera calculé à partir de tes données réelles.</p></div></div></div>
        <div className="card" id="futur"><div className="cardhead"><h2>🔮 Ton futur</h2><span className="chip">Projection</span></div><div className="value">{money(balance)}</div><p className="muted" style={{fontSize:12}}>Patrimoine liquide actuel. Le moteur de projection sera branché après les premières données.</p><div className="progress"><i style={{width:'18%'}}/></div></div>
      </section>
      <section className="grid three" style={{marginTop:16}}>
        <div className="card"><div className="eyebrow">Solde calculé</div><div className="value" style={{marginTop:7}}>{money(balance)}</div></div>
        <div className="card"><div className="eyebrow">Revenus visibles</div><div className="value good" style={{marginTop:7}}>{money(income)}</div></div>
        <div className="card"><div className="eyebrow">Épargne calculée</div><div className="value" style={{marginTop:7}}>{money(saving)}</div></div>
      </section>
      <section className="grid two" style={{marginTop:16}} id="argent">
        <div className="card"><div className="cardhead"><h2>Comptes</h2><span className="chip">{accounts?.length ?? 0}</span></div>{(accounts ?? []).length === 0 ? <p className="muted">Aucun compte. Ajoute ton premier compte pour que TrackNow puisse calculer ton patrimoine.</p> : accounts?.map(a => <div className="stat" key={a.id}><span>{a.name}</span><b>{money(Number(a.opening_balance))}</b></div>)}</div>
        <div className="card"><div className="cardhead"><h2>Derniers mouvements</h2><span className="chip">Chaque franc compte</span></div>{(transactions ?? []).length === 0 ? <p className="muted">Aucune transaction enregistrée.</p> : transactions?.map(t => <div className="tx" key={t.id}><div className="txicon">{t.type === 'income' ? '💼' : '🧾'}</div><div className="txmain"><b>{t.description || (t.type === 'income' ? 'Revenu' : 'Dépense')}</b><span>{new Date(t.occurred_at).toLocaleDateString('fr-FR')}</span></div><div className={`amount ${t.type === 'income' ? 'good' : 'bad'}`}>{t.type === 'income' ? '+' : '−'}{money(Number(t.amount))}</div></div>)}</div>
      </section>
      <section className="card" style={{marginTop:16}} id="progression"><div className="cardhead"><h2>🎯 Objectifs actifs</h2><span className="chip">{goals?.length ?? 0}</span></div>{(goals ?? []).length === 0 ? <p className="muted">Crée ton premier objectif financier pour commencer à mesurer ta progression.</p> : goals?.map(g => { const pct=Math.min(100, Number(g.current_amount)/Number(g.target_amount)*100); return <div key={g.id} style={{marginBottom:14}}><div className="stat"><span>{g.name}</span><b>{money(Number(g.current_amount))} / {money(Number(g.target_amount))}</b></div><div className="progress"><i style={{width:`${pct}%`}}/></div></div> })}</section>
      <p className="footer">TrackNow — Les projections futures seront calculées à partir de tes décisions et données réelles.</p>
    </main>
    <nav className="mobile"><a className="active" href="#">⌂<br/>Accueil</a><a href="#argent">▣<br/>Argent</a><a href="#progression">↗<br/>Progression</a><a href="#futur">◈<br/>Futur</a><a href="#profil">◯<br/>Moi</a></nav>
  </div>
}
