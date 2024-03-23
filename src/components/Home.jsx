// This components lets the user choose what type of list to access
import Card from "./Card"
export default function Home(){
    return(
    <div className="home-content-wrapper">
            <Card title="I BABBI" content="Aggiungi i tuoi amici e invitali a pescare dalla lista!"/>
            <Card navTo="easter" title="I CONIGLI" content="Aggiungi i tuoi amici e invitali a pescare dalla lista!"/>
        </div>
    ) 
}
