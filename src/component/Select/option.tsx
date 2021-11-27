import classNames from "classnames";
import React,{ FC, useState } from "react";
import Icon from '../Icon/icon'
interface OptionProps{
    value?:any
    onChange:(value:any)=>void
    disabled?:boolean,
    select?:boolean
}
const Option:FC<OptionProps>=(props)=>{
    const {value,disabled,onChange,select,children}=props
    const classes=classNames('select-item',{
        'is-disabled':disabled,
        'is-selected':select
    })
    const handleClick=()=>{
        if(disabled){
            return
        }
        onChange(value)
    }
    return (
        <li onClick={handleClick} className={classes}>
            {children}
            {select&&<Icon icon='check-circle' theme='primary' />}
        </li>
    )
}
export default Option