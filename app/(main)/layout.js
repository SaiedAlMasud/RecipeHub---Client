import Footer from "../components/common/Footer";
import Sidebar from "../components/common/Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />

      <main className="ml-72 flex min-h-screen w-[calc(100vw-18rem)] flex-col">
        <div className="flex-1">
          {children}
        </div>

        <Footer />
      </main>
    </div>
  );
}