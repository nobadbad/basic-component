import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import  AutoComplete  from './autoComplete'
const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins',
  'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando']

  const handleFetch = (query: string) => {
    return lakers.filter(name => name.includes(query)).map(name => ({value: name}))
  }
  export default {
    title: 'Component',
    component: AutoComplete,
    decorators: [
      (storyFn) => <div style={{paddingBottom:'150px',width:'600px' }}>{storyFn()}</div>
      ],
  } as ComponentMeta<typeof AutoComplete>;;
  
  
  //👇 We create a “template” of how args map to rendering
  const Template: ComponentStory<typeof AutoComplete>  = () => 
  <AutoComplete 
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
      placeholder="输入湖人队球员英文名试试"
    />
  
  // Template.parameters = {
  //   docs: { previewSource: 'open' },
  // }
  
  export const autoComplete = Template.bind({});
 