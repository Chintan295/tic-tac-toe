import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class Square extends React.Component {
  render() {
    return (
      <button className="square" 
              onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      turn: 'X',
      square: Array(9).fill(null),
      status: null
    };
  }

  renderSquare(i) {
    return <Square value={this.state.square[i]} onClick={() => this.handleClick(i)} />;
  }

  handleClick(i) {
    if(this.state.status) return;
    const squares = this.state.square;
    const updatedTurn = (this.state.turn === 'X'? 'O' : 'X');
    squares[i] = this.state.turn;
    this.setState({square: squares, turn: updatedTurn})
    this.checkGameStatus();
  }

  checkGameStatus() {
    const sq = this.state.square;
    if((sq[0] && sq[1]===sq[0] && sq[2]===sq[0]) || (sq[3] && sq[4]===sq[3] && sq[5]===sq[3]) || (sq[6] && sq[7]===sq[6] && sq[8]===sq[6]) ||
        (sq[0] && sq[3]===sq[0] && sq[6]===sq[0]) || (sq[1] && sq[4]===sq[1] && sq[7]===sq[1]) || (sq[2] && sq[5]===sq[2] && sq[8]===sq[2]) ||
          (sq[0] && sq[4]===sq[0] && sq[8]===sq[0]) || (sq[2] && sq[4]===sq[2] && sq[6]===sq[2])) {
            this.setState({status: "Winner "+ this.state.turn});
        }
  }

  render() {

    let status = 'Next player: ' + this.state.turn;
    if(this.state.status) {
      status = this.state.status;
    }

    return (
      <div>
        <div className="status">{status}</div>
        <button className="reset-btn" onClick={() => {
          this.setState({
            turn: 'X',
            square: Array(9).fill(null),
            status: null
          })
        }}>Reset</button>
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
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);