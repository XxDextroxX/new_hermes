'use client';
import { checkStatus } from "@/api/auth";
import { getAccessToken, getUserModel, saveUserModel, updateAccessToken } from "@/lib/utils";
import { useUserStore } from "@/providers/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SidebarCentral, TopMenu } from "@/components";
import { ToastContainer } from "react-toastify";


export default function CentralLayout({
 children
}: {
 children: React.ReactNode;
}) {
  
  const router = useRouter();

  useEffect(() => {
    const user = getUserModel();
    if (user===null) {
      let accessToken;
      if (typeof window !== 'undefined') {
        accessToken = getAccessToken();
      }
      if (accessToken) {
        checkStatus(accessToken).then((response) => {
          console.log('responseRoot', response);
          if (response.status) {
              const user = response.user;
              updateAccessToken(response.user?.accessToken ?? '');
              if (user) {
                  saveUserModel(user);
                  // setUser(user);
              }
          } else {
              router.push('/auth/login');
          }
        });
      }
    }
  }, [router]);
  return (
    <div>
      <ToastContainer/>
      <div className="flex flex-row">
        <div className="fixed top-0 left-0 h-full overflow-auto">
          <SidebarCentral/>
        </div>
        <div className="w-full md:pl-[310px] overflow-auto">
          <TopMenu />
          {children}
        </div>
      </div>
    </div>
  );
}