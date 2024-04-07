'use server'
import { revalidatePath } from "next/cache";
import connectDB from "./db"
import User from "@/model/User";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { encrypt } from "./lib";

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
    })
const loginFormSchema = z
    .object({
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
    })

type RegisterPrevState = {
    prevState: string | undefined | null
}
export const actionRegister = async (
    prevState: string | undefined | null,
    formData: FormData,
) => {
    try {
        await connectDB();
        const validatedFields = registerFormSchema.safeParse({
            firstname: formData.get("firstname"),
            email: formData.get("email"),
            password: formData.get("password"),
        });

        if (!validatedFields.success) {
            return {
                type: "error",
                errors: validatedFields.error.flatten().fieldErrors,
                message: "Missed fields, failed to register user",
            };
        }

        const { firstname, email, password } = validatedFields.data;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new Error("User already exists")
        };

        const newUser = new User({ name: firstname, email, password });
        await newUser.save();

        console.log("newUser", newUser)

        redirect(`/`);
        return {
            type: "success",
            message: "user succesfully register."
        }
    } catch (error) {
        console.log("Database Error occurred", error);
        return {
            type: "error",
            message: "Failed to register user",
        };
    }
};

export const actionLogin = async (prevState: string | undefined | null,
    formData: FormData,) => {
    try {
        await connectDB();

        const email = formData.get('email')
        const password = formData.get('password')

        const validatedFields = loginFormSchema.safeParse({
            email,
            password,
        })

        if (!validatedFields.success) {
            console.log("Error occurred", validatedFields);

            return {
                type: "error",
                errors: validatedFields.error.flatten().fieldErrors,
                message: "Missed fields, failed to login user",
            };
        }

        const DBuser = await User.findOne({ email });

        const user = {
            email: validatedFields.data.email,
            password: validatedFields.data.password,
        };

        const expires = new Date(Date.now() + 10 * 1000)
        const session = await encrypt({ user, expires })

        cookies().set('session', session, { expires, httpOnly: true })

    } catch (error) {
        console.log("Database Error occurred", error);
        return {
            type: "error",
            message: "Database Error: Failed to login user",
        };
    }
    revalidatePath('/');
    redirect('/')
}