import React, { CSSProperties, FC } from "react";
import { ThemeProps } from '../Icon/icon'
interface ProgressProps{
    height?:number;
    showText?:boolean;
    percent:number;
    theme?:ThemeProps;
    styles?:CSSProperties
}
const Progress:FC<ProgressProps>=(props)=>{
    const { height, showText, percent, theme, styles} = props

    return(
        <div className="viking-progress-bar" style={styles}>
            <div className="viking-progress-bar-outer" style={{height:`${height}px`}}>
                <div 
                    className={`viking-progress-bar-inner color-${theme}`}
                    style={{width:`${percent}%`}}>
                    {showText&&<span className="inner-text">{`${percent}%`}</span>}
                </div>
            </div>
        </div>
    )
}
Progress.defaultProps={
    height:10,
    theme:'primary',
    showText:true
}
export default Progress