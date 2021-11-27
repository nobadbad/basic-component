import { RefObject, useEffect } from "react"

const useClickOutside=(compRef:RefObject<HTMLElement>,fn:Function)=>{
    useEffect(()=>{
        const handleClick=(e:MouseEvent)=>{
            if(!compRef.current||compRef.current.contains(e.target as HTMLElement)){
                return
            }
            fn()
        }
        window.addEventListener('click',handleClick)
        return ()=>{
            window.removeEventListener('click',handleClick)
        }
    },[compRef,fn])
}

export default useClickOutside