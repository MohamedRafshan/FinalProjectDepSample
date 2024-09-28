import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

export const pusherServer = new PusherServer({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: "mt1",
    useTLS: true
});

export const pusherClient = new PusherClient(

    "99002f56fc413d9d8a86",
    
    {
        cluster: "mt1",
        forceTLS: true,
        channelAuthorization: {
            endpoint: '/api/pusher/auth',
            transport: 'ajax',
            headers: {
                'Content-Type': 'application/json',
            }
        }
    },
);