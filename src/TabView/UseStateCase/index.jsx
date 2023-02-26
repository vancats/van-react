import { useCallback, useTransition } from "react"
import useState from '../../hooks/useState'

export default function UseStateCase() {

  const [count, setCount] = useState(0)
  const [age, setAge] = useState(18)

  const increase = useCallback(() => {
    setCount(prev => prev + 1)
  }, [])

  const deCount = useCallback(() => {
    setCount(prev => prev - 1)
  }, [])

  const inCount = useCallback(() => {
    setCount(prev => prev + 1)
  }, [])

  const deAge = useCallback(() => {
    setAge(prev => prev - 1)
  }, [])

  const inAge = useCallback(() => {
    setAge(prev => prev + 1)
  }, [])

  console.log('repeat')
  return (
    <div>
      <div>
        <button onClick={deCount}>deCount</button>
        <span>{count}</span>
        <button onClick={inCount}>inCount</button>
      </div>
      <div>
        <button onClick={deAge}>deAge</button>
        <span>{age}</span>
        <button onClick={inAge}>inAge</button>
      </div>
    </div>
  )
}
