import Link from "next/link";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RefundReturnsPage() {
  return (
    <>
    <TopBar />
    <Header />
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <span className="text-4xl block mb-4">↩️</span>
          <h1
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Refund &amp; Returns Policy
          </h1>
          <p className="text-gray-400 text-sm">Last Updated: March 2025</p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-400">
            <Link href="/" className="hover:text-primary transition-colors font-semibold">Home</Link>
            <span>›</span>
            <span>Refund &amp; Returns</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-sm p-8 md:p-12 flex flex-col gap-10">

          {/* Intro banner */}
          <p className="text-gray-500 text-sm leading-relaxed p-4 bg-primary-lt rounded-xl border-l-4 border-primary">
            We want you and your little ones to love every EduToys purchase. If something isn't right, we're here to help. Please read our policy below and don't hesitate to contact us.
          </p>

          {/* 1 */}
          <Section title="1. Return Eligibility">
            <p>We accept returns within <strong>7 days</strong> of the delivery date, provided that:</p>
            <List items={[
              "The item is unused and in its original condition",
              "All original packaging, components, and accessories are included",
              "The item is not a personalised or custom-made product",
              "Proof of purchase (order number or receipt) is provided",
            ]} />
            <p className="mt-3">Items that do not meet these conditions may not be eligible for a return or refund.</p>
          </Section>

          {/* 2 */}
          <Section title="2. Non-Returnable Items">
            <p>The following items are not eligible for return or refund:</p>
            <List items={[
              "Opened or partially assembled DIY kits (unless the product is defective)",
              "Personalised or custom-engraved products",
              "Downloadable digital products",
              "Items purchased during a clearance or final sale event",
              "Gift cards and vouchers",
            ]} />
          </Section>

          {/* 3 */}
          <Section title="3. Damaged or Defective Items">
            <p>
              If you receive a damaged or defective product, please contact us within <strong>48 hours</strong> of receiving your order. We will arrange a replacement or full refund at no additional cost to you.
            </p>
            <p className="mt-3">To process your claim, please provide:</p>
            <List items={[
              "Your order number",
              "Clear photographs of the damage or defect",
              "A brief description of the issue",
            ]} />
          </Section>

          {/* 4 */}
          <Section title="4. How to Initiate a Return">
            <ol className="flex flex-col gap-3 mt-2">
              {[
                { step: "Step 1", text: "Contact our team via email at info@edutoys.lk or call 0777489034 with your order number and reason for return." },
                { step: "Step 2", text: "Our team will review your request and respond within 1–2 business days with return instructions." },
                { step: "Step 3", text: "Pack the item securely in its original packaging and hand it to our designated courier or drop it off at our store in Kaduwela." },
                { step: "Step 4", text: "Once we receive and inspect the item, we will process your refund or exchange within 3–5 business days." },
              ].map(({ step, text }) => (
                <li key={step} className="flex gap-4 items-start">
                  <span className="shrink-0 w-16 text-xs font-extrabold text-primary uppercase pt-0.5">{step}</span>
                  <span className="text-sm text-gray-600 leading-relaxed">{text}</span>
                </li>
              ))}
            </ol>
          </Section>

          {/* 5 */}
          <Section title="5. Refund Method & Timeline">
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-4 py-3 font-bold text-gray-700 rounded-tl-xl">Scenario</th>
                    <th className="px-4 py-3 font-bold text-gray-700">Refund Method</th>
                    <th className="px-4 py-3 font-bold text-gray-700 rounded-tr-xl">Timeline</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Defective / wrong item",   "Full refund or replacement",      "3–5 business days"],
                    ["Change of mind (eligible)", "Store credit or exchange",        "3–5 business days"],
                    ["Card payment",              "Refund to original card",         "5–10 business days"],
                    ["Cash on delivery",          "Bank transfer or store credit",   "3–5 business days"],
                  ].map(([scenario, method, timeline]) => (
                    <tr key={scenario} className="border-b border-gray-100 last:border-0">
                      <td className="px-4 py-3 text-gray-800 font-semibold">{scenario}</td>
                      <td className="px-4 py-3 text-gray-600">{method}</td>
                      <td className="px-4 py-3 text-gray-600">{timeline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* 6 */}
          <Section title="6. Return Shipping">
            <List items={[
              "If the return is due to a defective or incorrect item, EduToys will cover the return shipping cost.",
              "If you are returning an item due to a change of mind, you are responsible for the return shipping cost.",
              "We recommend using a trackable shipping method, as we cannot be held responsible for items lost in transit.",
            ]} />
          </Section>

          {/* 7 */}
          <Section title="7. Exchanges">
            <p>
              We offer exchanges for items of equal value within the 7-day return window, subject to stock availability. If the replacement item is of a higher value, you will be required to pay the difference. Exchanges are processed once the original item is received and inspected.
            </p>
          </Section>

          {/* 8 */}
          <Section title="8. Contact Us">
            <p>If you have any questions about our Refund &amp; Returns Policy, please reach out:</p>
            <div className="mt-3 bg-gray-50 rounded-xl p-5 text-sm text-gray-600 space-y-1.5">
              <p><strong>EduToys (Pvt) Ltd</strong></p>
              <p>281/D/5, St Marys Road, Welivita, Kaduwela, Sri Lanka</p>
              <p>📞 <a href="tel:0777489034" className="text-primary hover:underline">0777489034</a></p>
              <p>✉️ <a href="mailto:info@edutoys.lk" className="text-primary hover:underline">info@edutoys.lk</a></p>
              <p>🕒 Monday – Saturday: 9am – 6pm</p>
            </div>
          </Section>

        </div>

        {/* Related links */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { href: "/faq",            icon: "❓", label: "Frequently Asked Questions" },
            { href: "/privacy-policy", icon: "🔒", label: "Privacy Policy" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-primary hover:shadow-md transition-all group"
            >
              <span className="text-2xl">{link.icon}</span>
              <span className="font-bold text-sm text-gray-700 group-hover:text-primary transition-colors">{link.label}</span>
              <span className="ml-auto text-gray-300 group-hover:text-primary">›</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-3" style={{ fontFamily: "var(--font-poppins)" }}>
        {title}
      </h2>
      <div className="text-sm text-gray-600 leading-relaxed flex flex-col gap-2">
        {children}
      </div>
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-1.5 mt-1">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
          <span className="text-primary mt-0.5 shrink-0">•</span>
          {item}
        </li>
      ))}
    </ul>
  );
}
