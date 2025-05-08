import { Outlet } from "react-router-dom";
import { Header } from "./Header";


export function AppLayout() {

  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden bg-background">
        <Header/>
        <div className="px-9">
          <Outlet />
        </div>
    </div>
  );
}
