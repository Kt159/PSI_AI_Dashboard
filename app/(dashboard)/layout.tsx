import 'bootstrap/dist/css/bootstrap.css';
import UserNavbar from './components/navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <UserNavbar />
      <div className="container">
        {children}
      </div>
    </>
  )
}
