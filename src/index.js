import './index.scss';
import {setTempCls} from './utils/assist/';

let React = require('react'),
    ReactDOM = require('react-dom'),
    ReactTestUtils = require('react-dom/test-utils');

function Square(props) {
  return (
      <button
          className={props.className}
          onClick={() => props.onClick()}>
        {props.value ? props.value : ''}
      </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };

    this.emptyState = Object.assign({}, this.state);

    this.winner = null;
  }

  git;

  handleClick(i) {
    const sq = this.state.squares.slice();
    if (sq[i] || this.winner) return;
    sq[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({squares: sq, xIsNext: !this.state.xIsNext});
  }

  git;

  renderSquare(i) {
    return (
        <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
            className={`${this.winner ?
                '' :
                this.state.squares[i] ? '' : 'squareUnopened'}`}
        />
    );
  }

  render() {
    this.winner = calculateWinner(this.state.squares);

    let currentPlayer = this.state.xIsNext ? 'X' : 'O',
        status = `Следующий ход: `;

    if (this.winner) {
      status = `Результат: `;
      currentPlayer = this.winner === 'X' ?
          'победил X' :
          this.winner === 'O' ? 'Победил О' : 'ничья';
    }

    return (
        <div className='board'>
          <div className='gameToolbar'>
            <div className='controlPanel'>
              <button onClick={(e) => {
                this.setState(this.emptyState);
                setTempCls(e.currentTarget.children[0],
                    'textRotation')
              }} className='dischargeButton'>
                {this.resetBtn = <div className='updateSymbol'>↻</div>}
              </button>
            </div>
            <div className='statusContainer'>
              <span className={status}>{status}</span>
              <span className='currentPlayer'>{currentPlayer}</span>
            </div>
          </div>
          <div className='board-row'>
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className='board-row'>
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className='board-row'>
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
        <div className='game'>
          <Board/>
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

  let markedCount = 0;
  for (let i = 0; i < squares.length; i++) {
    if (squares[i]) markedCount++;
  }
  if (markedCount === squares.length) return '=';

  return null;

}

ReactDOM.render(
    <Game/>,
    document.querySelector('#root'),
);