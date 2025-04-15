import EmployerSignUp from "@/Components/EmployerSignup";
import Login from "@/Components/Login";
import SignUp from "@/Components/Signup";
import { use } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ auth: string }>;
}) {
  const { auth } = use(params);
  return (
    <div>
      {auth === "login" ? (
        <Login />
      ) : auth === "Signup" ? (
        <SignUp />
      ) : auth === "Employersignup" ? ( // Fixed the nesting issue
        <EmployerSignUp />
      ) : (
        <p>Error</p>
      )}
    </div>
  );
}
