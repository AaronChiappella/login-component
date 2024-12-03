import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import {PrismaAdapter} from "@auth/prisma-adapter"
import {PrismaClient} from "@prisma/client"
import { debug } from "console"
import { NextResponse } from "next/server"
import {z} from "zod"
import GoogleProvider from "next-auth/providers/google";


const prisma = new PrismaClient();


const logInSchema = z.object({
    username: z.string({
        required_error: "Username is required"
    }),
    password: z.string({
        required_error: "Password is required"
    }).min(8).max(50)
    })


export const authOptions = {
   // adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: { label: "username", type: "text", placeholder: "username-example" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials) {
                // Verifica que username y password estén presentes
                
                const resultValidation = logInSchema.safeParse(credentials)

                if(!resultValidation.success){
                    return null
                }

                const user = await prisma.user.findUnique({
                    where: {
                        username: credentials.username
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
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
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
