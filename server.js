import { ApolloServer } from "apollo-server"
import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core"
import typeDefs from "./schemaGql.js"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
import jwt from "jsonwebtoken"

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
})

mongoose.connection.on("connected", () => {
    console.log("connected to mongodb")
})

mongoose.connection.on("error", (err) => {
    console.log("error in connection", err)
})

//import models here
import "./Models/Quotes.js"
import "./Models/Users.js"
import resolvers from "./resolvers.js"

//this is middleware
const context = ({req}) => {
    const {authorization} = req.headers
    if(authorization){
        const {userId} = jwt.verify(authorization, process.env.JWT_SECRET)
        return {userId}
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    plugins:[
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
})

server.listen().then(({url}) => {
    console.log(`Server is up at ${url}`)
})