import React, { useState } from "react";

export default function Digit({ number, displayNumber }) {
  function pressNumber(number) {
    displayNumber(number);
  }
  return (
    <>
      <button
        className={
          number === 0 ? "number-button number-button-0" : "number-button"
        }
        onClick={() => pressNumber(number)}
      >
        {number}
      </button>
    </>
  );
}
