'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "../../globals.css";


export default function RegisterPage() {
    const router = useRouter();
    const [data, setData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });


    const registerUser = async (e) => {
        e.preventDefault();

        
        
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    
        if (response.ok) {
            const userInfo = await response.json();
            router.push('/login');
        } else {
            const error = await response.text();
            console.error('Registration error:', error);
        }
    };
    


    return (
        <form onSubmit={registerUser}>
            <div className="flex h-screen w-full items-center justify-center px-4">
                <Card className="mx-auto max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Register</CardTitle>
                        <CardDescription>
                            Enter your email and password below to create an account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="example@example.com"
                                    required
                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    required
                                    onChange={(e) => setData({ ...data, password: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="repeated-password">Repeat Password</Label>
                                <Input
                                    id="repeated-password"
                                    type="password"
                                    placeholder="Repeat Password"
                                    required
                                    onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Register
                            </Button>
                            <Button variant="outline" className="w-full">
                                Login with Google
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link href="/login" className="underline">
                                Login
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </form>
    );
}
