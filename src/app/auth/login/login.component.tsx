"use client";

import { Formik } from "formik";
import { LogInForm } from "./login-form.component";
import { InitialValue, LoginCreate, LoginSchema } from "./form.config";
import { Card } from "@/components/ui/card";

import { signIn, useSession } from "next-auth/react";
import { AppTitle } from "@/healper/common-string";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const Login = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleSubmit = async (values: LoginCreate) => {
    await signIn("credentials", {
      redirect: false,
      ...values,
    });
  };

  useEffect(() => {
    if (status === "authenticated") {
      if (session?.user?.role === "ADMIN") {
        router.push("/admin");
      } else if (session?.user?.role === "USER") {
        router.push("/");
      }
    }
  }, [session]);

  return (
    <div className="h-screen bg-violet-100 flex flex-col items-center justify-center shadow-sm">
      <Card className="w-[600px] p-20">
        <div className="mb-6">
          <p className="text-3xl">{AppTitle}</p>
          <h4 className="font-semibold text-2xl mb-1">Welcome back.</h4>
        </div>
        <Formik
          initialValues={InitialValue}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          <LogInForm />
        </Formik>
        <div className="text-xs flex justify-between mt-6">
          <span>Not a member?</span>
          <span>
            <span
              className="cursor-pointer font-semibold"
              onClick={() => router.push("/auth/signin")}
            >
              Join{" "}
            </span>
            to unlock the best of products.
          </span>
        </div>
      </Card>
    </div>
  );
};
