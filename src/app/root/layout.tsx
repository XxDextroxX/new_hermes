'use client';
import { checkStatus } from "@/api/auth";
import { getAccessToken, updateAccessToken } from "@/lib/utils";
import { useUserStore } from "@/providers/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserRootLayout({
 children
}: {
 children: React.ReactNode;
}) {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      let accessToken;
      if (typeof window !== 'undefined') {
        accessToken = getAccessToken();
      }
      if (accessToken) {
        checkStatus(accessToken).then((response) => {
          if (response.status) {
              const user = response.user;
              updateAccessToken(response.user?.accessToken ?? '');
              if (user) {
                  setUser(user);
              }
          } else {
              router.push('/auth/login');
          }
        });
      }
    }
  }, [user]);

  return (
    <div>
      {children}
    </div>
  );
}
