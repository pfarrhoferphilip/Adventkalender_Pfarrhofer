let box = document.getElementById("strahlrohr");
let boxBoundingRect = box.getBoundingClientRect();
let boxCenter= {
    x: boxBoundingRect.left + boxBoundingRect.width/2, 
    y: boxBoundingRect.top + boxBoundingRect.height/2
};

document.addEventListener("mousemove", e => {
    let angle = Math.atan2(e.pageX - boxCenter.x, - (e.pageY - boxCenter.y) )*(180 / Math.PI);      
    box.style.transform = `rotate(${angle}deg)`;  
})

let water = document.getElementById("water");

function wasserMarsch() {
    console.log("WASSERMARSCH!!!");
    water.classList.remove("hidden");
    water.classList.add("active");
    
}

function wasserStop() {
    console.log("WASSER STOP!!!");
    water.classList.remove("active");
    water.classList.add("hidden");
}

function spawnFire() {
    document.getElementById("game").innerHTML += `
        <div style="top: ${10};" class="fire">

        </div>
    `;
}