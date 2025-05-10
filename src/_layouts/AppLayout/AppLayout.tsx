import { Outlet } from "react-router-dom";
import { Header } from "./Header";


export function AppLayout() {

  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden bg-background gap-4">
        <Header/>
        <div className="px-9 overflow-auto flex flex-col h-[90vh] scrollbar-custom page-container">
          <Outlet />
        </div>
    </div>
  );
}
