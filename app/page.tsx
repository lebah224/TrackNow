import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070A10] text-white p-8">
      <section className="mx-auto max-w-6xl py-16">
        <p className="text-sm uppercase tracking-[0.25em] text-violet-300">TrackNow</p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight">Construis ton futur, un franc à la fois.</h1>
        <p className="mt-5 max-w-2xl text-slate-400">Ton système personnel pour suivre chaque revenu, chaque dépense, ta progression et les conséquences de tes décisions.</p>
        <div className="mt-8 flex gap-3">
          <Link href="/dashboard" className="rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 px-5 py-3 font-semibold">Ouvrir TrackNow</Link>
          <span className="rounded-xl border border-slate-700 px-5 py-3 text-slate-400">Finance · Discipline · Futur</span>
        </div>
      </section>
    </main>
  )
}
