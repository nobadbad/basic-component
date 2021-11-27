import React, { Children, cloneElement, createContext, useState } from 'react'
import classNames from 'classnames'
import {IMenuItemProps} from './menuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: string) => void
export interface IMenuProps {
  defaultIndex?: string
  className?: string
  style?: React.CSSProperties
  mode?: MenuMode
  onSelect?: SelectCallback
  defaultOpenSubMenus?:string[]
}
interface IMenuContext {
  currentIndex: string
  onSelect?: SelectCallback
  mode?:MenuMode
  defaultOpen?:Array<string>
}

export const MenuContext = createContext<IMenuContext>({ currentIndex: '0',mode:'horizontal' })
const Menu: React.FC<IMenuProps> = (props) => {
  const { defaultIndex, className, style, children, mode, defaultOpenSubMenus, onSelect } = props
  const [currentIndex, setCurrentIndex] = useState(defaultIndex)
  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal':mode!=='vertical'
  })
  const handleClick = (index: string) => {
    setCurrentIndex(index)
    if (onSelect) {
      onSelect(index)
    }
  }
  const passedContext: IMenuContext = {
    currentIndex: currentIndex ? currentIndex : '0',
    onSelect: handleClick,
    mode,
    defaultOpen:defaultOpenSubMenus
  }
  const renderChildren=()=>{
    return Children.map(children,( child, index)=>{
        const childElement=child as React.FunctionComponentElement<IMenuItemProps>
        const { displayName }=childElement.type
        if( displayName === 'MenuItem'|| displayName === 'SubMenu'){
            return cloneElement(childElement,{index:index.toString()})
        }else{
            console.warn("Warning: Menu has a child which is not a MenuItem component");
        }
    })
  }
  return (
    <ul className={classes} style={style} data-testid='test-menu'>
        <MenuContext.Provider value={passedContext}>
          {renderChildren()}
        </MenuContext.Provider>
    </ul>
  )
}
Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus:[]
}
export default Menu
