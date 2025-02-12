import { JWT_SECRET } from '@repo/backend-common/config';
import express from "express"; 
import jwt, { JwtPayload } from "jsonwebtoken";
import { middleware } from "./middleware";
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from "@repo/common/types";
import { prismaClient } from '@repo/db/client';

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {

    const parsedData = CreateUserSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message: "Incorrect Inputs"
        })
        return;
    }
    try{
        const user = await prismaClient.user.create({
            data: {
                email: parsedData.data?.username,
                //Pending: Hash the pwd
                password: parsedData.data.password,
                name: parsedData.data.name
            }
        })
        res.json({
            userId: user.id
        })
    } catch(e) {
        // console.log(e);
        res.status(411).json({
            message: "User already exists with this username."
        })
    }
})

app.post("/signin", async (req, res) => {

    const parsedData = SigninSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message: "Incorrect Inputs"
        })
        return;
    }
    
    //Pending: Compare the Hashed pwd
    const user = await prismaClient.user.findFirst({
        where:{
            email: parsedData.data.username,
            password: parsedData.data.password
        }
    })

    if(!user){
        res.status(403).json({
            message: "Not authorized"
        })
        return;
    }
    
    const token = jwt.sign({
        userId: user?.id
    }, JWT_SECRET)

    res.json({
        token
    })

})

app.post("/room", middleware, async (req, res) => {

    const parsedData = CreateRoomSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message: "Incorrect Inputs"
        })
        return;
    }
    const userId = (req as JwtPayload).userId

    await prismaClient.room.create({
        data:{
            slug: parsedData.data.name,
            adminId: userId
        }
    })

    res.json({
        roomId: 123
    })

})

app.listen(3001);