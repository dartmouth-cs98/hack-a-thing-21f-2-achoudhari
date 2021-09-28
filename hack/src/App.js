import { Component } from 'inferno';
import { BrowserRouter, Route, Link } from 'inferno-router';
import Calculator from './Calculator.js';
import './App.css';

const Home = () => {
  return (
    <div>
      This is our calculator and expression parser that we built in Inferno.js
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Link to="/">Home</Link>
          <Link to="/basic_calculator">Basic Calculator</Link>
          <Link to="/expression_parser">Expression Parser</Link>
        </div>
        <hr/>
        <Route exact path="/" component={Home} />
        <Route path="/basic_calculator" component={Calculator}/>
      </BrowserRouter>
    );
  }
}

export default App;
