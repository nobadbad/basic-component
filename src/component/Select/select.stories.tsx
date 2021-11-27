import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Select, {SelectProps} from './select';
import { action } from '@storybook/addon-actions'

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Component/Select',
	component: Select,
	decorators: [
		(storyFn) => <div style={{paddingBottom:'150px',width:'600px' }}>{storyFn()}</div>
	  ],
	argTypes: {
		
		//select
		

		allowClear: {
			description: '是否显示可清除按钮',
			control: {
				type: 'boolean',
			},
			table: {
				category: 'Select',
			}
		},
        multiple: {
			description: '是否多选',
			control: {
				type: 'boolean',
			},
			table: {
				category: 'Select',
			}
		},
		disabled: {
			description: '是否禁用',
			control: {
				type: 'boolean',
			},
			table: {
				category: 'Select',
			}
		},
		
	
		onchange: {
			description: '选中事件',
			control: {
				type: null,
			},
			table: {
				category: 'Select',
			},
		},
        onClear: {
			description: '一键清除事件',
			control: {
				type: null,
			},
			table: {
				category: 'Select',
			},
		},
        defaultValue: {
			description: '默认选中的选项',
			defaultValue:[],

			table: {
				category: 'Select',
			},
		},
        option:{
            description: 'select数据',
			table: {
				category: 'Select',
			},
        }
		//CustomOption
        
		
	}
} as ComponentMeta<typeof Select>;;


//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Select>  = (args) => 
    <Select
     onChange={action('onChange')}
     onClear={action('onClear')}
      {...args} />;

// Template.parameters = {
//   docs: { previewSource: 'open' },
// }

export const select = Template.bind({});
select.args = {
  /*👇 The args you need here will depend on your component */
  multiple:true,
  allowClear:true,
  defaultValue:[],
  disabled:false,
  option:[
    {label:'蛋糕',value:"1"},
    {label:'包子',value:"2"},
    {label:'饺子',value:"3"},
    {label:'汤圆',value:"4",disabled:true}
  ]
};


