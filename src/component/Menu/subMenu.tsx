import React, { Children, useState, useContext, cloneElement } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import { IMenuItemProps } from "./menuItem";
import Icon from "../Icon/icon";
import Transition from '../Transition/transition'

export interface ISubMenuProps{
    index?:string;
    title:string;
    className?:string;
}
const SubMenu:React.FC<ISubMenuProps>=(props)=>{
    const {index,title,className,children} =props
    const context = useContext(MenuContext)
    const isOpened=(index&&context.mode==='vertical')?context.defaultOpen?.includes(index):false
    const [open,setOpen]=useState(isOpened) 
    const classes=classNames('menu-item submenu-item',className,{
        'is-active':context.currentIndex ===index,
        'is-opened':open,
        'is-vertical':context.defaultOpen
    })
    const handleClick=(e:React.MouseEvent)=>{
        e.preventDefault()
        setOpen(!open)
    }
    let timer:any
    const handleMouse=(e:React.MouseEvent,toggle:boolean)=>{
        e.preventDefault()
        clearTimeout(timer)
        timer=setTimeout(()=>{
            setOpen(toggle)
        },300)
    }
    const clickEvents= context.mode === 'vertical'?{
        onClick:handleClick
    }:{}
    const hoverEvents= context.mode !=='vertical' ? {
        onMouseEnter:(e:React.MouseEvent)=>{
            handleMouse(e,true)
        },
        onMouseLeave:(e:React.MouseEvent)=>{
            handleMouse(e,false)
        }
    }:{}
    
    const renderChildren=()=>{
        const subMenuClasses=classNames('menu-submenu',{
            'menu-opened':open
        })
        const childrenComponent=Children.map(children,(child,i)=>{
            const childElement=child as React.FunctionComponentElement<IMenuItemProps>
            const { displayName }=childElement.type
            if(displayName==='MenuItem'){
                return cloneElement(childElement,{index:`${index}-${i.toString()}`})
            }else{
                console.warn("Warning: SubMenu   has a  child which is not a MenuItem component");   
            }
        }) 
        return (
            <Transition in={open} timeout={300} animation="zoom-in-top">
                <ul className={subMenuClasses}>
                    {childrenComponent}
                </ul>
            </Transition>
        )
    }
    
    return (
        <li key="index" className={classes} {...hoverEvents}>
            <div className="submenu-title" {...clickEvents}>
                { title }
                <Icon icon="angle-down" className="arrow-icon"></Icon>
            </div>
            {renderChildren()}
        </li>
    )
}
SubMenu.displayName='SubMenu'
export default SubMenu