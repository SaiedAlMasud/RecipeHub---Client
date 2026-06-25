import Sidebar from "../components/common/Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}