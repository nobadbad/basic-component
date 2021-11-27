import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Input from './input';
import { action } from '@storybook/addon-actions'

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Component/Input',
	component: Input,
  argTypes:{
    prepend:{
      description:'添加前缀 用于配置一些固定组合',
      control:{
        type:"text"
      },
      table:{
        type:{summary:'string | ReactElement'}
      }
    },
    append:{
      description:'添加后缀 用于配置一些固定组合',
      control:{
        type:"text"
      },
      table:{
        type:{summary:'string | ReactElement'}
      }
    },
    icon:{
      description:'添加图标，在右侧悬浮添加一个图标，用于提示',
      control:{
        type:"text"
      },
      table:{
        type:{summary:'coffee | times | times-circle  | bars'}
      }
    }
  }
} as ComponentMeta<typeof Input>;;


//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Input>  = (args) => 
    <Input
      prepend="https://"
      icon="bars"
      onChange={action("change")}
      {...args} />;

// Template.parameters = {
//   docs: { previewSource: 'open' },
// }

export const input = Template.bind({});
input.args = {
  /*👇 The args you need here will depend on your component */

};


