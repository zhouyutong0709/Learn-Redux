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
  console.log(state,action)
  if (action.type === 'changeInput') {
    let newState = JSON.parse(JSON.stringify(state))//深度拷贝
    newState.inputValue = action.value
    return newState
  }
  return state
}