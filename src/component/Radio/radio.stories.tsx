import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Radio from './radio';
import { action } from '@storybook/addon-actions'


//👇 This default export determines where your story goes in the story list
export default {
  title: 'Component/Radio',
	component: Radio,
	argTypes: {
		defaultChecked: {
			description: '默认选中',
            defaultValue:false,
			control: {
				type: 'boolean',
			},
            table:{
                category: 'Radio',
            }
		},
        checked: {
			description: '指定当前是否选中',
            defaultValue:false,
			control: {
				type: 'boolean',
			},
            table:{
                category: 'Radio',
            }
		},
        disabled: {
			description: '是否禁用',
            defaultValue:false,
			control: {
				type: 'boolean',
			},
            table:{
                category: 'Radio',
            }
		},
        
	}
} as ComponentMeta<typeof Radio>;;


  
//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Radio>  = (args) => 
   {    
       const [value,setValue]=useState<boolean>(false)
       
       return  <Radio>Radio</Radio>
       
        
       
   };

// Template.parameters = {
//   docs: { previewSource: 'open' },
// }

export const radio = Template.bind({});



