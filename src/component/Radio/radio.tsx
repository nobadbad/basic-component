import React, { ChangeEvent, FC, InputHTMLAttributes, useState } from "react";
import classNames from "classnames";
import Group from './Group'

export type RadioChangeType=(e:ChangeEvent<HTMLInputElement>)=>void
interface RadioProps extends InputHTMLAttributes<HTMLElement>{
    /**指定当前是否选中 */
    checked?:boolean

    /**初始是否选中 */
    defaultChecked?:boolean 

    /**是否失效 */
    disabled?:boolean

    value?:any

    name?:string

    onChange?:RadioChangeType
}
const Radio:FC<RadioProps>=(props)=>{
    const {checked,defaultChecked,disabled,onChange,children}=props
    const [check,setCheck]=useState<boolean>(checked||defaultChecked||false)
    const isChecked=typeof checked==='undefined'?check:checked
    const classes=classNames('my-radio',{
        [`my-radio-checked`]:isChecked,
        [`my-radio-disabled`]:disabled,
    })
    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
        setCheck(e.target.checked)
        onChange&&onChange(e)
    }
    return (
        <label className="my-radio-wrapper">
            <span className={classes}>
                <input 
                    type="radio"
                    disabled={disabled}
                    className="my-radio-input"
                    checked={isChecked}
                    onChange={handleChange}
                  />
                <span className="my-radio-inner"></span>
            </span>
            <span>{children}</span>
        </label>
    )
}
export const RadioGroup=Group
export default Radio