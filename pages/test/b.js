import React, {useState,useReducer, useContext,useEffect,useLayoutEffect,useRef,memo,useMemo,useCallback} from 'react'

import Mycontext from '../../lib/my-context'


class MyCount extends React.Component{
    //set ref before hook come up 
    constructor() {
        super()
        this.ref = React.createRef()
    }

    state =  {
        count: 0
    }

    componentDidMount() {
        // get ref p
        this.ref.current
        this.interval = setInterval(() => {
            this.setState({count: this.state.count + 1}) 
        },1000) 
    }

    componentWillUnMount() {
        if(this.interval) {
            clearInterval(this.interval)
        }
    }

    render() {
        return <span  ref={this.ref} >{this.state.count}</span>
    }
}


function countReducer(state,action) {
    switch (action.type) {
        case 'add': 
            return state + 1
        case 'minus':
            return state-1
        default: 
            return state
    }
}




function MycountFunc() {
    // const [count,setCount] = useState(0) //[a,b]

    //when component update, it will execute this callback 
    const [count, dispatchCount] = useReducer(countReducer, 0)
    // setCount(1)
    // setCount((c) => {
    //     c + 1
    // })

    const [name, setName] = useState('jocky')

    const context = useContext(Mycontext)

    const inputRef = useRef()


    // optimize hooks render
    const config = useMemo(() => ({
        text: `count is ${count}`,
        color: count>3? 'red':'blue',
    }),[count])

    //called at update component
    useEffect(()=> {
        // const interval = setInterval(()=> {
        //     // setCount( c => c + 1)
        //     dispatchCount({type:'minus'})
        // },1000)
        // // Unmount
        // return () => clearInterval(interval)
        console.log(inputRef)
        console.log('effect invoked')
        return () => console.log('effect deteched')
    },[count,name])


    // before dom tree is rendering(before monting to dom)
    useLayoutEffect(() => {
        console.log('effectlayout invoked')
        return () => console.log('effectlayout deteched')
    },[count,name])

    // optimize hooks render
    // memo the callbackfunction usememo or useCallback 

    //const handleButton = useCallback(() => dispatchCount({type:'add'}),[])

    const handleButton = useMemo( () => () => dispatchCount({type:'add'}),[],)

    // closure test
    const handleclick1 = function () {
        setTimeout(()=> {
            alert(count)
        },2000)
    }

    return (
        <div>
            <input ref={inputRef} value={name} onChange={(e)=> setName(e.target.value)}/>
            <Child config={config} onButtonClick={handleButton}></Child>
            <p>{context}</p>
            <button onClick= {handleclick1}>123</button>
        </div>
    )
}


// must  be mome the component that u do wanna to render when there is no any changes
const Child =memo(function Child({onButtonClick, config}) {
    console.log('child render')
    return(
        <button onClick={onButtonClick} style= {{color : config.color}}>
            {config.text}
        </button>
    )
})

export default MycountFunc
