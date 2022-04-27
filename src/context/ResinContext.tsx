import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { isNil } from 'lodash';
import React, { useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const ResinContext = React.createContext<any>(null);

export const ResinStorage = ({ children }: any) => {
  const [resinMinutes, setResinMinutes] = useState(8);
  const [currentResin, setCurrentResin] = useState();
  const [expectedResin, setExpectedResin] = useState();
  const [estimatedResin, setEstimatedResin] = useLocalStorage('estimatedResin', null);
  const [estimatedCharge, setEstimatedCharge] = useLocalStorage(
    'estimatedCharge',
    null
  );
  const [fromTime, setFromTime] = useLocalStorage('fromTime', null);

  const [resultResinMinutes, setResultResinMinutes] = useLocalStorage(
    'resultResinMinutes',
    null
  );
  const [resultResinHours, setResultResinHours] = useLocalStorage(
    'resultResinHours',
    null
  );
  const [resultResinDate, setResultResinDate] = useLocalStorage(
    'resultResinDate',
    null
  );

  useEffect(() => {
    const now = dayjs();
    const formatFromTime = now.format('HH:mm');

    if (isNil(fromTime) || fromTime === 'null') {
      setFromTime(formatFromTime);
    }

    setResinMinutes(8);
  }, []);

  return (
    <ResinContext.Provider
      value={{
        currentResin,
        expectedResin,
        estimatedResin,
        setCurrentResin,
        setExpectedResin,
        setEstimatedResin,
        estimatedCharge,
        setEstimatedCharge,
        fromTime,
        setFromTime,
        resultResinMinutes,
        setResultResinMinutes,
        resultResinHours,
        setResultResinHours,
        resultResinDate,
        setResultResinDate,
        resinMinutes,
        setResinMinutes,
      }}
    >
      {children}
    </ResinContext.Provider>
  );
};
