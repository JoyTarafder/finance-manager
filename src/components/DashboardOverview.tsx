"use client";

import { useMemo } from "react";
import { Transaction } from "./Dashboard";

type OverviewProps = {
  transactions: Transaction[];
  filteredTransactions?: Transaction[];
};

export default function DashboardOverview({
  transactions,
  filteredTransactions = transactions,
}: OverviewProps) {
  const {
    totalIncome,
    totalExpenses,
    balance,
    recentTransactions,
    categorySummary,
  } = useMemo(() => {
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpenses;

    // Get last 3 transactions from filtered transactions
    const recentTransactions = [...filteredTransactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);

    // Group expenses by category from filtered transactions
    const categorySummary = filteredTransactions
      .filter((t) => t.type === "expense")
      .reduce((acc, transaction) => {
        const { category, amount } = transaction;
        if (!acc[category]) {
          acc[category] = 0;
        }
        acc[category] += amount;
        return acc;
      }, {} as Record<string, number>);

    return {
      totalIncome,
      totalExpenses,
      balance,
      recentTransactions,
      categorySummary,
    };
  }, [transactions, filteredTransactions]);

  // Calculate filtered data
  const filteredData = useMemo(() => {
    const filteredIncome = filteredTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const filteredExpenses = filteredTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const filteredBalance = filteredIncome - filteredExpenses;

    return {
      filteredIncome,
      filteredExpenses,
      filteredBalance,
      isFiltered:
        filteredTransactions !== transactions &&
        filteredTransactions.length !== transactions.length,
    };
  }, [filteredTransactions, transactions]);

  const categoryItems = Object.entries(categorySummary)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4);

  const { isFiltered, filteredIncome, filteredExpenses, filteredBalance } =
    filteredData;

  return (
    <div className="space-y-8 animate-float">
      {/* Header Section */}
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
                d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
              />
            </svg>
          </div>
          <div>
            <h2 className="heading-2">Financial Overview</h2>
            <p className="text-sm text-[rgb(var(--muted-foreground))]">
              Track your income, expenses, and financial goals
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Income Card */}
        <div className="glass-effect rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-[rgb(var(--primary))]/10">
          <div className="flex items-center gap-4 mb-4">
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
                  d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-[rgb(var(--muted-foreground))]">
                {isFiltered ? "Filtered Income" : "Total Income"}
              </p>
              <p className="text-2xl font-bold text-[rgb(var(--primary))]">
                ${(isFiltered ? filteredIncome : totalIncome).toFixed(2)}
              </p>
            </div>
          </div>
          {isFiltered && (
            <div className="mt-2 pt-3 border-t border-[rgb(var(--muted))]/10">
              <p className="text-sm text-[rgb(var(--muted-foreground))]">
                {Math.round((filteredIncome / totalIncome) * 100)}% of total ($
                {totalIncome.toFixed(2)})
              </p>
            </div>
          )}
        </div>

        {/* Expenses Card */}
        <div className="glass-effect rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-[rgb(var(--error))]/10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[rgb(var(--error))]/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-[rgb(var(--error))]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-[rgb(var(--muted-foreground))]">
                {isFiltered ? "Filtered Expenses" : "Total Expenses"}
              </p>
              <p className="text-2xl font-bold text-[rgb(var(--error))]">
                ${(isFiltered ? filteredExpenses : totalExpenses).toFixed(2)}
              </p>
            </div>
          </div>
          {isFiltered && (
            <div className="mt-2 pt-3 border-t border-[rgb(var(--muted))]/10">
              <p className="text-sm text-[rgb(var(--muted-foreground))]">
                {Math.round((filteredExpenses / totalExpenses) * 100)}% of total
                (${totalExpenses.toFixed(2)})
              </p>
            </div>
          )}
        </div>

        {/* Balance Card */}
        <div className="glass-effect rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-[rgb(var(--success))]/10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[rgb(var(--success))]/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-[rgb(var(--success))]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.518l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-[rgb(var(--muted-foreground))]">
                {isFiltered ? "Filtered Balance" : "Current Balance"}
              </p>
              <p
                className={`text-2xl font-bold ${
                  (isFiltered ? filteredBalance : balance) >= 0
                    ? "text-[rgb(var(--success))]"
                    : "text-[rgb(var(--error))]"
                }`}
              >
                ${(isFiltered ? filteredBalance : balance).toFixed(2)}
              </p>
            </div>
          </div>
          {isFiltered && (
            <div className="mt-2 pt-3 border-t border-[rgb(var(--muted))]/10">
              <p className="text-sm text-[rgb(var(--muted-foreground))]">
                Based on filtered transactions
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="glass-effect rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-[rgb(var(--primary))]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="heading-3">
                {isFiltered
                  ? "Recent Filtered Transactions"
                  : "Recent Transactions"}
              </h3>
            </div>
            {recentTransactions.length > 0 && (
              <span className="text-xs px-2 py-1 rounded-full bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]">
                Last {recentTransactions.length} transactions
              </span>
            )}
          </div>

          {recentTransactions.length > 0 ? (
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-[rgb(var(--muted))]/5 hover:bg-[rgb(var(--muted))]/10 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
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
                          className="w-5 h-5"
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
                          className="w-5 h-5"
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
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[rgb(var(--muted))]/20 text-[rgb(var(--muted-foreground))]">
                          {transaction.category}
                        </span>
                        <span className="text-xs text-[rgb(var(--muted-foreground))]">
                          {new Date(transaction.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
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
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
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
              <p className="text-[rgb(var(--muted-foreground))]">
                No transactions yet
              </p>
            </div>
          )}
        </div>

        {/* Category Summary */}
        <div className="glass-effect rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-[rgb(var(--primary))]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                />
              </svg>
              <h3 className="heading-3">
                {isFiltered
                  ? "Filtered Spending Categories"
                  : "Top Spending Categories"}
              </h3>
            </div>
          </div>

          {categoryItems.length > 0 ? (
            <div className="space-y-6">
              {categoryItems.map(([category, amount]) => {
                const totalForCalculation = isFiltered
                  ? filteredExpenses
                  : totalExpenses;
                const percentage =
                  totalForCalculation > 0
                    ? Math.round((amount / totalForCalculation) * 100)
                    : 0;

                return (
                  <div key={category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{category}</span>
                        <span className="text-sm text-[rgb(var(--muted-foreground))]">
                          {percentage}%
                        </span>
                      </div>
                      <span className="text-sm font-medium text-[rgb(var(--foreground))]">
                        ${amount.toFixed(2)}
                      </span>
                    </div>
                    <div className="relative h-2 w-full bg-[rgb(var(--muted))]/20 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-[rgb(var(--primary))] rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
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
                    d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                  />
                </svg>
              </div>
              <p className="text-[rgb(var(--muted-foreground))]">
                No spending categories yet
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
