import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';
import Register from './containers/Register';


function App() {
  const rememberUser = 'true';
  localStorage.setItem('rememberUser', rememberUser);
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Login} />
        <Route exact path="/Register" component={Register} />
        <Route exact path="/Home" component={Home} /> 
      </BrowserRouter>
    </div>
  );
}

export default App;
