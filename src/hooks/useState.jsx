
let callIndex = 0
const currentStateArr = []

export default function useState(initialState) {
  if (!currentStateArr[callIndex]) {
    currentStateArr.push({
      isFirst: false,
      state: typeof initialState === 'function' ? initialState() : initialState
    })
  }
  const dispatchState = (() => {
    let _callIndex = callIndex
    return (newState) => {
      callIndex = 0
      const prevState = currentStateArr[_callIndex].state

      currentStateArr[_callIndex].state = typeof newState === 'function' ? newState(prevState) : newState

      window.render()
    }
  })()

  const matchState = currentStateArr[callIndex++]
  return [matchState.state, dispatchState]
}
