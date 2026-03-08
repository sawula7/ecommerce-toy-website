const features = [
  { icon: "🚚", title: "Island-wide Delivery", desc: "Rs. 350 flat fee, all districts" },
  { icon: "🔄", title: "Easy Returns",          desc: "7-day return policy" },
  { icon: "🔒", title: "Secure Payments",       desc: "100% protected checkout" },
  { icon: "🌿", title: "Eco-friendly Toys",     desc: "Sustainably sourced wood" },
  { icon: "🎁", title: "Gift Wrapping",         desc: "Available on all orders" },
];

export default function FeatureStrip() {
  return (
    <div className="bg-white border-y border-gray-100 py-5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-between gap-4">
          {features.map((f) => (
            <div key={f.title} className="flex items-center gap-3 min-w-[160px]">
              <span className="text-3xl">{f.icon}</span>
              <div>
                <p className="font-bold text-sm text-gray-800">{f.title}</p>
                <p className="text-xs text-gray-400">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
