import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import http from 'http';
import dotenv from 'dotenv';

dotenv.config();
import {Server} from "socket.io";

import './database/db.js';
import router from "./routes/router.js";
import MessageController from "./controllers/MessageController";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});
const socketInstances = new Map();

app.use(cors({origin: '*'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(router);

io.on('connection', (socket) => {
    console.log('a user connected: ' + socket.id);

    socket.on('setSocketId', function (data) {
        socketInstances.set(data, socket.id);
    });

    socket.on("addMessage", async (message) => {
        if (message && message.senderId && message.receiverId && message.message && message.message.length) {
            const newMessage = await MessageController.createMessage(message);

            console.log(message.receiverId);
            io.emit('newMessage', newMessage);
        }
    })

    socket.on("status", async (status) => {
        if (socketInstances.get(status)) {
            io.emit("status", {status: "online"})
        } else {
            io.emit("status", {status: "offline"});
        }
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(5000, () => {
    console.log(`Server running on port 5000`);

})