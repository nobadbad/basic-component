import React, { CSSProperties, FC, MouseEvent, ReactNode, useState } from "react";
import classNames from "classnames";
import Icon from "../Icon/icon";
import Transition from '../Transition/transition'
export type AlertType='success' | 'error' |'warning' |'info'
interface AlertProps{
    title?:ReactNode
    description?:string
    closable?:boolean
    type?:AlertType
    showIcon?:boolean
    onClose?:(e:MouseEvent)=>void
    styles?:CSSProperties
    className?:string
}
const Alert:FC<AlertProps>=(props)=>{
    const {title,description,closable,type,showIcon,onClose,className,styles} = props
    const classes=classNames('my-alert',className,{
        [`my-alert-${type}`]:type
    })
    const [show,setShow]=useState(true)
    let icon
    switch(type){
        case 'success':{
            icon=<Icon icon="check-circle" theme="success" size="1x" />
            break
        }
        case 'error':{
            icon=<Icon icon="times-circle" theme="danger"/>
            break
        }
        default:{
            icon=<Icon icon="info-circle" theme="primary"/>
            break
        }
    }
    const handleClick=(e:MouseEvent)=>{
        onClose&&onClose(e)
        setShow(false)   
    }
    return <Transition in={show} timeout={150} animation="zoom-in-top">
        <div className={classes} style={styles}>
        {showIcon&&<span className="my-alert-icon">{icon}</span>}
        <div className="my-alert-content">
            <div className="my-alert-title">{title}</div>
            {description&&<div className="my-alert-description">{description}</div>}
        </div>
        {closable&&<span
             className="my-alert-close"
             onClick={handleClick}
             >
            <Icon icon="times" size="sm"/>
            </span>}
    </div>
    </Transition>
}
Alert.defaultProps={
    type:'success',
    closable:true
}
export default Alert