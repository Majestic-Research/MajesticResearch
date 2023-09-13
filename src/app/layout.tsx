import './globals.css'
import { Josefin_Sans as Josefin, Trirong } from 'next/font/google'

const josefin = Josefin({subsets: ['latin'], variable: '--font-josefin'})
const trirong = Trirong({subsets: ['latin'], weight: ['200'], variable: '--font-trirong'})

export const metadata = {
  title: 'Magestic',
  description: 'Uma ferramenta para classificação de imóveis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" >
      <body className={`${josefin.variable} ${trirong.variable} bg-black font-sans text-gray-50`}>{children}</body>
    </html>
  )
}
