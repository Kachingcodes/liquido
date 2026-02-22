'use client';
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { db } from "./../firebase"; // adjust path
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function BulkBookingModal({ open, onClose }) {

  const [repForm, setRepForm] = useState({
    name: "",
    eventType: "",
    otherEventType: "",
    eventDate: "",
    location: "",
    guests: "",
    drinks: "",
    chilledDrinks: false,
  });

  const handleRepChange = (e) => {
  const { name, value, type, checked } = e.target;

  setRepForm((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
};

  const handleRepSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save to Firestore
      await addDoc(collection(db, "bulkOrders"), {
        name: repForm.name,
        eventType: repForm.eventType === "Others" ? repForm.otherEventType : repForm.eventType,
        eventDate: repForm.eventDate,
        location: repForm.location,
        guests: repForm.guests || "Not specified",
        drinks: repForm.drinks,
        chilledDrinks: repForm.chilledDrinks,
        price: 0,
        paid: false, // default unpaid
        createdAt: serverTimestamp(),
      });

      // Prepare WhatsApp message
      const phoneNum = "2347062757706";
      const whatsappText = `
        Hello Liquido 💧, I’d like to make a bulk order / event booking.

        Name: ${repForm.name}
        Event Type: ${repForm.eventType === "Others" ? repForm.otherEventType : repForm.eventType}
        Event Date: ${repForm.eventDate}
        Location: ${repForm.location}
        Guests: ${repForm.guests || "Not specified"}

        Drinks:
        ${repForm.drinks}
        Chilled Drinks: ${repForm.chilledDrinks ? "Yes" : "No"}
      `.trim();

      const whatsappLink = `https://wa.me/${phoneNum}?text=${encodeURIComponent(whatsappText)}`;
      window.open(whatsappLink, "_blank");

      // Reset form and close modal
      onClose();
      setRepForm({
        name: "",
        eventType: "",
        otherEventType: "",
        eventDate: "",
        location: "",
        guests: "",
        drinks: "",
        chilledDrinks: false,
      });

    } catch (err) {
      console.error("Failed to save bulk order:", err);
      alert("Failed to submit. Please try again.");
    }
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return () => (document.body.style.overflow = "auto");
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl relative max-h-[92vh] overflow-y-auto">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-[#1C4672] mb-4">
          Book a Rep Consultation
        </h2>

        {/* Form */}
        <form className="space-y-4 p-1" onSubmit={handleRepSubmit}>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={repForm.name}
              onChange={handleRepChange}
              className="w-full border p-2 rounded-md outline-none"
            />
          </div>

          {/* Event Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Event Type</label>
            <select
              name="eventType"
              required
              value={repForm.eventType}
              onChange={handleRepChange}
              className="w-full border p-2 rounded-md"
            >
              <option value="">Select event type</option>
              <option value="Owambe">Owambe</option>
              <option value="Birthday">Birthday</option>
              <option value="Wedding">Wedding</option>
              <option value="Party">Party</option>
              <option value="Supermarket">Supermarket</option>
              <option value="Estate">Estate</option>
              <option value="Bulk Stocking">Bulk Stocking</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Other Event Type */}
          {repForm.eventType === "Others" && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Specify Event Type
              </label>
              <input
                type="text"
                name="otherEventType"
                value={repForm.otherEventType}
                onChange={handleRepChange}
                className="w-full border p-2 rounded-md outline-none"
              />
            </div>
          )}

          {/* Event Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Event Date</label>
            <input
              type="date"
              name="eventDate"
              required
              value={repForm.eventDate}
              onChange={handleRepChange}
              className="w-full border p-2 rounded-md"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              required
              value={repForm.location}
              onChange={handleRepChange}
              className="w-full border p-2 rounded-md outline-none"
            />
          </div>

          {/* Guests */}
          <div>
            <label className="block text-sm font-medium mb-1">Number of Guests</label>
            <input
              type="number"
              name="guests"
              value={repForm.guests}
              onChange={handleRepChange}
              className="w-full border p-2 rounded-md outline-none"
            />
          </div>

          {/* Drinks */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Drinks Types & Quantities
            </label>
            <textarea
              name="drinks"
              required
              rows={4}
              value={repForm.drinks}
              onChange={handleRepChange}
              className="w-full border p-2 rounded-md outline-none resize-none"
              placeholder="Example: 2 crates of Malt, 1 pack of Hollandia ..."
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="chilledDrinks"
              checked={repForm.chilledDrinks}
              onChange={handleRepChange}
              className="w-4 h-4"
            />
            <label className="text-sm font-medium">
              I would like the drinks delivered chilled
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1C4672] text-white py-2 rounded-lg text-sm hover:bg-white hover:text-[#1C4672] transition shadow-md"
          >
            Submit Booking
          </button>
        </form>

      </div>
    </div>
  );
}