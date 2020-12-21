import { Button } from 'antd'
import Link from 'next/link'
import Router from 'next/router'

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

export default () => {
  
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
        hello world
      </span>
    </>
  )

}