import { DM_Sans } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300','400','500','600'] })

export const metadata = {
  title: 'Connect with manufacturers worldwide — MEx.',
  description: 'MEx. is the global marketplace connecting international brands with verified clothing and textile manufacturers.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={dmSans.className}>{children}</body>
    </html>
  )
}
