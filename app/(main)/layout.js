
import Sidebar from "../components/common/Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />

      <main className="ml-72 min-h-screen w-[calc(100vw-18rem)]">
        {children}
      </main>
    </div>
  );
}