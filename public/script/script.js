var background_audio = new Audio('./../audio/BackgroundMusic.mp3');
var martinshorn_audio = new Audio('./../audio/Martinshorn.mp3');
background_audio.volume = 0.2;
background_audio.loop = true;

document.body.addEventListener('click', function (event) {
    if (event.target.classList.contains('back-button')) {
        console.log(event.target.classList[1]);
        closePopup();
    }
});

if (!localStorage.getItem("opened_doors")) {
    localStorage.setItem("opened_doors", 0)
}



function start() {
    closePopup();
    generateCalender();
    background_audio.play();
}

function generateCalender() {
    let array = [];
    for (let i = 1; i <= 24; i++) {
        array.push(i);
    }
    console.log(array);
    shuffleArray(array);
    console.log(array);
    let html_code = "";
    for (let i = 0; i < 24; i++) {
        html_code += `<div onclick="openDoor(${array[i]})" id="item${array[i]}" class="item">${array[i]}</div>`
    }
    document.getElementById("calendar").innerHTML = html_code;

    for (let i = 0; i < JSON.parse(localStorage.getItem("opened_doors")); i++) {
        console.log(i);
        let e = document.getElementById(`item${i+1}`);
        e.classList.remove("item");
        e.classList.add("opened-item");
    }
}

function shuffleArray(array) {
    let len = array.length,
        currentIndex;
    for (currentIndex = len - 1; currentIndex > 0; currentIndex--) {
        let randIndex = Math.floor(Math.random() * (currentIndex + 1));
        var temp = array[currentIndex];
        array[currentIndex] = array[randIndex];
        array[randIndex] = temp;
    }
}

function openDoor(door_number) {
    if (canOpen(door_number)) {
        console.log("OPEN");
        openPopUp(door_number);
    } else {
        console.log("CAN'T OPEN YET");
    }
}

function canOpen(door_nr) {

    let biggest_nr = JSON.parse(localStorage.getItem("opened_doors"));

    if (door_nr == biggest_nr + 1) {
        localStorage.setItem("opened_doors", door_nr);
    }

    if (door_nr <= biggest_nr + 1) {
        return true;
    } else {
        return false;
    }
}

function openPopUp(popup_id) {

    martinshorn_audio.playbackRate = 0.8 + Math.random() * 0.4;
    martinshorn_audio.play();

    document.getElementById(`item${popup_id}`).classList.remove("item");
    document.getElementById(`item${popup_id}`).classList.add("opened-item");

    fetch(`../../api/autos/${popup_id}`)
        .then((response) => response.json())
        .then((data) => {

            console.log(data);

            if (data.code == 200) {

                if (popup_id != 24) {
                    document.body.innerHTML += `
                    <div id="popup">
                        <h1 class="popup-title">${data.result[0].name}</h1>
                        <div class="flex-center">
                            <img src="../img/${data.result[0].image}" width="40%">
                        </div>
                        <h2 class="popup-title">${data.result[0].description}</h2>
                        <div onclick="closePopup()" class="back-button"></div>
                    </div>
                    `;
                } else {
                    console.log("HEHE");
                    document.body.innerHTML += `
                    <div id="popup">
                        <h1 class="popup-title">${data.result[0].name}</h1>
                        <div class="flex-center">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/0VblLYyKDHw?si=tryMH94iaSrASIRA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        </div>
                        <h2 class="popup-title">${data.result[0].description}</h2>
                        <div onclick="closePopup()" class="back-button"></div>
                    </div>
                    `;
                }



            } else {

                document.body.innerHTML += `
                <div id="popup">
                    <h1 class="popup-title red-text">ERROR 404: NOT FOUND</h1>
                    <div class="flex-center">
                        <img src="../img/error.jpg" width="20%">
                    </div>
                    <h2 class="popup-title red-text">Error: JSON Data could not be found.<br>Error Code 404<br></h2>
                    <a class="popup-title" target="_blank" href="https://www.youtube.com/watch?v=10ThT2T_HF4"><p>Support</p></a>
                    <div onclick="closePopup()" class="back-button"></div>
                </div>
                `;

            }

        })
        .catch((error) => {
            console.log(error);
        })
}

function closePopup() {
    if (document.getElementById("popup")) {
        console.log("Closing Popup")
        document.getElementById("popup").remove();
    }
}

function dev() {
    localStorage.setItem("opened_doors", 24);
    location.reload();
}

function clear() {
    localStorage.clear();
    location.reload();
}