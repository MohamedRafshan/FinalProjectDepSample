import prisma from "@/lib/prismadb";
import Conversation from "./components/conversation";


const ConversationPage = async({params}) => {

    const userId = params.userId;


    const convList = await prisma.conversation.findMany({
        where:{
            userIds:{
                has:userId
            }
        },
        include: {
            messages: {
                orderBy: {
                    createdAt: 'desc'
                },
                take: 1
            }
        },
        orderBy:{
            lastMessageAt:'desc'
        }
    })


    const formattedConversations = await Promise.all(convList.map(async (conversation) => {
        const buyers = await prisma.buyer.findMany({
            where: {
                userId: {
                    in: conversation.userIds,
                    not: userId
                }
            },
            select: {
                userId: true,
                name: true,
                email: true,
                // Include other fields you need
            }
        });

        const sellers = await prisma.seller.findMany({
            where: {
                sellerid: {
                    in: conversation.userIds,
                    not: userId
                }
            },
            select: {
                sellerid: true,
                name: true,
                email: true,
                // Include other fields you need
            }
        });

        // Combine buyers and sellers into a single users array
        const users = [...buyers, ...sellers];

        return {
            ...conversation,
            users
        };
    }));


    return ( 
        <>
            <Conversation
                convList={formattedConversations}
                isDisplayMessages={false}
                currentConversation={formattedConversations[0]}
                Select={false}
            />
        </>
     );
}
 
export default ConversationPage;