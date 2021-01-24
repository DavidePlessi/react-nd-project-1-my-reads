import './App.css';
import MainPage from "./pages/MainPage";
import {Route} from 'react-router-dom';
import SearchPage from "./pages/SearchPage";
import LoadingFeedback from "./components/LoadingFeedback";
import {useState} from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="App">
      <LoadingFeedback isLoading={isLoading}/>
      <Route exact path='/' render={() => (<MainPage setLoading={setIsLoading}/>)}/>
      <Route exact path='/search' render={() => (<SearchPage setLoading={setIsLoading}/>)}/>
    </div>
  );
}

export default App;
