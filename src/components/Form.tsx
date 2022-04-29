import { useContext } from 'react';
import NumberFormat, { NumberFormatValues } from 'react-number-format';
import { ResinContext } from '../context/ResinContext';

const Form = () => {
  const { setCurrentResin, setExpectedResin } = useContext(ResinContext);

  const handleResinForm = (event: any, type: string) => {
    const value = event.target.value;

    if (type === 'current') {
      setCurrentResin(Number(value));
    }
    if (type === 'expected') {
      setExpectedResin(Number(value));
    }
  };

  const maxResinAllowed = (inputValue: NumberFormatValues) => {
    const { value } = inputValue;

    return Number(value) <= 160;
  };

  return (
    <div className="app-resin-form">
      <NumberFormat
        isAllowed={maxResinAllowed}
        className="app-resin-form-current"
        placeholder="Type your current resin"
        onChange={(event: any) => handleResinForm(event, 'current')}
      />

      <NumberFormat
        isAllowed={maxResinAllowed}
        className="app-resin-form-expected"
        placeholder="What is the expected resin?"
        onChange={(event: any) => handleResinForm(event, 'expected')}
      />
    </div>
  );
};

export default Form;
