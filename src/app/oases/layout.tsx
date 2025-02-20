
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { auth } from "@/auth";
import { redirect } from "next/navigation";
export default async function oasesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
const session = await auth();

    console.log("Session: ", session);
    
    if (!session) { 
        console.log("No session found");
        redirect('/login');
    }
  return (
    
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset> 
          <SidebarTrigger className="-ml-1" />
            <main className="ml-5">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
