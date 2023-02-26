import React from './build/React'
import ReactDOM from './build/ReactDOM'


function FunctionComponent(props) {
  return <h2>hello,{props.name}</h2>
}

class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = { date: new Date().toLocaleTimeString() }
  }
  componentDidMount() {
    this.timer = setInterval(this.tick, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  tick = () => {
    this.setState({ date: new Date().toLocaleTimeString() })
  }
  render() {
    return <h2>hello,{this.props.name}{this.state.date}</h2>
  }
}

class Counter extends React.Component {
  state = { number: 0 }

  handleClick = (e) => {
    console.log(123)
    this.setState({ number: this.state.number + 1 })
  }
  render() {
    return <div>
      <span>{this.state.number}</span>
      <button onClick={this.handleClick}>Click Me</button>
    </div>
  }
}

const element = <div className='title' style={{ color: 'red' }}>
  <span>hello</span>world
  <FunctionComponent name='function vancats' />
  <Clock name='class vancats' />
  <Counter />
</div>

console.log('element: ', element)
ReactDOM.render(element, document.getElementById('root'))
