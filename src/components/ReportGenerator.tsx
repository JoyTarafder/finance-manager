"use client";

// Import jsPDF as a constructor
import { jsPDF } from "jspdf";
// Import autoTable with default import for proper function use
import autoTable from "jspdf-autotable";
import { useState } from "react";
import { Transaction } from "./Dashboard";

type ReportType = "summary" | "detailed" | "categories";
type ReportPeriod = "current" | "month" | "year";

type ReportGeneratorProps = {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  onClose: () => void;
};

export default function ReportGenerator({
  transactions,
  filteredTransactions,
  onClose,
}: ReportGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportType, setReportType] = useState<ReportType>("summary");
  const [reportPeriod, setReportPeriod] = useState<ReportPeriod>("current");

  const generateReport = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent default button behavior
    e.preventDefault();
    e.stopPropagation();

    setIsGenerating(true);

    try {
      console.log("Starting PDF generation...");

      // Get the correct data based on the period
      const dataToUse =
        reportPeriod === "current"
          ? filteredTransactions
          : reportPeriod === "month"
          ? filterTransactionsByMonth(transactions)
          : filterTransactionsByYear(transactions);

      // Prepare the data for the report
      const totalIncome = dataToUse
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

      const totalExpenses = dataToUse
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

      // Group expenses by category
      const categorySummary = dataToUse
        .filter((t) => t.type === "expense")
        .reduce((acc, t) => {
          if (!acc[t.category]) acc[t.category] = 0;
          acc[t.category] += t.amount;
          return acc;
        }, {} as Record<string, number>);

      console.log("Initializing PDF document...");

      // Initialize PDF document with explicit parameters
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // No need to assign autoTable to doc - we'll use the imported function directly

      const pageWidth = doc.internal.pageSize.getWidth();

      console.log("Adding title and metadata...");

      // Add report title
      const title = getReportTitle();
      doc.setFontSize(20);
      doc.setTextColor(41, 128, 185); // Blue color for title
      doc.text(title, pageWidth / 2, 20, { align: "center" });

      // Add report subtitle (period)
      const periodText = getPeriodText();
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100); // Gray color for subtitle
      doc.text(periodText, pageWidth / 2, 30, { align: "center" });

      // Add generation date
      const dateGenerated = `Generated on: ${new Date().toLocaleString()}`;
      doc.setFontSize(10);
      doc.text(dateGenerated, pageWidth / 2, 38, { align: "center" });

      console.log("Generating report content...");

      // Add report content based on report type
      if (reportType === "summary") {
        generateSummaryReport(doc, dataToUse, totalIncome, totalExpenses);
      } else if (reportType === "detailed") {
        generateDetailedReport(doc, dataToUse, totalIncome, totalExpenses);
      } else if (reportType === "categories") {
        generateCategoriesReport(doc, categorySummary, totalExpenses);
      }

      console.log("Adding page numbers...");

      // Add footer with page numbers
      addPageNumbers(doc);

      console.log("Saving PDF...");

      // Save the PDF file
      const fileName = `finance_report_${reportType}_${
        new Date().toISOString().split("T")[0]
      }.pdf`;

      // Save with error handling
      try {
        doc.save(fileName);
        console.log("PDF saved successfully!");
      } catch (saveError) {
        console.error("Error saving PDF:", saveError);
        alert(
          `Failed to save PDF: ${
            saveError instanceof Error ? saveError.message : "Unknown error"
          }`
        );
      }

      setTimeout(() => {
        setIsGenerating(false);
      }, 1500);
    } catch (error) {
      console.error("Error generating report:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      alert(
        `Failed to generate PDF: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      setIsGenerating(false);
    }
  };

  // Helper function to filter transactions by current month
  const filterTransactionsByMonth = (data: Transaction[]) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return data.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear
      );
    });
  };

  // Helper function to filter transactions by current year
  const filterTransactionsByYear = (data: Transaction[]) => {
    const currentYear = new Date().getFullYear();

    return data.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate.getFullYear() === currentYear;
    });
  };

  // Helper function to get the report title
  const getReportTitle = () => {
    switch (reportType) {
      case "summary":
        return "Financial Summary Report";
      case "detailed":
        return "Detailed Transaction Report";
      case "categories":
        return "Category Analysis Report";
      default:
        return "Financial Report";
    }
  };

  // Helper function to get the period text
  const getPeriodText = () => {
    switch (reportPeriod) {
      case "current":
        return `Current Filter (${filteredTransactions.length} transactions)`;
      case "month":
        return `This Month (${
          filterTransactionsByMonth(transactions).length
        } transactions)`;
      case "year":
        return `This Year (${
          filterTransactionsByYear(transactions).length
        } transactions)`;
      default:
        return "All Transactions";
    }
  };

  // Generate a summary report
  const generateSummaryReport = (
    doc: jsPDF,
    data: Transaction[],
    totalIncome: number,
    totalExpenses: number
  ) => {
    const balance = totalIncome - totalExpenses;
    let currentY = 50;

    // Add summary table (use autoTable directly from doc)
    autoTable(doc, {
      startY: currentY,
      head: [["Metric", "Value"]],
      body: [
        ["Total Transactions", data.length.toString()],
        ["Total Income", `$${totalIncome.toFixed(2)}`],
        ["Total Expenses", `$${totalExpenses.toFixed(2)}`],
        ["Current Balance", `$${balance.toFixed(2)}`],
      ],
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    // Get the final Y position after the table (use plugin's own tracking)
    if (doc.lastAutoTable) {
      currentY = doc.lastAutoTable.finalY + 20;
    } else {
      currentY += 60; // Fallback if lastAutoTable is not available
    }

    // Add financial overview
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Financial Overview", 20, currentY);
    currentY += 10;

    doc.setFontSize(11);
    doc.text(`Your total income is $${totalIncome.toFixed(2)}`, 20, currentY);
    currentY += 10;

    doc.text(
      `Your total expenses are $${totalExpenses.toFixed(2)}`,
      20,
      currentY
    );
    currentY += 10;

    const balanceText =
      balance >= 0
        ? `You have a positive balance of $${balance.toFixed(2)}`
        : `You have a negative balance of $${Math.abs(balance).toFixed(2)}`;

    doc.text(balanceText, 20, currentY);
    currentY += 10;

    // Add savings rate if there's income
    if (totalIncome > 0) {
      const savingsRate = ((totalIncome - totalExpenses) / totalIncome) * 100;
      doc.text(
        `Your savings rate is ${Math.max(0, savingsRate).toFixed(1)}%`,
        20,
        currentY
      );
    }
  };

  // Generate a detailed transactions report
  const generateDetailedReport = (
    doc: jsPDF,
    data: Transaction[],
    totalIncome: number,
    totalExpenses: number
  ) => {
    // Add summary section
    const balance = totalIncome - totalExpenses;
    let currentY = 50;

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Financial Summary", 20, currentY);
    currentY += 10;

    doc.setFontSize(11);
    doc.text(`Total Income: $${totalIncome.toFixed(2)}`, 20, currentY);
    currentY += 8;

    doc.text(`Total Expenses: $${totalExpenses.toFixed(2)}`, 20, currentY);
    currentY += 8;

    doc.text(`Balance: $${balance.toFixed(2)}`, 20, currentY);
    currentY += 14;

    // Add transactions table
    const sortedTransactions = [...data].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const tableData = sortedTransactions.map((t) => [
      new Date(t.date).toLocaleDateString(),
      t.description,
      t.category,
      t.type === "income" ? "Income" : "Expense",
      `$${t.amount.toFixed(2)}`,
    ]);

    // Use the imported autoTable function
    autoTable(doc, {
      startY: currentY,
      head: [["Date", "Description", "Category", "Type", "Amount"]],
      body: tableData,
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });
  };

  // Generate a categories report
  const generateCategoriesReport = (
    doc: jsPDF,
    categorySummary: Record<string, number>,
    totalExpenses: number
  ) => {
    let currentY = 50;

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Expense Categories Analysis", 20, currentY);
    currentY += 10;

    doc.setFontSize(11);
    doc.text(`Total Expenses: $${totalExpenses.toFixed(2)}`, 20, currentY);
    currentY += 10;

    // Convert category data to sorted array
    const categoryItems = Object.entries(categorySummary)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage:
          totalExpenses > 0 ? Math.round((amount / totalExpenses) * 100) : 0,
      }))
      .sort((a, b) => b.amount - a.amount);

    // Generate the table data
    const tableData = categoryItems.map((item) => [
      item.category,
      `$${item.amount.toFixed(2)}`,
      `${item.percentage}%`,
    ]);

    // Add the categories table using the imported autoTable function
    autoTable(doc, {
      startY: currentY,
      head: [["Category", "Amount", "Percentage"]],
      body: tableData,
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    // Add a note about top expenses
    if (categoryItems.length > 0 && doc.lastAutoTable) {
      currentY = doc.lastAutoTable.finalY + 20;

      doc.setFontSize(14);
      doc.text("Top Spending Insights", 20, currentY);
      currentY += 10;

      doc.setFontSize(11);
      const topCategory = categoryItems[0];
      doc.text(
        `Your highest spending category is "${
          topCategory.category
        }" at $${topCategory.amount.toFixed(2)} (${
          topCategory.percentage
        }% of total expenses)`,
        20,
        currentY,
        { maxWidth: 170 }
      );
      currentY += 20;

      // Add insights for the top 3 categories
      if (categoryItems.length >= 3) {
        doc.text(
          `Your top 3 categories represent ${categoryItems
            .slice(0, 3)
            .reduce(
              (sum, item) => sum + item.percentage,
              0
            )}% of your total expenses.`,
          20,
          currentY
        );
      }
    }
  };

  // Fix the page numbers at the end of PDF generation
  const addPageNumbers = (doc: jsPDF) => {
    const pageCount = doc.internal.getNumberOfPages();
    const pageWidth = doc.internal.pageSize.getWidth();

    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Page ${i} of ${pageCount}`,
        pageWidth / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: "center" }
      );
    }
  };

  return (
    <div className="glass-card p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[rgb(var(--accent))]/10 shadow-inner">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="rgb(var(--accent))"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </div>
          <div>
            <h2 className="heading-2 mb-1">Download PDF Reports</h2>
            <p className="text-sm text-[rgb(var(--muted-foreground))]">
              Generate detailed financial reports in PDF format
            </p>
          </div>
        </div>
        <button
          onClick={generateReport}
          disabled={isGenerating}
          className={`
            relative overflow-hidden group
            btn-accent flex items-center justify-center gap-3
            px-6 py-3.5 rounded-xl font-medium
            bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent))]
            hover:from-[rgb(var(--accent))] hover:to-[rgb(var(--accent))/90]
            transition-all duration-300 ease-out
            ${
              isGenerating
                ? "opacity-70 cursor-not-allowed"
                : "hover:scale-[1.02] hover:shadow-lg"
            }
          `}
        >
          <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors duration-200"></div>
          {isGenerating ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white/90"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span className="text-white/90 font-medium">
                Generating PDF...
              </span>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5 text-white/90 group-hover:scale-110 transition-transform duration-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              <span className="text-white/90 font-medium">Download PDF</span>
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-600/20 to-violet-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
            Report Type
          </label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value as ReportType)}
            className="input-field w-full p-3 rounded-xl bg-[rgb(var(--muted))]/5 border border-[rgb(var(--muted))]/20 focus:border-[rgb(var(--accent))] transition-colors"
            disabled={isGenerating}
          >
            <option value="summary">Summary Report</option>
            <option value="detailed">Detailed Transactions</option>
            <option value="categories">Category Analysis</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
            Time Period
          </label>
          <select
            value={reportPeriod}
            onChange={(e) => setReportPeriod(e.target.value as ReportPeriod)}
            className="input-field w-full p-3 rounded-xl bg-[rgb(var(--muted))]/5 border border-[rgb(var(--muted))]/20 focus:border-[rgb(var(--accent))] transition-colors"
            disabled={isGenerating}
          >
            <option value="current">Current Filter</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      <div className="bg-[rgb(var(--muted))]/5 rounded-xl p-6 border border-[rgb(var(--muted))]/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[rgb(var(--accent))]/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="rgb(var(--accent))"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
          </div>
          <h3 className="font-medium text-lg text-[rgb(var(--foreground))]">
            {reportType === "summary" && "Summary Report"}
            {reportType === "detailed" && "Detailed Transaction Report"}
            {reportType === "categories" && "Category Analysis Report"}
          </h3>
        </div>

        <p className="text-[rgb(var(--muted-foreground))] mb-6">
          {reportType === "summary" &&
            "Download a professional PDF with a high-level summary of your income, expenses, and balance."}
          {reportType === "detailed" &&
            "Export a comprehensive PDF report of all your transactions with dates, amounts, and categories."}
          {reportType === "categories" &&
            "Analyze your spending patterns with a PDF breakdown of expenses by category with visual insights."}
        </p>

        <div className="h-px bg-[rgb(var(--muted))]/10 my-6"></div>

        <div className="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="rgb(var(--muted-foreground))"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
          <p className="text-[rgb(var(--muted-foreground))]">
            {reportPeriod === "current" &&
              `This report will include data from ${filteredTransactions.length} transactions based on your current filter.`}
            {reportPeriod === "month" &&
              `This report will include all transactions from the current month (${
                filterTransactionsByMonth(transactions).length
              } transactions).`}
            {reportPeriod === "year" &&
              `This report will include all transactions from the current year (${
                filterTransactionsByYear(transactions).length
              } transactions).`}
          </p>
        </div>
      </div>
    </div>
  );
}
