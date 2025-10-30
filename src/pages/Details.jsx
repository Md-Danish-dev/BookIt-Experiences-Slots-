import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getExperience } from "../services/api";
import Layout from "./Layout";
export default function Details() {
  const { id } = useParams();
  const nav = useNavigate();

  const [exp, setExp] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [quantity, setQuantity] = useState(1); 

  useEffect(() => {
    getExperience(id)
      .then((r) => setExp(r.data))
      .catch(console.error);
  }, [id]);

  if (!exp) return <div className="p-8">Loading...</div>;

  const dates = exp.availableDates || [];
  const times =
    (selectedDate && exp.slots?.[selectedDate]) || exp.slots?.default || [];

  const subtotal = exp.price * quantity;
  const tax = Math.round(subtotal * 0.06);
  const total = subtotal + tax;

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="rounded overflow-hidden">
            <img
              src={exp.imageUrl}
              alt={exp.title}
              className="w-full h-80 object-cover rounded"
            />
          </div>

          <h2 className="text-2xl mt-4">{exp.title}</h2>
          <p className="text-gray-600 mt-2">{exp.description}</p>

          <div className="mt-6">
            <h4 className="font-semibold">Choose date</h4>
            <div className="flex gap-3 mt-3 flex-wrap">
              {dates.map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    setSelectedDate(d);
                    setSelectedTime(null);
                  }}
                  className={`px-4 py-2 rounded border ${
                    selectedDate === d ? "bg-brand" : ""
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold">Choose time</h4>
            <div className="flex gap-3 mt-3 flex-wrap">
              {Object.entries(times).map(([t, qty]) => (
                <button
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  className={`px-4 py-2 rounded border ${
                    selectedTime === t ? "bg-brand" : ""
                  }`}
                >
                  {t}
                  <span className="ml-2 text-sm text-red-500">
                    {qty === 0 ? "Sold out" : `${qty} left`}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 bg-gray-50 rounded-2xl p-5 shadow-sm">
          <div className="space-y-4">
            <div className="flex justify-between text-gray-600 text-sm">
              <span>Starts at</span>
              <span className="text-black font-medium">₹{exp.price}</span>
            </div>

            <div className="flex items-center justify-between text-gray-600 text-sm">
              <span>Quantity</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={decreaseQty}
                  className="border rounded px-2 py-1 text-gray-700"
                >
                  −
                </button>
                <span className="text-black">{quantity}</span>
                <button
                  onClick={increaseQty}
                  className="border rounded px-2 py-1 text-gray-700"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex justify-between text-gray-600 text-sm">
              <span>Subtotal</span>
              <span className="text-black font-medium">₹{subtotal}</span>
            </div>

            <div className="flex justify-between text-gray-600 text-sm">
              <span>Taxes</span>
              <span className="text-black font-medium">₹{tax}</span>
            </div>

            <hr className="my-2 border-gray-300" />

            <div className="flex justify-between items-center font-semibold text-lg">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              disabled={!selectedDate || !selectedTime}
              onClick={() =>
                nav("/checkout", {
                  state: {
                    experienceId: id,
                    date: selectedDate,
                    time: selectedTime,
                    price: total,
                    title: exp.title,
                    quantity,
                  },
                })
              }
              className="w-full py-3 rounded-md bg-yellow-400 hover:bg-yellow-300 font-medium text-black disabled:opacity-60 mt-3"
            >
              Confirm
            </button>
            
          </div>
        </div>
      </div>
    </Layout>
  );
}
