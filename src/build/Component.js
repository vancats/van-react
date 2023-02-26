export class Component {
  static isReactComponent = true

  constructor(props) {
    this.props = props
    this.state = {}
    this.updater = new Updater(this)
  }

  setState(partialState, callback) {
    this.updater.addState(partialState, callback)
  }

  updateComponent() {
    console.log('updateComponent')
  }
}

class Updater {
  constructor(classInstance) {
    this.classInstance = classInstance
    this.pendingStates = [] // 将要更新的队列
    this.callbacks = [] // 将要执行的回调
  }

  addState(partialState, callback) {
    this.pendingStates.push(partialState)
    if (typeof callback === 'function') this.callbacks.push(callback)
    this.emitUpdate()
  }

  emitUpdate() {
    this.updateComponent()
  }

  updateComponent() {
    const { classInstance, pendingStates } = this
    if (pendingStates.length > 0) {
      shouldUpdate(classInstance, this.getState())
    }
  }

  getState() {
    const { classInstance, pendingStates, callbacks } = this
    let { state } = classInstance
    pendingStates.forEach(nextState => {
      if (typeof nextState === 'function') {
        nextState = nextState(state)
      }
      state = { ...state, ...nextState }
    })

    pendingStates.length = 0
    callbacks.forEach(callback => callback())
    callbacks.length = 0
    return state
  }
}

function shouldUpdate(classInstance, nextState) {
  classInstance.state = nextState
  classInstance.updateComponent()
}
