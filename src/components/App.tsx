// This components defines the outer layout
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
      <div id="page" className="vstack justify-center align-center">
        <Outlet />
      </div>
    </>
  );
}
