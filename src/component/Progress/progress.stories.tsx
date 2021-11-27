import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Progress from './progress';
import { action } from '@storybook/addon-actions'

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Component/Progress',
	component: Progress,
	argTypes: {
		
		//Tag
		theme: {
			description: '进度条颜色主题',
			defaultValue: 'primary',
			control: {
				type: 'select',
	
				options: ['primary', 'success', 'info', 'warning', 'danger','light','dark'],
			},
			table: {
				category: 'Progress',
				type: { summary: 'primary | success  | info | warning | danger | light | dark' },
			},
		},
		height: {
			description: '进度条高度',
			defaultValue: 12,
			control: {
				type: 'number',
			},
			table: {
				category: 'Progress',
			},
		},
		showText: {
			description: '是否显示百分比文字',
			control: {
				type: 'boolean',
			},
			table: {
				category: 'Progress',
			}
		},
        
		styles:{
			description: '添加的内联样式',
			control:{
				type:'object'
			},
			table: {
				category: 'Progress',
			}
		},
	
		percent:{
			description: '进度条进度',
			type: { name: 'number', required: true },
			control: {
				type: 'number',
			},
			table: {
				category: 'Progress',
			},
		},

        
		//CustomOption
        
		
	}
} as ComponentMeta<typeof Progress>;;


//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Progress>  = (args) => 
    <Progress
	
      {...args} />;

// Template.parameters = {
//   docs: { previewSource: 'open' },
// }

export const progress = Template.bind({});
progress.args = {
  /*👇 The args you need here will depend on your component */
  	height:12,
    showText:true,
    percent:20,
    theme:'success',
    styles:{}
};


