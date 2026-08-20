export default function Home() {
  return (
    <main style={{minHeight:'100vh',padding:32,fontFamily:'system-ui',background:'#070A10',color:'#F5F7FA'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <p style={{color:'#8994A8',letterSpacing:2,fontSize:12}}>TRACKNOW</p>
        <h1 style={{fontSize:42,margin:'8px 0'}}>Construis ton futur.</h1>
        <p style={{color:'#8994A8',maxWidth:600}}>Chaque franc est tracé. Chaque décision compte. Chaque mois doit produire une progression.</p>
        <section style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:16,marginTop:32}}>
          {[
            ['💰','Solde','0 FCFA'],['📊','Santé financière','— / 100'],['🎯','Objectifs','0 actifs'],['🔮','Projection','En préparation']
          ].map(([icon,label,value])=><div key={label} style={{background:'#0D121C',border:'1px solid #202A3A',borderRadius:22,padding:22}}><div>{icon}</div><p style={{color:'#8994A8',fontSize:12}}>{label}</p><strong style={{fontSize:25}}>{value}</strong></div>)}
        </section>
        <div style={{marginTop:24,padding:22,borderRadius:22,border:'1px solid #202A3A',background:'linear-gradient(135deg,#111827,#0D121C)'}}>
          <p style={{color:'#9B6CFF',fontWeight:700}}>🔮 FUTUR</p>
          <h2>Ton parcours financier commence ici.</h2>
          <p style={{color:'#8994A8'}}>La prochaine étape connectera ce tableau de bord à ton compte TrackNow et à ta base Supabase.</p>
        </div>
      </div>
    </main>
  )
}
