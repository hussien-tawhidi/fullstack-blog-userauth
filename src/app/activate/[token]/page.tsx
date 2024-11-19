"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Activate = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const token = window?.location?.pathname?.split("/")?.pop();

  useEffect(() => {
    const activateUser = async () => {
      await fetch(`http://localhost:3000/api/verify-email?token=${token}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.token) {
            localStorage.setItem("authToken", data.token); // Save token for session
            window.location.href = "/dashboard"; // Redirect to authenticated area
          } else {
            console.error("Verification failed:", data.message);
          }
        })
        .catch((error) => console.error("Error:", error));
    };
    // if (token) {
    //   const verifyToken = async () => {
    //     try {
    //       const response = await fetch(
    //         `http://localhost:3000/api/verify-email?token=${token}`
    //       );
    //       const data = await response.json();

    //       if (response.ok) {
    //         // Redirect user after successful verification
    //         router.push("/");
    //         console.log("token has been verified");
    //       } else {
    //         setErrorMessage(data.message || "Verification failed");
    //         console.log(data.message,"Verification failed");
    //       }
    //     } catch (error) {
    //       console.error("Error verifying token:", error);
    //       setErrorMessage("An error occurred while verifying your account.");
    //       router.push("/signin");
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

    //   verifyToken();
    // }
    activateUser();
  }, [token, router]);

  if (loading) {
    return <div>Verifying your account...</div>;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return null;
};

export default Activate;
