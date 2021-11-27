import React, { FC } from "react";
import Icon from "../Icon/icon";
import {UploadFile} from './upload'
import Progress from '../Progress/progress'
interface UploadListProps{
    fileList?:UploadFile[]
    onRemove:(_file:UploadFile)=>void
}
const UploadList:FC<UploadListProps>=(props)=>{
    const {fileList,onRemove}=props
    return(
        <ul className="viking-upload-list">
            {fileList?.map((file,index)=>{
                return(
                    <li className="viking-upload-list-item" key={file.uid}>
                        <span className={`file-name file-name-${file.status}`}>
                            <Icon icon="file-alt" theme="secondary"></Icon>
                            {file.name}
                        </span>
                        <span className="file-status">
                            {file.status==='success'&&<Icon icon="check-circle" theme="success" />}
                            {file.status==='error'&&<Icon icon="times-circle" theme="danger" />}
                            {file.status==='uploading'&&<Icon icon="spinner" spin theme="primary"/>}
                        </span>
                        <span className="file-actions">
                            <Icon icon="times" onClick={()=>{ onRemove(file)}} ></Icon>
                        </span>
                        {file.status==='uploading'&&<Progress percent={file.percent} height={3}></Progress>}
                    </li>
                )
            })}
        </ul>
    )
}

export default UploadList