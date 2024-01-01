import { Schema, model } from "mongoose";

const messageSchema= new Schema({
  user:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  userStatus:{
     type: String,
     required:true
  },
  content:{
    type: String,
    required: true
  }
},
{timestamps:true});

const Message= model('Message', messageSchema);

export default Message;