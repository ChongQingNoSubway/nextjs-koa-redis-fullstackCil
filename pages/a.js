import Comp from '../components/comp'
import Link from 'next/link'
import { withRouter} from 'next/router'
import styled from 'styled-components'
// export default () => (
//     <Link href="/index">
//         <div><Comp>a</Comp></div>
//     </Link>
// )


// style-component css
const Title = styled.h1`
    color: yellow;
    font-size: 40px
`

const A = ({ router, name }) => {

    return(
        <>
        <Title>Hello World</Title>
        {/* <Link href="#aaa"></Link> hash route */}
        <Link href="/index">
        <div className="link"><Comp className="link">a{router.query.id}</Comp>{name}</div>
        </Link>

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
    const promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: 'jacky'
            })
        },1000)
    })
    return await promise
}

export default withRouter(A)