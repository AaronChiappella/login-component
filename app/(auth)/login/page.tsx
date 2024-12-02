'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";


export default function LoginPage() {
  const router = useRouter();
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verificar campos vacíos
    if (!data.email || !data.password) {
      setError("Por favor completa todos los campos.");
      return;
    }

    // Intentar inicio de sesión
    const result = await signIn('credentials', {
      ...data,
      redirect: false,
    });

    if (result?.ok) {
      router.push("/auth"); // Redirigir si el inicio de sesión es exitoso
    } else {
      // Establecer mensaje de error según el problema
      if (result?.error === "CredentialsSignin") {
        setError("Correo o contraseña incorrectos.");
      } else {
        setError("Usuario no registrado o error inesperado.");
      }
    }
  };

  return (
    <form onSubmit={loginUser}>
      <div className="flex h-screen w-full  items-center justify-center px-4">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Ingresa tu email y contraseña para acceder a tu cuenta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">

            <Button variant="outline" className="w-full">
                Iniciar con Google
              </Button>

              <Button variant="outline" className="w-full">
                Iniciar con Twitter
              </Button>

              <Button variant="outline" className="w-full">
                Iniciar con Github
              </Button>


            <p className="text-center text-sm"> Or </p>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@example.com"
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="ml-auto inline-block text-sm underline">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                />
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>} {/* Mostrar errores */}

              <Button type="submit" className="w-full">
                Iniciar Sesión
              </Button>
              
           
            </div>
            <div className="mt-4 text-center text-sm">
              ¿No tienes una cuenta?{" "}
              <Link href="/register" className="underline">
                Regístrate
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
