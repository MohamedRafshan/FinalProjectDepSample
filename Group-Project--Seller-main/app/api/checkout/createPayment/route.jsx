import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import md5 from 'crypto-js/md5';


export async function POST(req){


    try {
        const {userId} = auth();

        const body = await req.json();

        if(!userId){
            return new NextResponse("unauthorized",{ status: 401 })
        }
       

        const {

            first_name,
            last_name,
            email ,
            phone ,
            address ,
            city ,
            country ,
            items,
            currency,
            amount ,
            storeIds,
            productIds

        } = body

    
        let orderId = uuidv4(); // Generate unique order ID

        const merchantSecret = process.env.MERCHANT_SECRET;
        const merchantId = process.env.MERCHANT_ID;
        const domainUrl = process.env.DOMAIN_URL;
        const notify = process.env.NOTIFY_URL;

        let hashedSecret = md5(merchantSecret).toString().toUpperCase();
        let amountFormatted = parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2 }).replaceAll(',', '');
        let hashVal = md5(merchantId + orderId + amountFormatted + currency + hashedSecret).toString().toUpperCase();


        const payment = {
            merchant_id: process.env.MERCHANT_ID,
            return_url: `${domainUrl}/cart/${userId}`,
            cancel_url: `${domainUrl}/cart/${userId}`,
            notify_url: `${notify}/api/checkout/notifyPayment`,
            order_id: orderId,
            items:items,
            amount:amount,
            currency,
            first_name,
            last_name,
            email,
            phone,
            address,
            city,
            country,
            hash:hashVal
        }

        await prisma.order.create({
            data:{
                payId    : orderId,
                storeIds   :storeIds,
                buyerId   :userId,
                productIds:productIds,
                price     :parseFloat( amount ),
                status    :"PENDING"
            }
        })

        await prisma.product.updateMany({
            where:{
                id:{
                    in:productIds
                }
            },
            data:{
                orderIds:{
                    push:orderId
                }
            }
        
        })

        return NextResponse.json(payment);


    } catch (error) {
        return new NextResponse("error in the post create payment",{status:500})
    }
}