import React, { Component } from 'react';

class TicTacToe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      gameOver: false,
    };
  }

  handleClick(index) {
    const squares = [...this.state.squares];
    if (this.state.gameOver || squares[index]) {
      return;
    }
    squares[index] = this.state.xIsNext ? 'X' : 'O';

    const winner = calculateWinner(squares);
    if (winner) {
      this.setState({ squares: squares, gameOver: true });
    } else if (squares.every((square) => square !== null)) {
      this.setState({ squares: squares, gameOver: true });
    } else {
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
      });
    }
  }

  resetGame() {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
      gameOver: false,
    });
  }

  renderSquare(index) {
    return (
      <button className="square" onClick={() => this.handleClick(index)}>
        {this.state.squares[index]}
      </button>
    );
  }

  render() {
    const { squares, xIsNext, gameOver } = this.state;
    const winner = calculateWinner(squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else if (gameOver) {
      status = 'Game Over - It\'s a tie!';
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
      <div className="board">
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <button className="reset-btn" onClick={() => this.resetGame()}>
          Reset
        </button>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default TicTacToe;
