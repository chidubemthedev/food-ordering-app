import { createContext, useEffect, useState } from "react";
import { supabase } from "../app/lib/supabase";
import { Session } from "@supabase/supabase-js";

type AuthData = {
  session: Session | null;
};

const AuthContext = createContext<AuthData>({ session: null } as AuthData);

export default function AuthProvider({ children }: any) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      console.log(data);
    };

    fetchSession();
  }, []);

  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
}
