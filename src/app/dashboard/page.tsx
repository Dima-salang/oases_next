import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset> 
          <SidebarTrigger className="-ml-1" />
      </SidebarInset>
    </SidebarProvider>
  )
}
