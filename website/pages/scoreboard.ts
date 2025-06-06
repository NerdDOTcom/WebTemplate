import { send } from "../utilities";
let score = document.getElementById("score") as HTMLDivElement;
let user = document.getElementById("user") as HTMLDivElement;
let { scores, userids } = await send("get_scores", []);
console.log(scores, userids);
for (let i = 0;i < scores.length; ++i) {
    let username = await send("username", userids[i]) as string;
    score.innerHTML += "<br>" + scores[i].toString();
    user.innerHTML += "<br>"+ username;
}