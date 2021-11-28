import React, { ChangeEvent, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {RadioGroup} from './radio';
import{GroupOptionType} from './Group';
import { action } from '@storybook/addon-actions'


//👇 This default export determines where your story goes in the story list
export default {
    title: 'Component/Radios',
    
	component: RadioGroup,
    argTypes:{
        defaultValue:{
            description:'默认选中的value',
            control:{
                type:''
            },
            table:{
                type: { summary: "any" },
            }
        },
        value:{
            description:'指定选中的选项',
            control:{
                type:''
            },
            table:{
                type: { summary: "any" },
            }
        }
    }

} as ComponentMeta<typeof RadioGroup>;;

const radioChange=(e:ChangeEvent<HTMLInputElement>)=>{
    console.log(e)
}
const options:GroupOptionType[]=[
    { label: 'Apple', value: '1' },
    { label: 'Pear', value: '2' },
    { label: 'Orange', value: '3',onChange:radioChange },
  ]
  
//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof RadioGroup>  = (args) => 
       <RadioGroup
        options={options}
        defaultValue={['1']}       
        onChange={action('change')} 
        />
// Template.parameters = {
//   docs: { previewSource: 'open' },
// }

export const radios = Template.bind({});



