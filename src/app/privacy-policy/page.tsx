import Link from "next/link";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "1. Introduction",
    content: `Toyhouse (Pvt) Ltd ("Toyhouse.lk", "we", "our", or "us") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website www.toyhouse.lk or make a purchase from us. Please read this policy carefully. If you disagree with its terms, please discontinue use of our site.`,
  },
  {
    title: "2. Information We Collect",
    content: null,
    subsections: [
      {
        label: "Personal Information You Provide",
        items: [
          "Full name and contact details (email address, phone number)",
          "Delivery address (street, city, district, postal code)",
          "Payment information (processed securely; we do not store card details)",
          "Account login credentials (if you create an account)",
          "Order notes and communications you send us",
        ],
      },
      {
        label: "Automatically Collected Information",
        items: [
          "IP address and browser type",
          "Pages viewed and time spent on our site",
          "Referring website or search query",
          "Device type (mobile, tablet, desktop)",
          "Cookies and similar tracking technologies",
        ],
      },
    ],
  },
  {
    title: "3. How We Use Your Information",
    content: null,
    list: [
      "Process and fulfill your orders, including sending order confirmations and delivery updates",
      "Respond to your inquiries and provide customer support",
      "Send promotional emails and newsletters (only with your consent; you may unsubscribe at any time)",
      "Improve our website, product offerings, and customer experience",
      "Detect and prevent fraud or unauthorized access",
      "Comply with legal obligations under the laws of Sri Lanka",
    ],
  },
  {
    title: "4. Sharing Your Information",
    content: `We do not sell, trade, or rent your personal information to third parties. We may share your information only with:`,
    list: [
      "Delivery partners and courier services to fulfill your orders",
      "Payment gateway providers for secure transaction processing",
      "IT and analytics service providers who assist in operating our website (under confidentiality agreements)",
      "Law enforcement or regulatory bodies when required by law",
    ],
  },
  {
    title: "5. Cookies",
    content: `Our website uses cookies to enhance your browsing experience. Cookies are small files stored on your device that help us remember your preferences and understand how you use our site. You can control cookie settings through your browser at any time. Note that disabling cookies may affect some features of our website.`,
  },
  {
    title: "6. Data Security",
    content: `We implement appropriate technical and organisational security measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. All payment transactions are encrypted using SSL technology. However, no internet transmission is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "7. Data Retention",
    content: `We retain your personal information for as long as necessary to fulfil the purposes outlined in this policy, unless a longer retention period is required by law. Order records are typically retained for 7 years in accordance with Sri Lankan tax and commercial regulations.`,
  },
  {
    title: "8. Your Rights",
    content: `You have the right to:`,
    list: [
      "Access the personal information we hold about you",
      "Request correction of inaccurate or incomplete data",
      "Request deletion of your personal data (subject to legal obligations)",
      "Opt out of marketing communications at any time",
      "Lodge a complaint with the relevant regulatory authority in Sri Lanka",
    ],
  },
  {
    title: "9. Children's Privacy",
    content: `Our website is intended for use by adults making purchases for children. We do not knowingly collect personal information from children under the age of 18. If you believe a child has provided us with personal data without parental consent, please contact us immediately.`,
  },
  {
    title: "10. Third-Party Links",
    content: `Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review the privacy policies of any third-party sites you visit.`,
  },
  {
    title: "11. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. The updated version will be indicated by a revised "Last Updated" date at the top of this page. We encourage you to review this policy periodically to stay informed about how we protect your information.`,
  },
  {
    title: "12. Contact Us",
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:`,
    contact: true,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
    <TopBar />
    <Header />
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <span className="text-4xl block mb-4">🔒</span>
          <h1
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-sm">Last Updated: March 2025</p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-400">
            <Link href="/" className="hover:text-primary transition-colors font-semibold">Home</Link>
            <span>›</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-sm p-8 md:p-12">
          <p className="text-gray-500 text-sm leading-relaxed mb-10 p-4 bg-primary-lt rounded-xl border-l-4 border-primary">
            Your privacy is important to us. Toyhouse.lk is committed to being transparent about how we handle your personal data and to keeping it safe and secure.
          </p>

          <div className="flex flex-col gap-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2
                  className="text-lg font-bold text-gray-900 mb-3"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {section.title}
                </h2>

                {section.content && (
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    {section.content}
                  </p>
                )}

                {"subsections" in section && section.subsections && (
                  <div className="flex flex-col gap-4 mt-3">
                    {section.subsections.map((sub) => (
                      <div key={sub.label}>
                        <p className="text-sm font-bold text-gray-700 mb-2">{sub.label}</p>
                        <ul className="flex flex-col gap-1.5">
                          {sub.items.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                              <span className="text-primary mt-0.5 shrink-0">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {"list" in section && section.list && (
                  <ul className="flex flex-col gap-1.5 mt-2">
                    {section.list.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-primary mt-0.5 shrink-0">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {"contact" in section && section.contact && (
                  <div className="mt-3 bg-gray-50 rounded-xl p-5 text-sm text-gray-600 space-y-1.5">
                    <p><strong>Toyhouse (Pvt) Ltd</strong></p>
                    <p>281/D/5, St Marys Road, Welivita, Kaduwela, Sri Lanka</p>
                    <p>📞 <a href="tel:0777489034" className="text-primary hover:underline">0777489034</a></p>
                    <p>✉️ <a href="mailto:info@toyhouse.lk" className="text-primary hover:underline">info@toyhouse.lk</a></p>
                    <p>🕒 Monday – Saturday: 9am – 6pm</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Related links */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { href: "/refund-returns", icon: "↩️", label: "Refund & Returns Policy" },
            { href: "/faq",            icon: "❓", label: "Frequently Asked Questions" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-primary hover:shadow-md transition-all group"
            >
              <span className="text-2xl">{link.icon}</span>
              <span className="font-bold text-sm text-gray-700 group-hover:text-primary transition-colors">
                {link.label}
              </span>
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
