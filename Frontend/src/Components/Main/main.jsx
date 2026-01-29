import Nav from "../Navigation/nav";
import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <div className="w-full flex h-full">
      <div className="w-[20%]">
        <Nav />
      </div>
      <div className="w-[80%]">
        <header className="flex justify-between items-center p-4 border-b border-borderGray">
          <h1 className="text-xl font-semibold">My Ideas App</h1>
          {/* <button class="px-4 py-2 bg-softBrown text-cream rounded hover:bg-[#926b49] transition">
            Login
          </button> */}
        </header>
        <Outlet />
      </div>
    </div>
  );
}
