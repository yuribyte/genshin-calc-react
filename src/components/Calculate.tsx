import * as dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { isNil } from 'lodash';
import { useContext, useEffect, useState } from 'react';
import { ResinContext } from '../context/ResinContext';

const Calculate = () => {
  const {
    currentResin,
    expectedResin,
    setEstimatedResin,
    setEstimatedCharge,
    resinMinutes,
    estimatedResin,
  } = useContext(ResinContext);

  const {
    fromTime,
    setFromTime,
    setResultResinMinutes,
    setResultResinHours,
    resultResinDate,
    setResultResinDate,
  } = useContext(ResinContext);

  const [isValid, setIsValid] = useState(false);

  function setupCalculate() {
    const today = new Date();
    const equivalentMinutes =
      (Number(currentResin) - Number(expectedResin)) * resinMinutes * -1;
    const equivalentHours = (equivalentMinutes / 60).toFixed(2);

    const estimatedCharge = dayjs(today).add(equivalentMinutes, 'm').toDate();
    const equivalentDate = dayjs(estimatedCharge)
      .locale('pt-br')
      .format('dddd, HH:mm');

    setResultResinMinutes(equivalentMinutes);
    setResultResinHours(equivalentHours);
    setResultResinDate(equivalentDate);
    setEstimatedCharge(dayjs(estimatedCharge).locale('pt-br').format('HH:mm'));
  }

  useEffect(() => {
    if (currentResin < 0 || expectedResin < 0) {
      setIsValid(false);
    } else if (currentResin > expectedResin) {
      setIsValid(false);
    } else if (currentResin == expectedResin) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [currentResin, expectedResin]);

  useEffect(() => {
    if (!isNil(resultResinDate)) {
      setupEstimateResin();
    }
  }, []);

  function handleCalculate() {
    if (isValid) {
      setupCalculate();
      estimateResin();
    }
  }

  const estimateResin = () => {
    setFromTime(dayjs().format('HH:mm'));
    if (!isNil(currentResin)) {
      setupEstimateResin(currentResin);
    }
  };

  const setupEstimateResin = (resin?: any) => {
    const calculatedTime = getIntervalF(fromTime, dayjs().format('HH:mm'));
    const values = calculatedTime.split(':');
    let calcResin = Math.trunc(
      (parseInt(values[0]) * 60 + parseInt(values[1])) / resinMinutes
    );

    if (!isNaN(resin)) {
      setEstimatedResin(() => (resin >= 160 ? 160 : resin));
    } else if (estimatedResin > 0 && calcResin > 0) {
      setEstimatedResin(() => (calcResin >= 160 ? 160 : calcResin));
    }
  };

  const formatIntervalF = (minutes: number) => {
    let interval = [Math.floor(minutes / 60).toString(), (minutes % 60).toString()];
    return interval[0].padStart(2, '0') + ':' + interval[1].padStart(2, '0');
  };

  const getIntervalF = (from: any, to: any) => {
    const [hoursA, minutesA] = from?.split(':');
    const [hoursB, minutesB] = to?.split(':');
    const timeA = dayjs().hour(hoursA).minute(minutesA);
    const timeB = dayjs().hour(hoursB).minute(minutesB);
    const interval = timeB.diff(timeA, 'minute');
    if (interval < 0) {
      return formatIntervalF(24 * 60 + timeB.diff(timeA, 'minute'));
    }
    return formatIntervalF(interval);
  };

  return (
    <div className="app-resin-calculate">
      <button disabled={!isValid} onClick={handleCalculate}>
        Calculate
      </button>
    </div>
  );
};

export default Calculate;
