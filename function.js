const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultContainer = document.getElementById("result-Container");
const wordTitle = document.getElementById("wordTitle");
const wordDescription = document.getElementById("wordDescription");
const audioBtn = document.getElementById("audioBtn");

searchInput.addEventListener("keyup", (e) => {

    const word = searchInput.value.trim().toLowerCase();
    if (!word) {
        alert("Please enter a word to search.");
        return;
    }
    if (e.key === "Enter") {
        searchWord(word);
    }
})

searchButton.addEventListener("click", () => {
    const word = searchInput.value.trim().toLowerCase();
    if (!word) {
        alert("please enter a word to search.");
        return;
    }

    searchWord(word);
})

async function searchWord (word) {
    try {

        const response = await fetch (`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

        if (!response.ok) {
            throw new Error("Word not found");
        }

        const data = await response.json();
        console.log(data);
        displayResult(data);

    } catch (error) {
        console.log(error);
        alert("An error occured while fetching data from the server. Please try again later.");
    }
}

function displayResult (data) {

   resultContainer.style.display = "block";
    
   const wordData = data[0];

   wordTitle.textContent = wordData.word;
   wordDescription.innerHTML = `
   <ul>
   ${wordData.meanings.map(meaning => ` 
    <li>
        <p><strong>Part Of Speech: </strong>${meaning.partOfSpeech}</p>
        <p><strong>Definition: </strong>${meaning.definitions[0].definition}</p>
    </li>
   `).join("\n")}
   </ul>
   `
}

audioBtn.addEventListener("click", () => {
    const word = searchInput.value.trim().toLowerCase();
    if (!word) {
        alert("Please enter a word to hear pronounciation.");
    }

    speakWord(word);
})

function speakWord (word) {
    const speech = new SpeechSynthesisUtterance(word);
    speech.lang="en-US";
    speech.volume = 1;
    speech.rate = 1;
    speech.tone = 2;
    window.speechSynthesis.speak(speech);
}

const footer = document.createElement("div");
footer.textContent = "© 2025 WinnerTIHub. Made by WinnerTIHub.";
footer.style.position = "absolute";
footer.style.top = "0";
footer.style.textAlign = "center";
footer.style.width = "100%";
footer.style.padding = "10px 0";
footer.style.boxShadow = "inset 0 0 10px rgba(0, 0, 0, 0.5)";
footer.style.color = "#fff";
document.body.appendChild(footer);