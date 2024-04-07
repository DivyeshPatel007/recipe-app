"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { actionLogin, actionRegister } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";

type AuthFormProps = {
  mode: "login" | "register";
};

const registerFormSchema = z
  .object({
    firstname: z
      .string()
      .min(3, { message: "firstname must contain at least 3 char" })
      .max(25, { message: "firstname must contain at most 25 char" }),
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        {
          message:
            "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.",
        }
      )
      .max(50),
    confirmPassword: z.string().min(8).max(50),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SubmitType = {
  type: "login" | "register";
};

export function SubmitButton({ type }: SubmitType) {
  const { pending } = useFormStatus();

  const text = type === "login" ? "Login" : "Register";
  return (
    <Button className="w-full mt-5" type="submit" aria-disabled={pending}>
      {pending ? "loading" : text}
    </Button>
  );
}

function AuthForm({ mode }: AuthFormProps) {
  const action = mode === "register" ? actionRegister : actionLogin;
  const [state, dispatch] = useFormState(action, {
    message: null,
    errors: {},
  });
  const router = useRouter();
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  if (state.message) {
    toast(state.message);
    console.log("STATE", state);
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen  ">
      <Form {...form}>
        <form
          action={dispatch}
          className="border border-slate-200 flex flex-col items-center min-h-[300px] p-4 rounded-md shadow-md"
        >
          {mode === "register" ? (
            <h1 className="text-2xl font-semibold">Register</h1>
          ) : (
            <h1 className="text-2xl font-semibold">Login</h1>
          )}
          {mode === "register" && (
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {mode === "register" && (
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormControl>
                    <Input
                      placeholder="Confirm password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <SubmitButton type={mode} />
          {mode == "register" ? (
            <span
              className="cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Login
            </span>
          ) : (
            <span
              className="cursor-pointer"
              onClick={() => router.push("/register")}
            >
              Register
            </span>
          )}
        </form>
      </Form>
    </div>
  );
}

export default AuthForm;
