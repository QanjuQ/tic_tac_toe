import "./css/select_symbol.css";
import React, { Component } from 'react';

class SelectSymbol extends Component {
  render() {
    return (
      <div className= "select-player">
        <p className ="message">Choose your symbol:</p>
        <div className = "symbols">
          <div className = "symbol" onClick={()=>this.handleClick('x')}>x</div>
          <div className = "symbol" onClick={()=>this.handleClick('o')}>o</div>
        </div>
      </div>
    )
  }

  handleClick(symbol) {
    const symbols = {x:'o',o:'x'};
    const selectedSymbols = {user:symbol,computer:symbols[symbols]};
    this.props.selectPlayer(selectedSymbols);
  }
}

export default SelectSymbol;