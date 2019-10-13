import React from 'react';
import { isNil } from 'ramda';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: [
          // {x: 2.5, y: 2, class: 'CS' },
          // {x: -2.5, y: -1, class: 'CS' },
          // {x: -8.5, y: -5, class: 'COGNITIVE' },
      ],
      hoveredIndex: undefined
    }
  }

  componentDidMount() {
      fetch("http://students.mimuw.edu.pl:6969/results",{'mode': 'no-cors'})
          .then(res => res.json())
          .then(
              (result) => {
                  this.setState({
                      votes: result.votes
                  });
              })
          .catch(function (err) {
              console.log(err)
          });
  }

  render() {
    const { votes, hoveredIndex } = this.state;

    return (
      <div className="App">
          <div className="chart">
              <div className="row">
                  <div className="square red" />
                  <div className="square blue" />
              </div>
              <div className="row">
                  <div className="square green" />
                  <div className="square purple" />
              </div>
              { votes.map((vote, i) => this.renderVote(vote, i)) }
          </div>
          {!isNil(hoveredIndex) && !isNil(votes[hoveredIndex]) && (<div>
              <div>Hover info</div>
              <div>X: {votes[hoveredIndex].x}</div>
              <div>Y: {votes[hoveredIndex].y}</div>
              <div>Field: {votes[hoveredIndex].class}</div>
          </div>
          )}
      </div>
    );
  }

  renderVote(vote, index) {
    const left = (vote.x + 10) / 20 * 400;
    const top = 400 - ((vote.y + 10) / 20 * 400);

    return (
        <div className="vote" style={{left, top, backgroundColor: vote.class === 'CS'?  'black': 'orange'}}
             onMouseEnter={() => this.setState(state => ({hoveredIndex: index}))}
             onMouseLeave={() => this.setState(state => ({hoveredIndex: undefined}))}
                 />
    )
  }
}


export default App;
