let box = document.getElementById("strahlrohr");
let boxBoundingRect = box.getBoundingClientRect();
let boxCenter = {
    x: boxBoundingRect.left + boxBoundingRect.width / 2,
    y: boxBoundingRect.top + boxBoundingRect.height / 2
};



document.addEventListener("mousemove", e => {
    let angle = Math.atan2(e.pageX - boxCenter.x, - (e.pageY - boxCenter.y)) * (180 / Math.PI);
    box.style.transform = `rotate(${angle}deg)`;
})

document.querySelector('#fire-container').addEventListener('click', function (event) {
    if (event.target.classList.contains('fire')) {
        console.log(event.target.classList[1]);
        loeschen(event.target);
    }
});

let water = document.getElementById("water");

var intervalId; // Variable to store the interval ID
let interval;
let hoverElements = [];

function wasserMarsch() {
    //console.log("WASSERMARSCH!!!");
    water.classList.remove("hidden");
    water.classList.add("active");
    spawnFire();
}

function wasserStop() {
    //console.log("WASSER STOP!!!");
    water.classList.remove("active");
    water.classList.add("hidden");
}

function spawnFire() {
    document.getElementById("fire-container").innerHTML += `
        <div onclick="loeschen(this)" style="top: ${getRandomInt(5, 60)}vh; left: ${getRandomInt(30, 60)}vw;" class="fire">

        </div>
    `;
    //let e = document.getElementById("current");
    //e.addEventListener('onclick', function(){löschen(e)});
    ////addHoverElement(e);
    //e.removeAttribute("id");
    
}

//function setupHoverInterval(e) {
//    // Set up an interval to call the mouseHoverFunction every second
//    console.log(e);
//    interval = setInterval(function(){löschen(e)}, 1000);
//}
//
//function addHoverElement(e) {
//    // Get the element to watch for mouse hover
//    console.log(e);
//
//    // Attach event listeners
//    e.addEventListener("mouseenter", setupHoverInterval(e));
//    e.addEventListener("mouseleave", function () {
//        // Clear the interval when the mouse leaves the element
//        clearInterval(interval);
//    });
//}




function loeschen(e) {
    console.log("LÖSCHEN!")
    console.log(e);
}

function getRandomInt(min, max) {
    return (Math.random() * (max - min)) + min;
}