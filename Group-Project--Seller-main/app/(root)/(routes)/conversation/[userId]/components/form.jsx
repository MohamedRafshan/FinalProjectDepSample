'use client'

import axios from "axios"
import { ImageUp ,SendHorizontal } from "lucide-react";
import { useForm,SubmitHandler,FieldValues } from "react-hook-form"
import {CldUploadButton} from "next-cloudinary";
import {useRouter,useParams } from 'next/navigation';

const FormMessage = ({conversationId,receiverId}) => {

    const router = useRouter();
    const {userId} = useParams();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({
        defaultValues:{
            message:"",
            
        }
    });

    const onSubmit = async (data) => {

        try{

            setValue("message","",{shouldValidate:true});
            await axios.post("/api/messages",{
                ...data,
                conversationId,
                receiverId
            
            })
        }catch(error){
            if (error.response && error.response.status === 404) {
                router.push(`/conversation/${userId}`);
            }
        }
        
    }

    const handleUplaod = async(result) =>{

        try {
            
          await axios.post("/api/messages",{
                image:result?.info?.secure_url,
                conversationId,
                receiverId
            })
        } catch (error) {
            
            if (error.response && error.response.status === 404) {
                router.push(`/conversation/${userId}`);
            }
        }
    }

    return ( 

        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex items-center w-full gap-4">
                <CldUploadButton
                    options = {{maxFiles :1}}
                    onSuccess={handleUplaod}
                    uploadPreset="o8jakbfq"
                >
                    <ImageUp 
                        size={40} 
                        className="text-muted-foreground p-2 ml-2 cursor-pointer hover:bg-gray-100 rounded-lg hover:text-blue-500"
                    />
                </CldUploadButton>
                <input 
                    type="text" 
                    name="message" 
                    required
                    {...register("message", { required: true })}
                    className="w-full p-1 text-sm px-2 rounded-lg border-0 bg-gray-200 focus:outline-none focus:border-none"
                    placeholder="Type a message"
                />
                <button type="submit" className="text-muted-foreground p-2 mr-2 cursor-pointer hover:bg-gray-100 rounded-lg hover:text-blue-500">
                    <SendHorizontal size={25}/>
                </button>
            </form>
        </div>

     );
}
 
export default FormMessage;