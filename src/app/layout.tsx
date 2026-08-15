import type { Metadata } from 'next'
import "@/app/index.css"

export const metadata: Metadata = {
    title: '싸지 메모',
    description: 'ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <html lang="en">
        <body>
            <div id="root">{children}</div>
        </body>
    </html>

}