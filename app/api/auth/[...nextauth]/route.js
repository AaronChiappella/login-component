import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import {PrismaAdapter} from "@auth/prisma-adapter"
import {PrismaClient} from "@prisma/client"
import { debug } from "console"
import { NextResponse } from "next/server"
import {z} from "zod"

const prisma = new PrismaClient();


const logInSchema = z.object({
    email: z.string({
        required_error: "Email is required"
    }).email(),
    password: z.string({
        required_error: "Password is required"
    }).min(8).max(50)
    })


export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text", placeholder: "example@gmail.com" },
                password: { label: "password", type: "password", placeholder: "password" }
            },
            async authorize(credentials) {
                // Verifica que email y password estén presentes
                
                const resultValidation = logInSchema.safeParse(credentials)

                if(!resultValidation){
                    return null
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if (!user) {
                    return null;
                    
                }

                // Verifica que la contraseña sea correcta
                const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword);
                if (!passwordMatch) {
                    return  null;
                }

                return user;
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development'
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
