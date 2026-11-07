import { useState } from "react";

const CalculatorInput = ({ label, value, onChange, minLabel, maxLabel, minValue, maxValue, iconPrefix, iconSuffix, size, step, formatAmount, isAmount = false }) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <div className="calculator-inp-wrap">
            <div className="calculator-inp mb-5 mt-4">
                <label>{label}</label>
                <div className="num-inp-wrap">
                    {iconPrefix && <span className="mr-3">{iconPrefix}</span>}
                    <input
                        type="text"
                        value={isFocused || !isAmount ? value : formatAmount(value)}
                        onChange={onChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        size={size}
                    />
                    {iconSuffix && <span className="ml-3">{iconSuffix}</span>}
                </div>
            </div>
            <input type="range" className="range-input" id="loan-amt-range" onChange={onChange} value={value} min={minValue} max={maxValue} step={step} />
            <div className="min-max-wrap">
                <span className="text-[#94969B]">{minLabel}</span>
                <span className="text-[#94969B]">{maxLabel}</span>
            </div>
        </div>
    )
}

export default CalculatorInput
