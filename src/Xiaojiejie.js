import React, { Component, Fragment } from 'react'
import XiaojiejieItem from './XiaojiejieItem'
import axios from 'axios'
import Boss from './Boss'
import './style.css'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import store from './store/index'
// import { Switch } from 'antd';
// import 'antd/dist/antd.css';

class Xiaojiejie extends Component {
  // 在某一时刻，可以自动执行的函数
  constructor(props) {
    super(props);
    /* this.state = {
      inputValue: '',
      list: ['基础按摩', '精油推背']
    } */
    this.state = store.getState()
    this.storeChange=this.storeChange.bind(this)
    store.subscribe(this.storeChange)
    this.inputChange = this.inputChange.bind(this)
    this.addList = this.addList.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    console.log(store.getState())
  }

  componentDidMount() {
    axios.post('https://web-api.juejin.im/v3/web/wbbr/bgeda')
      .then((res) => {
        console.log('axio获取数据成功' + JSON.stringify(res))
      })
      .catch((error) => {
        console.log('axio获取数据失败' + error)
      })
  }
  render() {
    return (
      <Fragment>
        <div>
          <label htmlFor='inputId'>增加服务</label>
          <input
            id='inputId'
            value={this.state.inputValue}
            onChange={this.inputChange}
            placeholder={this.state.inputValue}
            ref={(input) => { this.input = input }}
          />
          <button onClick={this.addList}>增加服务</button>
        </div>
        <ul ref={(ul) => { this.ul = ul }}>
          <TransitionGroup>
            {
              this.state.list.map((item, index) => {
                return (
                  <CSSTransition
                    timeout={1000}
                    classNames='boss-text'
                    onmountOnExit
                    appear={true}
                    key={index + item}
                  >
                    <XiaojiejieItem
                      key={index + item}
                      content={item}
                      index={index}
                      deleteItem={this.deleteItem}
                    />
                  </CSSTransition>
                )
              })
            }
          </TransitionGroup>
        </ul>

        <Boss />
        {/* <Switch /> */}
      </Fragment>
    )
  }

  inputChange(e) {
    //  console.log(e.target.value)
    //  this.state.inputValue = e.target.value;//这样写会报错
    /*   this.setState({
        // inputValue: e.target.value
        inputValue: this.input.value 
      }) */
    // redux用法
    const action = {
      type: 'changeInput',
      value: this.input.value
    }
    store.dispatch(action);
  }

  storeChange(){
    this.setState(store.getState())
  }
  // 增加列表
  addList() {
    this.setState({
      list: [...this.state.list, this.state.inputValue],
      inputValue: ''
    }, () => {
      console.log(this.ul.querySelectorAll('li').length)
    })
  }
  // 删除列表项
  deleteItem(index) {
    // console.log(index)
    let list = this.state.list;
    list.splice(index, 1);
    this.setState({
      list: list
    })
  }
}

export default Xiaojiejie