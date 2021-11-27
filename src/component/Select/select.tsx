import React, {ChangeEvent, FC, MouseEvent, useEffect, useRef, useState}from "react";
import classNames from "classnames";
import Input from '../Input/input'
import Icon from "../Icon/icon";
import Option from './option';
import useClickOutside from '../../hooks/useClickOutside'
import Tag from '../Tag/tag'
import Transition from '../Transition/transition'
interface Item{
    label:string
    value:any,
    disabled?:boolean
}
export interface SelectProps{
    multiple?:boolean
    disabled?:boolean
    allowClear?:boolean
    defaultValue?:string[]|string
    onChange?:(value:any)=>void
    allowSearch?:boolean
    onClear?:()=>void
    option:Item[]
}

const Select:FC<SelectProps>=(props)=>{
    const {multiple,disabled,allowClear,defaultValue,onChange,allowSearch,onClear,option,children} = props
    let defaultVal=multiple?[]:''
    const [open,setOpen]=useState(false)
    const [label,setLabel]=useState('')
    const [selectValue,setSelectValue]=useState(defaultValue||defaultVal)
    const [selectIndexs,setSelectIndexs]=useState<number[]>([])
    const selectRef=useRef<HTMLDivElement>(null)
    const [tagList,setTagList]=useState<string[]>([])
    useClickOutside(selectRef,()=>{
        setOpen(false) 
    })
    useEffect(()=>{
        if(Array.isArray(selectValue)){
            const result:Array<string>=[]
            let _select:number[]=[]
            selectValue.forEach(sel=>{
                let _item=option.find(item=>item.value===sel)
                if(_item){
                    result.push(_item.label)
                }
                option.forEach((item,index)=>{
                    if(item.value===sel)
                        _select.push(index)
                })
            })
            
            setSelectIndexs(_select)
            setTagList(result)
        }else{
            let item=option.find(item=>item.value===selectValue)
            let _label=item?item.label:''
            setLabel(_label)
        }
    },[selectValue])
    const handleClick=(e:MouseEvent<HTMLInputElement>)=>{
        setOpen(!open)
    }
    const handleChange=(value:any)=>{
        if(multiple){
            const _select=selectValue as string[]
            const index=_select.indexOf(value)
            
            if(index>-1){
                setSelectValue(pref=>{
                    const nowSelects=pref.slice() as string[]
                    nowSelects.splice(index,1)
                    onChange&&onChange(nowSelects)
                    return nowSelects
                })
                // selects.splice(index,1)
                // setSelectIndexs(selects)
            }else{
                setSelectValue(pref=>{
                    const nowSelects=pref.slice() as string[]
                    nowSelects.push(value)
                    onChange&&onChange(nowSelects)
                    return nowSelects
                })
                
                // selects.push(option.findIndex(item=>item.value===value))
                // setSelectIndexs(selects)
            }
            
        }else{
            setSelectValue(()=>{
                onChange&&onChange(selectValue)
                return value
            })
            setOpen(false)
        }   
        
    }
    const handleSearch=(e:ChangeEvent<HTMLInputElement>)=>{
        setLabel(e.target.value.trim())
    }
    const handleIConClick=()=>{
        onClear&&onClear()
        setOpen(false)
        multiple?setSelectValue([]):setSelectValue('')
    }
    const handleTagClick=(tag:string)=>{
        let value=option.find(item=>item.label===tag)?.value
        handleChange(value)
    }
    const renderIcon=()=>{
        return  <Icon icon="times-circle" size="sm" onClick={handleIConClick}></Icon>
    }
    const showIcon=multiple?selectValue.length:selectValue
    return (
        <div className="viking-select" ref={selectRef}>
            <div className="viking-select-input">
            {allowClear&&showIcon?<Input
                            readOnly={!allowSearch&&!disabled}
                            disabled={disabled}
                            onClick={handleClick} 
                            value={label}
                            icon={renderIcon()}
                            onChange={handleSearch}
                        />:
                        <Input
                            readOnly={!allowSearch}   
                            disabled={disabled}
                            onClick={handleClick} 
                            value={label}
                            onChange={handleSearch}
                        />
            }
              <Transition in={open} timeout={300} animation="zoom-in-top">
              {children?children:
                    <ul className="viking-select-dropdown zoom-in-top-enter-done">
                        {children?children:option.map((item,index)=>{
                        return <Option key={item.label} value={item.value}  onChange={handleChange} disabled={item.disabled} select={selectIndexs.indexOf(index)>-1}>{item.label}</Option>
                        })}
                    </ul>
                }
            </Transition>
                   <ul className="select-tags-wrapper">
                        {tagList.map(tag=>{
                            return <Tag closable={!disabled} theme="plain" 
                                        styles={{marginLeft:'4px'}} 
                                        onClear={handleTagClick} 
                                        key={tag}
                                        >{tag}
                                    </Tag>
                        })}
                    </ul>
              </div>
        </div>
    )
}

export const CustomOption=Option
Select.defaultProps={
    multiple:false,
    allowClear:true,
    defaultValue:[],
    disabled:false
}
export default Select