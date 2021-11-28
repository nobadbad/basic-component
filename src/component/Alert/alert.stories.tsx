import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Alert from './alert';
import { action } from '@storybook/addon-actions'

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Component/Alert',
	component: Alert,
	argTypes: {
		//button
		type: {
			description: 'Alert类型',
			defaultValue: 'info',
			control: {
				type: 'select',
				options: [ 'info', 'success', 'warning', 'error'],
			},
			table: {
				type: { summary: ' info  | success | warning | error ' },
			},
		},
		
		title: {
			description: '弹框标题',
            type:{name:"string",required:true},
			control: {
				type: 'text',
			}
		},
		description: {
			description: '详情内容',
			control: {
				type: 'text',
			}
		},
		
		closable: {
			description: '是否显示关闭按钮',
            defaultValue:true,
			control: {
				type: 'boolean',
			}
		},
        showIcon: {
			description: '是否显示辅助图标',
            defaultValue:true,
			control: {
				type: 'boolean',
			}
		},
		
		
		className: {
			description: '添加类名',
			control: {
				type: 'text',
			}
		},
        styles: {
			description: '添加内联样式',
			control: {
				type: 'object',
			}
		},
        onClose: {
			description: '点击关闭按钮事件',
			control: {
				type: null,
			}
		}
	}
} as ComponentMeta<typeof Alert>;;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Alert>  = (args) => 
    <Alert 
    showIcon
    styles={{width:'50%'}}
    onClose={action('12222')} 
    title="Warning" 
    description="Additional description and information about copywriting.
    Additional description and information about copywriting" 
    {...args} 
    />;

// Template.parameters = {
//   docs: { previewSource: 'open' },
// }

export const alert = Template.bind({});



