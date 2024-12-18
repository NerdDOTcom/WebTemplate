import { send } from "../utilities";
let wc = document.getElementById("wc")! as HTMLDivElement;
if (localStorage.getItem("urid") != null) {
    let unwc = await send("gun", localStorage.getItem("urid")); //gun stands for get username. IT DOES NOT STAND FOR GUN. o:)
    wc.innerHTML = "Welcome " + unwc + "!";
}