import EmployerSignUp from "@/Components/EmployerSignup";
import Login from "@/Components/Login";
import SignUp from "@/Components/Signup";

interface Params {
  auth: string;
}

export default function Page({ params }: { params: Params }) {
  const auth = params.auth; // No need for `await` here, as `params.auth` is not a Promise.

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
