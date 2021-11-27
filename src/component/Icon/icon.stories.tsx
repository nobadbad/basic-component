import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react';
import  Icon  from './icon'

export default {
  title: 'Component/Icon',
  component: Icon,
  argTypes:{
    theme:{
      description:'设置icon的颜色主题',
      control: {
				type: 'select',
				options: ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light','dark'],
			},
			table: {
				category: 'Icon',
				type: { summary: "'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'" },
			},
    }
  }
} as ComponentMeta<typeof Icon>;;


//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Icon>  = (args) => 
<>
  
      <Icon {...args} icon="coffee" />
      <Icon {...args} icon="times-circle"/>
      <Icon {...args} icon="baby"/>
      <Icon {...args} icon="bars"/>
      <Icon {...args} icon="spinner" spin/>
      <Icon {...args} icon="times"/>
</>



// Template.parameters = {
//   docs: { previewSource: 'open' },
// }

export const icon = Template.bind({});
