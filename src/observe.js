function updateView(){
    console.log("update view");
}
const defineReactive=(target,key,value)=>{
    observe(value)
    Object.defineProperty(target,key,{
        get(){
            return value
        },
        set(newValue){
            if(newValue!==value){
                observe(newValue)
                value =newValue
                updateView()
            }
        }
    })
}
const observe=(target)=>{
    if(typeof target!=='object' ||target===null){
        return target
    }
    Object.keys(target).forEach(item=>{
        defineReactive(target,item,target[item])
    })
}
const data={
    name:'tom',
    age:11,
    info:{
        msg:'message'
    }
}
observe(data)
const debounce=(cb,delay,immediate)=>{
    let timer
    return function(){
        let args=arguments
        clearTimeout(timer)
        if(immediate){
            let flag=!timer
            timer=setTimeout(() => {
                timer=null
            }, delay);
            if(flag) cb.apply(this,args)
        }else{
            timer=setTimeout(()=>{
                timer=null
                cb.apply(this,args)
            },delay)
        }   
    }
}
const throttle=(fn,delay)=>{
    let time=0;
    return function(){
        let now=Date.now()
        if(now-time>delay){
            fn.apply(this,arguments)
            time=now
        }
    }
}