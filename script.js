// 🎵 MUSIC
let music;
let musicStarted = false;
let celebrationStarted = false;
let floatingStarted = false;
let fireworksStarted = false;

// store intervals (🔥 important)
let celebrationInterval, floatingInterval, sparkInterval, fireworkInterval, typingInterval;

function startMusic() {
    if (musicStarted || !music) return;

    music.currentTime = 24;

    let playPromise = music.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
            musicStarted = true;

            music.volume = 0;
            let vol = 0;

            let fade = setInterval(() => {
                vol = Math.min(vol + 0.05, 1);
                music.volume = vol;

                if (vol === 1) clearInterval(fade);
            }, 200);

        }).catch(() => {
            document.body.addEventListener("click", () => {
                if (!musicStarted && music) {
                    music.currentTime = 24;
                    music.play();
                    musicStarted = true;
                }
            }, { once: true });
        });
    }
}

// ✅ FIXED LOAD
window.addEventListener("DOMContentLoaded", () => {
    music = document.getElementById("music"); // ✅ moved here
    edgeHearts();
    sparkles();
});

// 🔄 PAGE SWITCH
function showPage(id){
    document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
    let el = document.getElementById(id);
    if(el) el.classList.add("active");
}

// 🔐 PASSWORD
function check(){
    let input = document.getElementById("pass");
    let msg = document.getElementById("msg");

    if(!input || !msg) return;

    let p = input.value.toLowerCase();

    if(p.includes("love")){

        celebration();
        floating();
        startMusic();

        let count = 5;

        let inter = setInterval(()=>{
            msg.innerHTML = "Unlocking in " + count;
            msg.style.color = "#ff4d6d";

            count--;

            if(count < 0){
                clearInterval(inter);
                showPage("page2");
                typing();
            }
        },1000);

    }else{
        msg.innerHTML = "Wrong 💔";

        input.classList.add("shake", "error");

        setTimeout(()=>{
            input.classList.remove("shake", "error");
        },500);
    }
}

// ✍️ TYPING
function typing(){
    clearInterval(typingInterval);

    let text="Wishing you many more happy returns of the day 💖 Stay blessed ✨";
    let i=0;
    let el=document.getElementById("typing");

    if(!el) return;

    el.innerHTML="";

    typingInterval = setInterval(()=>{
        el.innerHTML+=text[i];
        i++;
        if(i>=text.length) clearInterval(typingInterval);
    },50);
}

// 🕯️
function goCandle(){
    showPage("page3");
}

function blow(){
    let candle = document.getElementById("candle");
    if(candle) candle.innerHTML="💨";

    setTimeout(()=>{
        showPage("page4");
        startAlbum();
    },1500);
}

// 📸 GALLERY
let photos=[
"image1.jpg",
"image2.jpg",
"image3.jpg",
"image4.jpg",
"image5.jpg",
"image6.jpg"
];

let index=0;
let started = false;

function nextPhoto(){
    let img = document.getElementById("albumImg");
    let title = document.getElementById("albumTitle");

    if(!img) return;

    img.classList.add("flip");

    setTimeout(()=>{
        img.classList.remove("flip");

        if(!started){
            started = true;
            index = 0;
            if(title) title.innerHTML = "Tap to see memories 💖";
            img.src = photos[0];
            return;
        }

        index++;

        if(index < photos.length){
            img.src = photos[index];
        }else{
            started = false;
            index = 0;
            buildFrame();
            showPage("page5");
        }

    },300);
}

// 🖼️ FRAME
function buildFrame(){
    let container=document.getElementById("frame");
    if(!container) return;

    container.innerHTML="";

    photos.forEach(p=>{
        let img=document.createElement("img");
        img.src=p;
        container.appendChild(img);
    });
}

// 🎉 CELEBRATION
function celebration(){
    if(celebrationInterval) clearInterval(celebrationInterval);

    celebrationStarted = true;

    celebrationInterval = setInterval(()=>{
        let e=document.createElement("div");
        e.innerHTML=["🎉","💖","✨"][Math.floor(Math.random()*3)];
        e.className="fall";
        e.style.left=Math.random()*100+"vw";
        document.body.appendChild(e);

        setTimeout(()=>e.remove(),3000);
    },300);
}

// 💖 FLOAT
function floating(){
    if(floatingInterval) clearInterval(floatingInterval);

    floatingStarted = true;

    floatingInterval = setInterval(()=>{
        let h=document.createElement("div");
        h.innerHTML="💖";
        h.className="float";
        h.style.left=Math.random()*100+"vw";
        document.body.appendChild(h);

        setTimeout(()=>h.remove(),4000);
    },500);
}

