import React, { Component } from 'react';
import './App.css';
import Board from '../board/board';
import SelectSymbol from '../select-symbol/select-symbol';
import GameEnd from '../game-end/game-end';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      computer: null,
      state:"setup",
      status: ""
    };
  }
  
  render() {
    const components = {
      "start" : <Board user = {this.state.user}  computer = {this.state.computer}
        onGameOver={this.onGameOver.bind(this)} />,

      "setup": <SelectSymbol selectPlayer={this.selectPlayer.bind(this)}/>,

      "end" : <GameEnd onReplay = {this.onReplay.bind(this)} message = {this.state.status}/>
    }
    return components[this.state.state];
  }

  selectPlayer(symbolsSelected) {
    this.setState({ 
      user:symbolsSelected.user,
      computer:symbolsSelected.computer,
      state:"start"
    });
  }

  onGameOver(status) {
   this.setState({state:"end",status:status});
  }

  onReplay() {
    this.setState({state:"setup"})
  }
}

export default App;
