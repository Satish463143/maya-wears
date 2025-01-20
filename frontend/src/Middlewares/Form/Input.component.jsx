import { useController } from 'react-hook-form'
import Select from 'react-select'
import { Editor } from '@tinymce/tinymce-react';
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

export const DescriptionInput = ({ type = "text", control, name, defaultValue = "",  errMsg = null,}) => {
    const { field } = useController({
        control:control,
        name:name,
        defaultValue: defaultValue,
        // rules: { required },
    });
    const handleEditorChange = (content) => {
        field.onChange(content); // Update the form value in React Hook Form
    };
    

    return (
        <>           
            <Editor
                apiKey="yuzlcp10h3jo0z3gne1gkc2fubxfufx3q1jp5q041aqu0qgg"
                init={{
                height: 150,
                menubar: false,
                plugins: ['link', 'table', 'lists', 'image'],
                toolbar:
                    'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image',
                }}
                
                value={field.value || ""}
                onEditorChange={handleEditorChange}
            />
            
            <br />
            {errMsg && <span style={{ color: 'red', fontStyle: 'italic' }}>{errMsg}</span>}
        </>
    );
};

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
export const FeaturedOptionsCompoent = ({control,name,errMsg,required,onChange,value})=>{
    return(
        <>
            <SelectComponent 
                options ={
                    [{label:"Yes", value:"true"},{label:"No", value:"false"}]
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
export const WearableOptionsCompoent = ({control,name,errMsg,required,onChange,value})=>{
    return(
        <>
            <SelectComponent 
                options ={
                    [{label:"Summer", value:"Summer"},{label:"Winter", value:"Winter"},{label:"Both", value:"Summer and Winter"}]
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
export const PaymentOptionsCompoent = ({control,name,errMsg,required,onChange,value})=>{
    return(
        <>
            <SelectComponent 
                options ={
                    [{label:"Cash on delivery", value:"Cash on delivery"},{label:"Pay by E-sewa", value:"Esewa"}]
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
export const OrderStatusOptionsCompoent = ({control,name,errMsg,required,onChange,value})=>{
    return(
        <>
            <SelectComponent 
                options ={
                    [{label:"Pending", value:"pending"},{label:"Shipped", value:"shipped"},{label:"Canceled", value:"canceled"},{label:"Delevered", value:"delevered"}]
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