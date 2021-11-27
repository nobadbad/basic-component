
import React from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'


type AnimationName= 'zoom-in-top' | 'zoom-in-bottom' | 'zoom-in-left' | 'zoom-in-right' 
type TransitionProps = CSSTransitionProps 
    & { animation?: AnimationName, wrapper?: boolean }
const Transition:React.FC<TransitionProps>=(props)=>{
    const { animation, children, classNames, wrapper, ...rest}=props
    console.log(rest)
    return (
        <CSSTransition classNames={classNames? classNames : animation} 
            {...rest}
        > 
        {wrapper?<div>{children}</div>:<>{children}</>}
        </CSSTransition>
    )
}
Transition.defaultProps={
    unmountOnExit:true,
    appear:true
}
Transition.displayName='Transition'
export default Transition
