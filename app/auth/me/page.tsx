"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import type { Database } from "@/lib/supabase/database.types";

export default function Me() {
  const supabase = createClientComponentClient<Database>();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase]);

  return (user && <pre>{JSON.stringify(user)}</pre>) || null;
}
