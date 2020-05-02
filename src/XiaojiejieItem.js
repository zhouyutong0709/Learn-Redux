import React, { Component } from 'react';
import PropTypes from 'prop-types'

class XiaojiejieItem extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  /* // 组件第一次存在于dom中，函数是不会被执行
  // 如果已经存在于dom中，函数才会被执行
  componentWillReceiveProps(){
    console.log('child-componentWillReceiveProps')
  }

  componentWillUnmount(){
    console.log('child-componentWillUnmount')
  } */
  /* 
  shouldComponentUpdate有两个参数：
    - nextProps:变化后的属性;
    - nextState:变化后的状态;
  */
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.content !== this.props.content) {
      return true
    } else {
      return false
    }
  }

  render() {
    console.log('child-render')
    return (
      // <li onClick={this.handleClick} dangerouslySetInnerHTML={{__html:this.props.content}}></li>
      <li onClick={this.handleClick}>{this.props.avname}-{this.props.content}</li>
    );
  }

  handleClick() {
    // console.log(this.props.index)
    // 调用父组件传递过来的方法
    this.props.deleteItem(this.props.index)
  }
}

XiaojiejieItem.propTypes = {
  avname: PropTypes.string.isRequired,
  content: PropTypes.string,
  index: PropTypes.number,
  deleteItem: PropTypes.func
}

XiaojiejieItem.defaultProps = {
  avname: '西欧阿西'
}

export default XiaojiejieItem;