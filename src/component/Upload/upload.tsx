import React, { ChangeEvent, FC, MouseEvent, useRef, useState } from "react";
import axios from 'axios'
import UploadList from './uploadList'
import Dragger from './dragger'

interface UploadProps{
    action:string,
    defaultList?:UploadFile[]
    onProgress?:(percent:number,file:File)=>void
    onSuccess?:(data:any,file:File)=>void
    onError?:(err:any,file:File)=>void
    onChange?:(file:File)=>void
    beforeUpload?:(file:File)=>boolean | Promise<File>
    onRemove?:(file:UploadFile)=>void
    headers?:{[key:string]:any}
    name?:string
    data?:{[key:string]:any}
    withCredentials?:boolean
    accept?:string
    multiple?:boolean
    drag?:boolean
}
type StatusType='success'|'error'|'ready'|'uploading'
export interface UploadFile  {
    uid:string
    name:string
    size:number
    rwa?:File
    status:StatusType
    percent:number
    response?:any
    error?:any
}
const Upload:FC<UploadProps>=(props)=>{
    const {action,
        onProgress,
        onSuccess,
        onError,
        beforeUpload,
        onChange,
        defaultList,
        onRemove,
        data,
        name,
        withCredentials,
        headers,
        accept,
        multiple,
        drag,
        children
    }=props
    const inputRef=useRef<HTMLInputElement>(null)
    const [fileList,setFileList]=useState<UploadFile[]>(defaultList||[])
    const handleClick=(e:MouseEvent)=>{
        inputRef.current?.click()
    }
    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
        const files=e.target.files
        if(!files){
            return
        }
        uploadFiles(files)
        if(inputRef.current){
            inputRef.current.value=''
        }
    }
    const uploadFiles=(files:FileList)=>{
        const fileList=Array.from(files)
        fileList.forEach(file=>{
            if(beforeUpload){
                const result=beforeUpload(file)
                if(result instanceof Promise){
                    result.then(processedFile=>{
                        
                        postFile(processedFile)
                    })
                }else if(result){
                    postFile(file)
                }
            }else{
                postFile(file)
            }   
        })
    }
    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList(prevList => {
          return prevList.map(file => {
            if (file.uid === updateFile.uid) {
              return { ...file, ...updateObj }
            } else {
              return file
            }
          })
        })
      }
    const postFile=(file:File)=>{
        let _file:UploadFile={
            uid:Date.now()+"upload-file",
            name:file.name,
            size:file.size,
            percent:0,
            rwa:file,
            status:'ready'
        }
        setFileList(prevList=>{
            return [_file,...prevList]
        })
        //setFileList([_file,...fileList])
        
        const formData=new FormData()
        formData.append(name || file.name,file)
        if(data){
            Object.keys(data).forEach(key=>{
                formData.append(key,data[key])
            })
        }
        axios.post(action,formData,{
            headers:{
                ...headers,
                'Content-Type':'multipart/form-data'
            },
            withCredentials,
            onUploadProgress:e=>{
                let percent= Math.round((e.loaded/e.total)*100)
                if(percent<100&&onProgress){
                    updateFileList(_file,{status:'uploading','percent':percent})
                    onProgress(percent,file)
                }
            }
        }).then(res=>{
            updateFileList(_file, {status: 'success', response: res.data})
            if(onSuccess){
                onSuccess(res.data,file)
            }
        }).catch(error=>{
            updateFileList(_file, { status: 'error', error})
            if(onError){
                onError(error,file)
            }
        }).finally(()=>{
            onChange&&onChange(file)
        })
    }
    const handleRemove=(file:UploadFile)=>{
        onRemove&&onRemove(file)
        const index=fileList.indexOf(file)
        const list =fileList.slice(0)
        list.splice(index,1)
        setFileList(list)
    }
    
    return (
        <>
            <div onClick={handleClick}>
                {drag?<Dragger onFile={(fileList:FileList)=>{uploadFiles(fileList)}}>{children}
                    </Dragger>:children}
                </div>
            <input type="file"
                 className="viking-file-input"
                 style={{display:'none'}}
                 ref={inputRef}
                 onChange={handleChange}
                 multiple={multiple}
                 accept={accept}
             />
            <UploadList fileList={fileList} onRemove={handleRemove}></UploadList>
        </>
    )
}

Upload.defaultProps={
    withCredentials:false,
    multiple:false
}

export default Upload