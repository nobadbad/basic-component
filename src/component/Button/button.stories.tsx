import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from './button';
import { action } from '@storybook/addon-actions'

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Component/Button',
	component: Button,
	argTypes: {
		
		//button
		btnType: {
			description: '类型',
			defaultValue: 'default',
			control: {
				type: 'select',
				options: ['default', 'primary', 'success', 'warning', 'danger'],
			},
			table: {
				category: 'Button',
				type: { summary: 'default | primary  | success | warning | danger | text' },
			},
		},
		size: {
			description: '尺寸',
			defaultValue: 'medium',
			control: {
				type: 'select',
				options: ['sm','md','lg'],
			},
			table: {
				category: 'Button',
				type: { summary: 'sm | md | lg' },
			},
		},
		label: {
			description: '按钮文字',
			control: {
				type: 'text',
			},
			table: {
				category: 'Button',
			},
		},
		color: {
			description: '颜色',
			control: {
				type: 'color',
			},
			table: {
				category: 'Button',
			},
		},
		textColor: {
			description: '文本颜色',
			control: {
				type: 'color',
			},
			table: {
				category: 'Button',
			},
		},
		nativeType: {
			description: '按钮原生类型,可参考<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type">HTML标准</a>',
			defaultValue: 'button',
			control: {
				type: 'select',
				options: ['submit', 'button', 'reset'],
			},
			table: {
				category: 'Button',
				type: { summary: "submit | button | reset" },
			},
		},
		block: {
			description: '是否为块元素',
			control: {
				type: 'boolean',
			},
			table: {
				category: 'Button',
			},
		},
		disabled: {
			description: '是否禁用',
			control: {
				type: 'boolean',
			},
			table: {
				category: 'Button',
			},
		},
		
		round: {
			description: '是否开启圆角',
			control: {
				type: 'boolean',
			},
			table: {
				category: 'Button',
			},
		},
		
		href: {
			description: '跳转地址,仅在btnType=link时有效',
			control: {
				type: 'text',
			},
			table: {
				category: 'Button',
			},
		},
		onClick: {
			description: '点击事件',
			control: {
				type: null,
			},
			table: {
				category: 'Button',
			},
		},
		//ButtonGroup
		
		className: {
			description: '添加类名',
			control: {
				type: 'text',
			},
			table: {
				category: 'Button',
			}
		},
	}
} as ComponentMeta<typeof Button>;;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Button>  = (args) => <Button onClick={action('12222')} {...args} />;

// Template.parameters = {
//   docs: { previewSource: 'open' },
// }

export const button = Template.bind({});
button.args = {
  /*👇 The args you need here will depend on your component */
  btnType: 'primary',
  size:'md',
  label:'button'
};


