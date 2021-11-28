import React, { ChangeEvent, FC, ReactNode, useState } from "react";
import Radio,{RadioChangeType} from "./radio";

export interface GroupOptionType{
    value:any
    label:ReactNode
    disabled?:boolean
    onChange?:RadioChangeType
}
export interface GroupProps{
    /**默认选中的value*/
    defaultValue?: any

    /**是否全部禁用 */
    disabled?:boolean
    /**	RadioGroup 下所有 input[type="radio"] 的 name 属性 */
    name?:string

    /**可选项的数据data */
    options?:Array<GroupOptionType|string>
    /**指定选中的选项 */
    value?: any

    /**Radio选中触发事件 */
    onChange?:(checkValues:any)=>void
}

const Group:FC<GroupProps>=(props)=>{
    const {defaultValue,disabled,name,options,value,children,onChange} =props
    const [valueState,setValueState]=useState<any>(value||defaultValue)

    const _options=options?.map(option=>{
        if(typeof option==='string'){
            return {
                value:option,
                label:option
            } as GroupOptionType
        }
        return option
    })
    const boxHandleChange=(value:any,opOnchange?:RadioChangeType)=>{
        return (e:ChangeEvent<HTMLInputElement>)=>{
            setValueState(value)
            onChange&&onChange(value)
            opOnchange&&opOnchange(e)
            
        }
    }
    const isValue=typeof value==='undefined'?valueState:value
    return (
        <>
            {_options?_options.map(option=>[
                
                <Radio
                    key={option.value.toString()}
                    value={option.value} 
                    disabled={disabled||option.disabled}
                    checked={isValue===option.value}
                    onChange={boxHandleChange(option.value,option.onChange)}
                    name={name}
                >{option.label}</Radio>
            ]):children}
        </>
    )
}
export default Group