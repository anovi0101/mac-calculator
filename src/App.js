import React, { useState } from "react";
import Display from "./components/Display/Display.js";
import Digit from "./components/Keypad/Digit.js";
import Operation from "./components/Keypad/Operation.js";
import Decimal from "./components/Keypad/Decimal.js";
import TitleBar from "./components/Titlebar/TitleBar";
import "../src/style/styles.css";


let equals = false;
const currentOperationElements = [];
export default function App() {
  const [showNumber, setShowNumber] = useState([]);

  function displayNumber(number) {
    if (equals) {
      setShowNumber([number]);
      equals = false;
    } else {
      setShowNumber([...showNumber, number]);
    }
  }

  function clearDisplay() {
    setShowNumber([]);
    currentOperationElements.splice(0, currentOperationElements.length);
  }

  function handleDecimal(decimal) {
    if (!showNumber.some((e) => e === ".")) {
      setShowNumber([...showNumber, decimal]);
    }
  }

  function handleOperation(operation) {
    if (operation === "C") {
      return clearDisplay();
    }
    if (operation === "=" && currentOperationElements.length < 2) {
      return;
    }

    if (operation === "+/-") {
      if (showNumber[0] > 0) {
        setShowNumber(["-", ...showNumber]);
      } else {
        const aux = showNumber;
        aux.shift();
        setShowNumber([...aux]);
      }
      return;
    }

    if (showNumber.length > 0) {
      currentOperationElements.push(showNumber.join(""), operation);
      setShowNumber([]);
      if (operation === "=" && currentOperationElements.length > 2) {
        manageOperations("*");
        manageOperations("÷");
        manageOperations("+");
        manageOperations("-");
        manageOperations("%");
        currentOperationElements.splice(0, currentOperationElements.length);
        equals = true;
      }
    }
  }

  function manageOperations(operation) {
    let afterOperation = currentOperationElements;
    let numberOfOperations = currentOperationElements.filter(
      (x) => x === operation
    ).length;
    if (numberOfOperations > 0) {
      for (let i = 0; i < numberOfOperations; i++) {
        let i = currentOperationElements.findIndex((x) => x === operation);
        let result = computeOperation(
          currentOperationElements[i - 1],
          currentOperationElements[i],
          currentOperationElements[i + 1]
        );
        afterOperation.splice(i - 1, 3, result);
      }
    }
    setShowNumber([afterOperation[0]]);
  }

  function computeOperation(firstNumber, operation, secondNumber) {
    if (operation === "*") {
      return parseFloat(firstNumber) * parseFloat(secondNumber);
    } else if (operation === "÷") {
      return parseFloat(firstNumber) / parseFloat(secondNumber);
    } else if (operation === "+") {
      return parseFloat(firstNumber) + parseFloat(secondNumber);
    } else if (operation === "-") {
      return parseFloat(firstNumber) - parseFloat(secondNumber);
    }
  }

  return (
    <div className="container">
      <TitleBar />
      <div className="top">
        <Display showNumber={showNumber} />
      </div>

      <div className="bottom">
        <div className="row">
          <Operation operationType={"C"} handleOperation={handleOperation} />
          <Operation operationType={"+/-"} handleOperation={handleOperation} />
          <Operation operationType={"%"} handleOperation={handleOperation} />
          <Operation operationType={"÷"} handleOperation={handleOperation} />
        </div>

        <div className="row">
          <Digit number={7} displayNumber={displayNumber} />
          <Digit number={8} displayNumber={displayNumber} />
          <Digit number={9} displayNumber={displayNumber} />
          <Operation operationType={"*"} handleOperation={handleOperation} />
        </div>

        <div className="row">
          <Digit number={4} displayNumber={displayNumber} />
          <Digit number={5} displayNumber={displayNumber} />
          <Digit number={6} displayNumber={displayNumber} />
          <Operation operationType={"-"} handleOperation={handleOperation} />
        </div>

        <div className="row">
          <Digit number={1} displayNumber={displayNumber} />
          <Digit number={2} displayNumber={displayNumber} />
          <Digit number={3} displayNumber={displayNumber} />
          <Operation operationType={"+"} handleOperation={handleOperation} />
        </div>

        <div className="last-row">
          <Digit number={0} displayNumber={displayNumber} />
          <Decimal handleDecimal={handleDecimal} />
          <Operation operationType={"="} handleOperation={handleOperation} />
        </div>
      </div>
    </div>
  );
}
