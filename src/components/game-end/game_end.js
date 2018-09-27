import React, { Component } from 'react';
import './css/game_end.css';

class GameEnd extends Component {
  render() {
    return (
      <div className="game-end" id = "game-end">
        <h1>{this.props.message}!</h1>
        <button onClick = {this.replay.bind(this)}> Play again?</button>
      </div>
    );
  }

  replay() {
    this.props.onReplay();
  }
}

export default GameEnd;