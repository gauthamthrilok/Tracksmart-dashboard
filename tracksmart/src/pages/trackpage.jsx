import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";
import Navbar from "../components/navbar";

export default function TrackPage() {
  const [orderId, setOrderId] = useState("");
  const [gps, setGps] = useState("");
  const [status, setStatus] = useState("");
  const [transactionId, setTransactionId] = useState(null);
  const [loading, setLoading] = useState(false);

  const BPP_URL = "https://your-bpp-endpoint.com/track"; // 🔁 Replace this with your real BPP URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const txId = uuid();
    setTransactionId(txId);

    const becknPayload = {
      context: {
        domain: "delivery.tracksmart",
        action: "track",
        country: "IND",
        city: "std:080",
        bap_id: "tracksmart.app",
        transaction_id: txId,
        message_id: uuid(),
        timestamp: new Date().toISOString()
      },
      message: {
        order_id: orderId
      }
    };

    try {
      const res = await axios.post(BPP_URL, becknPayload);
      const { gps, status } = res.data;

      setGps(gps);
      setStatus(status);
    } catch (err) {
      console.error("Error contacting BPP:", err.message);
      alert("Failed to fetch tracking info.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <Navbar/>
        <div className="min-h-screen flex items-center justify-center bg-blue-100 px-4">
      <div className="bg-white p-6 rounded shadow max-w-md w-full">
        <h1 className="text-xl font-bold mb-4">Track Order</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="border px-3 py-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Sending..." : "Track"}
          </button>
        </form>

        {gps && (
          <div className="mt-6 text-sm bg-gray-100 p-4 rounded">
            <p><strong>Transaction ID:</strong> {transactionId}</p>
            <p><strong>Status:</strong> {status}</p>
            <p><strong>GPS Coordinates:</strong> {gps}</p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}