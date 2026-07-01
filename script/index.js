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
            <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open">
            </i> Lesson level ${lesson.level_no} </button>`;
        levelContainer.appendChild(btnDiv);
    })
}

// Dynamic url amra <button onclick="loadLevelWord(${lesson.level_no})"> theke levelNo ta nissi tahole oi level no er url a jabe and data load korbo oi specific levelNo wala url er
const loadLevelWord = (levelNo) => {
    const url = `https://openapi.programming-hero.com/api/level/${levelNo}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(json2 => displalyLevelWord(json2.data));
}

const displalyLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    //    console.log(wordContainer);
    wordContainer.innerHTML = "";

    words.forEach(word => {
        console.log(word);

/*         {
    "id": 5,
    "level": 1,
    "word": "Eager",
    "meaning": "আগ্রহী",
    "pronunciation": "ইগার"
} */

        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl"> ${word.word}</h2>
            <p class="font-semibold font-bangla"> Meaning /Pronounciation</p>
            <div class="font-bold text-2xl">"${word.meaning} / ${word.pronunciation}"</div>
            <div class="flex justify-between items-center">
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF20]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF20]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>`;
        wordContainer.appendChild(card);
    })
}

loadLessons();