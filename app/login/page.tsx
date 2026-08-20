import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user) redirect('/')

  return (
    <main className="main" style={{maxWidth:520}}>
      <div className="card" style={{marginTop:'12vh'}}>
        <div className="logo" style={{marginBottom:18}}>T</div>
        <div className="eyebrow">TRACKNOW</div>
        <h1 style={{fontSize:30,margin:'6px 0 8px'}}>Bienvenue.</h1>
        <p className="muted">Connecte-toi pour commencer à suivre chaque franc et construire ton futur.</p>
        <form action="/auth/signin" method="post" style={{display:'grid',gap:12,marginTop:22}}>
          <label>Email<input name="email" type="email" required placeholder="ton@email.com" /></label>
          <label>Mot de passe<input name="password" type="password" required minLength={6} placeholder="••••••••" /></label>
          <button className="btn primary" type="submit">Se connecter</button>
        </form>
        <div style={{height:1,background:'#202A3A',margin:'22px 0'}} />
        <form action="/auth/signup" method="post" style={{display:'grid',gap:10}}>
          <input name="email" type="email" required placeholder="Email pour créer un compte" />
          <input name="password" type="password" required minLength={6} placeholder="Nouveau mot de passe" />
          <button className="btn" type="submit">Créer mon compte</button>
        </form>
      </div>
    </main>
  )
}
