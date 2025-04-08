"use client";

import { useState } from "react";
import Modal from "./Modal";
import ReportGenerator from "./ReportGenerator";
import ThemeToggle from "./ThemeToggle";
import TransactionForm from "./TransactionForm";

interface HeaderProps {
  onAddTransaction: (transaction: any) => void;
  transactions: any[];
  filteredTransactions: any[];
}

export default function Header({
  onAddTransaction,
  transactions,
  filteredTransactions,
}: HeaderProps) {
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] =
    useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const handleTransactionSubmit = (transaction: any) => {
    onAddTransaction(transaction);
    setIsAddTransactionModalOpen(false);
  };

  return (
    <header className="mb-8">
      {/* Mobile View */}
      <div className="sm:hidden flex flex-col items-center text-center space-y-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[rgb(var(--primary))]/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="rgb(var(--primary))"
                className="w-5 h-5"
              >
                <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                <path
                  fillRule="evenodd"
                  d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                  clipRule="evenodd"
                />
                <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
              </svg>
            </div>
            <div className="text-center">
              <h1 className="text-lg font-bold text-[rgb(var(--foreground))]">
                Finance Manager
                <span className="text-xs font-normal px-2 py-1 rounded-full bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]">
                Beta
              </span>
              </h1>
              <p className="text-xs text-[rgb(var(--muted-foreground))] flex items-center justify-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
                Track your income and expenses
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="glass-effect rounded-xl hover:shadow-lg transition-all duration-300 p-2"
              aria-label="Download PDF Reports"
            >
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
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            </button>
            <div className="glass-effect rounded-xl hover:shadow-lg transition-all duration-300">
              <ThemeToggle />
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsAddTransactionModalOpen(true)}
          className="w-full glass-effect rounded-xl hover:shadow-lg transition-all duration-300 p-3 flex items-center justify-center space-x-2"
          aria-label="Add Transaction"
        >
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <span>Add Transaction</span>
        </button>
      </div>

      {/* Laptop View (unchanged) */}
      <div className="hidden sm:flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="glass-effect p-3 rounded-xl hover:shadow-lg transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="rgb(var(--primary))"
              className="w-8 h-8"
            >
              <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
              <path
                fillRule="evenodd"
                d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                clipRule="evenodd"
              />
              <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
            </svg>
          </div>
          <div>
            <h1 className="heading-1 text-[rgb(var(--foreground))] flex items-center gap-2">
              Finance Manager
              <span className="text-xs font-normal px-2 py-1 rounded-full bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]">
                Beta
              </span>
            </h1>
            <p className="text-[rgb(var(--muted-foreground))] text-sm flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Track your income and expenses with ease
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddTransactionModalOpen(true)}
            className="glass-effect rounded-xl hover:shadow-lg transition-all duration-300 p-2.5"
            aria-label="Add Transaction"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
          <button
            onClick={() => setIsReportModalOpen(true)}
            className="glass-effect rounded-xl hover:shadow-lg transition-all duration-300 p-2.5"
            aria-label="Download PDF Reports"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </button>
          <div className="glass-effect rounded-xl hover:shadow-lg transition-all duration-300">
            <ThemeToggle />
          </div>
        </div>
      </div>

      <Modal
        isOpen={isAddTransactionModalOpen}
        onClose={() => setIsAddTransactionModalOpen(false)}
        title="Add Transaction"
      >
        <TransactionForm onSubmit={handleTransactionSubmit} />
      </Modal>

      <Modal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        title="Download PDF Reports"
      >
        <ReportGenerator
          transactions={transactions}
          filteredTransactions={filteredTransactions}
          onClose={() => setIsReportModalOpen(false)}
        />
      </Modal>
    </header>
  );
}
