import Link from "next/link";
import { Button } from 'antd'

export default ({ children }) => (
    <>
    <header>
        <Link href='/a?id=3' as='/a/3'>
            <Button>a</Button>
        </Link>
        
        <Link href='/a?id=98' as='/a/98'>
            <Button>b</Button>
        </Link>
    </header>
    {children}
    </>
)