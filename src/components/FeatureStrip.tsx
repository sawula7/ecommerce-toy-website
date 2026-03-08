const features = [
  { icon: "🚚", title: "Free Delivery", desc: "On orders over Rs. 5,000" },
  { icon: "🔄", title: "Easy Returns", desc: "30-day return policy" },
  { icon: "🔒", title: "Secure Payments", desc: "100% protected checkout" },
  { icon: "🌍", title: "Worldwide Shipping", desc: "Delivered to your door" },
  { icon: "🎁", title: "Gift Wrapping", desc: "Available on all orders" },
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
