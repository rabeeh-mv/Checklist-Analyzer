import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import "./ChecklistAnalyzer.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const initialData = [
  { category: "Fundamentals", parameter: "Earnings Per Share (EPS)", criteria: "Positive and growing consistently", checked: false, notes: "" },
  { category: "Fundamentals", parameter: "Price-to-Earnings (P/E)", criteria: "Below industry average", checked: false, notes: "" },
  { category: "Fundamentals", parameter: "Price-to-Book (P/B)", criteria: "Below 1 or industry average", checked: false, notes: "" },
  { category: "Fundamentals", parameter: "Debt-to-Equity Ratio", criteria: "Below 1", checked: false, notes: "" },
  { category: "Fundamentals", parameter: "Free Cash Flow (FCF)", criteria: "Positive and increasing", checked: false, notes: "" },
  { category: "Fundamentals", parameter: "Return on Equity (ROE)", criteria: "Above 15%", checked: false, notes: "" },
  { category: "Fundamentals", parameter: "Return on Capital Employed (ROCE)", criteria: "Above industry average", checked: false, notes: "" },
  { category: "Valuation", parameter: "Intrinsic Value vs Market Price", criteria: "Market price < Intrinsic value (30–50% margin of safety)", checked: false, notes: "" },
  { category: "Valuation", parameter: "Dividend Yield", criteria: "Consistent and growing dividends", checked: false, notes: "" },
  { category: "Valuation", parameter: "Price-to-Sales (P/S)", criteria: "Below 1", checked: false, notes: "" },
  { category: "Valuation", parameter: "EV/EBITDA", criteria: "Below 10", checked: false, notes: "" },
  { category: "Business Quality", parameter: "Competitive Advantage (Moat)", criteria: "Strong and durable", checked: false, notes: "" },
  { category: "Business Quality", parameter: "Revenue Growth", criteria: "Consistent growth over 5–10 years", checked: false, notes: "" },
  { category: "Business Quality", parameter: "Industry Position", criteria: "Top performer or market leader", checked: false, notes: "" },
  { category: "Management & Governance", parameter: "Experienced Management", criteria: "Transparent and ethical", checked: false, notes: "" },
  { category: "Management & Governance", parameter: "Promoter Holding", criteria: "High promoter stake (>50%)", checked: false, notes: "" },
  { category: "Management & Governance", parameter: "Corporate Governance", criteria: "No history of fraud", checked: false, notes: "" },
  { category: "Management & Governance", parameter: "Debt Management", criteria: "Efficient handling of debt", checked: false, notes: "" },
  { category: "Industry & Macro", parameter: "Industry Growth Potential", criteria: "Strong potential", checked: false, notes: "" },
  { category: "Industry & Macro", parameter: "Macro Trends", criteria: "Positive alignment with economic trends", checked: false, notes: "" },
  { category: "Risk Assessment", parameter: "Volatility (Beta)", criteria: "Low (preferably < 1)", checked: false, notes: "" },
  { category: "Risk Assessment", parameter: "Contingent Liabilities", criteria: "Minimal or none", checked: false, notes: "" },
  { category: "Risk Assessment", parameter: "Regulatory Risks", criteria: "Low risk or manageable", checked: false, notes: "" },
  { category: "Financial Stability", parameter: "Current Ratio", criteria: "Above 1", checked: false, notes: "" },
  { category: "Financial Stability", parameter: "Quick Ratio", criteria: "Above 1", checked: false, notes: "" },
  { category: "Financial Stability", parameter: "Interest Coverage Ratio", criteria: "Above 2", checked: false, notes: "" },
  { category: "Financial Stability", parameter: "Operating Margin", criteria: "Higher than peers", checked: false, notes: "" },
  { category: "Performance vs Peers", parameter: "Compare Ratios", criteria: "Better or equal to industry peers", checked: false, notes: "" },
  { category: "Performance vs Peers", parameter: "Historical Performance", criteria: "Consistent revenue/profit growth", checked: false, notes: "" },
  { category: "Performance vs Peers", parameter: "Analyst Ratings", criteria: "Positive or 'Buy' recommendations", checked: false, notes: "" },
  { category: "Red Flags", parameter: "Overstretched Valuation", criteria: "Avoid excessively high P/E or P/B", checked: false, notes: "" },
  { category: "Red Flags", parameter: "High Debt Levels", criteria: "Avoid high Debt-to-Equity (>1)", checked: false, notes: "" },
  { category: "Red Flags", parameter: "Declining Margins", criteria: "Avoid falling operating/net margins", checked: false, notes: "" },
  { category: "Red Flags", parameter: "Insider Selling", criteria: "Avoid frequent promoter sales", checked: false, notes: "" },
];
const ChecklistAnalyzer = () => {
  const [data, setData] = useState(initialData);

  // Handle checkbox changes
  const handleCheckboxChange = (index) => {
    const updatedData = data.map((row, i) =>
      i === index ? { ...row, checked: !row.checked } : row
    );
    setData(updatedData);
  };

  // Perform analysis for each category
  const analyzeByCategory = () => {
    const categories = [...new Set(data.map((row) => row.category))];
    const analysis = categories.map((category) => {
      const total = data.filter((row) => row.category === category).length;
      const checked = data.filter((row) => row.category === category && row.checked).length;
      const percentage = Math.round((checked / total) * 100);
      return { category, total, checked, percentage };
    });
    return analysis;
  };

  // Overall status recommendation
  const getStatus = () => {
    const totalParameters = data.length;
    const checkedParameters = data.filter((row) => row.checked).length;
    const redFlags = data.filter((row) => row.category === "Red Flags" && row.checked).length;

    if (redFlags > 2) return "Avoid"; // Too many red flags
    if (checkedParameters / totalParameters >= 0.75) return "Strong Buy"; // 75% or more checks
    if (checkedParameters / totalParameters >= 0.5) return "Hold";
    return "Avoid"; // Less than 50% checks
  };

  const categoryAnalysis = analyzeByCategory();
  const status = getStatus();

  const chartData = {
    labels: categoryAnalysis.map((item) => item.category),
    datasets: [
      {
        label: "Checked %",
        data: categoryAnalysis.map((item) => item.percentage),
        backgroundColor: categoryAnalysis.map((item) =>
          item.percentage >= 75 ? '#28a745' : item.percentage >= 50 ? '#ffc107' : '#dc3545'
        ),
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  return (
    <> 
    <Navbar/>
    <div className="container mt-5">
    <h1 className="text-center">Value Investing Checklist Analyzer</h1>
    <div className="table-container">
      <table className="table table-striped mt-4">
        <thead className="thead-dark">
          <tr>
            <th>Category</th>
            <th>Parameter</th>
            <th>Criteria/Benchmark</th>
            <th>Checked</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.category}</td>
              <td>{row.parameter}</td>
              <td>{row.criteria}</td>
              <td>
                <input
                  type="checkbox"
                  checked={row.checked}
                  onChange={() => handleCheckboxChange(index)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Add notes"
                  value={row.notes}
                  onChange={(e) => {
                    const updatedData = [...data];
                    updatedData[index].notes = e.target.value;
                    setData(updatedData);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="analysis mt-5">
      <section id="analysis-section">
        <h2 className="text-center">Category-wise Analysis</h2>
        <div className="analysis-cards">
          {categoryAnalysis.map((category) => (
            <div key={category.category} className="analysis-card">
              <h3>{category.category}</h3>
              <p>
                <strong>Checked: </strong>{category.checked} / {category.total} ({category.percentage}%)
              </p>
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{ width: `${category.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
      <section id="Overall-Status">
        <div className="chart-container">
          <h3>Overall Checklist Status</h3>
          <Bar data={chartData} options={{ responsive: true }} />
        </div>
      </section>
      
      <div className="status-container">
        <h2>
          Company Status: <span className={`status-${status.toLowerCase()}`}>{status}</span>
        </h2>
        <p>
          {status === "Strong Buy"
            ? "The company is performing well in most categories, with no significant risks identified."
            : status === "Hold"
            ? "The company has a balanced profile with room for improvement."
            : "There are multiple risks, consider avoiding."}
        </p>
      </div>
    </div>
    </div>

    <Footer/>
    </>
  )
}


export default ChecklistAnalyzer;