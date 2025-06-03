"use client";

import type React from "react";
import { useState, useCallback } from "react";

export const Calculator: React.FC = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = useCallback(
    (num: string) => {
      if (waitingForOperand) {
        setDisplay(num);
        setWaitingForOperand(false);
      } else {
        setDisplay(display === "0" ? num : display + num);
      }
    },
    [display, waitingForOperand]
  );

  const inputOperation = useCallback(
    (nextOperation: string) => {
      const inputValue = Number.parseFloat(display);

      if (previousValue === null) {
        setPreviousValue(inputValue);
      } else if (operation) {
        const currentValue = previousValue || 0;
        const newValue = calculate(currentValue, inputValue, operation);

        setDisplay(String(newValue));
        setPreviousValue(newValue);
      }

      setWaitingForOperand(true);
      setOperation(nextOperation);
    },
    [display, previousValue, operation]
  );

  const calculate = (
    firstValue: number,
    secondValue: number,
    operation: string
  ): number => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return firstValue / secondValue;
      case "=":
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = useCallback(() => {
    const inputValue = Number.parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  }, [display, previousValue, operation]);

  const clear = useCallback(() => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  }, []);

  return (
    <div className="p-4 bg-gray-50">
      <div className="bg-gray-200 p-3 rounded text-right font-mono text-lg mb-3">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={clear}
          className="col-span-2 p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Clear
        </button>
        <button
          onClick={() => inputOperation("÷")}
          className="p-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
        >
          ÷
        </button>
        <button
          onClick={() => inputOperation("×")}
          className="p-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
        >
          ×
        </button>

        <button
          onClick={() => inputNumber("7")}
          className="p-2 bg-white border rounded hover:bg-gray-50 transition-colors"
        >
          7
        </button>
        <button
          onClick={() => inputNumber("8")}
          className="p-2 bg-white border rounded hover:bg-gray-50 transition-colors"
        >
          8
        </button>
        <button
          onClick={() => inputNumber("9")}
          className="p-2 bg-white border rounded hover:bg-gray-50 transition-colors"
        >
          9
        </button>
        <button
          onClick={() => inputOperation("-")}
          className="p-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
        >
          -
        </button>

        <button
          onClick={() => inputNumber("4")}
          className="p-2 bg-white border rounded hover:bg-gray-50 transition-colors"
        >
          4
        </button>
        <button
          onClick={() => inputNumber("5")}
          className="p-2 bg-white border rounded hover:bg-gray-50 transition-colors"
        >
          5
        </button>
        <button
          onClick={() => inputNumber("6")}
          className="p-2 bg-white border rounded hover:bg-gray-50 transition-colors"
        >
          6
        </button>
        <button
          onClick={() => inputOperation("+")}
          className="p-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
        >
          +
        </button>

        <button
          onClick={() => inputNumber("1")}
          className="p-2 bg-white border rounded hover:bg-gray-50 transition-colors"
        >
          1
        </button>
        <button
          onClick={() => inputNumber("2")}
          className="p-2 bg-white border rounded hover:bg-gray-50 transition-colors"
        >
          2
        </button>
        <button
          onClick={() => inputNumber("3")}
          className="p-2 bg-white border rounded hover:bg-gray-50 transition-colors"
        >
          3
        </button>
        <button
          onClick={performCalculation}
          className="row-span-2 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          =
        </button>

        <button
          onClick={() => inputNumber("0")}
          className="col-span-2 p-2 bg-white border rounded hover:bg-gray-50 transition-colors"
        >
          0
        </button>
        <button
          onClick={() => inputNumber(".")}
          className="p-2 bg-white border rounded hover:bg-gray-50 transition-colors"
        >
          .
        </button>
      </div>
    </div>
  );
};
