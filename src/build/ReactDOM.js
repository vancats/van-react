import { REACT_TEXT } from "./constant"
import { wrapToVDom } from "./utils"

function render(vdom, container) {
  const newDOM = createDOM(vdom) // 把虚拟DOM转化为真实DOM
  container.appendChild(newDOM)
}

function createDOM(vdom) {
  const { type, props } = vdom
  let dom
  if (type === REACT_TEXT) {
    dom = document.createTextNode(props.content)
  } else if (typeof type === 'function') {
    if (type.isReactComponent) {
      return mountClassComponent(vdom)
    } else {
      return mountFunctionComponent(vdom)
    }
  } else {
    dom = document.createElement(type)
  }

  if (props) {
    updateProps(dom, {}, props)
    const children = props.children
    if (typeof children === 'object' && children.type) {
      render(children, dom)
    } else if (Array.isArray(children)) {
      reconcileChildren(children.map(wrapToVDom), dom)
    } else if (typeof children === 'string' || typeof children === 'number') {
      render(wrapToVDom(children), dom)
    }
  }
  // vdom.dom = dom
  return dom
}

function updateProps(dom, oldProps, newProps) {
  for (const key in newProps) {
    if (key === 'children') continue
    if (key === 'style') {
      let styleObj = newProps[key]
      for (const attr in styleObj) {
        dom.style[attr] = styleObj[attr]
      }
    } else if (key.startsWith('on')) {
      dom[key.toLocaleLowerCase()] = newProps[key]
    } else {
      dom[key] = newProps[key]
    }
  }
}

function reconcileChildren(childrenVDOM, parentDOM) {
  for (let i = 0; i < childrenVDOM.length; i++) {
    let childVDOM = childrenVDOM[i]
    render(childVDOM, parentDOM)
  }
}

function mountFunctionComponent(vdom) {
  const { type, props } = vdom
  const renderVDOM = type(props)
  return createDOM(renderVDOM)
}

function mountClassComponent(vdom) {
  const { type, props } = vdom
  const classInstance = new type(props)
  let renderVDOM = classInstance.render()
  return createDOM(renderVDOM)
}

const ReactDOM = {
  render
}
export default ReactDOM
