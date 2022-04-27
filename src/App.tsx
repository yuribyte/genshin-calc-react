import Calculate from './components/Calculate';
import Form from './components/Form';
import Result from './components/Result';
import { ResinStorage } from './context/ResinContext';

function App() {
  return (
    <div className="parent">
      <div className="child">
        <ResinStorage>
          <Result />
          <Form />
          <Calculate />
        </ResinStorage>
      </div>
    </div>
  );
}

export default App;
