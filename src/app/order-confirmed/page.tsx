import Link from "next/link";

export default function OrderConfirmedPage() {
  const orderNumber = `ET-${Date.now().toString().slice(-6)}`;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16 text-center">
      {/* Success animation */}
      <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-5xl mb-6 shadow-lg">
        ✅
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        Order Placed!
      </h1>
      <p className="text-gray-500 text-base max-w-md mb-2">
        Thank you for shopping with EduToys. Your order has been received and is being processed.
      </p>
      <p className="text-sm text-gray-400 mb-8">
        Order number:{" "}
        <span className="font-bold text-primary">{orderNumber}</span>
      </p>

      {/* Info cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full mb-10">
        {[
          { icon: "📧", title: "Confirmation Email", desc: "A confirmation has been sent to your email address." },
          { icon: "🚚", title: "Delivery", desc: "Your order will be delivered within 3–5 business days." },
          { icon: "📞", title: "Need Help?", desc: "Call us on 0777489034 Mon–Sat 9am–6pm." },
        ].map((card) => (
          <div key={card.title} className="bg-white rounded-2xl p-5 shadow-sm text-center">
            <span className="text-3xl block mb-2">{card.icon}</span>
            <p className="font-bold text-sm text-gray-800 mb-1">{card.title}</p>
            <p className="text-xs text-gray-400 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-4 flex-wrap justify-center">
        <Link
          href="/"
          className="bg-primary hover:bg-primary-dk text-white font-bold px-8 py-3.5 rounded-full transition-all hover:-translate-y-0.5 shadow-md"
        >
          Continue Shopping
        </Link>
        <Link
          href="/"
          className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold px-8 py-3.5 rounded-full transition-all hover:-translate-y-0.5"
        >
          Track My Order
        </Link>
      </div>

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mt-12 opacity-40 hover:opacity-70 transition-opacity">
        <span className="text-2xl">🧸</span>
        <span className="font-bold text-gray-600" style={{ fontFamily: "var(--font-poppins)" }}>EduToys</span>
      </Link>
    </div>
  );
}
