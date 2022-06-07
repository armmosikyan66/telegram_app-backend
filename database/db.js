import mongoose from "mongoose";

mongoose.connect(`mongodb+srv://Arman:Armmosikyan2005@cluster0.js0ps.mongodb.net/?retryWrites=true&w=majority`, () => {
    console.log("database has been connected");
});

mongoose.connection.on('error', console.error.bind(console, 'connection error'));

export default {connection: mongoose.connection, Types: mongoose.Types}