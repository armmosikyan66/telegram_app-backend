import mongoose from "mongoose";

mongoose.connect(`MONGO_URL`, () => {
    console.log("database has been connected");
});

mongoose.connection.on('error', console.error.bind(console, 'connection error'));

export default {connection: mongoose.connection, Types: mongoose.Types}
