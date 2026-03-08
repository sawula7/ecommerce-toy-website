"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

const DELIVERY_FEE = 350;

type PaymentMethod = "card" | "cod" | "bank";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const deliveryFee = DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", district: "", postalCode: "",
    notes: "",
  });
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [placing, setPlacing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: "" }));
  }

  function onCardChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCard((c) => ({ ...c, [e.target.name]: e.target.value }));
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim())  e.lastName  = "Required";
    if (!form.email.trim())     e.email     = "Required";
    if (!form.phone.trim())     e.phone     = "Required";
    if (!form.address.trim())   e.address   = "Required";
    if (!form.city.trim())      e.city      = "Required";
    if (!form.district.trim())  e.district  = "Required";
    if (payment === "card") {
      if (!card.number.trim())  e.cardNumber = "Required";
      if (!card.name.trim())    e.cardName   = "Required";
      if (!card.expiry.trim())  e.cardExpiry = "Required";
      if (!card.cvv.trim())     e.cardCvv    = "Required";
    }
    return e;
  }

  async function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setPlacing(true);
    // Simulate processing delay
    await new Promise((r) => setTimeout(r, 1400));
    clearCart();
    router.push("/order-confirmed");
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50 px-4">
        <span className="text-7xl">🧸</span>
        <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "var(--font-poppins)" }}>
          Your cart is empty
        </h2>
        <p className="text-gray-400">Add some toys before checking out!</p>
        <Link href="/" className="bg-primary hover:bg-primary-dk text-white font-bold px-8 py-3 rounded-full transition-colors">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl">🧸</span>
            <span className="text-xl font-bold text-primary" style={{ fontFamily: "var(--font-poppins)" }}>
              EduToys
            </span>
          </Link>
          <span className="text-gray-300">›</span>
          <span className="text-sm text-gray-400 font-semibold">Checkout</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-8" style={{ fontFamily: "var(--font-poppins)" }}>
          Checkout
        </h1>

        <form onSubmit={handlePlaceOrder} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* ── LEFT: forms ── */}
            <div className="lg:col-span-3 flex flex-col gap-6">

              {/* Contact */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2" style={{ fontFamily: "var(--font-poppins)" }}>
                  <span className="w-7 h-7 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">1</span>
                  Contact Information
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="First name" name="firstName" value={form.firstName} onChange={onChange} error={errors.firstName} />
                  <Field label="Last name"  name="lastName"  value={form.lastName}  onChange={onChange} error={errors.lastName} />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Field label="Email address" name="email" type="email" value={form.email} onChange={onChange} error={errors.email} />
                  <Field label="Phone number"  name="phone" type="tel"   value={form.phone} onChange={onChange} error={errors.phone} />
                </div>
              </div>

              {/* Delivery */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2" style={{ fontFamily: "var(--font-poppins)" }}>
                  <span className="w-7 h-7 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">2</span>
                  Delivery Address
                </h2>
                <Field label="Street address" name="address" value={form.address} onChange={onChange} error={errors.address} className="mb-4" />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="City / Town" name="city" value={form.city} onChange={onChange} error={errors.city} />
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">District</label>
                    <select
                      name="district"
                      value={form.district}
                      onChange={onChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl text-sm outline-none transition-colors font-[inherit] ${errors.district ? "border-red-400" : "border-gray-200 focus:border-primary"}`}
                    >
                      <option value="">Select district</option>
                      {["Colombo","Gampaha","Kalutara","Kandy","Matale","Nuwara Eliya","Galle","Matara","Hambantota","Jaffna","Kilinochchi","Mannar","Vavuniya","Mullaitivu","Batticaloa","Ampara","Trincomalee","Kurunegala","Puttalam","Anuradhapura","Polonnaruwa","Badulla","Moneragala","Ratnapura","Kegalle"].map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district}</p>}
                  </div>
                </div>
                <Field label="Postal code (optional)" name="postalCode" value={form.postalCode} onChange={onChange} className="mt-4" />
                <div className="mt-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Order notes (optional)</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={onChange}
                    rows={3}
                    placeholder="Any special instructions for your order…"
                    className="w-full px-4 py-3 border-2 border-gray-200 focus:border-primary rounded-xl text-sm outline-none transition-colors font-[inherit] resize-none"
                  />
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2" style={{ fontFamily: "var(--font-poppins)" }}>
                  <span className="w-7 h-7 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">3</span>
                  Payment Method
                </h2>

                <div className="flex flex-col gap-3">
                  {([
                    { id: "cod",  icon: "💵", label: "Cash on Delivery", desc: "Pay when your order arrives" },
                    { id: "card", icon: "💳", label: "Credit / Debit Card", desc: "Visa, Mastercard, Amex" },
                    { id: "bank", icon: "🏦", label: "Bank Transfer",      desc: "Direct bank transfer" },
                  ] as { id: PaymentMethod; icon: string; label: string; desc: string }[]).map((m) => (
                    <label
                      key={m.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${payment === m.id ? "border-primary bg-primary-lt" : "border-gray-200 hover:border-primary/40"}`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={m.id}
                        checked={payment === m.id}
                        onChange={() => setPayment(m.id)}
                        className="accent-primary w-4 h-4"
                      />
                      <span className="text-2xl">{m.icon}</span>
                      <div>
                        <p className="font-bold text-sm text-gray-800">{m.label}</p>
                        <p className="text-xs text-gray-400">{m.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Card fields */}
                {payment === "card" && (
                  <div className="mt-5 flex flex-col gap-4 bg-gray-50 rounded-xl p-4">
                    <Field label="Card number" name="cardNumber" value={card.number} onChange={onCardChange} placeholder="1234 5678 9012 3456" error={errors.cardNumber} maxLength={19} />
                    <Field label="Name on card" name="cardName" value={card.name} onChange={onCardChange} placeholder="As it appears on card" error={errors.cardName} />
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Expiry (MM/YY)" name="cardExpiry" value={card.expiry} onChange={onCardChange} placeholder="MM/YY" error={errors.cardExpiry} maxLength={5} />
                      <Field label="CVV" name="cardCvv" value={card.cvv} onChange={onCardChange} placeholder="123" error={errors.cardCvv} maxLength={4} type="password" />
                    </div>
                  </div>
                )}

                {/* Bank transfer details */}
                {payment === "bank" && (
                  <div className="mt-5 bg-blue-50 rounded-xl p-4 text-sm text-gray-700 space-y-1">
                    <p><strong>Bank:</strong> Commercial Bank of Ceylon</p>
                    <p><strong>Account Name:</strong> EduToys Pvt Ltd</p>
                    <p><strong>Account No:</strong> 1234567890</p>
                    <p><strong>Branch:</strong> Kaduwela</p>
                    <p className="text-xs text-gray-400 mt-2">Please use your order number as the payment reference. Your order will be processed once payment is confirmed.</p>
                  </div>
                )}
              </div>
            </div>

            {/* ── RIGHT: order summary ── */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                <h2 className="font-bold text-gray-900 mb-5" style={{ fontFamily: "var(--font-poppins)" }}>
                  Order Summary
                </h2>

                <ul className="flex flex-col gap-4 mb-5">
                  {items.map(({ product, quantity }) => (
                    <li key={product.id} className="flex gap-3 items-center">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-gray-50">
                        <Image src={product.image} alt={product.name} fill className="object-cover" sizes="56px" />
                        <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                          {quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">{product.name}</p>
                        <p className="text-xs text-gray-400">{product.category}</p>
                      </div>
                      <p className="font-bold text-primary text-sm shrink-0">
                        Rs.&nbsp;{(product.price * quantity).toLocaleString()}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-gray-100 pt-4 flex flex-col gap-2 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span>Rs.&nbsp;{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Delivery</span>
                    <span>Rs.&nbsp;{deliveryFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-extrabold text-gray-900 text-base mt-2 pt-3 border-t border-gray-100">
                    <span>Total</span>
                    <span className="text-primary">Rs.&nbsp;{total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={placing}
                  className="mt-6 w-full bg-primary hover:bg-primary-dk disabled:opacity-60 text-white font-bold py-4 rounded-2xl transition-all hover:-translate-y-0.5 shadow-md flex items-center justify-center gap-2"
                >
                  {placing ? (
                    <>
                      <span className="animate-spin text-lg">⟳</span>
                      Placing Order…
                    </>
                  ) : (
                    `Place Order · Rs.&nbsp;${total.toLocaleString()}`
                  )}
                </button>

                <p className="text-center text-xs text-gray-400 mt-3">
                  🔒 Your information is secure and encrypted
                </p>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}

// ── Reusable field ─────────────────────────────────────────
function Field({
  label, name, value, onChange, error, type = "text", placeholder, className = "", maxLength,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  maxLength?: number;
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full px-4 py-3 border-2 rounded-xl text-sm outline-none transition-colors font-[inherit] ${
          error ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-primary"
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
