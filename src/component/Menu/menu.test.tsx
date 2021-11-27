import React from "react";
import { cleanup, fireEvent, render, RenderResult, waitFor } from "@testing-library/react";
import Menu,{IMenuProps} from './menu'
import MenuItem from './menuItem'
import SubMenu from "./subMenu";
const testProps:IMenuProps={
   defaultIndex:'0',
   onSelect:jest.fn(),
   className:'test'
}
const TestVerProps:IMenuProps={
    defaultIndex:'0',
    mode:'vertical',
    defaultOpenSubMenus:['4']
}
const generateMenu=(props:IMenuProps)=>{
    return (
        <Menu {...props}>
          <MenuItem index="0">
              active
          </MenuItem>
          <MenuItem index="1" disabled>
              disabled
          </MenuItem>
          <MenuItem index="2">
              normal
          </MenuItem>
          <SubMenu title="Dropdown" >
            <MenuItem>drop1</MenuItem>
          </SubMenu>
          <SubMenu title="opened">
            <MenuItem>
            opened1
            </MenuItem>
        </SubMenu>
        </Menu>
    )
}
const createStyleFile=()=>{
    const cssFile:string =`
        .menu-submenu {
            display:none;
        }
        .menu-submenu.menu-opened{
            display:block;
        }
    `
    const style = document.createElement('style')
    style.lang='text/css'
    style.innerHTML =cssFile
    return style
}
let wrapper:RenderResult,
    wrapper2:RenderResult,
    menuElement:HTMLElement, 
    activeElement:HTMLElement, 
    disabledElement:HTMLElement
describe('test Menu and MenuItem component',()=>{
    beforeEach(()=>{
        wrapper=render(generateMenu(testProps))
        wrapper.container.append(createStyleFile())
        menuElement=wrapper.getByTestId('test-menu')
        //menuElement=wrapper.container.querySelector('menu')?
        activeElement=wrapper.getByText('active')
        disabledElement=wrapper.getByText('disabled')
       
    })
    it('should render correct base Menu and MenuItem base on default props',()=>{
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('test menu')
        expect(menuElement.querySelectorAll(':scope >li').length).toEqual(5)
        expect(activeElement).toHaveClass('is-active menu-item')
        expect(disabledElement).toHaveClass('is-disabled menu-item')
    })
    it('click items should change active and call the right callback',()=>{
        const thirdItem=wrapper.getByText('normal')
        fireEvent.click(thirdItem)
        expect(thirdItem).toHaveClass('is-active')
        expect(activeElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).toHaveBeenCalledWith('2')
        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
    })
    
    it("should show dropdown items when hover on SubMenu",async ()=>{
        //queryByText:()=>HTMLElement | null 、getByText:()=>HTMLElement
        
        expect(wrapper.queryByText('drop1')).not.toBeVisible()
        const dropdownElement = wrapper.getByText('Dropdown')
        fireEvent.mouseEnter(dropdownElement)
        await waitFor(() => {
            expect(wrapper.queryByText('drop1')).toBeVisible()
        })
        const dropElement= wrapper.getByText('drop1')
        fireEvent.click(dropElement)
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
        fireEvent.mouseLeave(dropdownElement)
        await waitFor(() => {
            expect(wrapper.queryByText('drop1')).not.toBeVisible()
        })
    })
})
describe('test Menu and MenuItem component in vertical mode', () => {
    beforeEach(() => {
      wrapper2 = render(generateMenu(TestVerProps))
      wrapper2.container.append(createStyleFile())
    })
    
    it('should render vertical mode when mode is set to vertical', () => {
      const menuElement = wrapper2.getByTestId('test-menu')
      expect(menuElement).toHaveClass('menu-vertical')
    })
    it('should show dropdown items when click on subMenu for vertical mode', () => {
      const dropDownItem = wrapper2.queryByText('drop1')
      expect(dropDownItem).not.toBeVisible()
      fireEvent.click(wrapper2.getByText('Dropdown'))
      expect(dropDownItem).toBeVisible()
    })
    it('should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index', () => {
      expect(wrapper2.queryByText('opened1')).toBeVisible()
    })
  })