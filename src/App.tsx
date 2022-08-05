import reactLogo from './assets/images/logo.svg';
import './App.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Drop from './components/Drop';

const App = () => {

  return (
    <div className="App">
      <header className="header">
        <p>GPA Calculator</p>
      </header>
      <body className="App-body">
      <Drop/>
      </body>
    </div>
  );

};

export default App;
