const createElements =(arrs) => {
    const htmlElements = arrs.map((el) =>  `<span class= "btn"> ${el}</span>`);
    // console.log(htmlElements.join(" "));
    return htmlElements.join(" ");
}
// ----------------------------------------------------------------------------------
const manageSpinner = (status) =>{
    if(status == true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }else{
        document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
};
// --------------------------------------------------------------------------------
const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        // .then (json => console.log(json.data))
        .then(json => displalyLessons(json.data));
};

const displalyLessons = (lessons) => {
    const levelContainer = document.getElementById("level-container");
    //    console.log(levelContainer);
    levelContainer.innerHTML = "";

    lessons.forEach(lesson => {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="lesson-btn2 btn btn-outline btn-primary"><i class="fa-solid fa-book-open">
            </i> Lesson level ${lesson.level_no} </button>`;
        levelContainer.appendChild(btnDiv);
    })
}
//----------------------------------------------------------------------------------
const removeActive = () => {
    // const lessonButtons = [...document.getElementsByClassName("lesson-btn2")];
    const lessonButtons = document.querySelectorAll(".lesson-btn2");
    lessonButtons.forEach(btn => { btn.classList.remove("active") });
}
//----------------------------------------------------------------------------------
// Dynamic url amra <button onclick="loadLevelWord(${lesson.level_no})"> theke levelNo ta nissi tahole oi level no er url a jabe and data load korbo oi specific levelNo wala url er:

const loadLevelWord = (levelNo) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${levelNo}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(json2 => {
            displalyLevelWord(json2.data)

            removeActive(); // remove active all class
            const clickBtn = document.getElementById(`lesson-btn-${levelNo}`);
            clickBtn.classList.add("active"); // add active class for blue color on button
        });
}

const displalyLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    //    console.log(wordContainer);
    wordContainer.innerHTML = "";

    if (words.length === 0) {
        wordContainer.innerHTML = `
        <div class="font-bangla text-center col-span-full rounded-xl py-10 space-y-6">
            <img class="mx-auto" src="./assets/alert-error.png" alt="" srcset="">
            <p class="text-xl font-medium text-gray-400 rounded py-10 space-y-6">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি। </p>
            <h2 class="text-5xl font-bold rounded py-10 space-y-6">নেক্সট Lesson এ যান</h2>
        </div>`;
         manageSpinner(false);
        return;
    };

    /*         {
    "id": 5,
    "level": 1,
    "word": "Eager",
    "meaning": "আগ্রহী",
    "pronunciation": "ইগার"
    } */

    words.forEach(word => {
        console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4 w-full h-full">
            <h2 class="font-bold text-2xl"> ${word.word ? word.word : "Not Found"}</h2>
            <p class="font-semibold font-bangla"> Meaning /Pronounciation</p>
            <div class="font-bold text-2xl">"${word.meaning ? word.meaning : "Not Found"} / ${word.pronunciation ? word.pronunciation : "Not Found"}"</div>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail (${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF20]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF20]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>`;
        wordContainer.appendChild(card);
    });
     manageSpinner(false);
};
//----------------------------------------------------------------------------------
const loadWordDetail = async (wordId) => {
    const url = `https://openapi.programming-hero.com/api/word/${wordId}`;
    const res = await fetch(url);
    const json3 = await res.json();
    displayWordDetails(json3.data);
};
const displayWordDetails = (word) => {
    console.log(word);
    // Notes: next line gulo ("word_modal").showModal() korsi daisy ui k easily bosanor jonno and inner html e synonyms er jonno map korsi sobar uporer ta 
    const detailsBox = document.getElementById("details-container");
    //console.log(detailsBox);
    detailsBox.innerHTML = `
    <div class="">
                    <h2 class="font-bangla text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
                </div>
                <div class="">
                    <h2 class="font-bold">Meaning</h2>
                    <p> ${word.meaning} </p>
                </div>
                <div class="">
                    <h2 class=" font-bold">Example</h2>
                    <p> ${word.sentence} </p>
                </div>
                <div class="">
                    <h2 class=" font-bold">Synonyms</h2>
                    <div> ${createElements(word.synonyms)}</div>
                </div>`;
    document.getElementById("word_modal").showModal();
}

loadLessons();