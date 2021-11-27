import React, { CSSProperties, DragEvent, FC, useState } from "react";
import classNames from "classnames";

interface DraggerProps{
  onFile:(fileList:FileList)=>void
  styles?:CSSProperties
}
const Dragger:FC<DraggerProps>=(props)=>{
  const {onFile, styles,children} = props
  const [drag,setDrag]=useState(false)
  const classes=classNames('viking-uploader-dragger',{
    'is-dragover':drag
  })
  const handleDrag=(e:DragEvent<HTMLElement>,over:boolean)=>{
    e.preventDefault()
    setDrag(over)
  }
  const handleDrop=(e:DragEvent<HTMLElement>)=>{
    e.preventDefault()
    onFile(e.dataTransfer.files)
  }
  return (
    <div 
    className={classes} 
    style={styles}
    onDragOver={(e)=>{handleDrag(e,true)}}
    onDragLeave={(e)=>{handleDrag(e,false)}}
    onDrop={handleDrop}
    >
      {children}
    </div>
  )
}
export default Dragger