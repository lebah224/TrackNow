import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TrackNow — Construis ton futur',
  description: 'Gestion financière, discipline, carrière et projection du futur.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>
}
