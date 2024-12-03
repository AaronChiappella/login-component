"use client";

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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import BackgroundComponent from "@/components/ui/background";

export default function LoginPage() {
  const router = useRouter();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  const loginUserCredentials = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verificar campos vacíos
    if (!data.username || !data.password) {
      setError("Por favor completa todos los campos.");
      return;
    }

    // Intentar inicio de sesión
    const result = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (result?.ok) {
      router.push("/auth"); // Redirigir si el inicio de sesión es exitoso
    } else {
      // Establecer mensaje de error según el problema
      if (result?.error === "CredentialsSignin") {
        setError("Usuario o contraseña incorrectos.");
      } else {
        setError("Usuario no registrado o error inesperado.");
      }
    }
  };

  const loginUserGoogle = async () => {
    signIn("google", { callbackUrl: "/auth" });
  };

  return (
    <>
    <BackgroundComponent></BackgroundComponent>
    <form onSubmit={loginUserCredentials} className="context">
      <div className="flex h-screen w-full  items-center justify-center px-4">
        <Card className="mx-auto max-w-sm w-full bg-white">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Login</CardTitle>
           
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  loginUserGoogle();
                }}
                className="w-full"
              >
                Iniciar con Google
                <img
    src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
    alt="American Express Logo"
    className="w-5 h-5 me-2 m-2"
  />
              </Button>
        

              <p className="text-center text-sm"> Or </p>
              <div className="grid gap-2">
                <Label htmlFor="username"  className="font-semibold">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="example@example.com"
                  onChange={(e) => setData({ ...data, username: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password"  className="font-semibold">Password</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    ¿Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}{" "}
              {/* Mostrar errores */}
              <Button type="submit" className="w-full bg-blue-500 font-semibold">
                Log In
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              ¿Don't have an account?{" "}
              <Link href="/register" className="underline">
                Regístrate
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>


</>
  );
}
