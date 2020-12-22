import Comp from '../components/comp'
import Link from 'next/link'
import { withRouter } from 'next/router'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
// import moment from 'moment'
// export default () => (
//     <Link href="/index">
//         <div><Comp>a</Comp></div>
//     </Link>
// )


// import lazy from '../components/layout'

const Lazy = dynamic(import('../components/lazy'))

// style-component css
const Title = styled.h1`
    color: yellow;
    font-size: 40px
`

const A = ({ router, name, time }) => {

    return(
        <>
        <Title>{time}</Title>
        {/* <Link href="#aaa"></Link> hash route */}
        <Link href="/index">
        <div className="link"><Comp className="link">a{router.query.id}</Comp>{name}</div>
        </Link>

        <Lazy/>
        
        <style jsx>{`
            .link {
                color: green;
            }
        `}</style>
        <style jsx global>{`

        `}</style>
        </>
    )
}

A.getInitialProps = async () => {
    // Asynchronous loading 
    // Avoid some page do need to moment also loading it
    // if we use import moment every js , it make the loading of modules is huge.
    // Avoid module resource waste
    const moment = await import('moment')


    const promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: 'jacky',
                // if we want to use moment 
                // must add default
                time: moment.default(Date.now()-60*1000).fromNow(),
            })
        },1000)
    })
    return await promise
}

export default withRouter(A)