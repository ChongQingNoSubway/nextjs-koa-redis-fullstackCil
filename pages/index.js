import { Button } from 'antd'
import Link from 'next/link'
import Router from 'next/router'

import {connect} from 'react-redux'
import { add } from '../store/store'

const events = [
  'routechangeStart',
  'routeChangeComplete',
  'routeChangeError',
  'beforeHistoryChange',
  'hashChangeStart',
  'hashChangeComplete'
]

function makeEvent(type) {
  return (...args) => {
    console.log(type, ...args)
  }
}

events.forEach(event => {
  Router.events.on(event, makeEvent(event))
})

const index =  ({counter, username,rename,add}) => {
  
  // function gotoTestB(){
  //   Router.push({
  //     pathname: '/a',
  //     query: {
  //       id: 98
  //     }
  //   },'/a/98')
  // }
  
  return (
    <>
      {/* <Link href="/a?id=5" as="/a/5">
        <Button> hello world </Button>
      </Link>

      <Button onClick={gotoTestB}>test router</Button> */}

      <span>
        Count: {counter}
      </span>
      <a>Username: {username}</a>
      <input value={username} onChange={(e)=> rename(e.target.value)}/>
      <button onClick={() => add(counter)}>do add</button>
    </>
  )

}

index.getInitialProps = async ({reduxStore}) => {
  reduxStore.dispatch(add(3))
  return {}
}

export default connect(function mapStateToProps(state) {
  return {
    counter: state.counter.count,
    username: state.user.name
  }
}, function mapDispatchToProps(dispatch){
  return {
    add: (num) => dispatch({
      type: 'ADD',
      num
    }),
    rename: (name) => dispatch({
      type: 'Update_USERNAME',
      name
    })
  }
})(index)