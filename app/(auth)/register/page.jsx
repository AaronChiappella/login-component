"use client";

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
import BackgroundComponent from "@/components/ui/background";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const router = useRouter();
  const [data, setData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const userInfo = await response.json();
      router.push("/login");
    } else {
      const error = await response.text();
      console.error("Registration error:", error);
    }
  };

  const loginUserGoogle = async () => {
    signIn("google", { callbackUrl: "/auth" });
  };

  return (
    <>
      <BackgroundComponent></BackgroundComponent>
      <form onSubmit={registerUser}>
        <div className="flex h-screen w-full items-center justify-center px-4">
          <Card className="mx-auto max-w-sm w-full context bg-white">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
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
                  Continue with Google{" "}
                  <img
                    src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
                    alt="American Express Logo"
                    className="w-5 h-5 me-2 m-2"
                  />
                </Button>

                <p className="text-center text-sm"> Or </p>

                <div className="grid gap-2">
                  <Label htmlFor="username " className="font-semibold">
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="username-example"
                    required
                    onChange={(e) =>
                      setData({ ...data, username: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password" className="font-semibold">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword" className="font-semibold">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPpassword"
                    type="password"
                    placeholder="Confirm Password"
                    required
                    onChange={(e) =>
                      setData({ ...data, confirmPassword: e.target.value })
                    }
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-blue-500 font-semibold"
                >
                  Sign Up
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
    </>
  );
}
