import {  useState,useRef } from "react";
function ObjectHandler(){
    let[obj,setObj]=useState({name:null,age:0})
    let nameref=useRef('');
    let ageref=useRef(0);
    let changeHandler=()=>{
        nameref.current.focus();
        ageref.current.focus();
        setObj({...obj,name:nameref.current.value,age:ageref.current.value});


    }
    return (
        <div>
            <label>
                name
                <input type="text" ref={nameref}/>
            </label> <br/>
            <label>
                age
                <input type="number" ref={ageref}/>
            </label> <br/>
            <button onClick={changeHandler}>Update Object</button>
            <p>name:{obj.name}</p>
            <p>age:{obj.age}</p>

            
        </div>
    );
}
export default ObjectHandler;
