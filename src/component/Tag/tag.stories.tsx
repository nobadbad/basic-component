import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Tag from './tag';
import { action } from '@storybook/addon-actions'

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Component/Tag',
	component: Tag,
	argTypes: {
		
		//Tag
		type: {
			description: '类型',
			defaultValue: 'primary',
			control: {
				type: 'select',
				options: ['primary', 'success', 'info', 'warning', 'danger'],
			},
			table: {
				category: 'Tag',
				type: { summary: 'primary | success  | info | warning | danger' },
			},
		},
		size: {
			description: '尺寸',
			defaultValue: 'md',
			control: {
				type: 'select',
				options: ['sm','md','lg'],
			},
			table: {
				category: 'Tag',
				type: { summary: 'sm | md | lg' },
			},
		},

		closable: {
			description: '是否可关闭',
			control: {
				type: 'boolean',
			},
			table: {
				category: 'Tag',
			}
		},
        theme: {
			description: '主题',
			control: {
				type: 'select',
				options: ['dark','light','plain']
			},
			table: {
				category: 'Tag',
			}
		},
		className:{
			description: '添加的类名',
			table: {
				category: 'Tag',
			}
		},
		styles:{
			description: '添加的内联样式',
			control:{
				type:'object'
			},
			table: {
				category: 'Tag',
			}
		},
	
		children:{
			description: '便签内容,label',
			control: {
				type: 'text',
			},
			table: {
				category: 'Tag',
			},
		},
		
        onClear: {
			description: '清除事件',
			control: {
				type: null,
			},
			table: {
				category: 'Tag',
			},
		}
		
        
		//CustomOption
        
		
	}
} as ComponentMeta<typeof Tag>;;


//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Tag>  = (args) => 
    <Tag
	onClear={action("onClear")}
      {...args} />;

// Template.parameters = {
//   docs: { previewSource: 'open' },
// }

export const tag = Template.bind({});
tag.args = {
  /*👇 The args you need here will depend on your component */
  closable:true,
  type:'success',
  theme:'plain',
  children:'标签一',
  className:'myClass',
  styles:{textAlign:'center'}
};


