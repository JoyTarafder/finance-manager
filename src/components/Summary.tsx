"use client";

import { useEffect, useState } from "react";

type SummaryProps = {
  income: number;
  expenses: number;
};

export default function Summary({ income, expenses }: SummaryProps) {
  const [mounted, setMounted] = useState(false);
  const balance = income - expenses;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-6 glass-effect animate-pulse">
          <div className="h-4 bg-[rgb(var(--muted))]/20 rounded w-1/2 mb-4"></div>
          <div className="h-8 bg-[rgb(var(--muted))]/20 rounded w-3/4"></div>
        </div>
        <div className="card p-6 glass-effect animate-pulse">
          <div className="h-4 bg-[rgb(var(--muted))]/20 rounded w-1/2 mb-4"></div>
          <div className="h-8 bg-[rgb(var(--muted))]/20 rounded w-3/4"></div>
        </div>
        <div className="card p-6 glass-effect animate-pulse">
          <div className="h-4 bg-[rgb(var(--muted))]/20 rounded w-1/2 mb-4"></div>
          <div className="h-8 bg-[rgb(var(--muted))]/20 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="card p-6 glass-effect hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-[rgb(var(--muted-foreground))]">
            Total Income
          </h3>
          <div className="w-12 h-12 rounded-full bg-[rgb(var(--success))]/10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[rgb(var(--success))]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <p className="text-3xl font-bold text-[rgb(var(--success))]">
          ${income.toFixed(2)}
        </p>
      </div>

      <div className="card p-6 glass-effect hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-[rgb(var(--muted-foreground))]">
            Total Expenses
          </h3>
          <div className="w-12 h-12 rounded-full bg-[rgb(var(--error))]/10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[rgb(var(--error))]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <p className="text-3xl font-bold text-[rgb(var(--error))]">
          ${expenses.toFixed(2)}
        </p>
      </div>

      <div className="card p-6 glass-effect hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-[rgb(var(--muted-foreground))]">
            Balance
          </h3>
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              balance >= 0
                ? "bg-[rgb(var(--success))]/10"
                : "bg-[rgb(var(--error))]/10"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${
                balance >= 0
                  ? "text-[rgb(var(--success))]"
                  : "text-[rgb(var(--error))]"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
        </div>
        <p
          className={`text-3xl font-bold ${
            balance >= 0
              ? "text-[rgb(var(--success))]"
              : "text-[rgb(var(--error))]"
          }`}
        >
          ${balance.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
