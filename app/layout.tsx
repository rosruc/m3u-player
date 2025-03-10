import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'M3U Streaming App',
    description: 'Watch your favorite channels',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    )
} 