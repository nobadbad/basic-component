import React, { ChangeEvent ,useState} from 'react';
import Button from './component/Button/button';
import Menu from './component/Menu/menu';
import MenuItem from './component/Menu/menuItem';
import SubMenu from './component/Menu/subMenu'
import Input from './component/Input/input'
import Icon from './component/Icon/icon';
import Onload ,{UploadFile} from './component/Upload/upload'
import AutoComplete,{DataSourceType} from './component/AutoComplete/autoComplete'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Select from './component/Select/select'
import Tag from './component/Tag/tag'

library.add(fas)
interface LakerPlayerProps {
  value: string;
  url: string;
}
function App() {
  const prefixIcon=<Icon icon="coffee" theme='danger' size="lg"></Icon>
  const [value,setValue]=useState('')
  let onChange=(e:ChangeEvent<HTMLInputElement>)=>{
    setValue(e.target.value)
  }
  //异步数据
  const handleFetch= (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => {
        return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
      })
  }
  const renderOption = (item: DataSourceType<LakerPlayerProps>) => {
  
    return (
      <>  
        <p>{item.value}: {item.url}</p>
      </>
    )
  }

  const defaultFileList: UploadFile[] = [
  { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
  { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
]
const option =[{label:'蛋糕',value:"1"},
{label:'包子',value:"2"},
{label:'饺子',value:"3"},
{label:'汤圆',value:"4",disabled:true},
{label:'鱼蛋',value:"5"},
{label:'鱼蛋1',value:"6"},
{label:'鱼蛋2',value:"7"},
{label:'鱼蛋3',value:"8"},
]

  return (
    <div className="App">
      <Select
        option={option} 
        onChange={(value)=>{console.log(value)}}
        allowClear 
        multiple
        
        defaultValue={['1','2']}
       ></Select>
       
       
      {/* <Onload
          action="https://jsonplaceholder.typicode.com/posts" 
          defaultList={defaultFileList}
          onProgress={(percent,file)=>{console.log(percent);
          }}
          data={{'key':'value'}}
          headers={{'token':1234}}
          name="customize-name"
          withCredentials
          accept=".png"
          multiple
          drag
      >
        <Icon icon="upload" size="5x" theme="secondary" />
        <br/>
        <p>Drag file over to upload</p>
      </Onload>
      <Button  className='name' onClick={e=>{e.preventDefault();alert(2200)}}>anniu</Button> */}
      {/* <header className="App-header">
        <Menu defaultOpenSubMenus={[]}>
          <MenuItem>cool link</MenuItem>
          <MenuItem>cool link 2</MenuItem>
          <SubMenu title="Dropdown" >
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
            <MenuItem>dropdown 3</MenuItem>
          </SubMenu>
          <li>hello</li>
        </Menu>
        <hr />
        <Button  className='name' onClick={e=>{e.preventDefault();alert(2200)}}>anniu</Button>
        <Button btnType='primary' size='lg'>anniu</Button>
        <Button btnType='link' href="http://www.baidu.com" target="_blank">baidu-link</Button>
        <Input icon={prefixIcon} value={value} onChange={onChange}></Input>
        <AutoComplete fetchSuggestion={handleFetch} renderOption={renderOption}></AutoComplete>
      </header> */}
    </div>
  );
}

export default App;
