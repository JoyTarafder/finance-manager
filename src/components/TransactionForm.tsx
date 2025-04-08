"use client";

import { useState } from "react";
import type { Transaction } from "./Dashboard";

interface TransactionFormProps {
  onSubmit: (transaction: Transaction) => void;
  initialData?: Transaction;
}

const categories = [
  "Salary",
  "Freelance",
  "Investments",
  "Shopping",
  "Food",
  "Transportation",
  "Entertainment",
  "Utilities",
  "Other",
];

export default function TransactionForm({
  onSubmit,
  initialData,
}: TransactionFormProps) {
  const [formData, setFormData] = useState({
    id: initialData?.id || Date.now().toString(),
    description: initialData?.description || "",
    amount: initialData?.amount || 0,
    type: initialData?.type || "expense",
    category: initialData?.category || categories[0],
    date:
      initialData?.date ||
      (() => {
        const now = new Date();
        // Convert to Bangladeshi time (UTC+6)
        const bangladeshTime = new Date(now.getTime() + 6 * 60 * 60 * 1000);
        return bangladeshTime.toISOString();
      })(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update the date to current Bangladeshi time before submitting
    const now = new Date();
    const bangladeshTime = new Date(now.getTime() + 6 * 60 * 60 * 1000);
    onSubmit({
      ...formData,
      date: bangladeshTime.toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
          Description
        </label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="input-field"
          placeholder="Enter description"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
          Amount
        </label>
        <input
          type="number"
          value={formData.amount}
          onChange={(e) =>
            setFormData({ ...formData, amount: parseFloat(e.target.value) })
          }
          className="input-field"
          placeholder="Enter amount"
          min="0"
          step="0.01"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
          Type
        </label>
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, type: "expense" })}
            className={`flex-1 py-3 px-4 rounded-lg border transition-all duration-300 ${
              formData.type === "expense"
                ? "bg-[rgb(var(--error))]/10 border-[rgb(var(--error))] text-[rgb(var(--error))] shadow-md"
                : "border-[rgb(var(--muted))] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))]/20"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                />
              </svg>
              Expense
            </div>
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, type: "income" })}
            className={`flex-1 py-3 px-4 rounded-lg border transition-all duration-300 ${
              formData.type === "income"
                ? "bg-[rgb(var(--success))]/10 border-[rgb(var(--success))] text-[rgb(var(--success))] shadow-md"
                : "border-[rgb(var(--muted))] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))]/20"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                />
              </svg>
              Income
            </div>
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
          Category
        </label>
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="input-field focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent transition-all duration-300"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn-primary">
        {initialData ? "Update Transaction" : "Add Transaction"}
      </button>
    </form>
  );
}
