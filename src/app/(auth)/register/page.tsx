
import { Metadata } from "next";
import { auth } from "../../../../auth";
import CreateUser from "@/components/forms/auth/CreateUser";

export default async function Register() {
     const session = await auth();

    return <CreateUser session={session} />;
}
