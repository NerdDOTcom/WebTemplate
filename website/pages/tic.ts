let t1 = document.getElementById("t1")! as HTMLButtonElement;
let t2 = document.getElementById("t2")! as HTMLButtonElement;
let t3 = document.getElementById("t3")! as HTMLButtonElement;
let t4 = document.getElementById("t4")! as HTMLButtonElement;
let t5 = document.getElementById("t5")! as HTMLButtonElement;
let t6 = document.getElementById("t6")! as HTMLButtonElement;
let t7 = document.getElementById("t7")! as HTMLButtonElement;
let t8 = document.getElementById("t8")! as HTMLButtonElement;
let t9 = document.getElementById("t9")! as HTMLButtonElement;
let messageDiv = document.getElementById("message")! as HTMLDivElement;

let z = true; // true for 'X', false for 'O'
const type: string[] = ["", "", "", "", "", "", "", "", ""]; // Initial empty board

// Function to check for a win
function checkWinner(): string | null {
    const winPatterns = [
        [0, 1, 2], // Row 1
        [3, 4, 5], // Row 2
        [6, 7, 8], // Row 3
        [0, 3, 6], // Column 1
        [1, 4, 7], // Column 2
        [2, 5, 8], // Column 3
        [0, 4, 8], // Diagonal 1
        [2, 4, 6], // Diagonal 2
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (type[a] !== "" && type[a] === type[b] && type[b] === type[c]) {
            return type[a]; // Return the winner ('X' or 'O')
        }
    }

    // Check for draw
    if (!type.includes("")) {
        return "Draw";
    }

    return null; // No winner yet
}

// Show message function
function showMessage(message: string) {
    messageDiv.innerText = message; // Set message text
    messageDiv.style.display = "block"; // Show the message
    messageDiv.style.opacity = "1"; // Fade in

    // Hide the message after 2 seconds
    setTimeout(() => {
        messageDiv.style.opacity = "0"; // Fade out
        setTimeout(() => {
            messageDiv.style.display = "none"; // Hide the message completely
        }, 300); // Wait for fade-out to complete
    }, 2000); // Display the message for 2 seconds
}

// Update the UI and check for winner after a move
function makeMove(index: number) {
    if (type[index] === "") { // If the cell is empty
        type[index] = z ? "X" : "O"; // Assign 'X' or 'O' based on the turn
        document.getElementById(`t${index + 1}`)!.innerHTML = type[index]; // Update the button text
        z = !z; // Switch turn

        const winner = checkWinner();
        if (winner) {
            if (winner === "Draw") {
                showMessage("It's a draw!");
            } else {
                showMessage(`${winner} wins!`);
            }
            resetGame();
        }
    }
}

// Reset the game
function resetGame() {
    for (let i = 0; i < 9; i++) {
        type[i] = "";
        document.getElementById(`t${i + 1}`)!.innerHTML = "";
    }
    z = true; // 'X' starts again
}

// Attach event listeners
t1.onclick = () => makeMove(0);
t2.onclick = () => makeMove(1);
t3.onclick = () => makeMove(2);
t4.onclick = () => makeMove(3);
t5.onclick = () => makeMove(4);
t6.onclick = () => makeMove(5);
t7.onclick = () => makeMove(6);
t8.onclick = () => makeMove(7);
t9.onclick = () => makeMove(8);
