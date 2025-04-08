"use client";

import { useEffect, useState } from "react";
import DashboardOverview from "./DashboardOverview";
import Header from "./Header";
import Modal from "./Modal";
import TransactionFilters from "./TransactionFilters";
import TransactionForm from "./TransactionForm";

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
  const [activeTab, setActiveTab] = useState<"overview" | "history">(
    "overview"
  );
  const [isDocsModalOpen, setIsDocsModalOpen] = useState(false);

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

      {/* Toggle Buttons */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setActiveTab("overview")}
          className={`glass-effect rounded-lg px-4 py-2 flex items-center gap-2 transition-all duration-300 ${
            activeTab === "overview"
              ? "bg-[rgb(var(--primary))] text-white"
              : "hover:bg-[rgb(var(--muted))]"
          }`}
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
              d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
            />
          </svg>
          Overview
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`glass-effect rounded-lg px-4 py-2 flex items-center gap-2 transition-all duration-300 ${
            activeTab === "history"
              ? "bg-[rgb(var(--primary))] text-white"
              : "hover:bg-[rgb(var(--muted))]"
          }`}
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
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          History
        </button>
        <button
          onClick={() => setIsDocsModalOpen(true)}
          className="glass-effect rounded-lg px-4 py-2 flex items-center gap-2 transition-all duration-300 hover:bg-[rgb(var(--muted))]"
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
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
          </svg>
          Documentation
        </button>
      </div>

      {/* Dashboard Overview Section */}
      {isClient && activeTab === "overview" && (
        <div className="animate-fade-in">
          <DashboardOverview
            transactions={transactions}
            filteredTransactions={filteredTransactions}
          />
        </div>
      )}

      {/* Transaction History Section */}
      {activeTab === "history" && (
        <div className="animate-fade-in">
          <div className="card p-8 glass-effect hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[rgb(var(--primary))]/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-[rgb(var(--primary))]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="heading-2">Transaction History</h2>
                  <p className="text-sm text-[rgb(var(--muted-foreground))]">
                    View and manage your financial transactions
                  </p>
                </div>
              </div>
              {filteredTransactions.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="badge badge-primary animate-pulse">
                    {filteredTransactions.length}{" "}
                    {filteredTransactions.length === 1
                      ? "transaction"
                      : "transactions"}
                  </span>
                  <div className="h-8 w-px bg-[rgb(var(--muted))]/20"></div>
                  <div className="flex items-center gap-1 text-sm text-[rgb(var(--muted-foreground))]">
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
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                      />
                    </svg>
                    <span>All Time</span>
                  </div>
                </div>
              )}
            </div>

            {filteredTransactions.length > 0 ? (
              <div className="space-y-4">
                {filteredTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="group flex items-center justify-between p-4 rounded-xl bg-[rgb(var(--muted))]/5 hover:bg-[rgb(var(--muted))]/10 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          transaction.type === "income"
                            ? "bg-[rgb(var(--success))]/10"
                            : "bg-[rgb(var(--error))]/10"
                        }`}
                      >
                        {transaction.type === "income" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="rgb(var(--success))"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="rgb(var(--error))"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                            />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-[rgb(var(--foreground))]">
                          {transaction.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-1 rounded-full bg-[rgb(var(--muted))]/20 text-[rgb(var(--muted-foreground))]">
                            {transaction.category}
                          </span>
                          <span className="text-xs text-[rgb(var(--muted-foreground))]">
                            {new Date(transaction.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-lg font-semibold ${
                          transaction.type === "income"
                            ? "text-[rgb(var(--success))]"
                            : "text-[rgb(var(--error))]"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : "-"}$
                        {transaction.amount.toFixed(2)}
                      </span>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={() => handleEditTransaction(transaction.id)}
                          className="p-2 rounded-lg hover:bg-[rgb(var(--muted))]/20 transition-colors"
                        >
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
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => deleteTransaction(transaction.id)}
                          className="p-2 rounded-lg hover:bg-[rgb(var(--error))]/10 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 text-[rgb(var(--error))]"
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
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[rgb(var(--muted))]/10 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 text-[rgb(var(--muted-foreground))]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  No Transactions Yet
                </h3>
                <p className="text-[rgb(var(--muted-foreground))] max-w-sm">
                  Start tracking your finances by adding your first transaction
                </p>
              </div>
            )}
          </div>
        </div>
      )}

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

      {/* Documentation Modal */}
      <Modal
        isOpen={isDocsModalOpen}
        onClose={() => setIsDocsModalOpen(false)}
        title="Finance Manager Documentation"
      >
        <div className="space-y-8">
          <section>
            <h3 className="text-lg font-semibold mb-2">Overview</h3>
            <p className="text-[rgb(var(--muted-foreground))]">
              The Finance Manager is a comprehensive tool designed to help you
              track and manage your personal finances. It provides real-time
              insights into your income, expenses, and spending patterns through
              an intuitive interface.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">Core Features</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Transaction Management</h4>
                <ul className="list-disc list-inside space-y-1 text-[rgb(var(--muted-foreground))]">
                  <li>Add new transactions with detailed information</li>
                  <li>Edit existing transactions to correct mistakes</li>
                  <li>Delete transactions when needed</li>
                  <li>Categorize transactions for better organization</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-1">Financial Overview</h4>
                <ul className="list-disc list-inside space-y-1 text-[rgb(var(--muted-foreground))]">
                  <li>Real-time calculation of total income and expenses</li>
                  <li>Current balance tracking</li>
                  <li>Visual representation of spending patterns</li>
                  <li>Category-wise expense breakdown</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-1">Filtering & Analysis</h4>
                <ul className="list-disc list-inside space-y-1 text-[rgb(var(--muted-foreground))]">
                  <li>
                    Filter transactions by date range (Today, Week, Month, All
                    Time)
                  </li>
                  <li>View filtered financial summaries</li>
                  <li>Track spending trends over time</li>
                  <li>Identify top spending categories</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">Detailed Usage Guide</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Adding Transactions</h4>
                <ol className="list-decimal list-inside space-y-1 text-[rgb(var(--muted-foreground))]">
                  <li>Click the "+" button in the header</li>
                  <li>
                    Fill in the transaction details:
                    <ul className="list-disc list-inside ml-4 mt-1">
                      <li>Description: Brief note about the transaction</li>
                      <li>Amount: The transaction value</li>
                      <li>Type: Income or Expense</li>
                      <li>Category: Select from predefined categories</li>
                      <li>Date: Transaction date (defaults to current date)</li>
                    </ul>
                  </li>
                  <li>Click "Add Transaction" to save</li>
                </ol>
              </div>
              <div>
                <h4 className="font-medium mb-1">Managing Transactions</h4>
                <ul className="list-disc list-inside space-y-1 text-[rgb(var(--muted-foreground))]">
                  <li>
                    Edit: Click the edit icon on any transaction to modify its
                    details
                  </li>
                  <li>Delete: Click the delete icon to remove a transaction</li>
                  <li>
                    Filter: Use the filter buttons to view specific time periods
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-1">Viewing Financial Data</h4>
                <ul className="list-disc list-inside space-y-1 text-[rgb(var(--muted-foreground))]">
                  <li>
                    Overview Tab: See your financial summary and recent
                    transactions
                  </li>
                  <li>
                    History Tab: View detailed transaction list with filtering
                    options
                  </li>
                  <li>
                    Category Summary: Analyze spending patterns by category
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">Best Practices</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Transaction Management</h4>
                <ul className="list-disc list-inside space-y-1 text-[rgb(var(--muted-foreground))]">
                  <li>Record transactions as soon as they occur</li>
                  <li>Use specific, descriptive transaction names</li>
                  <li>Regularly review and categorize transactions</li>
                  <li>Keep receipts for important transactions</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-1">Financial Planning</h4>
                <ul className="list-disc list-inside space-y-1 text-[rgb(var(--muted-foreground))]">
                  <li>Set monthly budget goals based on historical data</li>
                  <li>Review spending patterns weekly</li>
                  <li>Identify areas for potential savings</li>
                  <li>Track progress towards financial goals</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-1">Data Management</h4>
                <ul className="list-disc list-inside space-y-1 text-[rgb(var(--muted-foreground))]">
                  <li>Regularly backup your transaction data</li>
                  <li>Keep categories consistent for better analysis</li>
                  <li>
                    Use the filtering system to analyze specific time periods
                  </li>
                  <li>Review and clean up old transactions periodically</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">Tips & Tricks</h3>
            <ul className="list-disc list-inside space-y-2 text-[rgb(var(--muted-foreground))]">
              <li>
                Use the filter system to compare spending across different time
                periods
              </li>
              <li>
                Regularly check the category summary to identify spending trends
              </li>
              <li>Set up recurring transactions for regular income/expenses</li>
              <li>
                Use the search function to quickly find specific transactions
              </li>
              <li>
                Export your data periodically for backup and external analysis
              </li>
            </ul>
          </section>
        </div>
      </Modal>
    </div>
  );
}
