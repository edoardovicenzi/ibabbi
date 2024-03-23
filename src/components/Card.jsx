import {useNavigate} from "react-router-dom"

export default function Card({title = "Placeholder", content = "Placeholder", navTo = "christmas", isDisabled = false}){

    const navigate = useNavigate()
    
    return (
    <div className="card-wrapper">
            <h2 className="card-title">{title}</h2>
            <p className="card-content">{content}</p>
            <button className="btn btn-default" onClick={()=> navigate("/" +navTo)}>Continua</button>
        </div>
    )
}
