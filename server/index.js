import express from 'express';
import cors from 'cors';
import mongoose, { Mongoose } from 'mongoose';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/session-chat', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const MessageSchema = new Mongoose.model({
    senderId: String,
    receiverId: String,
    content: String,
    timeStamp: { type: Date, default: Date.now }
})

const Message = mongoose.model('Message', MessageSchema)

// Storing message 
app.post('/api/message', async (req, res) => {
    const { senderId, receiverId, content } = req.body;
    const msg = new Message({ senderId, receiverId, content })
    await msg.save();
    res.status(200).json({ message: 'Stored' })
})

// Get message from the user
app.get('/api/message/:sessionId', async (req, res) => {
    const sessionId = req.params.sessionId;
    const message = await Message.find({receiverId : sessionId});
    res.json(message)
})

app.listen( 5000 , ()=> console.log(`Server running on port : ${5000}`))