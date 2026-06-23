import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-white py-12" style={{ background: "#1F2937" }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: "#FF6B35" }}>
              RecipeHub
            </h3>
            <p className="text-gray-400">
              Share, discover, and manage recipes with food enthusiasts worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-[#FF6B35] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/browse" className="hover:text-[#FF6B35] transition">
                  Browse Recipes
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#FF6B35] transition">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-[#FF6B35] transition">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Connect With Us</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-[#FF6B35] transition text-2xl"
                aria-label="Facebook"
              >
                📘
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#FF6B35] transition text-2xl"
                aria-label="Twitter"
              >
                🐦
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#FF6B35] transition text-2xl"
                aria-label="Instagram"
              >
                📸
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#FF6B35] transition text-2xl"
                aria-label="YouTube"
              >
                ▶️
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📧 info@recipehub.com</li>
              <li>📞 +1 (555) 123-4567</li>
              <li>📍 123 Foodie Lane, NY</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="border-t mt-8 pt-8 text-center text-gray-400"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <p>&copy; {new Date().getFullYear()} RecipeHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}