// ✨ SPARKLES
function sparkles(){
    if(sparkInterval) clearInterval(sparkInterval);

    sparkInterval = setInterval(()=>{
        let s=document.createElement("div");
        s.innerHTML="✨";
        s.className="spark";
        s.style.left=Math.random()*100+"vw";
        s.style.top=Math.random()*100+"vh";
        document.body.appendChild(s);

        setTimeout(()=>s.remove(),2000);
    },700);
}

// 💖 BORDER (UNCHANGED ✅)
function edgeHearts(){
    let container=document.getElementById("borders");
    if(!container) return;

    let configs = {
        top: 25,
        bottom: 25,
        left: 12,
        right: 12
    };

    ["top","bottom","left","right"].forEach(side=>{
        let div=document.createElement("div");
        div.className="border-side "+side+"-border";

        for(let i=0;i<configs[side];i++){
            let h=document.createElement("span");
            h.innerHTML="💖";
            h.className="border-heart";
            div.appendChild(h);
        }
        container.appendChild(div);
    });
}

// 🎆 FIREWORKS
function fireworks(){
    if(fireworksStarted) return;
    fireworksStarted = true;

    fireworkInterval = setInterval(()=>{
        let el=document.createElement("div");
        el.innerHTML="🎆";
        el.style.position="fixed";
        el.style.left=Math.random()*100+"vw";
        el.style.top=Math.random()*80+"vh";
        el.style.fontSize="30px";
        document.body.appendChild(el);
        setTimeout(()=>el.remove(),2000);
    },250);
}

// 🎉 FINAL CELEBRATE BUTTON
function celebrate() {
    let msg = document.getElementById("finalMsg");
    if(!msg) return;

    msg.innerHTML =
    "Many more happy returns of the day 💖✨ Stay happy always 💫<br><br>Made with 💖 just for you";

    celebration();
    floating();
    fireworks();
    startFireworks();
    cakeRain();

    // 🔥 EXTRA BOOST
for(let i=0;i<30;i++){
    let s=document.createElement("div");
    s.innerHTML="✨";
    s.className="spark";
    s.style.left=Math.random()*100+"vw";
    s.style.top=Math.random()*100+"vh";
    document.body.appendChild(s);
    setTimeout(()=>s.remove(),2000);
}

}

let fireStarted = false;

function goFinal(){
    showPage("page6");

    celebrationStarted = false;
    floatingStarted = false;
    fireworksStarted = false;
    fireStarted = false;

    let msg = document.getElementById("finalMsg");
    if(!msg) return;

    msg.innerHTML =
    "Many more happy returns of the day 💖✨ Stay happy always 💫";

    setTimeout(()=>{
        msg.innerHTML += "<br><br>Made with 💖 just for you";
    },2000);
}

function startAlbum(){
    index = 0;
    started = true;

    let title = document.getElementById("albumTitle");
    let img = document.getElementById("albumImg");

    if(title) title.innerHTML = "Tap to flip 💖";
    if(img) img.src = photos[0];
}

// 🎆 ADVANCED FIREWORKS
function startFireworks(){
    if(fireStarted) return;
    fireStarted = true;

    let count = 0;

    let fw = setInterval(()=>{
        count++;
        if(count > 20) return clearInterval(fw);

        let x = Math.random() * window.innerWidth;
        let y = Math.random() * window.innerHeight / 2;

        for(let i=0;i<20;i++){
            let p = document.createElement("div");
            p.className = "particle";

            let angle = Math.random() * 2 * Math.PI;
            let distance = Math.random() * 80;

            p.style.left = x + "px";
            p.style.top = y + "px";

            p.style.setProperty('--x', Math.cos(angle) * distance + "px");
            p.style.setProperty('--y', Math.sin(angle) * distance + "px");

            document.body.appendChild(p);

            setTimeout(()=>p.remove(),1000);
        }
    },700);
}

function cakeRain(){
    setInterval(()=>{
        let c = document.createElement("div");

        c.innerHTML = ["🎂","💖","✨"][Math.floor(Math.random()*3)];
        c.className = "cake";

        c.style.fontSize = (20 + Math.random()*20) + "px";
        c.style.left = Math.random()*100 + "vw";

        // 🔥 upgrades
        c.style.animationDuration = (3 + Math.random()*2) + "s";
        c.style.transform = `translateX(${Math.random()*50 - 25}px)`;

        document.body.appendChild(c);

        setTimeout(()=>c.remove(),4000);
    }, 700);
}