import './App.css';
import MainPage from "./pages/MainPage";
import {Route} from 'react-router-dom';
import SearchPage from "./pages/SearchPage";
import LoadingFeedback from "./components/LoadingFeedback";
import {useState} from "react";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const shelves = useState(["currentlyReading", "wantToRead", "read"])[0];

  return (
    <div className="App">
      <LoadingFeedback isLoading={isLoading}/>
      <Route exact path='/' render={() => (
        <MainPage setLoading={setIsLoading} shelves={shelves}/>
      )}/>
      <Route exact path='/search' render={() => (
        <SearchPage setLoading={setIsLoading} shelves={shelves}/>
      )}/>
    </div>
  );
}

export default App;
