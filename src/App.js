import React, { Component } from 'react';
import './App.css';
import Board from './Board';
import SelectSymbol from './SelectSymbol';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      computer: null
    };
  }
  
  render() {
    return this.state.user?
      <Board user = {this.state.user}  computer = {this.state.computer}/>:
      <SelectSymbol selectPlayer={this.selectPlayer.bind(this)}/>;
  }

  selectPlayer(symbolsSelected) {
    this.setState({user:symbolsSelected.user,computer:symbolsSelected.computer});
  }
}

export default App;
