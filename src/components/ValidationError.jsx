import { useEffect, useRef } from "react"

export default function ValidationError({msg}){
    const divRef = useRef()
    useEffect(() =>{
        setTimeout(() => {
            divRef.current.classList.add("closing")
        },3000)
    }, [])
    return (
    <div ref={divRef} className="validation-error">
            <p className="validation-error-msg">{msg}</p>
        </div>
    )
}
