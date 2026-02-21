import Nav from "../Navigation/nav";
import { Outlet, Navigate } from "react-router-dom";
import { getAccessToken } from "../../Helpers/Auth/tokens";

export default function Main() {

    if (!getAccessToken()) {
      return <Navigate to="/login" replace />;
    } 
  
  return (
    <div className="flex h-screen w-full">
      <div className="w-[20%] h-full overflow-y-auto">
        <Nav />
      </div>
      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center p-4 border-b border-borderGray bg-cream shadow-soft">
          <h1 className="text-2xl ml-8 font-serif font-semibold text-primaryText">
            Dump Your Thoughts
          </h1>
        </header>
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
