import React, { FC, ReactElement, InputHTMLAttributes, ChangeEvent } from 'react'
import classNames from 'classnames'
import Icon from '../Icon/icon'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

type InputSize = 'lg' |'md' | 'sm'

//Omit:忽略结果中的属性 忽略InputHTMLAttributes中的size属性
//Partial 换成可选项
export interface IInputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size' > {
  /**是否禁用 Input */
  disabled?: boolean;
  /**设置 input 大小，支持 lg 或者是 sm */
  size?: InputSize;
  /**添加图标，在右侧悬浮添加一个图标，用于提示 */
  icon?: IconProp|ReactElement;
  /**添加前缀 用于配置一些固定组合 */
  prepend?: string | ReactElement;
  /**添加后缀 用于配置一些固定组合 */
  append?: string | ReactElement;
  onChange? : (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 * 

 * ~~~
 * 支持 HTMLInput 的所有基本属性
 */
export const Input: FC<IInputProps> = (props) => {
  const {
    disabled,
    size,
    icon,
    prepend,
    append,
    style,
    ...restProps
  } = props
 
  const classes = classNames('viking-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  })
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }
  if('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props.value)
  }
  return (
    <div className={classes} style={style}>
      {prepend && <div className="viking-input-group-prepend">{prepend}</div>}
      {icon&&<div className="icon-wrapper">{typeof icon==='string'?<Icon icon={icon}></Icon>:icon} </div>}
      <input 
        className="viking-input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="viking-input-group-append">{append}</div>}
    </div>
  )
}

export default Input;