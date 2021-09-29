import { Component } from "inferno";
import { exp } from "mathjs";

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const operations = [ '+', '-', '*', '/'];

class ExpressionParser extends Component{
  constructor(props) {
    super(props);

    this.state = {
      expression: "",
      answer: null,
      error: null,
    }
  }

  validateInput = (expression) => {
    if (expression.length < 7) {
      this.setState({ error: 'expression not long enough' });
    };
    if (expression.charAt(0) !== '(' && expression.charAt(expression.length - 1) !== ')') {
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
    if (expression.charAt(currIdx) === '(') {
      var balance = 1;
      var tokenIdx = currIdx + 1;
      while (balance !== 0 && tokenIdx !== expression.length - 1) {
        if (expression.charAt(tokenIdx) === '(') balance += 1;
        else if (expression.charAt(tokenIdx) === ')') balance -= 1;
        tokenIdx += 1;
      }

      if (balance !== 0) {
        this.setState({ error: `invalid parentheses structure in first inner expression of ${expression}`});
        return false;
      } else {
        const subExpression = expression.substring(currIdx, tokenIdx);
        var subRes = this.validateInput(subExpression);

        if (subRes) {
          numsToOperate.push(subRes);
        } else {
          return false;
        }
        currIdx = tokenIdx;
      }
    } else {
      var numIdx = currIdx;
      while (numIdx < expression.length - 1 && numbers.includes(expression.charAt(numIdx))) {
        numIdx += 1;
      }
      const numString = expression.substring(currIdx, numIdx);
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
      numsToOperate.push(parseFloat(numString));
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

    if (expression.charAt(currIdx) === '(') {
      balance = 1;
      tokenIdx = currIdx + 1;
      while (balance !== 0 && tokenIdx !== expression.length - 1) {
        if (expression.charAt(tokenIdx) === '(') balance += 1;
        else if (expression.charAt(tokenIdx) === ')') balance -= 1;
        tokenIdx += 1;
      }

      if (balance !== 0) {
        this.setState({ error: `invalid parentheses structure in second inner expression of ${expression}`});
        return false;
      } else {
        const subExpression = expression.substring(currIdx, tokenIdx);
        subRes = this.validateInput(subExpression);
        if (subRes) {
          numsToOperate.push(subRes);
        } else {
          return false;
        }
        currIdx = tokenIdx;
      }
    } else {
      numIdx = currIdx;
      while (numIdx < expression.length - 1 && numbers.includes(expression.charAt(numIdx))) {
        numIdx += 1;
      }

      const numString = expression.substring(currIdx, numIdx);
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
      numsToOperate.push(parseFloat(numString));
      currIdx = numIdx;
    }

    if (expression.charAt(currIdx) !== ')' && currIdx !== expression.length - 1) {
      this.setState({ error: `last character in expression ${expression} is not ')'`})
      return false;
    }

    if (operation === '+') {
      return numsToOperate[0] + numsToOperate[1];
    } else if (operation === '-') {
      return numsToOperate[0] - numsToOperate[1];
    } else if (operation === '*') {
      return numsToOperate[0] * numsToOperate[1];
    } else {
      return numsToOperate[0] / numsToOperate[1];
    }
  }

  render = () => {
    return (
      <div>
        <input value={this.state.expression} onInput={(e) => { this.setState({expression: e.target.value})}}></input>
        <button onClick={() => {
          this.setState({answer: null, error: null})
          const res = this.validateInput(this.state.expression);
          if (res !== false) {
            this.setState({ answer: res });
          }
        }}>Calculate!</button>
        {!!this.state.answer && <div>{this.state.answer}</div>}
        {!!this.state.error && <div style={{color: "red"}}>{this.state.error}</div>}
      </div>
    );
  }
}

export default ExpressionParser;