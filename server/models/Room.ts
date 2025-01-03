import { Schema,model } from "mongoose";

interface IRoom{
    type:'Basic'|'Premium'| 'Suite';
    number:number;
    isAvailable:boolean;
}

const roomSchema = new Schema<IRoom>({
   type:{
     type:String,
     enum:['Basic','Premium','Suite'],
     required:true
   },
   number:{
     type:Number,
     required:true
   },
   isAvailable:{
     type:Boolean,
     required:true
   }
});


export default model<IRoom>('Room',roomSchema);