'use client';

import { useSession } from "next-auth/react";

export default function AuthPage() {
    const { data: session, status } = useSession();

    // Manejar los diferentes estados de la sesión
    if (status === "loading") {
        return <p>Loading...</p>; // Muestra un mensaje mientras se carga la sesión
    }

    if (status === "unauthenticated") {
        return <p>You are not authenticated. Please log in.</p>; // Mensaje si no estás autenticado
    }

    // Mostrar un saludo si la sesión está disponible
    return (
        <>
            <p>Auth page</p>
            {session ? (
                <p>Hi! {session.user?.email}</p>
            ) : (
                <p>Session not found</p> // Maneja el caso donde 'session' es undefined
            )}
        </>
    );
}
