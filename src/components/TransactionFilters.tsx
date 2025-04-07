"use client";

import { useEffect, useState } from "react";
import { Transaction } from "./Dashboard";

type TimeFilter = "all" | "today" | "week" | "month";

type TransactionFiltersProps = {
  transactions: Transaction[];
  onFilteredTransactionsChange: (filteredTransactions: Transaction[]) => void;
};

export default function TransactionFilters({
  transactions,
  onFilteredTransactionsChange,
}: TransactionFiltersProps) {
  const [activeFilter, setActiveFilter] = useState<TimeFilter>("all");
  const [filteredTransactions, setFilteredTransactions] =
    useState<Transaction[]>(transactions);

  // Filter transactions based on the selected time filter
  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredTransactions(transactions);
      onFilteredTransactionsChange(transactions);
      return;
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const filtered = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);

      if (activeFilter === "today") {
        return (
          transactionDate.getFullYear() === today.getFullYear() &&
          transactionDate.getMonth() === today.getMonth() &&
          transactionDate.getDate() === today.getDate()
        );
      }

      if (activeFilter === "week") {
        // Calculate start of this week (Sunday)
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        return transactionDate >= startOfWeek;
      }

      if (activeFilter === "month") {
        // Same month and year
        return (
          transactionDate.getMonth() === today.getMonth() &&
          transactionDate.getFullYear() === today.getFullYear()
        );
      }

      return true;
    });

    setFilteredTransactions(filtered);
    onFilteredTransactionsChange(filtered);
  }, [activeFilter, transactions, onFilteredTransactionsChange]);

  return (
    <div className="glass-effect rounded-lg p-2 mb-4 flex items-center justify-between">
      <div className="text-sm font-medium text-[rgb(var(--muted-foreground))] hidden sm:block">
        View:
      </div>
      <div className="grid grid-cols-4 gap-1 w-full sm:w-auto">
        <button
          onClick={() => setActiveFilter("all")}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
            activeFilter === "all"
              ? "bg-[rgb(var(--primary))] text-white"
              : "hover:bg-[rgb(var(--muted))]"
          }`}
        >
          All Time
        </button>
        <button
          onClick={() => setActiveFilter("today")}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
            activeFilter === "today"
              ? "bg-[rgb(var(--primary))] text-white"
              : "hover:bg-[rgb(var(--muted))]"
          }`}
        >
          Today
        </button>
        <button
          onClick={() => setActiveFilter("week")}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
            activeFilter === "week"
              ? "bg-[rgb(var(--primary))] text-white"
              : "hover:bg-[rgb(var(--muted))]"
          }`}
        >
          This Week
        </button>
        <button
          onClick={() => setActiveFilter("month")}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
            activeFilter === "month"
              ? "bg-[rgb(var(--primary))] text-white"
              : "hover:bg-[rgb(var(--muted))]"
          }`}
        >
          This Month
        </button>
      </div>
    </div>
  );
}
