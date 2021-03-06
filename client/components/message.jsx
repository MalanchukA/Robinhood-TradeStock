/* eslint-disable no-useless-constructor */
import React from 'react';
import { Spring } from 'react-spring/renderprops';
import Wrapper from './styles/Messages/wrapper';
import MainWrapper from './styles/mainWrapper/wrapper';
import Span from './styles/Span/span';

class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      estimate, bp, ticker, orderToggle,
      depositHandler, userShares, inputShares,
      stopPrice, type, tab, background,
    } = this.props;

    if ((bp >= estimate && type === 'Buy') || (userShares >= inputShares && type === 'Sell')) {
      if (tab === 'Market Order') {
        return (
          <>
            <Spring
              from={{ height: 0 }}
              to={{ height: 'auto' }}>
              {(props) =>
                <Wrapper style={props}>
                  You are placing a good for day market order to {type === 'Buy' ? 'buy' : 'sell'} {inputShares} share(s)
                  of {ticker}. Your order will be placed after
                  the market opens and executed at the best available price.
                </Wrapper>}
            </Spring>
            <MainWrapper.Button>Buy</MainWrapper.Button>
            <MainWrapper.InvertedButton onClick={orderToggle} background={background}>
              Edit
            </MainWrapper.InvertedButton>
          </>
        );
      } else if (tab === 'Limit Order') {
        return (
          <>
            <Spring
              from={{ height: 0 }}
              to={{ height: 'auto' }}>
              {(props) =>
                <Wrapper style={props}>
                  You are placing a good for day limit order to {type === 'Buy' ? 'buy' : 'sell'} {inputShares} share(s)
                  of {ticker}. Your pending order, if executed, will execute at
                  ${stopPrice} per share or better.
                </Wrapper>}
            </Spring>
            <MainWrapper.Button>Buy</MainWrapper.Button>
            <MainWrapper.InvertedButton onClick={orderToggle} background={background}>
              Edit
            </MainWrapper.InvertedButton>
          </>
        );
      } else if (tab === 'Stop Loss Order' || tab === 'Stop Limit Order') {
        return (
          <>
            <Spring
              from={{ height: 0 }}
              to={{ height: 'auto' }}>
              {(props) =>
                <Wrapper style={props}>
                  You are placing a good for day {tab === 'Stop Loss Order' ? 'stop loss order ' : 'stop limit order '}
                  to {type === 'Buy' ? 'buy' : 'sell'} {inputShares} share(s)
                  of {ticker}. When the price of {ticker} reaches ${stopPrice} your order will be
                  converted to a market order and executed at the best available price.
                </Wrapper>}
            </Spring>
            <MainWrapper.Button>Buy</MainWrapper.Button>
            <MainWrapper.InvertedButton onClick={orderToggle} background={background}>
              Edit
            </MainWrapper.InvertedButton>
          </>
        );
      } else if (tab === 'Trailing Stop Order') {
        return (
          <>
            <Spring
              from={{ height: 0 }}
              to={{ height: 'auto' }}>
              {(props) =>
                <Wrapper style={props}>
                  You are placing a good for day trailing stop order to {type === 'Buy' ? 'buy' : 'sell'} {inputShares} share(s)
                  of {ticker}. Your order will execute at the best available price if {ticker}
                  rises from its trail amount.
                </Wrapper>}
            </Spring>
            <MainWrapper.Button>Buy</MainWrapper.Button>
            <MainWrapper.InvertedButton onClick={orderToggle} background={background}>
              Edit
            </MainWrapper.InvertedButton>
          </>
        );
      }
    } else if ((bp < estimate && type === 'Buy') || (userShares < inputShares && type === 'Sell')) {
      if (type === 'Buy') {
        return (
          <>
          <Spring
              from={{ height: 0 }}
              to={{ height: 'auto' }}>
              {(props) =>
                <Wrapper style={props}>
                <MainWrapper.Image src={background === 'white' ?
                  './exclamation-button.png' :
                  './exclamation.png'}/> Not enough buying power to purchase
                <Span.Color> shares of {ticker}.</Span.Color><br></br>
                <br></br>Please deposit funds to purchase at market price
                (5% collar included).<br></br><br></br>Market orders on
                Robinhood are placed as limit orders up to 5% above the market price
                in order to protect customers from spending more than they have in
                their Robinhood account. If you want to use your full buying power
                of ${bp} you can place a limit order instead.
              </Wrapper>}
          </Spring>
            <MainWrapper.Button onClick={() =>
              depositHandler((estimate - bp).toFixed(2))}>
              Deposit ${(estimate - bp).toFixed(2)}
            </MainWrapper.Button>
            <MainWrapper.InvertedButton onClick={orderToggle} background={background}>
              Back
            </MainWrapper.InvertedButton>
          </>
        );
      } else if (type === 'Sell') {
        return (
          <>
          <Spring
              from={{ height: 0 }}
              to={{ height: 'auto' }}>
              {(props) =>
                <Wrapper style={props}>
                <MainWrapper.Image src={background === 'white' ?
                  './exclamation-button.png' :
                  './exclamation.png'}/> <Span.Bold>Not Enough Shares</Span.Bold>
                <br></br>You can only sell up to {userShares} of {ticker}.
              </Wrapper>}
          </Spring>
            <MainWrapper.Button onClick={orderToggle}>
              Back
            </MainWrapper.Button>
          </>
        );
      }
    } else {
      return null;
    }
  }
}

export default Message;
