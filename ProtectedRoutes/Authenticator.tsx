"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoutes = (Page: React.ComponentType<any>) => {
  return (props: any) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [checkingAuth, setCheckingAuth] = useState(true); // ✅ Prevent flicker

    useEffect(() => {
      if (status === "loading") return; // ✅ Wait for session to load

      if (!session) {
        router.replace("/login");
      } else {
        setCheckingAuth(false); // ✅ Allow rendering after check
      }
    }, [session, status, router]);

    if (checkingAuth || status === "loading") {
      return null; // ✅ Prevent flicker before redirect
    }

    return <Page {...props} />;
  };
};

export default ProtectedRoutes;
