import React from 'react'
import classNames from 'classnames'

type ButtonSize = 'lg' | 'sm' |'md'
type ButtonType = 'primary' | 'default' | 'danger' | 'link'
interface IBaseButtonProps {
  className?: string
  disabled?: boolean
  size?: ButtonSize
  btnType?: ButtonType
  children: React.ReactNode
  href?: string
  label?:string
  round?:boolean
}
type NativeButtonProps = IBaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = IBaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>

//Partial 换成可选项
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
const Button: React.FC<ButtonProps> = (props) => {
  const { btnType, className, disabled, size, children, href,label,round, ...restProps } = props

  //btn,btn-lg,btn-primary
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === 'link' && disabled,
    'is-round':round
  })
  if (btnType === 'link') {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    )
  } else {
    return (
      
        <button className={classes} disabled={disabled} {...restProps}>
          {label?label:children}
        </button>
    )
  }
}
Button.defaultProps = {
  disabled: false,
  btnType: 'default',
}

export default Button
