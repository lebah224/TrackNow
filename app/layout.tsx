import './globals.css'

export const metadata = { title: 'TrackNow', description: 'Finance, discipline and future.' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>
}
