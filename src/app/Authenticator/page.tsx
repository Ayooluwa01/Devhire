"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UserPage() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.email) {
      axios
        .get(`http://localhost:3000/api/Userauth/${session.user.email}`)
        .then((response) => {
          console.log("Fetched User Data:", response.data); // ✅ Debugging log
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [session]);

  // ✅ Fix: Run only when `userData` changes & check for `null`
  useEffect(() => {
    if (userData?.role === "admin") {
      router.push("/Dashboard");
    }
  }, [userData, router]); // ✅ Add dependencies to prevent infinite loop

  if (status === "loading" || loading) {
    return <p className="text-center text-2xl my-5">Authenticating...</p>;
  }

  if (!session || !userData) {
    return <p className="text-center text-2xl my-5">Not authenticated</p>;
  }

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">Welcome, {userData.name}!</h1>
      <p className="text-2xl my-5">Authentication successful!</p>
      <p>Role: {userData.role}</p>
    </div>
  );
}
