//REQUEST AND RESOLVE THE RegisterUser in '/register/page.tsx'

import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { z } from "zod"
import { sign } from "crypto";
import { signIn } from "next-auth/react";

const prisma = new PrismaClient();

const signUpSchema = z.object({
    username: z.string({
        required_error: "Username is required"
    }),
    password: z.string({
        required_error: "Password is required"
    }).min(8).max(50),
    confirmPassword: z.string({ required_error: "Confirm password is required" }).min(8).max(50)
}).refine(data => data.password === data.confirmPassword, {
    message: "Password doesnt match.",
    path: ["confirmPassword"]
})





export async function POST(request) {

    const body = await request.json();
    const { username, password, confirmPassword } = body;

    const resultValidation = signUpSchema.safeParse(body)

    if (!resultValidation.success) {
        return NextResponse.json(resultValidation.error)
    }

    if (!username || !password) {
        return new NextResponse("Missing username or password", { status: 400 })
    }

    const exist = await prisma.user.findUnique({
        where: {
            username: username,
        }
    })

    if (exist) {
        return new NextResponse("User already exist", { status: 400 })

    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            username,
            hashedPassword
        }
    })

    return new NextResponse(JSON.stringify(user))

}


