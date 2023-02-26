import { wrapToVDom } from "./utils"
import { Component } from "./Component"

function createElement(type, config, children) {
  const props = { ...config }
  if (arguments.length > 3) {
    props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVDom)
  } else {
    props.children = wrapToVDom(children)
  }
  return {
    type,
    props,
  }
}

const React = {
  createElement,
  Component,
}

export default React
