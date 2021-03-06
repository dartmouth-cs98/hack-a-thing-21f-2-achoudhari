import { Component } from "inferno";

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '!'];
const operations = [ '+', '-', '*', '/', '%', '^'];

class ExpressionParser extends Component{
  constructor(props) {
    super(props);

    this.state = {
      expression: "",
      answer: null,
      error: null,
    }
  }

  factorial = (n) => {
    var res = 1;
    for (let i = n; i > 0; i -= 1) {
      res *= i;
    }
    return res;
  }

  validateInput = (expression) => {
    if (expression.length < 7) {
      this.setState({ error: 'expression not long enough' });
    };
    if (expression.charAt(0) !== '(' || expression.charAt(expression.length - 1) !== ')') {
      this.setState({ error: `expression ${expression} does not start/end with valid parenthesis`})
      return false;
    }

    var operation;

    if (expression.charAt(1) !== '(' && !numbers.includes(expression.charAt(1))) {
      this.setState({ error: `expression ${expression} does not contain valid first character`})
      return false;
    }

    var numsToOperate = [];

    // find tokens
    var currIdx = 1;
    if (expression.charAt(currIdx) === '(' || (expression.charAt(currIdx) === '!' && expression.charAt(currIdx + 1) === '(')) {
      var factorial = false;
      if (expression.charAt(currIdx) === '!') {
        factorial = true;
      }
      var balance = 1;
      var tokenIdx = factorial ? currIdx + 2 : currIdx + 1;
      while (balance !== 0 && tokenIdx !== expression.length - 1) {
        if (expression.charAt(tokenIdx) === '(') balance += 1;
        else if (expression.charAt(tokenIdx) === ')') balance -= 1;
        tokenIdx += 1;
      }

      if (balance !== 0) {
        this.setState({ error: `invalid parentheses structure in first inner expression of ${expression}`});
        return false;
      } else {
        const subExpression = expression.substring(factorial ? currIdx + 1 : currIdx, tokenIdx);
        var subRes = this.validateInput(subExpression);
        if (subRes) {
          numsToOperate.push(factorial ? this.factorial(Math.floor(subRes)) : subRes);
        } else {
          return false;
        }
        currIdx = tokenIdx;
      }
    } else {
      var numIdx = currIdx;
      factorial = false;
      if (expression.charAt(numIdx) === '!') {
        factorial = true;
      }
      while (numIdx < expression.length - 1 && numbers.includes(expression.charAt(numIdx))) {
        numIdx += 1;
      }
      const numString = expression.substring(factorial ? currIdx + 1 : currIdx, numIdx);
      var foundDecimal = false;
      for (let i = 0; i < numString.length; i++) {
        if (numString.charAt(i) === '.') {
          if (!foundDecimal) foundDecimal = true;
          else {
            this.setState({ error: `number ${numString} can't have more than one decimal point`})
            return false;
          }
        }
      }
      if (numString.charAt(numString.length - 1) === '.') {
        this.setState({ error: `number ${numString} cannot end in a decimal point`});
        return false;
      }
      numsToOperate.push(factorial ? this.factorial(parseInt(numString)) : parseFloat(numString));
      currIdx = numIdx;
    }

    if (currIdx > expression.length - 1 || expression.charAt(currIdx) !== ' ') {
      this.setState({ error: `no space after first inner expression in ${expression}`})
      return false;
    }
    currIdx += 1;

    if (!operations.includes(expression.charAt(currIdx))) {
      this.setState({ error: `invalid operation ${expression.charAt(currIdx)}`})
      return false;
    } else {
      operation = expression.charAt(currIdx);
    }

    currIdx += 1;

    if (expression.charAt(currIdx) !== ' ') {
      this.setState({ error: `no space after operation in ${expression}`})
      return false;
    }

    currIdx += 1;

    if (expression.charAt(currIdx) === '(' || (expression.charAt(currIdx) === '!' && expression.charAt(currIdx + 1) === '(')) {
      factorial = false;
      if (expression.charAt(currIdx) === '!') {
        factorial = true;
      }
      balance = 1;
      tokenIdx = factorial ? currIdx + 2 : currIdx + 1;
      while (balance !== 0 && tokenIdx !== expression.length - 1) {
        if (expression.charAt(tokenIdx) === '(') balance += 1;
        else if (expression.charAt(tokenIdx) === ')') balance -= 1;
        tokenIdx += 1;
      }

      if (balance !== 0) {
        this.setState({ error: `invalid parentheses structure in second inner expression of ${expression}`});
        return false;
      } else {
        const subExpression = expression.substring(factorial ? currIdx + 1 : currIdx, tokenIdx);
        subRes = this.validateInput(subExpression);
        if (subRes) {
          numsToOperate.push(factorial ? this.factorial(Math.floor(subRes)) : subRes);
        } else {
          return false;
        }
        currIdx = tokenIdx;
      }
    } else {
      numIdx = currIdx;
      factorial = false;
      if (expression.charAt(numIdx) === '!') {
        factorial = true;
      }
      while (numIdx < expression.length - 1 && numbers.includes(expression.charAt(numIdx))) {
        numIdx += 1;
      }
      const numString = expression.substring(factorial ? currIdx + 1 : currIdx, numIdx);

      foundDecimal = false;
      for (let i = 0; i < numString.length; i++) {
        if (numString.charAt(i) === '.') {
          if (!foundDecimal) foundDecimal = true;
          else {
            this.setState({ error: `number ${numString} can't have more than one decimal point`});
            return false;
          }
        }
      }
      if (numString.charAt(numString.length - 1) === '.') {
        this.setState({ error: `number ${numString} cannot end in a decimal point`});
        return false;
      }
      numsToOperate.push(factorial ? this.factorial(parseInt(numString)) : parseFloat(numString));
      currIdx = numIdx;
    }

    if (expression.charAt(currIdx) !== ')') {
      this.setState({ error: `last character in expression ${expression} is not ')'`})
      return false;
    }

    if (currIdx !== expression.length - 1) {
      this.setState({ error: `${expression} has extra characters at the end`});
      return false;
    }

    if (operation === '+') {
      return numsToOperate[0] + numsToOperate[1];
    } else if (operation === '-') {
      return numsToOperate[0] - numsToOperate[1];
    } else if (operation === '*') {
      return numsToOperate[0] * numsToOperate[1];
    } else if (operation === '/') {
      return numsToOperate[0] / numsToOperate[1];
    } else if (operation === '%') {
      return numsToOperate[0] % numsToOperate[1];
    } else if (operation === '^') {
      return Math.pow(numsToOperate[0], numsToOperate[1])
    }
  }

