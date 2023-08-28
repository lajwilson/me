"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter, redirect } from "next/navigation";
import { useState } from "react";

import type { Database } from "@/lib/supabase/database.types";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  // Sign up
  const handleSignUp = async () => {
    // log
    console.log("sign up");
    console.log(email, password);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    console.log(data, error);
    router.refresh();
  };

  // Sign in
  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(data, error);
    router.refresh();
  };

  // Sign out
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);
    router.refresh();
  };

  return (
    <>
      <input
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={handleSignUp}>Sign up</button>
      <button onClick={handleSignIn}>Sign in</button>
      <button onClick={handleSignOut}>Sign out</button>
    </>
  );
}
