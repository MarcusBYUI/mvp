import { useState } from "react";

const UsePopup = () => {
    const [state, setState] = useState(false)
    const [animate, setAnimate] = useState(false)
    const [callback, setCallback] = useState()

    const openPop = (callback)=> {
        setState(true)
        setCallback(callback)
        setTimeout(() => {
            setAnimate(true)
        }, 10);
    }

    const closePop = ()=> {
        setAnimate(false)
        setTimeout(() => {
            setState(false)
        }, 500);
    }
    

    return {callback, animate, state, openPop, closePop};
}

export default UsePopup;
