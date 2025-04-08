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
    <div className="glass-card mb-8 animate-float">
      <h2 className="heading-2 mb-6">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="glass-effect rounded-lg p-6 border-l-4 border-l-[rgb(var(--primary))] hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[rgb(var(--primary))]/10 flex items-center justify-center">
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
                  d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                />
              </svg>
            </div>
            <p className="text-sm text-[rgb(var(--muted-foreground))]">
              {isFiltered ? "Filtered Income" : "Total Income"}
            </p>
          </div>
          <p className="text-3xl font-bold text-[rgb(var(--primary))]">
            ${(isFiltered ? filteredIncome : totalIncome).toFixed(2)}
          </p>
          {isFiltered && (
            <p className="text-xs text-[rgb(var(--muted-foreground))] mt-2">
              {Math.round((filteredIncome / totalIncome) * 100)}% of total ($
              {totalIncome.toFixed(2)})
            </p>
          )}
        </div>

        <div className="glass-effect rounded-lg p-6 border-l-4 border-l-[rgb(var(--error))] hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[rgb(var(--error))]/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-[rgb(var(--error))]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                />
              </svg>
            </div>
            <p className="text-sm text-[rgb(var(--muted-foreground))]">
              {isFiltered ? "Filtered Expenses" : "Total Expenses"}
            </p>
          </div>
          <p className="text-3xl font-bold text-[rgb(var(--error))]">
            ${(isFiltered ? filteredExpenses : totalExpenses).toFixed(2)}
          </p>
          {isFiltered && (
            <p className="text-xs text-[rgb(var(--muted-foreground))] mt-2">
              {Math.round((filteredExpenses / totalExpenses) * 100)}% of total
              (${totalExpenses.toFixed(2)})
            </p>
          )}
        </div>

        <div className="glass-effect rounded-lg p-6 border-l-4 border-l-[rgb(var(--success))] hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[rgb(var(--success))]/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-[rgb(var(--success))]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.518l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                />
              </svg>
            </div>
            <p className="text-sm text-[rgb(var(--muted-foreground))]">
              {isFiltered ? "Filtered Balance" : "Current Balance"}
            </p>
          </div>
          <p
            className={`text-3xl font-bold ${
              (isFiltered ? filteredBalance : balance) >= 0
                ? "text-[rgb(var(--success))]"
                : "text-[rgb(var(--error))]"
            }`}
          >
            ${(isFiltered ? filteredBalance : balance).toFixed(2)}
          </p>
          {isFiltered && (
            <p className="text-xs text-[rgb(var(--muted-foreground))] mt-2">
              Based on filtered transactions
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent transactions */}
        <div className="glass-effect rounded-lg p-6 hover:shadow-lg transition-all duration-300">
          <h3 className="heading-3 mb-4 flex items-center gap-2">
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
            {isFiltered
              ? "Recent Filtered Transactions"
              : "Recent Transactions"}
          </h3>
          {recentTransactions.length > 0 ? (
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 hover:bg-[rgb(var(--muted))]/10 rounded-lg transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
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
                      <p className="text-xs text-[rgb(var(--muted-foreground))]">
                        {transaction.category} •{" "}
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`font-medium text-lg ${
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 text-[rgb(var(--muted-foreground))] mb-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.518l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                />
              </svg>
              <p className="text-[rgb(var(--muted-foreground))]">
                No transactions yet
              </p>
            </div>
          )}
        </div>

        {/* Category summary */}
        <div className="glass-effect rounded-lg p-6 hover:shadow-lg transition-all duration-300">
          <h3 className="heading-3 mb-4 flex items-center gap-2">
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
            {isFiltered
              ? "Filtered Spending Categories"
              : "Top Spending Categories"}
          </h3>
          {categoryItems.length > 0 ? (
            <div className="space-y-4">
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
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{category}</span>
                      <span className="text-[rgb(var(--muted-foreground))]">
                        ${amount.toFixed(2)} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-[rgb(var(--muted))]/20 rounded-full h-2">
                      <div
                        className="bg-[rgb(var(--primary))] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 text-[rgb(var(--muted-foreground))] mb-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                />
              </svg>
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
