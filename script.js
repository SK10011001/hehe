// 🎵 MUSIC
let music = document.getElementById("music");
let musicStarted = false;
let celebrationStarted = false;
let floatingStarted = false;
let fireworksStarted = false;

function startMusic(){
    if(musicStarted) return;
    if(!music.paused) return;

    music.currentTime = 24;

    let playPromise = music.play();

    if(playPromise !== undefined){
        playPromise.then(()=>{
            musicStarted = true;

            // 🎵 smooth fade in AFTER play
            music.volume = 0;
            let vol = 0;

            let fade = setInterval(()=>{
                vol += 0.05;
                music.volume = vol;
                if(vol >= 1) clearInterval(fade);
            },200);

        }).catch(()=>{
            document.body.addEventListener("click", ()=>{
                if(!musicStarted){
                    music.currentTime = 24;
                    music.play();
                    musicStarted = true;
                }
            }, {once:true});
        });
    }
}

window.onload = () => {
    edgeHearts();
    sparkles();
};

// 🔄 PAGE SWITCH
function showPage(id){
    document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

// 🔐 PASSWORD
function check(){
    let p = document.getElementById("pass").value.toLowerCase();
    let input = document.getElementById("pass");
    let msg = document.getElementById("msg");

    if(p.includes("love")){

        // 💖 effects
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

        // 🔴 add shake + red glow
        input.classList.add("shake", "error");

        // remove after animation
        setTimeout(()=>{
            input.classList.remove("shake", "error");
        },500);
    }
}

// ✍️ TYPING
function typing(){
    let text="Wishing you many more happy returns of the day 💖 Stay blessed ✨";
    let i=0;
    let el=document.getElementById("typing");

    el.innerHTML="";

    let t=setInterval(()=>{
        el.innerHTML+=text[i];
        i++;
        if(i>=text.length) clearInterval(t);
    },50);
}

// 🕯️
function goCandle(){
    showPage("page3");
}

function blow(){
    document.getElementById("candle").innerHTML="💨";
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

    img.classList.add("flip");

    setTimeout(()=>{
        img.classList.remove("flip");

        if(!started){
            started = true;
            document.getElementById("albumTitle").innerHTML = "Tap to see memories 💖";
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
    container.innerHTML="";

    photos.forEach(p=>{
        let img=document.createElement("img");
        img.src=p;
        container.appendChild(img);
    });
}

// 🎉 CELEBRATION
function celebration(){
    if(celebrationStarted) return;
    celebrationStarted = true;

    setInterval(()=>{
        let el=document.createElement("div");
        el.innerHTML=["🎉","🎊","💖","🎂"][Math.floor(Math.random()*4)];
        el.className="float";
        el.style.left=Math.random()*100+"vw";
        document.body.appendChild(el);
        setTimeout(()=>el.remove(),4000);
    },200);
}

// 💖 FLOAT
function floating(){
    if(floatingStarted) return;
    floatingStarted = true;

    setInterval(()=>{
        let el=document.createElement("div");
        el.innerHTML="💖";
        el.className="float";
        el.style.left=Math.random()*100+"vw";
        document.body.appendChild(el);
        setTimeout(()=>el.remove(),4000);
    },800);
}

// ✨ SPARKLES
function sparkles(){
    setInterval(()=>{
        let s=document.createElement("div");
        s.innerHTML="✨";
        s.className="spark";
        s.style.left=Math.random()*100+"vw";
        s.style.top=Math.random()*100+"vh";
        document.body.appendChild(s);
        setTimeout(()=>s.remove(),2000);
    },400);
}

// 💖 BORDER
function edgeHearts(){
    let container=document.getElementById("borders");
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

    setInterval(()=>{
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

// 🎉 FINAL MSG
function celebrate(){
    let msg = document.getElementById("finalMsg");

    msg.innerHTML =
    "Many more happy returns of the day 💖✨ Stay happy always 💫";

    // 🎆 start fireworks
    fireworks();

    // 💖 extra celebration
    celebration();
    floating();
}

let fireStarted = false;
function goFinal(){
    showPage("page6");

    document.getElementById("finalMsg").innerHTML =
    "Many more happy returns of the day 💖✨ Stay happy always 💫";

    if(!fireStarted){
        fireworks();
        fireStarted = true;
    }
    setTimeout(()=>{
    let msg = document.getElementById("finalMsg");
    msg.innerHTML += "<br><br>Made with 💖 just for you";
},2000);
}

function startAlbum(){
    index = 0;
    started = true; // 🔥 important
    document.getElementById("albumTitle").innerHTML = "Tap to flip 💖";
    document.getElementById("albumImg").src = photos[0];
}