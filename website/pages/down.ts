import { send } from "../utilities";
let username = document.getElementById("Username") as HTMLInputElement;
let password = document.getElementById("Password") as HTMLInputElement;
let signup = document.getElementById("signup") as HTMLButtonElement;
let login = document.getElementById("login") as HTMLButtonElement;
let email = document.getElementById("email") as HTMLButtonElement;
let check = document.getElementById("check") as HTMLDivElement;
signup.onclick = async function () {
   let w = await send("signup", [username.value, password.value]) as string;
   check.innerText = w;
};
login.onclick = async function () {
   let s = await send("login", [username.value, password.value]) as string;
   localStorage.setItem("user_id",s);
   check.innerText = s;
};