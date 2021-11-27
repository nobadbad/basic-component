import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Upload,{UploadFile} from './upload';
import { action } from '@storybook/addon-actions'
import Icon from '../Icon/icon';
//👇 This default export determines where your story goes in the story list
const defaultFileList: UploadFile[] = [
	{ uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
	{ uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
	{ uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
]
export default {
  title: 'Component/Upload',
	component: Upload,
	argTypes: {
	
	
		action:{
			description:'上传url',
			type:{name:'string',required:true},
			control:{type:'text'}
		},
		headers:{
			description:'自定义上传头',
			control:{type:'object'}
		},
		data:{
			description:'添加自定义的上传数据JSON',
			control:{type:'object'}
		},
		name:{
			description:'自定义文件名',
			control:{type:'text'}
		},
		withCredentials:{
			description:'是否添加cookie',
			control:{type:'boolean'}
		},
		multiple:{
			description:'是否多选上传',
			control:{type:'boolean'}
		},
		children:{
			description:'drag模式下显示的内容',
			table:{
				type:{summary:'ReactNode'}
			}
		},
		drag:{
			description:'是否开启多动上传',
			control:{type:'boolean'}
		},
		accept:{
			description:'接受文件的格式 .png|.jpg',
			control:{type:'text'}
		},
		defaultList:{
			description:'默认上传列表',
			control:{type:'array'}
		},
		onProgress:{
			description:'上传中钩子'
		},
		onSuccess:{
			description:'上传成功钩子'
		},
		onError:{
			description:'上传失败钩子'
		},
		onChange:{
			description:'上传状态变化触发钩子'
		},
		beforeUpload:{
			description:'上传前钩子，一般用于校验文件格式或者文件大小'
		},
		onRemove:{
			description:'移除上传文件钩子'
		}
	}
} as ComponentMeta<typeof Upload>;;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Upload>  = (args) =>
 <Upload
 	{...args}
	onChange={action('change')}
	onSuccess={action('success')}
	onError={action('error')}
	onProgress={action('progress')}
	onRemove={action('remove')}
   >
	  <Icon icon="upload" size="5x" theme="secondary" />
        <br/>
        <p>Drag file over to upload</p> 
	</Upload>;

// Template.parameters = {
//   docs: { previewSource: 'open' },
// }

export const upload = Template.bind({});
upload.args = {
  /*👇 The args you need here will depend on your component */
	name:'my-customize-filename',
	action:'https://jsonplaceholder.typicode.com/posts',
	defaultList:defaultFileList,
	withCredentials:true,
	multiple:true,
	headers:{'token':1234},
	data:{'key':'value'},
	drag:true,
};


