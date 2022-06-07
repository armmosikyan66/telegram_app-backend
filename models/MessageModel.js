import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
        default: "empty"
    },
    senderId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    receiverId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    roomId: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

const MessageModel = mongoose.model("Messages", MessageSchema);

export default MessageModel;