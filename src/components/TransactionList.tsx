"use client";

import { useEffect, useState } from "react";
import type { Transaction } from "./Dashboard";

type TransactionListProps = {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
};

export default function TransactionList({
  transactions,
  onDelete,
  onEdit,
}: TransactionListProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="space-y-4">
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[rgb(var(--muted))]/20 mb-4 animate-pulse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-[rgb(var(--muted-foreground))]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <p className="text-[rgb(var(--muted-foreground))] text-lg">
            Loading transactions...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[rgb(var(--muted))]/20 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-[rgb(var(--muted-foreground))]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <p className="text-[rgb(var(--muted-foreground))] text-lg">
            No transactions yet
          </p>
          <p className="text-[rgb(var(--muted-foreground))] text-sm mt-1">
            Add your first transaction to get started
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-xl glass-effect hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    transaction.type === "income"
                      ? "bg-[rgb(var(--success))]/10"
                      : "bg-[rgb(var(--error))]/10"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 ${
                      transaction.type === "income"
                        ? "text-[rgb(var(--success))]"
                        : "text-[rgb(var(--error))]"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    {transaction.type === "income" ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                      />
                    )}
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-[rgb(var(--foreground))]">
                    {transaction.description}
                  </h3>
                  <div className="text-sm text-[rgb(var(--muted-foreground))] mt-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[rgb(var(--muted))]/20 text-[rgb(var(--foreground))]">
                      {transaction.category}
                    </span>
                    <span className="mx-2">•</span>
                    <span>
                      {new Date(transaction.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`font-medium text-xl ${
                    transaction.type === "income"
                      ? "text-[rgb(var(--success))]"
                      : "text-[rgb(var(--error))]"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}$
                  {transaction.amount.toFixed(2)}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(transaction.id)}
                    className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--primary))] p-2 rounded-full hover:bg-[rgb(var(--primary))]/10 transition-all duration-200 hover:scale-110"
                    aria-label="Edit transaction"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={() => onDelete(transaction.id)}
                    className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--error))] p-2 rounded-full hover:bg-[rgb(var(--error))]/10 transition-all duration-200 hover:scale-110"
                    aria-label="Delete transaction"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
