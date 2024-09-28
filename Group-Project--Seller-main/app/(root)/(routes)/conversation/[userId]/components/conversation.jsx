'use client'

import { useMemo,useState,useEffect} from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import BadgeAvatars from "./avatar";
import {  ArrowLeft , ChevronLeft, MoreHorizontal, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import ConvItem from "./convItem";
import MessageBody from "./messageBody";
import FormMessage from "./form";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import AlertModal from "@/components/modals/alert-modal";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import {pusherClient} from "@/lib/pusher";
import { Button } from "@/components/ui/button";


const Conversation = ({convList,isDisplayMessages,currentConversation,Select}) => {

    const [converList,setConverList] = useState(convList);
    const [delOpen,setDelOpen] = useState(false);
    const [open , setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const {userId} =useParams();

    const handleOpen = () => {
        setOpen(!open);
    }

    useEffect(() => {

        if (!currentConversation || !currentConversation.id) return;
        pusherClient.subscribe(currentConversation.id)

        const deleteConvHandler = (deletedConv) => {
            setConverList((current) => 
                current.filter(conv => conv.id !== deletedConv.id)
            );
        };

        pusherClient.bind('delete:new', deleteConvHandler)


        return () => {
            pusherClient.unsubscribe(currentConversation.id);
            pusherClient.unbind('delete:new', deleteConvHandler);
            
            if (!currentConversation) {
                router.push(`/conversation/${userId}`);
            }
            
        }
                    

    },[currentConversation?.id])


    useEffect(() => {
        if (!currentConversation) {
            router.push(`/conversation/${userId}`);
        }
    }, [currentConversation,convList]);


    useEffect(() => {
        if (!userId) return;
        pusherClient.subscribe(userId)

        const convListhandler = (conv) => {
            setConverList((current) => {
                if (find(current, { id: conv.id })) {
                    return current;
                }
                return [...current, conv];
            });
        };

        pusherClient.bind('conversation:new', convListhandler);

        return () => {
            pusherClient.unsubscribe(userId);
            pusherClient.unbind('conversation:new', convListhandler);
        };

    },[convList.length,userId]);


    const handleDelete = async() => {
        try {
            setLoading(true);

            await axios.delete(`/api/conversation/delete/${currentConversation.id}`)

            router.push(`/conversation/${userId}`);
      
            toast.success("Deleted successfully");

        } catch (error) {
            toast.error(
                "Something went wrong!"
              );
        }finally {
            setLoading(false);
            setDelOpen(false);
          }
    }
    
    const Getname = useMemo(() => {
        if (currentConversation) {
            const user = convList.find((conv) => conv.id === currentConversation.id);
            return user.users[0].name.split(' ')[0];
        }
        return '';
    }, [convList, currentConversation]);

    const GetId = useMemo(() => {
        if (currentConversation) {
            const user = convList.find((conv) => conv.id === currentConversation.id);
            return user.users[0].sellerid || user.users[0].userId;
        }
        return '';
    }, [convList, currentConversation]);


    return ( 
        <>
            <AlertModal
                isOpen={delOpen}
                onClose={() => setDelOpen(false)}
                onConfirm={() => handleDelete()}
                loading={loading}
                description="Are you sure you want to delete this chat? This action cannot be undone"
            />
        <div>
            <div className="flex w-full">
                <ScrollArea className={cn("h-[100vh] hidden md:flex md:w-96 rounded-md border bg-gray-200",
                    open ? "flex w-3/4": "hidden"
                )}>
                    <div className="p-5">
                        <div>
                            <div className="absolute w-full bg-gray-200">
                                <div className="flex flex-row items-center gap-2 mb-3">
                                    <ArrowLeft  className="w-10 h-7  hover:bg-gray-300 text-bold rounded-lg cursor-pointer" onClick={() => router.back()}/>
                                    <h4 className="text-2xl font-bold leading-none flex">Chats (<p className="font-semibold text-xl">{convList.length}</p>)</h4>
                                </div>
                                <Separator className="bg-gray-400"/>
                            </div>
                        </div>
                        <div className="mt-10">  </div>
                        {converList.map((conv, index) => (
                            <ConvItem key={index} conversation={conv} currentCovId ={ Select ? currentConversation.id : ""} />
                        ))}
                        {converList.length === 0 && (
                            <div className="flex items-center justify-center h-[100vh]">
                                <p className="text-gray-500">No chats available</p>
                            </div>
                        )}
                    </div>
                </ScrollArea>
                <ScrollArea className="h-[100vh] w-full rounded-md border">
                { isDisplayMessages ?
                    <>
                        {currentConversation && 
                        <div className="absolute w-full  bg-white z-10">
                            <div className="flex items-center justify-between bg-white">
                                <div className="p-3 px-4 flex">
                                    <ChevronLeft className="flex md:hidden w-8 h-8 cursor-pointer text-gray-600 self-center mr-5"
                                        onClick={handleOpen}
                                    />
                                    <BadgeAvatars user ={Getname}/>
                                    <div className="px-4 p-1">
                                        <h4 className="text-lg font-semibold leading-none">{Getname}</h4>
                                        <p className="text-gray-500 text-xs">last seen at {format(new Date(currentConversation.lastMessageAt), 'h:mm a')}</p>
                                    </div>
                                </div>
                                <div className={cn("px-5",open ? "hidden" : "flex")}>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <MoreHorizontal className="cursor-pointer text-gray-600"/>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56">
                                            <DropdownMenuItem onClick={() => setDelOpen(true)}>
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                <span>Delete Chat</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                            <Separator/>
                        </div>
                    }
                    <div className="mt-20"></div>
                    {currentConversation &&<MessageBody currentCov ={currentConversation} OtherUserName ={Getname} receiverId ={GetId}/>}
                    <div className="mb-20"></div>
                    <div className="absolute bottom-0 w-full bg-white">
                        <Separator/>
                        {currentConversation && <FormMessage conversationId={currentConversation.id} receiverId ={GetId}/>}
                    </div>
                    </> 
                    : 
                    <div className="flex items-center justify-center h-[100vh]">
                        <h1 className ="text-2xl text-muted-foreground font-semibold">No Conversation Started</h1>
                    </div>
                    }
                </ScrollArea>
            </div>
        </div>
        </>
     );
}
 
export default Conversation;



