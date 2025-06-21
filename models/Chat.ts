import mongoose, { Schema, model, models } from "mongoose";

export interface Chat {
  _id?: mongoose.Types.ObjectId;
  userId:string;
  prompt: string;
  response: string;
}

const chatSchema = new Schema<Chat>(
  {
    userId: { type: String, required: true },
    prompt: { type: String, required: true },
    response: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Chat = models.Chat || model<Chat>("Chat", chatSchema);
export default Chat;
