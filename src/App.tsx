import reactLogo from "./assets/images/logo.svg";
import "./App.css";
import 'react-dropdown/style.css';
import WebHeader from "./components/WebHeader";
import Drop from "./components/Drop"

const App = () => {

  return (
      <div className="App">
          <WebHeader/>
          <Drop/>
      </div>
    );
};

export default App;
