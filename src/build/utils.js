import { REACT_TEXT } from "./constant"

export function wrapToVDom(element) {
  if (typeof element === 'string' || typeof element === 'number') {
    return { type: REACT_TEXT, props: { content: element } }
  } else {
    return element
  }
}
