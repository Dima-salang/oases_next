
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
export default function oasesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
