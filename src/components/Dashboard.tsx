"use client";

import { useEffect, useState } from "react";
import DashboardOverview from "./DashboardOverview";
import Header from "./Header";
import Modal from "./Modal";
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
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  useEffect(() => {
    setIsClient(true);
    // Load transactions from localStorage
    const savedTransactions = localStorage.getItem("transactions");
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  }, [transactions, isClient]);

  const handleFilteredTransactionsChange = (filtered: Transaction[]) => {
    setFilteredTransactions(filtered);
  };

  const handleAddTransaction = (newTransaction: Transaction) => {
    setTransactions((prev) => [...prev, newTransaction]);
  };

  const handleEditTransaction = (id: string) => {
    const transactionToEdit = transactions.find((t) => t.id === id);
    if (transactionToEdit) {
      // Open the edit modal with the transaction data
      setIsEditModalOpen(true);
      setEditingTransaction(transactionToEdit);
    }
  };

  const handleUpdateTransaction = (updatedTransaction: Transaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t))
    );
    setIsEditModalOpen(false);
    setEditingTransaction(null);
  };

  // Calculate totals based on filtered transactions
  const totalIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      <Header
        onAddTransaction={handleAddTransaction}
        transactions={transactions}
        filteredTransactions={filteredTransactions}
      />

      {/* Filters Section */}
      {isClient && (
        <div className="animate-fade-in">
          <TransactionFilters
            transactions={transactions}
            onFilteredTransactionsChange={handleFilteredTransactionsChange}
          />
        </div>
      )}

      {/* Dashboard Overview Section */}
      {isClient && (
        <div className="animate-fade-in">
          <DashboardOverview
            transactions={transactions}
            filteredTransactions={filteredTransactions}
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card p-6 glass-effect hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="heading-2">Transaction History</h2>
            {filteredTransactions.length > 0 && (
              <span className="badge badge-primary animate-pulse">
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
            onEdit={handleEditTransaction}
          />
        </div>
      </div>

      {/* Edit Transaction Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingTransaction(null);
        }}
        title="Edit Transaction"
      >
        {editingTransaction && (
          <TransactionForm
            onSubmit={handleUpdateTransaction}
            initialData={editingTransaction}
          />
        )}
      </Modal>
    </div>
  );
}
