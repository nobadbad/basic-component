import React, {  useContext } from "react";
import classNames from "classnames";
import {MenuContext} from './menu'
export interface IMenuItemProps{
    index?:string,
    className?:string,
    style?:React.CSSProperties,
    disabled?:boolean
}
const MenuItem:React.FC<IMenuItemProps>=(props)=>{
    const context=useContext(MenuContext)
    const {index,className,style,disabled,children}=props
    const classes=classNames('menu-item',className,{
        'is-disabled':disabled,
        'is-active':context.currentIndex===index
    })
    const handleClick=()=>{
        if(context.onSelect && !disabled && index){
            context.onSelect(index)
        }
    }
    return (
        <li className={classes} style={style} onClick={handleClick}>
            {children}
        </li>
    )
}
MenuItem.displayName='MenuItem'
export default MenuItem