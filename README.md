# Finance Manager

A modern, responsive web application for tracking personal finances with dark mode support and advanced data visualization.

> **Note:** Add a screenshot of your application here by saving it as `screenshot.png` in the public directory.

## 🚀 Features

- **Modern UI with Dark Mode**: Sleek interface with light/dark theme support
- **Transaction Management**: Add, view, and delete income and expense transactions
- **Dashboard Overview**: Visual summary of income, expenses, and balance
- **Daily Highlights**: See today's spending compared to daily averages
- **Time Filters**: View transactions by day, week, month, or all time
- **Category Analysis**: Visualize spending patterns by category
- **PDF Reports**: Generate and download detailed financial reports
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Local Storage**: Data persists between sessions using browser storage

## 💻 Tech Stack

- **Next.js**: React framework for production
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **jsPDF**: PDF generation library
- **Local Storage API**: Browser-based data persistence

## 📋 Project Structure

```
finance-manager/
├── src/
│   ├── app/
│   │   ├── globals.css       # Global styles and design system
│   │   ├── layout.tsx        # Root layout with theme provider
│   │   └── page.tsx          # Main application page
│   │
│   ├── components/
│   │   ├── Dashboard.tsx            # Main dashboard component
│   │   ├── DashboardOverview.tsx    # Financial overview section
│   │   ├── Header.tsx               # App header with theme toggle
│   │   ├── ReportGenerator.tsx      # PDF report generation
│   │   ├── Summary.tsx              # Financial summary cards
│   │   ├── ThemeProvider.tsx        # Dark/light mode context
│   │   ├── ThemeToggle.tsx          # Theme switcher button
│   │   ├── TransactionFilters.tsx   # Time-based filters
│   │   ├── TransactionForm.tsx      # Form for adding transactions
│   │   └── TransactionList.tsx      # List of transactions with delete
│   │
│   └── env.d.ts              # TypeScript environment declarations
│
├── public/                   # Static assets
├── tailwind.config.js        # Tailwind CSS configuration
├── package.json              # Project dependencies and scripts
└── README.md                 # Project documentation
```

## 🛠️ Setup and Installation

### Prerequisites

- Node.js (v16 or later)
- npm 

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/JoyTarafder/finance-manager.git
   cd finance-manager
   ```

2. **Install dependencies**

   ```bash
   npm install
   
   ```

3. **Run the development server**

   ```bash
   npm run dev
   
   ```

4. **Open in browser**
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## 🎨 Design System

The application uses a comprehensive design system with:

- **Color Variables**: Primary, accent, success, error, and warning colors
- **Dark/Light Mode**: Complete theme support with custom CSS variables
- **Component Classes**: Reusable UI components like cards, buttons, and badges
- **Animations**: Subtle animations for improved user experience
- **Glass Morphism**: Modern glass effect for UI components

## 📱 Features Breakdown

### Transaction Management

- Add transactions with description, amount, category, and date
- View transactions in a chronological list
- Delete transactions as needed
- Data persists in browser's local storage

### Dashboard Overview

- View total income, expenses, and current balance
- See recent transactions at a glance
- Analyze top spending categories with percentage breakdown
- Visual representation of financial data

### Time-Based Filtering

- Filter transactions by:
  - All time (default)
  - Today
  - This week
  - This month
- Dashboard updates dynamically based on selected filter

### PDF Reports

- Generate three types of reports:
  - **Summary Report**: High-level overview of finances
  - **Detailed Transactions**: Complete list of transactions
  - **Category Analysis**: Breakdown of spending by category
- Choose time period for reports:
  - Current filter
  - This month
  - This year
- Download professional PDF documents with tables and insights

## 🔄 Data Flow

1. User adds transactions via the transaction form
2. Transactions are stored in local storage
3. Dashboard components read transaction data and display summaries
4. User can filter data by time periods
5. User can generate PDF reports based on all or filtered data

## 🧩 Component Details

### ThemeProvider

- Manages dark/light mode state
- Detects system preference on initial load
- Persists theme preference in local storage

### TransactionFilters

- Provides UI for selecting time periods
- Filters transaction data based on selection
- Updates all dashboard components with filtered data

### ReportGenerator

- Creates PDF reports using jsPDF and jspdf-autotable
- Formats financial data into professional tables
- Adds financial insights based on data analysis
- Manages report generation state

## 📊 Future Enhancements

- **Cloud Sync**: Add user accounts and cloud storage
- **Recurring Transactions**: Support for automated recurring entries
- **Budgeting**: Set and track spending budgets by category
- **Data Import/Export**: Support for CSV import and export
- **Financial Goals**: Set and track savings goals
- **Advanced Analytics**: More charts and financial projections
- **Multi-Currency Support**: Handle multiple currencies and conversions

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributors

- [Joy Tarafder](https://github.com/JoyTarafder)

---

Built with ❤️ using Next.js and Tailwind CSS
