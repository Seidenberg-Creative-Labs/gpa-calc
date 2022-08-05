import reactLogo from "./assets/images/logo.svg";
import "react-dropdown/style.css";
import WebHeader from "./components/WebHeader";
import "./App.css";
import TableCourseInput from "./components/tables/TableCourseInput";
import Drop from "./components/Drop";

const App = () => {
    return (
        <div className="App">
            <header className="header">
                <WebHeader />
            </header>
            <body className="body">
                <Drop />
                <TableCourseInput />
            </body>
        </div>
    );
};

export default App;
