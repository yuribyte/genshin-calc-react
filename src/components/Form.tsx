import { useContext } from 'react';
import { ResinContext } from '../context/ResinContext';

const Form = () => {
  const { setCurrentResin, setExpectedResin } = useContext(ResinContext);

  const handleCurrentResinForm = async (event: {
    target: HTMLInputElement | EventTarget;
  }) => {
    const value = (event.target as HTMLTextAreaElement).value;
    setCurrentResin(Number(value));
  };

  const handleExpectedResinForm = async (event: {
    target: HTMLInputElement | EventTarget;
  }) => {
    const value = (event.target as HTMLTextAreaElement).value;
    setExpectedResin(Number(value));
  };

  return (
    <div className="app-resin-form">
      <input
        type="text"
        className="app-resin-form-current"
        placeholder="Type your current resin"
        onChange={handleCurrentResinForm}
      />
      <input
        type="text"
        className="app-resin-form-expected"
        placeholder="What is the expected resin?"
        onChange={handleExpectedResinForm}
      />
    </div>
  );
};

export default Form;
