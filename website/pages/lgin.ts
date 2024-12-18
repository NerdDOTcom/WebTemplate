import { send } from "../utilities";
let uni = document.getElementById("uni")! as HTMLInputElement;
let ei = document.getElementById("ei")! as HTMLInputElement;
let b = document.getElementById("b")!;
let d = document.getElementById("d")!;
b.onclick = async function () {
    let [p,urid] = await send("in", [uni.value, ei.value]) as [boolean,string];
    if(urid)
    {
        localStorage.setItem("urid",urid); 
        d.innerHTML = "Sucessfully found you! :)";
    }
    else
    {
        d.innerHTML = "user wasn't found >:)";
    }
    
}