export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-orange-100 via-white to-amber-100 flex items-center justify-center px-4">
      {children}
    </div>
  );
}