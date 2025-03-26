import { send } from "../utilities";
let uni = document.getElementById("uni")! as HTMLInputElement;
let ei = document.getElementById("ei")! as HTMLInputElement;
let b = document.getElementById("b")!;
let d = document.getElementById("d")!;
let b2 = document.getElementById("b2")!;
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
b2.onclick = async function()
{
    let urid = await send("lgout",localStorage.getItem("urid")) as string;
    if(urid)
        {
            localStorage.removeItem("urid");
            d.innerHTML = "DELETE";
        }
        else
        {
            d.innerHTML = "No user was found to log out";
        }
}