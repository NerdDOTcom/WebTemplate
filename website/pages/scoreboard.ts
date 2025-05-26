import { send } from "../utilities";
let d = document.getElementById("d") as HTMLDivElement;
let { scores, userids } = await send("get_scores", []);
for(let i =0; i < 10|| i<scores.length; ++i)
{
    let username = await send("username", userids[i]) as string;
    d.innerHTML += scores[i].toString()+ " "+ username+ "<br>";
}
//get the arrays 
// create a list n
//for loop length 10
// put the thingies in the list 
// don't foget append child to body 
// cry because I really don't want to do this 
// how will we ever get to zim and other zim 
// I don't care about a stupid list 
// :(