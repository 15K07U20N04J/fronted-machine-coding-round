import { useEffect, useState } from 'react'
import './App.css'
import CalculatorInput from './components/CalculatorInput'

function App() {
  const [loanAmount, setLoanAmount] = useState(2500000)
  const [tenure, setTenure] = useState(10)
  const [interestRate, setInterestRate] = useState(8)
  const [monthEmi, setMonthEmi] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [interestAmount, setInterestAmount] = useState(0)

  function handleLoanAmount(e) {
    setLoanAmount(e.target.value);
  }

  function handleTenure(e) {
    setTenure(e.target.value)
  }

  function handleInterestRate(e) {
    setInterestRate(e.target.value)
  }

  useEffect(() => {
    const monthlyRate = interestRate / (12 * 100);
    const months = tenure * 12;

    const monthlyEmi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    setMonthEmi(monthlyEmi);

    const total_amount = monthlyEmi * months;
    setTotalAmount(total_amount);

    const interest_amount = total_amount - loanAmount;
    setInterestAmount(interest_amount);

  }, [loanAmount, tenure, interestRate]);

  function formatAmount(amount) {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="App">
      <div className="emi-calculator">
        <h2 className="title">Home Loan EMI Calculator</h2>
        <div className=" container">
          <div className="slider-container ">
            <CalculatorInput
              label="Loan Amount"
              value={loanAmount}
              onChange={handleLoanAmount}
              minLabel="₹1 Lac"
              maxLabel="₹10 Cr"
              minValue="100000"
              maxValue="100000000"
              iconPrefix="₹"
              size="8"
              step="1"
              formatAmount={formatAmount}
              isAmount={true}
            />

            <CalculatorInput
              label="Tenure (Years)"
              value={tenure}
              onChange={handleTenure}
              minLabel="1"
              maxLabel="30"
              minValue="1"
              maxValue="30"
              size="1"
              step="1"
              formatAmount={formatAmount}
            />

            <CalculatorInput
              label="Interest Rate (% P.A.)"
              value={interestRate}
              onChange={handleInterestRate}
              minLabel="0.5"
              maxLabel="15"
              minValue="0.5"
              iconSuffix="%"
              maxValue="15"
              size="1"
              step="0.01"
              formatAmount={formatAmount}
            />
          </div>
          <div className="result-container ">
            <div className="mb-5">
              <span className="font-semibold text-gray-600 text-[#889FB8]">
                Monthly Home Loan EMI:
              </span>
              <div className="text-2xl font-bold text-[#014C8F]">
                {formatAmount(monthEmi)}
              </div>
            </div>

            <div className="mb-5">
              <span className="font-semibold text-gray-600 text-[#889FB8]">
                Principal Amount:
              </span>
              <div className="text-2xl font-bold text-black">
                {formatAmount(loanAmount)}
              </div>
            </div>

            <div className="mb-5">
              <span className="font-semibold text-gray-600 text-[#889FB8]">
                Interest Amount:
              </span>
              <div className="text-2xl font-bold text-black">
                {formatAmount(interestAmount)}
              </div>
            </div>

            <div className="mb-5">
              <span className="font-semibold text-gray-600 text-[#889FB8]">
                Total Amount Payable:
              </span>
              <div className="text-2xl font-bold text-black">
                {formatAmount(totalAmount)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

