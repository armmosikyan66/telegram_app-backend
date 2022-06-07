import MessageModel from "../models/MessageModel";

class MessageController {
    async getMessages(req, res) {
        try {
            const arr = req.params.id.split("-");

            const senderId = arr[0];
            const receiverId = arr[1];

            const messages = await MessageModel
                .find({$or: [{senderId, receiverId}, {senderId: receiverId, receiverId: senderId}]})
               // .limit(10)
                .sort({"created_at": 1});

            res.status(201).json(messages);
        } catch (e) {
            res.status(400);
        }
    }

    async createMessage({senderId, receiverId, message}) {
        try {
            const createdMessage = await MessageModel.create({message, senderId, receiverId});

            return {createdMessage};
        } catch (e) {
            console.log(e)
        }
    }

}

export default new MessageController();