import { send } from "../utilities";
let uni = document.getElementById("uni")! as HTMLInputElement;
let ei = document.getElementById("ei")! as HTMLInputElement;
let b = document.getElementById("b")!;
let d = document.getElementById("d")!;
let a = "";
b.onclick = async function () {
    a = await send("si", [uni.value, ei.value]);
    console.log("Send request made");
    d.innerHTML = a;
}