import React, { useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";

export default function Trackpage({ onTrackingStarted }) {
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!orderId.trim()) {
      setError("Please enter a valid order ID.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/track", { order_id: orderId });
      onTrackingStarted(orderId); // tell parent to start polling this ID
    } catch (err) {
      console.error(err);
      setError("Failed to start tracking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <Navbar/>
        <div className="flex flex-col justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-xl w-full max-w-md">
            <label htmlFor="orderId">Enter Order ID:</label>
            <input
                id="orderId"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. order-123"
                className="border border-gray-400 px-2 py-1 rounded"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
                type="submit"
                className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
                disabled={loading}
            >
                {loading ? "Tracking..." : "Track"}
            </button>
            </form>
        </div>
    </div>
  );
}
