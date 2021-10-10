import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Explorer from './pages/Explorer';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Login} />
        <Route exact path="/Register" component={Register} />
        <Route exact path="/Home" component={Home} /> 
        <Route exact path="/Explorer" component={Explorer} />
      </BrowserRouter>
    </div>
  );
}

export default App;
