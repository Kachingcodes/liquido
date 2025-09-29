import React from "react";

export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-800">
      <h1 className="text-2xl font-bold text-center mb-2">
        Liquido NG – Terms & Conditions
      </h1>
      <p className="text-sm text-center text-gray-500 mb-6">
        Last updated: October 1st, 2025
      </p>

      <hr className="my-6 border-gray-300" />

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">1. Introduction</h2>
        <p>
          Welcome to Liquido NG. By placing an order with us or using our
          services, you agree to the terms outlined in this document. Please
          read carefully, as they govern how we provide our products and
          services to you.
        </p>
      </section>

      <hr className="my-6 border-gray-300" />

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">2. Our Services</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Liquido NG provides delivery of water, household and cleaning
            liquids, drinks, and other liquid-based products.
          </li>
          <li>We also cater to bulk deliveries for homes, offices, and events.</li>
          <li>
            Delivery times may vary depending on location, product availability,
            and traffic conditions.
          </li>
        </ul>
      </section>

      <hr className="my-6 border-gray-300" />

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">3. Orders & Payments</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Orders can be placed via WhatsApp, phone, or any other official
            Liquido NG channel.
          </li>
          <li>
            Payments must be made in full before or upon delivery unless
            otherwise agreed in writing.
          </li>
          <li>
            We reserve the right to cancel or delay orders due to non-payment,
            stock shortages, or circumstances beyond our control.
          </li>
        </ul>
      </section>

      <hr className="my-6 border-gray-300" />

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">4. Delivery Policy</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Standard delivery timelines will be communicated at the point of
            order.
          </li>
          <li>
            Customers must provide accurate delivery addresses and be available
            to receive orders.
          </li>
          <li>
            In cases of bulk delivery, extra time may be required for handling
            and logistics.
          </li>
          <li>
            Liquido NG is not liable for delays caused by factors outside our
            control (e.g., traffic, weather, supply chain issues).
          </li>
        </ul>
      </section>

      <hr className="my-6 border-gray-300" />

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">5. Returns & Refunds</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            For consumable liquids (water, drinks), returns are only accepted if
            products are damaged, expired, or delivered in error.
          </li>
          <li>
            Refunds or replacements will be processed once the issue is verified
            by our team. Asides from this, we don’t offer refunds for any orders
            already delivered and not complained about on delivery.
          </li>
          <li>
            Liquid soap and cleaning products may only be returned if unopened
            and unused.
          </li>
        </ul>
      </section>

      <hr className="my-6 border-gray-300" />

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">6. Pricing & Changes</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Prices are subject to change without prior notice due to market fluctuations.</li>
          <li>
            Bulk orders may attract discounted pricing, subject to agreement.
          </li>
        </ul>
      </section>

      <hr className="my-6 border-gray-300" />

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">7. Customer Responsibilities</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Customers are expected to handle products responsibly once
            delivered.
          </li>
          <li>
            For bulk deliveries, customers should ensure safe and accessible
            delivery locations.
          </li>
          <li>
            Customers must not misuse, resell, or tamper with Liquido NG
            products without authorization.
          </li>
        </ul>
      </section>

      <hr className="my-6 border-gray-300" />

      {/* 8. Limitation of Liability */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">8. Limitation of Liability</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Liquido NG is not responsible for indirect losses (e.g., delays
            affecting events, business interruptions).
          </li>
          <li>Our liability is limited to the value of the product(s) purchased.</li>
        </ul>
      </section>

      <hr className="my-6 border-gray-300" />

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">9. Changes to Terms</h2>
        <p>
          Liquido NG reserves the right to update these Terms & Conditions at
          any time. Customers will be notified of significant changes through
          our official channels.
        </p>
      </section>

      <hr className="my-6 border-gray-300" />

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">10. Contact Us</h2>
        <p className="mb-2">For questions, complaints, or requests regarding these Terms & Conditions, please contact us at:</p>
        <p>📞 07062757706 | 07067259151</p>
        <p>📧 getliquido@gmail.com</p>
        <p>📍 107A Adeniyi Jones, Ikeja, Lagos</p>
      </section>
    </div>
  );
}
