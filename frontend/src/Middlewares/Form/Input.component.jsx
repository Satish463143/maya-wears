import {useController} from "react-hook-form"
import Select from 'react-select'
import '../../pages/AdminPage/CMSLayout.css'
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

export const SelectInputField = ({options,control,name,defaultValue,errMsg})=>{
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
export const SelectComponent = ({options,control,name,defaultValue,errMsg})=>{
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
            <Select options={options} {...field} isClearable />
            <span style={{color:'red', fontStyle:'italic'}}>
                {errMsg}
            </span>
        </>
    )
}
export const OptionsCompoentt = ({control,name,errMsg,required})=>{
    return(
        <>
            <SelectComponent 
                options ={
                    [{label:"Active", value:"active"},{label:"Inactive", value:"inactive"}]
                }
                control={control}
                name={name}
                errMsg={errMsg}
                required={required}
            />
        </>
    )
}
export const CategoryOptionsCompoent = ({control,name,errMsg,required,onChange,value})=>{
    return(
        <>
            <SelectComponent 
                options ={
                    [{label:"Image", value:"image"},{label:"Video", value:"video"}]
                }
                control={control}
                onChange={onChange}  
                name={name}
                errMsg={errMsg}
                required={required}
                value={value || ""}
            />
        </>
    )
}

export const SubmitButton = ({loading=false,value})=>{
    return (

        <>
            <input className="submit_btn" type="submit" value={value}  disabled={loading}/>   
        </>
    )
}