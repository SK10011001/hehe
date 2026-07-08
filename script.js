// 🎵 MUSIC
let music;
let musicStarted = false;
let celebrationStarted = false;
let floatingStarted = false;
let fireworksStarted = false;
let cakeInterval;
let startX = 0;
// store intervals (🔥 important)
let celebrationInterval, floatingInterval, sparkInterval, fireworkInterval, typingInterval;
window.addEventListener("DOMContentLoaded", () => {

    music = document.getElementById("music");

    edgeHearts();
    sparkles();
    showPage(); // 🔥 force start page

    // 👉 button click sound
    document.querySelectorAll("button").forEach(btn=>{
        btn.addEventListener("click",()=>{
            let sound = document.getElementById("clickSound");
            if(sound){
                sound.currentTime = 0;
                sound.play().catch(()=>{});
            }
        });
    });

    // 👉 celebrate button
    let celebrateBtn = document.querySelector("#page6 button");
    if(celebrateBtn){
        celebrateBtn.addEventListener("click",(e)=>{
            confettiBurst(e.clientX, e.clientY);
        });
    }

    // 👉 swipe
let img = document.getElementById("albumImg");
if(img){
    img.addEventListener("touchstart", e=>{
        startX = e.touches[0].clientX;
    });

    img.addEventListener("touchend", e=>{
        let endX = e.changedTouches[0].clientX;
        if(Math.abs(startX - endX) > 50){
            nextPhoto();
        }
    });
}});

function startMusic(){
    if(musicStarted || !music) return;

    music.volume = 0;

    music.addEventListener("loadedmetadata", ()=>{
        music.currentTime = 7;
    });

    music.play().then(()=>{
        musicStarted = true;

        let vol = 0;
        let fade = setInterval(()=>{
            vol += 0.05;
            if(vol >= 1){
                vol = 1;
                clearInterval(fade);
            }
            music.volume = vol;
        },200);

    }).catch(()=>{
        document.body.addEventListener("click", ()=>{
            if(!musicStarted){
                music.currentTime = 7;
                music.play();
                musicStarted = true;
            }
        }, {once:true});
    });
}

// 🔄 PAGE SWITCH
function showPage(id){
     console.log("Showing:", id);
    document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
    let el = document.getElementById(id);
    if(el) el.classList.add("active");

    let borders = document.getElementById("borders");
    if(borders) borders.style.display = "block";
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
    },1500);
}

// 📸 GALLERY
let photos=[
"image1.jpeg",
"image2.jpeg",
"image3.jpeg",
"image4.jpeg",
"image5.jpeg",
"image6.jpeg",
"image7.jpeg",
"image8.jpeg",
"image9.jpeg",
"image10.jpeg",
"image11.jpeg",
"image12.jpeg",
"image13.jpeg",
"image14.jpeg",
"image15.jpeg",
"image16.jpeg",
"image17.jpeg",
"image18.jpeg",
"image19.jpeg",
"image20.jpeg"
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
        h.style.left = Math.random() * 100 + "vw";
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
     container.innerHTML = "";
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
    typeText(msg, "Many more happy returns of the day 💖✨ Stay happy always 💫");
    setTimeout(()=>{
    alert("💖 You are special 💖");
    }, 4000);
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

    // 💥 particles blast
    for(let i=0;i<30;i++){
        let p = document.createElement("div");
        p.className = "particle";

        let x = (Math.random()-0.5)*400 + "px";
        let y = (Math.random()-0.5)*400 + "px";

        p.style.setProperty("--x", x);
        p.style.setProperty("--y", y);

        p.style.left = "50%";
        p.style.top = "50%";

        document.body.appendChild(p);
        setTimeout(()=>p.remove(),1000);
    }
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

let albumInterval;
function startAlbum(){
    index = 0;
    started = true;

    let title = document.getElementById("albumTitle");
    let img = document.getElementById("albumImg");

    if(title) title.innerHTML = "Tap to flip 💖";
    if(img) img.src = photos[0];
    if(albumInterval) clearInterval(albumInterval); // 🔥 prevent duplicate

    albumInterval = setInterval(()=>{
        nextPhoto();
    }, 3000);
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
    if(cakeInterval) return; // ✅ prevent multiple intervals

    cakeInterval = setInterval(()=>{
        let c = document.createElement("div");

        c.innerHTML = ["🎂","💖","✨"][Math.floor(Math.random()*3)];
        c.className = "cake";

        c.style.fontSize = (20 + Math.random()*20) + "px";
        c.style.left = Math.random()*100 + "vw";

        c.style.animationDuration = (3 + Math.random()*2) + "s";

        document.body.appendChild(c);

        setTimeout(()=>c.remove(),4000);
    }, 700);
}

function typeText(element, text, speed=50){
    let i=0;
    element.innerHTML="";
    let interval=setInterval(()=>{
        element.innerHTML += text.charAt(i);
        i++;
        if(i>=text.length) clearInterval(interval);
    }, speed);
}
function confettiBurst(x, y){
    for(let i=0;i<40;i++){
        let c = document.createElement("div");
        c.className = "particle";

        let angle = Math.random()*2*Math.PI;
        let dist = Math.random()*150;

        c.style.left = x+"px";
        c.style.top = y+"px";

        c.style.setProperty('--x', Math.cos(angle)*dist+"px");
        c.style.setProperty('--y', Math.sin(angle)*dist+"px");

        document.body.appendChild(c);
        setTimeout(()=>c.remove(),1000);
    }
}

let lastMove = 0;

document.addEventListener("mousemove", (e)=>{
    if(Date.now() - lastMove < 100) return;
    lastMove = Date.now();

    let h = document.createElement("div");
    h.innerHTML = "💖";
    h.style.position = "fixed";
    h.style.left = e.clientX + "px";
    h.style.top = e.clientY + "px";
    h.style.pointerEvents = "none";
    h.style.fontSize = "14px";
    h.style.opacity = "0.7";

    document.body.appendChild(h);

    setTimeout(()=>h.remove(),500);
});
