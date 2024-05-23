export const metadata = {
  title: 'PSI AI Dashboard',
  description: 'PSI AI Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
return (
  <html lang="en">
    <body>
      {children}
    </body>
  </html>
)
}
