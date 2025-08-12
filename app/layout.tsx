import './globals.css'
import Link from 'next/link'
import AuthBox from '../components/Auth'

export const metadata = {
  title: 'PickMate',
  description: 'Seasonal farm work, sorted.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
            <nav className="flex items-center gap-4">
              <Link href="/" className="font-semibold">PickMate</Link>
              <Link href="/post" className="text-sm">Post a job</Link>
            </nav>
            <div className="text-sm">
              <AuthBox />
            </div>
          </div>
        </header>
        <div className="max-w-5xl mx-auto px-4 py-6">{children}</div>
      </body>
    </html>
  )
}
