import React, { ChangeEvent, FC, InputHTMLAttributes, useState } from "react";
import Group from "./Group";
import classNames from "classnames";

export type CheckboxValueType = string | number | boolean;
export type CheckboxChangeType=(e:ChangeEvent<HTMLInputElement>)=>void
interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLElement>,'value'>{
    /**指定当前是否选中 */
    checked?:boolean

    /**初始是否选中 */
    defaultChecked?:boolean 

    /**是否失效 */
    disabled?:boolean

    value?:CheckboxValueType

   

    /**change回调函数 */
    onChange?:CheckboxChangeType
}
const Checkbox:FC<CheckboxProps>=(props)=>{
    const {checked,defaultChecked,disabled,children,onChange} =props
    const [check,setCheck]=useState<boolean>(defaultChecked||true)
    const isCheck=typeof checked==='undefined'?check:checked
    const classes=classNames('my-checkbox',{
        [`my-checkbox-checked`]:isCheck,
        [`my-checkbox-disabled`]:disabled,
    })
    
    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
        setCheck(!check)
        onChange&&onChange(e)
    }
    return (
        <label className="my-checkbox-wrapper">
            <span className={classes}>
                <input 
                    type="checkbox"
                    disabled={disabled}
                    className="my-checkbox-input"
                    checked={typeof checked ==='undefined'?check:checked}
                    onChange={handleChange}
                  />
                <span className="my-checkbox-inner"></span>
            </span>
            <span>{children}</span>
        </label>
    )
}

export const CheckboxGroup=Group
export default Checkbox