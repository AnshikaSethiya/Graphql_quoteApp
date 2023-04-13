import {quotes,users } from "./fakedb.js"
import bcrypt from "bcryptjs"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();
import jwt from "jsonwebtoken"

const User = mongoose.model("User")
const Quote = mongoose.model("Quote")

const resolvers  = {
    Query:{
        users : async () => await User.find({}),
        user:async (_,{_id}) => await User.findOne({_id}),  //users.find(user => user._id == _id),
        quotes: async () => await Quote.find({}).populate("by", "_id firstName"), 
        iquote: async (_,{by}) => await Quote.find({by}) //quotes.filter(quote => quote.by == by)
    },
    User:{
        quotes:async(ur) => await Quote.find({by:ur._id})//quotes.filter(quote => quote.by == ur._id)
    }, 
    Mutation:{
        signupUser: async (_,{userNew}) =>{
            const user = await User.findOne({email: userNew.email})

            if(user){
                throw new Error("User already exists!!")
            }

            const hashedPassword = await bcrypt.hash(userNew.password, 12)

            const newUser = new User({
                ...userNew,
                password: hashedPassword
            })

            return await newUser.save();
        },

        signinUser: async (_, {userSignin}) => {
            const user = await User.findOne({email: userSignin.email})
            if(!user){
                throw new Error("USer does not exist!!")
            }

            const passMatch = await bcrypt.compare(userSignin.password, user.password)

            if(!passMatch){
                throw new Error("invalid username or password!!")
            } 

            const token = jwt.sign({userId:user._id},process.env.JWT_SECRET)
            return {token}
        }, 
        createQuote: async (_, {name}, {userId}) => {
            if(!userId) throw new Error("User must log in first!!")
            const newQuote = new Quote({name, by:userId})
            await newQuote.save()
            
            return "Quote created successfully!! "
        }
    }
}

export default resolvers