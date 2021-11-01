import React, { useState } from "react";

export default function Operation({ operationType, handleOperation }) {
  function onClickOperation(operation) {
    handleOperation(operation);
  }
  return (
    <>
      <button
        className={
          operationType === "C" ||
          operationType === "+/-" ||
          operationType === "%"
            ? "dark-grey"
            : operationType === "="
            ? "operation-button equals-button"
            : "operation-button"
        }
        onClick={() => onClickOperation(operationType)}
      >
        {operationType === "*" ? "x" : operationType}
      </button>
    </>
  );
}
