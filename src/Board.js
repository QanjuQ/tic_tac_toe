import React, { Component } from 'react';
import './Board.css';

function Square(props){
    return (
        <button 
        className="square" id={props.id} 
        onClick={props.onClick}>
        {props.value}
        </button>
        )
};


class Board extends Component {
    constructor(props){
        super(props)
        this.state = {
            squares : Array(9).fill(null),
            xIsNext : true
        };
    }

    handleClick(index) {
        const squares = this.state.squares.slice();
        squares[index] = this.state.xIsNext? 'X':'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(index) {
        return <Square 
        value={this.state.squares[index]}
        onClick= {()=> this.handleClick(index)} id={index}></Square>;
    }

    render(){
        const status = 'Player: X';
        return (
            <div className = "board">
            <div className="status">{status}</div>
                <div className= "row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className= "row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className= "row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}

class Game extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="game">
            <div className="game-board">
                <Board/>
            </div>
            <div>Status</div>
            </div>
        );
    }
}

export default Game;