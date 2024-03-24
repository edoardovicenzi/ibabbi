//This component will render each time there is an error Route-wise
import {useNavigate, useRouteError} from "react-router-dom"

export default function ErrorPage({msg =""}){

    const navigate = useNavigate()
    const error = useRouteError()
    return (
        <div className="error-page-wrapper">
            <div className="card-wrapper">
                <div className="error-page-title">
                    <h1>Oops!</h1>
                </div>
                <div className="error-page-message">
                    <p>Qualcosa è andato storto!</p>
                    <p>
                        <i>{error.statusText || error.message}</i>
                    </p>
                </div>
                <button className="btn" onClick={() => navigate("/ibabbi/home")}>Ritorna alla Home</button>

            </div>
        </div>
    )
}
