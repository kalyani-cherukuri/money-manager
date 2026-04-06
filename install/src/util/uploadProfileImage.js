import { API_ENDPOINTS } from "./apiEndpoints";

const CLOUDINARY_UPLOAD_PRESET="moneymanager";
const uploadProfileImage=async(image)=>{
    const formData=new FormData;
    formData.append("file",image);
    formData.append("upload_preset",CLOUDINARY_UPLOAD_PRESET);
    try{
        fetch(API_ENDPOINTS .UPLOAD_IMAGE,{
            method:"POST",
            body:formData
        });
        if(!Response.ok){
            const errorData=await Response.json()
            throw new Error(`Cloudinary upload failed:${errorData.error.message||Response.statusText}`); 
        }
        const data=await Response.json();
        console.log('image uploaded successfully',data);
        return data.secure_url;
    }catch(error){
        console.error("error uploading the image",error);
        throw error;
    }
}