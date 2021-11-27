import React, { CSSProperties, FC } from "react";
import classNames from 'classnames'
import Icon from "../Icon/icon";
type TagSize = 'lg' | 'sm' |'md'
type TagType = 'primary' | 'info' | 'warning' | 'danger'| 'success'
type TagTheme='dark' |'light' | 'plain'
interface TagProps{
    type?:TagType
    size?:TagSize
    closable?:boolean
    theme?:TagTheme
    className?:string
    styles?:CSSProperties
    onClear?:(tag:string)=>void
}
const Tag:FC<TagProps>=(props)=>{
    const {type,size,closable,theme,className,styles,onClear,children} = props
    const classes=classNames('my-tag',className,{
        [`my-tag-${type}`]:type,
        [`my-tag-${size}`]:size,
        [`my-tag-${theme}`]:size,
    })
    const handleClick=()=>{
        let tag=children?.toString() ||""
        onClear&&onClear(tag)
    }
    return(
            <span className={classes} style={styles}>
                {children}
            {closable&&
                <span className="tag-icon-wrapper" onClick={handleClick}>
                    <span className="tag-icon-default">
                        <Icon icon="times" size="xs"></Icon>
                    </span>
                    <span className="tag-icon-hover">
                        <Icon icon="times-circle"></Icon>
                    </span>
                </span>
            }
            </span>
    )
}
Tag.defaultProps={
    type:'primary',
    size:'md',
    theme:'plain'
}
export default Tag