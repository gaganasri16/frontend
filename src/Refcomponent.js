import { useState,useRef } from "react";
function Refcomponent(){
    let[txt,setTxt]=useState('');
    let refinput=useRef(null);

    let changeHandler=()=>{
        refinput.current.focus();
        setTxt(refinput.current.value);
    }
    return (
        <div>
            <input ref={refinput} type="text" onChange={changeHandler}/>
            <button onClick={changeHandler}>clickme</button>
            <p>{txt}</p>
        </div>
        
    );
}
export default Refcomponent;