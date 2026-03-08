const shopLinks = [
  "DIY STEM Kits",
  "Wooden Toys",
  "Montessori Materials",
  "Teaching Aids",
  "STEM Toys",
  "Arts & Crafts",
  "Children's Books",
  "Preschool Furniture",
];
const careLinks = [
  "My Account",
  "Track My Order",
  "Wishlist",
  "Returns & Exchanges",
  "Shipping Info",
  "FAQ",
  "Free Downloads",
];
const companyLinks = [
  "About Us",
  "Blog",
  "Careers",
  "Privacy Policy",
  "Terms & Conditions",
  "Contact Us",
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-14 pb-0">
      <div className="max-w-7xl mx-auto px-4 pb-10 border-b border-gray-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

        {/* About */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">🧸</span>
            <span
              className="text-2xl font-bold text-white"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              EduToys
            </span>
          </div>
          <p className="text-sm leading-relaxed text-gray-500 mb-6">
            Sri Lanka&apos;s trusted source for DIY wooden STEM toy kits, Montessori materials, special needs resources, and preschool furniture. Fostering creativity and growth in every child.
          </p>
          <div className="flex gap-2">
            {["f", "📷", "▶", "P"].map((icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-primary flex items-center justify-center text-sm font-bold transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Shop</h4>
          <ul className="space-y-2.5">
            {shopLinks.map((l) => (
              <li key={l}>
                <a href="#" className="text-sm hover:text-primary hover:pl-1 transition-all">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Customer Care</h4>
          <ul className="space-y-2.5">
            {careLinks.map((l) => (
              <li key={l}>
                <a href="#" className="text-sm hover:text-primary hover:pl-1 transition-all">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Contact</h4>
          <address className="not-italic space-y-3 text-sm text-gray-500">
            <p>📍 281/D/5, St Marys Road<br />Welivita, Kaduwela</p>
            <p>📞 <a href="tel:0777489034" className="hover:text-primary">0777489034</a></p>
            <p>✉️ <a href="mailto:info@edutoys.lk" className="hover:text-primary">info@edutoys.lk</a></p>
          </address>
          <div className="mt-5">
            <p className="text-xs font-bold text-white mb-1">Store Hours</p>
            <p className="text-xs text-gray-500">Mon–Sat: 9am – 6pm</p>
            <p className="text-xs text-gray-500">Sunday: 10am – 4pm</p>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 flex-wrap">
        <p className="text-xs text-gray-600">
          © 2025 EduToys. All rights reserved. | Designed with ❤️ for little learners.
        </p>
        <div className="flex gap-2">
          {["VISA", "MC", "PayPal", "Amex"].map((p) => (
            <span
              key={p}
              className="bg-gray-800 text-gray-400 text-[10px] font-bold px-2.5 py-1 rounded"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
