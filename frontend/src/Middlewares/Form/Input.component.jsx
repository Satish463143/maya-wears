import {useController} from "react-hook-form"
export const TextInputComponent = ({type="text",control,name, defaultValue="",required=false, errMsg= null})=>{
    const {field} = useController({
        control:control,
        name:name,
        defaultValue:defaultValue,
        // rules:{
        //     required:required
        // }
    })
    return (
        <>
            <input
                type={type}
                {...field}                
            /> <br />
            <span style={{color:'red', fontStyle:'italic'}}>
                {errMsg}
            </span>
        </>
    )

}

export const TextAreaInput = ({control,name, defaultValue="",required=false, errMsg= null,row=5})=>{
    const {field} = useController({
        control:control,
        name:name,
        defaultValue:defaultValue,
        // rules:{
        //     required:required
        // }
    })
    return (
        <>
            <textarea  rows={row} {...field}>
                {defaultValue}                
            </textarea><br />
            <span style={{color:'red', fontStyle:'italic'}}>
                {errMsg}
            </span>
        </>
    )
}

export const SelectInputField = ({options,control,name,defaultValue,errMsg,required})=>{
    const {field} = useController({
        control:control,
        name:name,
        defaultValue:defaultValue,
        // rules:{
        //     required:required
        // }
    })

    return (
        <>
            <select 
                {...field}
            >
                {
                    options && options.map((row, i)=>(
                        <options key={i} value={row.value}></options>
                    ))   
                }
            </select><br />
            <span style={{color:'red', fontStyle:'italic'}}>
                {errMsg}
            </span>
        </>
    )
}
export const OptionsCompoentt = ({control,name,errMsg,required})=>{
    return(
        <>
            <SelectInputField 
                options ={
                    [{label:"Image", value:"image"},{label:"Video", value:"video"}]
                }
                control={control}
                name={name}
                errMsg={errMsg}
                required={required}
            />
        </>
    )
}