  render = () => {
    return (
      <div style={{display: "flex", "flex-direction": "column"}}>
        <div>Input an expression according to these rules and see the result</div>
        <ul>
          <li>Expression starts and ends with opening and closing parentheses</li>
          <li>There is a space between the two expressions and the operator</li>
          <li>The operator is either +, -, *, /, ^, or %</li>
          <li>There is only one operator per expression</li>
          <li>Factorials must come before the expression i.e. !(8+5)</li>
          <li>You can include nested expressions, which must follow the same rules listed</li>
        </ul>
        <div>Valid examples</div>
        <ul>
          <li>(8 + 5)</li>
          <li>((8 + 5) * 3)</li>
          <li>((7.23 / 2.56) * (5 - 2.46))</li>
          <li>(!(2 + 3) % (5 + !3))</li>
        </ul>
        <div>Invalid examples will trigger errors (which we display to help you fix)</div>
        <ul>
          <li>5 + 7 --{">"} does not start or end with parentheses</li>
          <li> (8 + (7 *5)) --{">"} no space between expressions and operators</li>
          <li>(8 + ((2 + 3) --{">"} invalid parentheses structure</li>
          <li>(6.2. + 5) --{">"} invalid decimals</li>
          <li>(8.5 + d) --{">"} invalid character in expression</li>
        </ul>
        <div>
          <input value={this.state.expression} onInput={(e) => { this.setState({expression: e.target.value})}}></input>
          <button onClick={() => {
            this.setState({answer: null, error: null})
            const res = this.validateInput(this.state.expression);
            if (res !== false) {
              this.setState({ answer: res });
            }
          }}>Calculate!</button>
        </div>
        {!!this.state.answer && <div>{this.state.answer}</div>}
        {!!this.state.error && <div style={{color: "red"}}>{this.state.error}</div>}
      </div>
    );
  }
}

export default ExpressionParser;