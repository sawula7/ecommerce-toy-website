"use client";

export default function TopBar() {
  return (
    <div className="bg-gray-900 text-gray-300 text-xs py-2">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center gap-4 flex-wrap">
          <span>📍 281/D/5, St Marys Road, Welivita, Kaduwela</span>
          <span>✉️ info@edutoys.lk</span>
          <span>📞 0777489034</span>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <a href="#" className="hover:text-secondary transition-colors">
            Free Delivery on Orders over Rs.&nbsp;5,000
          </a>
          <span className="text-gray-600">|</span>
          <a href="#" className="hover:text-secondary transition-colors">
            Track Order
          </a>
          <span className="text-gray-600">|</span>
          <a href="#" className="hover:text-secondary transition-colors">
            My Account
          </a>
        </div>
      </div>
    </div>
  );
}
