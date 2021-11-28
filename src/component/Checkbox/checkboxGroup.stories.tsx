import React, { ChangeEvent, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {CheckboxGroup,CheckboxValueType} from './checkbox';
import{GroupOptionType} from './Group';
import { action } from '@storybook/addon-actions'


//👇 This default export determines where your story goes in the story list
export default {
    title: 'Component/Group',
    
	component: CheckboxGroup,
	argTypes: {
		CheckboxValueType:{
            description:"{value:string,label:string,onChange?:(e)=>void,disabled?:boolean}"
        }
	}
} as ComponentMeta<typeof CheckboxGroup>;;

const boxChange=(e:ChangeEvent<HTMLInputElement>)=>{
    console.log(e)
}
const options:GroupOptionType[]=[
    { label: 'Apple', value: '1' },
    { label: 'Pear', value: '2' },
    { label: 'Orange', value: '3',onChange:boxChange },
  ]
  
//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof CheckboxGroup>  = (args) => 
       <CheckboxGroup
        options={options}
        defaultValue={['1']}       
        onChange={action('change')} 
        />
// Template.parameters = {
//   docs: { previewSource: 'open' },
// }

export const group = Template.bind({});



