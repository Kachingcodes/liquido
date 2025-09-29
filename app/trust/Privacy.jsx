import React from "react";

export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 text-gray-800">
      <h1 className="text-2xl font-bold mb-2">Liquido NG – Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-6">Last updated: October 1st, 2025</p>

      <div className="space-y-6">
        {/* 1. Information We Collect */}
        <div className="flex items-start gap-3">
          <span className="flex-shrink-0 w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-sm font-semibold">
            1
          </span>
          <div>
            <h2 className="font-semibold">Information We Collect</h2>
            <ul className="list-disc list-inside text-gray-700 mt-1 space-y-1">
              <li>Name, phone number, delivery address, and payment details.</li>
              <li>Order history and communication records.</li>
            </ul>
          </div>
        </div>

        {/* 2. How We Use Your Information */}
        <div className="flex items-start gap-3">
          <span className="flex-shrink-0 w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-sm font-semibold">
            2
          </span>
          <div>
            <h2 className="font-semibold">How We Use Your Information</h2>
            <ul className="list-disc list-inside text-gray-700 mt-1 space-y-1">
              <li>To process and deliver orders.</li>
              <li>To communicate about delivery updates, promotions, and customer support.</li>
              <li>To improve our services and customer experience.</li>
            </ul>
          </div>
        </div>

        {/* 3. Data Protection */}
        <div className="flex items-start gap-3">
          <span className="flex-shrink-0 w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-sm font-semibold">
            3
          </span>
          <div>
            <h2 className="font-semibold">Data Protection</h2>
            <ul className="list-disc list-inside text-gray-700 mt-1 space-y-1">
              <li>We do not sell or share your personal data with third parties, except as required by law.</li>
              <li>All customer information is stored securely and only used for legitimate business purposes.</li>
            </ul>
          </div>
        </div>

        {/* 4. Customer Rights */}
        <div className="flex items-start gap-3">
          <span className="flex-shrink-0 w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-sm font-semibold">
            4
          </span>
          <div>
            <h2 className="font-semibold">Customer Rights</h2>
            <ul className="list-disc list-inside text-gray-700 mt-1 space-y-1">
              <li>You may request access to, correction of, or deletion of your personal data at any time by contacting us.</li>
              <li>You may opt out of promotional messages by following the instructions provided.</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4 border-gray-300" />

        {/* 5. Changes to Terms */}
        <div className="flex items-start gap-3">
          <span className="flex-shrink-0 w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-sm font-semibold">
            5
          </span>
          <div>
            <h2 className="font-semibold">Changes to Terms</h2>
            <p className="text-gray-700 mt-1">
              Liquido NG reserves the right to update these Privacy Policy at any time. Customers will be notified of significant changes through our official channels.
            </p>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4 border-gray-300" />

        {/* 6. Contact Us */}
        <div className="flex items-start gap-3">
          <span className="flex-shrink-0 w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-sm font-semibold">
            6
          </span>
          <div>
            <h2 className="font-semibold">Contact Us</h2>
            <p className="text-gray-700 mt-1">For questions, complaints, or requests regarding these Privacy Policy, please contact us at:</p>
            <div className="mt-2 space-y-1 text-gray-700">
              <p>📞 07062757706 | 07067259151</p>
              <p>📧 getliquido@gmail.com</p>
              <p>📍 107A Adeniyi Jones, Ikeja, Lagos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
