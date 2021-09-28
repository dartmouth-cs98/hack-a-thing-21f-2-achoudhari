import { version, Component } from 'inferno';
import { BrowserRouter, Route, Link } from 'inferno-router';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/basic_calculator">Basic Calculator</Link></li>
            <li><Link to="/expression_parser">Expression Parser</Link></li>
          </ul>
        </div>
        <hr/>
      </BrowserRouter>
    );
  }
}

export default App;
