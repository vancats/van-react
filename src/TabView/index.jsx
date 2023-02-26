import { useCallback, useMemo, useState, useTransition } from "react"
import Home from "./Home"
import About from "./About"
import News from "./News"
import TransitionCase from './TransitionCase'
import UseStateCase from './UseStateCase'

export default function TabView() {
  const [presentActiveTab, setPresentActiveTab] = useState('useState')

  const [pending, startTransition] = useTransition()

  const tabs = useMemo(() => {
    return [
      {
        key: 'home',
        label: '首页',
        component: <Home />,
      },
      {
        key: 'news',
        label: '新闻页面',
        component: <News />,
      },
      {
        key: 'about',
        label: '关于我们',
        component: <About />,
      },
      {
        key: 'transition',
        label: 'Transition',
        component: <TransitionCase />
      },
      {
        key: 'useState',
        label: 'UseState',
        component: <UseStateCase />
      },
    ]
  })

  const presentComponent = useMemo(() => {
    return tabs.find(tabObj => tabObj.key === presentActiveTab).component
  }, [presentActiveTab, tabs])

  const changeTab = useCallback((tab) => {
    startTransition(() => setPresentActiveTab(tab))
  })


  return (
    <div>
      {
        tabs.map((tabObj, index) => {
          return (
            <button key={index} onClick={() => changeTab(tabObj.key)}>{tabObj.label}</button>
          )
        })
      }
      {
        presentComponent
      }
    </div>
  )
}
