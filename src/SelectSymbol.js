import "./css/select_symbol.css";
import React, { Component } from 'react';

class SelectSymbol extends Component {
  render() {
    return (
      <div className= "select-player">
        <p className ="message">Choose your symbol:</p>
        <div className = "symbols">
          <div className = "symbol" onClick={()=>this.handleClick('X')}>x</div>
          <div className = "symbol" onClick={()=>this.handleClick('O')}>o</div>
        </div>
      </div>
    )
  }

  handleClick(symbol) {
    const symbols = {X:'O',O:'X'};
    const selectedSymbols = {user:symbol,computer:symbols[symbol]};
    this.props.selectPlayer(selectedSymbols);
  }
}

export default SelectSymbol;