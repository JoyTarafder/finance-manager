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
        <div className="glass-effect rounded-lg p-4 border-l-4 border-l-[rgb(var(--primary))]">
          <p className="text-sm text-[rgb(var(--muted-foreground))]">
            {isFiltered ? "Filtered Income" : "Total Income"}
          </p>
          <p className="text-2xl font-bold text-[rgb(var(--primary))]">
            ${(isFiltered ? filteredIncome : totalIncome).toFixed(2)}
          </p>
          {isFiltered && (
            <p className="text-xs text-[rgb(var(--muted-foreground))] mt-1">
              {Math.round((filteredIncome / totalIncome) * 100)}% of total ($
              {totalIncome.toFixed(2)})
            </p>
          )}
        </div>

        <div className="glass-effect rounded-lg p-4 border-l-4 border-l-[rgb(var(--error))]">
          <p className="text-sm text-[rgb(var(--muted-foreground))]">
            {isFiltered ? "Filtered Expenses" : "Total Expenses"}
          </p>
          <p className="text-2xl font-bold text-[rgb(var(--error))]">
            ${(isFiltered ? filteredExpenses : totalExpenses).toFixed(2)}
          </p>
          {isFiltered && (
            <p className="text-xs text-[rgb(var(--muted-foreground))] mt-1">
              {Math.round((filteredExpenses / totalExpenses) * 100)}% of total
              (${totalExpenses.toFixed(2)})
            </p>
          )}
        </div>

        <div className="glass-effect rounded-lg p-4 border-l-4 border-l-[rgb(var(--success))]">
          <p className="text-sm text-[rgb(var(--muted-foreground))]">
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
          {isFiltered && (
            <p className="text-xs text-[rgb(var(--muted-foreground))] mt-1">
              Based on filtered transactions
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent transactions */}
        <div className="glass-effect rounded-lg p-4">
          <h3 className="heading-3 mb-3">
            {isFiltered
              ? "Recent Filtered Transactions"
              : "Recent Transactions"}
          </h3>
          {recentTransactions.length > 0 ? (
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-2 hover:bg-[rgb(var(--muted))]/10 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
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
                      <p className="text-xs text-[rgb(var(--muted-foreground))]">
                        {transaction.category} •{" "}
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`font-medium ${
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
            <p className="text-[rgb(var(--muted-foreground))] text-center py-4">
              No transactions yet
            </p>
          )}
        </div>

        {/* Category summary */}
        <div className="glass-effect rounded-lg p-4">
          <h3 className="heading-3 mb-3">
            {isFiltered
              ? "Filtered Spending Categories"
              : "Top Spending Categories"}
          </h3>
          {categoryItems.length > 0 ? (
            <div className="space-y-3">
              {categoryItems.map(([category, amount]) => {
                const totalForCalculation = isFiltered
                  ? filteredExpenses
                  : totalExpenses;
                const percentage =
                  totalForCalculation > 0
                    ? Math.round((amount / totalForCalculation) * 100)
                    : 0;

                return (
                  <div key={category} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{category}</span>
                      <span className="text-[rgb(var(--muted-foreground))]">
                        ${amount.toFixed(2)} ({percentage}%)
                      </span>
                    </div>
                    <div className="h-2 bg-[rgb(var(--muted))]/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[rgb(var(--primary))] rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-[rgb(var(--muted-foreground))] text-center py-4">
              No expense data yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
