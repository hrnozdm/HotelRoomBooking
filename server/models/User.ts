import { Schema,model } from "mongoose";
import bcrypt from 'bcrypt';

interface IUser{
    username:string;
    password:string;
    role:'admin'|'customer';
}

const userSchema = new Schema<IUser>({
   username:{
     type:String,
     required:true,
     unique:true
   },
   password:{
     type:String,
     required:true
   },
   role:{
     type:String,
     enum:['admin','customer'],
    default:'customer'
   }
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


export default model<IUser>('User', userSchema);