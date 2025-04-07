"use client";

import { useEffect, useState } from "react";
import DashboardOverview from "./DashboardOverview";
import Header from "./Header";
import ReportGenerator from "./ReportGenerator";
import Summary from "./Summary";
import TransactionFilters from "./TransactionFilters";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";

export type Transaction = {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
};

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [isClient, setIsClient] = useState(false);

  // This effect runs once to indicate we're in the browser
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only access localStorage when we're in the browser
  useEffect(() => {
    if (isClient) {
      const savedTransactions = localStorage.getItem("transactions");
      if (savedTransactions) {
        setTransactions(JSON.parse(savedTransactions));
      }
    }
  }, [isClient]);

  // Initialize filtered transactions
  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  // Only save to localStorage when we're in the browser
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  }, [isClient, transactions]);

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions([...transactions, newTransaction]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  // Calculate totals based on filtered transactions
  const totalIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const handleFilteredTransactionsChange = (filtered: Transaction[]) => {
    setFilteredTransactions(filtered);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <Header />

      {/* Filters Section */}
      {isClient && (
        <TransactionFilters
          transactions={transactions}
          onFilteredTransactionsChange={handleFilteredTransactionsChange}
        />
      )}

      {/* Dashboard Overview Section */}
      {isClient && (
        <DashboardOverview
          transactions={transactions}
          filteredTransactions={filteredTransactions}
        />
      )}

      {/* Reports Section */}
      {isClient && (
        <ReportGenerator
          transactions={transactions}
          filteredTransactions={filteredTransactions}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div className="card p-6 glass-effect">
            <h2 className="heading-2 mb-6">Add Transaction</h2>
            <TransactionForm onSubmit={addTransaction} />
          </div>

          <Summary income={totalIncome} expenses={totalExpenses} />
        </div>

        <div className="card p-6 glass-effect">
          <div className="flex items-center justify-between mb-6">
            <h2 className="heading-2">Transaction History</h2>
            {filteredTransactions.length > 0 && (
              <span className="badge badge-primary">
                {filteredTransactions.length}{" "}
                {filteredTransactions.length === 1
                  ? "transaction"
                  : "transactions"}
              </span>
            )}
          </div>
          <TransactionList
            transactions={filteredTransactions}
            onDelete={deleteTransaction}
          />
        </div>
      </div>
    </div>
  );
}
