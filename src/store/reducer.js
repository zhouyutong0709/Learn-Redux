import { CHANGE_INPUT, ADD_ITEM, DELETE_ITEM } from './actionsTypes'

const defaultState = {
  inputValue: 'Write Something',
  list: [
    '谢娜',
    '张杰',
    '何炅'
  ]
}
export default (state = defaultState, action) => {
  // recuder里只能接受state，不能改变state
  console.log(state, action)
  if (action.type === CHANGE_INPUT) {
    let newState = JSON.parse(JSON.stringify(state))//深度拷贝
    newState.inputValue = action.value
    return newState
  }

  if (action.type === ADD_ITEM) {
    let newState = JSON.parse(JSON.stringify(state))//深度拷贝
    newState.list.push(newState.inputValue)
    newState.inputValue = ''
    return newState
  }

  if (action.type === DELETE_ITEM) {
    let newState = JSON.parse(JSON.stringify(state))//深度拷贝
    newState.list.splice(action.index, 1)
    return newState
  }
  return state
}