import React, { ChangeEvent, FC, ReactNode, useState } from "react";
import Checkbox,{CheckboxChangeType,CheckboxValueType} from "./checkbox";


export interface GroupOptionType{
    value:CheckboxValueType
    label:ReactNode
    disabled?:boolean
    onChange?:CheckboxChangeType
}
export interface GroupProps{
    /**默认选中的value */
    defaultValue?:CheckboxValueType[]

    /**是否全部禁用 */
    disabled?:boolean
    /**	CheckboxGroup 下所有 input[type="checkbox"] 的 name 属性 */
    name?:string

    /**可选项的数据data */
    options?:Array<GroupOptionType|string>
    /**指定选中的选项 */
    value?:CheckboxValueType[]

    /**子checkbox选中触发事件 */
    onChange?:(checkValues:CheckboxValueType[])=>void
}

const Group:FC<GroupProps>=(props)=>{
    const {defaultValue,disabled,name,options,value,children,onChange} =props
    const [valueState,setValueState]=useState<CheckboxValueType[]>(value||defaultValue||[])

    const _options=options?.map(option=>{
        if(typeof option==='string'){
            return {
                value:option,
                label:option
            } as GroupOptionType
        }
        return option
    })
    const boxHandleChange=(value:CheckboxValueType,opOnchange?:CheckboxChangeType)=>{
        return (e:ChangeEvent<HTMLInputElement>)=>{
            setValueState(pref=>{
                const nowValue=pref.slice()
                const index= pref.indexOf(value)
                index>-1?nowValue.splice(index,1):nowValue.push(value)
                
                Promise.resolve().then(()=>{
                    onChange&&onChange(nowValue)
                })
                return nowValue
            })
            opOnchange&&opOnchange(e)
            
        }
    }
    const isValue=typeof value==='undefined'?valueState:value
    return (
        <>
            {_options?_options.map(option=>[
                
                <Checkbox
                    key={option.value.toString()}
                    value={option.value} 
                    disabled={disabled||option.disabled}
                    checked={isValue.includes(option.value)}
                    onChange={boxHandleChange(option.value,option.onChange)}
                    name={name}
                >{option.label}</Checkbox>
            ]):children}
        </>
    )
}
export default Group