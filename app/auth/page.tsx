'use client';

import Navbar from "@/components/ui/navbar";
import { useSession } from "next-auth/react";

export default function AuthPage() {
    const { data: session, status } = useSession();

    // Mostrar un saludo si la sesión está disponible
    return (
        <>
        <Navbar></Navbar>
        {session ? (
            <p className="text-center text-2xl pt-10">Hi! {session.user?.name}</p>
        ) : (
            <p className="text-center text-2xl pt-10">You are currently not authenticated</p>
        )}
            



        </>
    );
}
