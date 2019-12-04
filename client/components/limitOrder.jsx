import React from 'react';
import InputWrapper from './styles/inputWrapper/inputWrapper';
import Span from './styles/Span/span';

class LimitOrder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      limitPrice: 0,
      shares: 0,
      expires: 'Good for Day',
    };

    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(e) {
    console.log(e.target.name);
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <>
        <InputWrapper>
          <InputWrapper.Label>Limit Price</InputWrapper.Label>
          <InputWrapper.Dollar type="number" placeholder="$0.00" name="limitPrice"
          step=".01" onChange={this.changeHandler}></InputWrapper.Dollar>
        </InputWrapper>
        <form>
          <select>
            <option value="Good for Day">Good for Day</option>
            <option value="Good till Canceled">Good till Canceled</option>
          </select>
        </form>
      </>
    );
  }
}

export default LimitOrder;
