"use client";

import { useEffect, useState } from "react";
import type { Transaction } from "./Dashboard";

type TransactionFormProps = {
  onSubmit: (transaction: Omit<Transaction, "id">) => void;
};

const categories = [
  "Housing",
  "Transportation",
  "Food",
  "Utilities",
  "Insurance",
  "Healthcare",
  "Savings",
  "Personal",
  "Entertainment",
  "Other",
];

export default function TransactionForm({ onSubmit }: TransactionFormProps) {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    type: "expense",
    category: "Other",
    date: "",
  });

  // Initialize the date safely on the client side
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      date: new Date().toISOString().split("T")[0],
    }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount),
      type: formData.type as "income" | "expense",
    });
    setFormData({
      description: "",
      amount: "",
      type: "expense",
      category: "Other",
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            required
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="input-field"
            placeholder="Enter description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            className="input-field"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: "expense" })}
              className={`flex-1 py-2 px-4 rounded-lg border transition-all duration-200 ${
                formData.type === "expense"
                  ? "bg-red-100 border-red-500 text-red-700"
                  : "border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: "income" })}
              className={`flex-1 py-2 px-4 rounded-lg border transition-all duration-200 ${
                formData.type === "income"
                  ? "bg-green-100 border-green-500 text-green-700"
                  : "border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Income
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="input-field"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="input-field"
          />
        </div>
      </div>

      <button type="submit" className="btn-primary">
        Add Transaction
      </button>
    </form>
  );
}
