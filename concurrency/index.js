/// 实现 React 的可中断渲染

// concurrency 实际上是对 createElement 的执行结果进行可中断化
function Counter() {
    return {
        type: 'span',
        value: 'hello world', // fiber 还会区分文本和元素节点
        next: {
            type: 'button',
            value: 'click me',
        }
    }
}

const CounterElementDescriptors = {
    type: 'Function',
    fn: Counter
}

let presentWork = null // 当前的工作
let rootElementDescriptor = null
let elementsContainer = null

// 需要将 CounterElementDescriptors 进行可中断化渲染
function performUnitOfWork(deadline) {
    if (!presentWork) {
        // 当前没有可执行 react 元素后，进入 commit 阶段
        console.log('parentWork', rootElementDescriptor)
        commitRoot(rootElementDescriptor)
        return
    }

    // didTimeout 为 true 则当前帧没有空闲时间
    // timeRemaining 返回当前帧剩余的时间
    if (deadline.timeRemaining() < 1) {
        // 把当前工作推到下一帧执行
        requestIdleCallback(executeWorkLoop)
        return
    }

    if (presentWork.type === 'Function') {
        rootElementDescriptor = presentWork
        // 如果是组件
        const firstChildren = presentWork.fn()

        // 互相保存引用
        firstChildren.parent = presentWork
        presentWork.children = firstChildren

        /// --- 开始下一阶段工作 ---
        presentWork = firstChildren // 把当前工作的元素从函数组件变成了第一个 span 元素
        performUnitOfWork(deadline)
    } else {
        // 真实元素
        const dom = document.createElement(presentWork.type)
        dom.innerHTML = presentWork.value

        presentWork.dom = dom
        // TODO class event ...

        /// --- 开始下一阶段工作 ---
        presentWork = presentWork.next // 把当前工作的元素从 span 变成了 button
        performUnitOfWork(deadline)
    }
}

function executeWorkLoop(deadline) {
    performUnitOfWork(deadline)
}

function render(element) {
    elementsContainer = element
    presentWork = CounterElementDescriptors
    requestIdleCallback(executeWorkLoop) // 会在下一帧还有时间的时候执行回调
}

function commitRoot(_rootElement) {
    console.log('进入 commit 阶段', _rootElement)
    let renderChildrenElements = _rootElement.children

    do {
        elementsContainer.appendChild(renderChildrenElements.dom)
        renderChildrenElements = renderChildrenElements.next
    } while (renderChildrenElements)
}

render(document.querySelector('#root'))
