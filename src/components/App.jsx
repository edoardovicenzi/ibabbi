// This components defines the outer layout

import {Link, Outlet} from "react-router-dom"
import logo from "../assets/Logo.png"

export default function App(){

    return (
        <>
            <nav>
                <ul>
                    <li><Link to={'/ibabbi/christmas'}>Natale segreto</Link></li>
                    <li><Link to={'/ibabbi/home'}><img className="logo-default" src={logo} alt="Home" /></Link></li>
                    <li><Link to={'/ibabbi/easter'}>Pasqua segreta</Link></li>
                </ul>
            </nav>
            <Outlet />
        </>
    )
}
