module.exports = [
    {
      name: "Valuation Fee Paid",
      condition: (data) => data.isValuationFeePaid === true,
    },
    {
      name: "UK Resident",
      condition: (data) => data.isUkResident === true,
    },
    {
      name: "Risk Rating Medium",
      condition: (data) => data.riskRating === "Medium",
    },
    {
      name: "LTV Below 60%",
      condition: (data) => {
        const loanToValue = (data.loanRequired / data.purchasePrice) * 100;
        return loanToValue < 60;
      },
    },
  ];
  