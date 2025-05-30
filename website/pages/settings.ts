let zim_sel = document.getElementById("zim_select") as HTMLSelectElement;
let save =document.getElementById("save") as HTMLButtonElement;
let death_frame = document.getElementById("death_frame") as HTMLInputElement;
let gir = document.getElementById("gir") as HTMLInputElement;
save.onclick = function()
{
    
localStorage.setItem("gir",gir.checked.toString())
 localStorage.setItem("zim_sprite", zim_sel.value)
 localStorage.setItem("death_frame", death_frame.value)   
} 
console.log("d");

