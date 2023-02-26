import { useCallback, useState, useTransition } from "react"

export default function TransitionCase() {

  const [inputValue, setInputValue] = useState('')
  const [recommendList, setRecommendList] = useState([])

  const [isPending, startTransition] = useTransition()

  const handleChange = useCallback((e) => {
    setInputValue(e.target.value)

    startTransition(() => {
      const _innerRecommendList = []
      for (let i = 0; i < 10000; i++) {
        _innerRecommendList.push(`${e.target.value}_${i}_rec`)
      }
      setRecommendList(_innerRecommendList)
    }, [])
  })

  return (
    <div>
      <input value={inputValue} onChange={handleChange} />
      {
        isPending ?
          <div>正在计算中...</div> :
          recommendList.map(item => <div key={item}>{item}</div>)
      }
    </div>
  )
}
