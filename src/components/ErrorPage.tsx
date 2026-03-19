//This component will render each time there is an error Route-wise
import { useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage({ msg = "" }) {
  const navigate = useNavigate();
  const error = useRouteError();
  return (
    <div id="page" className="vstack justify-center align-center">
      <h1>Oops! Qualcosa è andato storto!</h1>
      <h2>
        <i>{error.statusText || error.message}</i>
      </h2>
      <button
        className="btn large"
        type="button"
        onClick={() => navigate("/ibabbi/")}
      >
        Ritorna alla Home
      </button>
    </div>
  );
}
