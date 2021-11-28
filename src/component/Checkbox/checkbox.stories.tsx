import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Checkbox,{CheckboxValueType} from './checkbox';
import { action } from '@storybook/addon-actions'


//👇 This default export determines where your story goes in the story list
export default {
  title: 'Component/Checkbox',
	component: Checkbox,
	argTypes: {
		defaultChecked: {
			description: '默认选中',
            defaultValue:false,
			control: {
				type: 'boolean',
			},
            table:{
                category: 'Checkbox',
            }
		},
        checked: {
			description: '指定当前是否选中',
            defaultValue:false,
			control: {
				type: 'boolean',
			},
            table:{
                category: 'Checkbox',
            }
		},
        disabled: {
			description: '是否禁用',
            defaultValue:false,
			control: {
				type: 'boolean',
			},
            table:{
                category: 'Checkbox',
            }
		},
        onChange: {
			description: 'change事件',
			control: {
				type: null,
			},
            table:{
                category: 'Checkbox',
            }
		}
	}
} as ComponentMeta<typeof Checkbox>;;


  
//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Checkbox>  = (args) => 
   {    
       const [value,setValue]=useState<CheckboxValueType[]>([])
       const change=(values:CheckboxValueType[])=>{
           console.log(values)
            setValue(values)
        }
       return  <Checkbox onChange={action("change")}>checkbox</Checkbox>
       
        
       
   };

// Template.parameters = {
//   docs: { previewSource: 'open' },
// }

export const checkbox = Template.bind({});



