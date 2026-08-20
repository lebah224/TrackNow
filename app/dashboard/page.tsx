const money = new Intl.NumberFormat('fr-FR')

export default function Dashboard() {
  return <main className="dash">
    <aside className="side"><div className="brand"><div className="logo">T</div> TRACKNOW</div><nav><a href="/dashboard">⌂ Accueil</a><a href="#">▣ Argent</a><a href="#">↗ Progression</a><a href="#">◈ Futur</a><a href="#">◯ Moi</a></nav></aside>
    <section className="content">
      <header className="top"><div><div className="eyebrow">Jeudi 20 août 2026</div><h1>Bonjour 👋</h1></div><a className="btn primary" href="#">+ Mouvement</a></header>
      <div className="grid cols3">
        <div className="card"><div className="eyebrow">Solde total</div><div className="value">{money.format(2117500)} FCFA</div><div className="good">▲ 8,4 %</div></div>
        <div className="card"><div className="eyebrow">Épargne du mois</div><div className="value">125 000 FCFA</div><div className="muted">Objectif : 150 000</div></div>
        <div className="card"><div className="eyebrow">Patrimoine net</div><div className="value">2 430 000 FCFA</div><div className="good">+5,7 %</div></div>
      </div>
      <div className="grid cols2" style={{marginTop:16}}>
        <div className="card"><div className="eyebrow">Santé financière</div><div style={{display:'flex',gap:22,alignItems:'center',marginTop:16}}><div className="ring"><b>82</b><span>/100</span></div><div><h2 style={{margin:'0 0 7px'}}>Bâtisseur discipliné</h2><p className="muted">Ton système financier commence à apprendre tes habitudes.</p></div></div></div>
        <div className="card"><div className="eyebrow">Défi du jour</div><h2>Zéro dépense impulsive</h2><p className="muted">Enregistre chaque mouvement et respecte ton plan.</p><div className="good">+50 XP</div></div>
      </div>
      <div className="grid cols2" style={{marginTop:16}}>
        <div className="card"><div className="eyebrow">Objectif sécurité</div><div className="value">1 020 000 / 1 500 000</div><div className="bar" style={{marginTop:14}}><i style={{width:'68%'}}/></div><p className="muted">68 % · réserve de sécurité</p></div>
        <div className="card"><div className="eyebrow">🔮 Ton futur à 12 mois</div><div className="value purple">2 030 000 FCFA</div><p className="muted">Projection si ton rythme actuel reste stable.</p><div className="stat"><span>Discipline</span><b className="good">2,28M</b></div><div className="stat"><span>Croissance</span><b>2,64M</b></div></div>
      </div>
    </section>
  </main>
}
