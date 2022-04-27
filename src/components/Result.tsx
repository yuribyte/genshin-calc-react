import { isNil } from 'lodash';
import React from 'react';
import { ResinContext } from '../context/ResinContext';

const Result = () => {
  const { resultResinDate, resultResinHours, resultResinMinutes, estimatedResin } =
    React.useContext(ResinContext);

  function checkValue(params: any) {
    if (isNil(params) || params == 'null' || params == '' || isNaN(params)) {
      return null;
    }
  }

  return (
    <div className="app-resin-result">
      <h1 style={{ color: '#19f' }}>Results</h1>

      <div>
        <strong>Minutes:</strong> {resultResinMinutes}
      </div>
      <div>
        <strong>Hours:</strong> {resultResinHours}
      </div>
      <div>
        <strong>Date:</strong> {resultResinDate}
      </div>
      <div>
        <strong>Your Resin:</strong> {estimatedResin}
      </div>
    </div>
  );
};

export default Result;
