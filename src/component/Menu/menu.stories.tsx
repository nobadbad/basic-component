import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Menu from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu'
import { action } from '@storybook/addon-actions'

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Component/Menu',
	component: Menu,
	argTypes: {
		
		//select
		defaultIndex:{
			description: '默认active的下标',
			control: {
				type: 'boolean',
			}
		},
		className:{
			description: '添加类名',
			control: {
				type: 'text',
			}
		},
		style:{
			description: '添加内联样式',
			control: {
				type: 'object',
			}
		},
		mode: {
			description: '横向或竖向',
			control: {
				type: 'radio',
				options: ['vertical','horizontal'],
			}
		},
        multiple: {
			description: '是否多选',
			control: {
				type: 'boolean',
			}
		},
		disabled: {
			description: '是否禁用',
			control: {
				type: 'boolean',
			}
		},
		
	
		onSelect: {
			description: '选中事件',
			control: {
				type: null,
			}
			
		},
        defaultOpenSubMenus: {
			description: '默认打开的子选项',
			defaultValue:[],
			control: {
				type: 'array',
			}	
		}	
	}
} as ComponentMeta<typeof Menu>;;


//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Menu>  = (args) => 
<Menu defaultOpenSubMenus={[]} {...args}>
	<MenuItem>cool link</MenuItem>
	<MenuItem>cool link 2</MenuItem>
	<SubMenu title="Dropdown" >
		<MenuItem>dropdown 1</MenuItem>
		<MenuItem>dropdown 2</MenuItem>
		<MenuItem>dropdown 3</MenuItem>
	</SubMenu>
</Menu>

// Template.parameters = {
//   docs: { previewSource: 'open' },
// }

export const menu = Template.bind({});
menu.args = {
  /*👇 The args you need here will depend on your component */
  mode:"horizontal"
};	


