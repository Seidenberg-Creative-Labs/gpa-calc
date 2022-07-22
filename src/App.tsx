import reactLogo from './assets/images/logo.svg';
import './App.css';
import TableCourseInput from "./components/tables/TableCourseInput";

const App = () => {
  return (
    <div className="App">
      <header className="header">
        <img src={reactLogo} className="logo react" alt="logo" />
        <p>GPA Calculator</p>
      </header>
      <body className="body">
        <TableCourseInput />
      </body>
    </div>
  );
};

export default App;
