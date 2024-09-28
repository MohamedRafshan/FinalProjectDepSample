import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import md5 from 'crypto-js/md5';
import qs from 'querystring';


export async function POST(req) {
    try {
        const body = await req.text();
        const params = qs.parse(body);

        const {
            merchant_id,
            order_id,
            payhere_amount,
            payhere_currency,
            status_code,
            md5sig
        } = params;

        const merchantSecret = process.env.MERCHANT_SECRET;

        // Format the amount correctly
        const amountFormatted = parseFloat(payhere_amount).toFixed(2).replace(/,/g, '');
        

        // Calculate the hash value
        const hashedSecret = md5(merchantSecret).toString().toUpperCase();
        const hashString = `${merchant_id}${order_id}${amountFormatted}${payhere_currency}${status_code}${hashedSecret}`;
        const hashVal = md5(hashString).toString().toUpperCase();

        if (hashVal !== md5sig) {
            return new NextResponse("Invalid MD5 signature", { status: 400 });
        }

        let newStatus;
        switch (parseInt(status_code, 10)) {
            case 2:
                newStatus = "SUCCESS";
                break;
            case 0:
                newStatus = "PENDING";
                break;
            case -1:
                newStatus = "CANCELED";
                break;
            case -2:
                newStatus = "FAILED";
                break;
            case -3:
                newStatus = "CHARGEDBACK";
                break;
            default:
                return new NextResponse("Invalid status code", { status: 400 });
        }

        // Update the order status in the database
        await prisma.order.update({
            where: { payId: order_id },
            data: {
                status: newStatus
            }
        });

       

        return new NextResponse("Payment status updated", { status: 200 });

    } catch (error) {
        console.error("Error inside the notify:", error);
        return new NextResponse("Error processing payment notification", { status: 500 });
    }
}
