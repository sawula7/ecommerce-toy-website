"use client";

export default function TopBar() {
  return (
    <div className="bg-gray-900 text-gray-300 text-xs py-2">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center gap-4 flex-wrap">
          <span>📍 123 Learning Lane, Colombo 10, Sri Lanka</span>
          <span>✉️ info@edutoys.lk</span>
          <span>📞 +94 74 262 4020</span>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <a href="#" className="hover:text-yellow-400 transition-colors">
            Free Delivery on Orders over Rs.&nbsp;5,000
          </a>
          <span className="text-gray-600">|</span>
          <a href="#" className="hover:text-yellow-400 transition-colors">
            Track Order
          </a>
          <span className="text-gray-600">|</span>
          <a href="#" className="hover:text-yellow-400 transition-colors">
            My Account
          </a>
        </div>
      </div>
    </div>
  );
}
