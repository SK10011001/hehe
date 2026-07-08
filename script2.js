// 🎵 MUSIC
let music;
let musicStarted = false;

let startX = 0;

window.addEventListener("DOMContentLoaded", () => {

    music = document.getElementById("music");

    edgeHearts();
    sparkles();
    showPage("page1");

    // 🔊 click sound
    document.querySelectorAll("button").forEach(btn=>{
        btn.addEventListener("click",()=>{
            let sound = document.getElementById("clickSound");
            if(sound){
                sound.currentTime = 0;
                sound.play().catch(()=>{});
            }
        });
    });

    // 📱 swipe
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
    }
});

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

// 🔄 PAGE
function showPage(id){
    document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
    let el = document.getElementById(id);
    if(el) el.classList.add("active");
}

// 🔐 PASSWORD
function check(){
    let input = document.getElementById("pass");
    let msg = document.getElementById("msg");

    let p = input.value.toLowerCase();

    if(p.includes("love")){
        startMusic();

        let count = 3;

        let inter = setInterval(()=>{
            msg.innerHTML = "Unlocking in " + count;
            count--;

            if(count < 0){
                clearInterval(inter);
                showPage("page2");
                typing();
            }
        },1000);

    }else{
        msg.innerHTML = "Wrong 💔";
    }
}

// ✍️ TEXT
function typing(){
    let text="Wishing you many more happy returns of the day 💖✨";
    let i=0;
    let el=document.getElementById("typing");

    el.innerHTML="";

    let t = setInterval(()=>{
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
        startAlbum(); // 🔥 FIXED
    },1000);
}

// 📸 ALBUM
let photos=[
"image1.jpeg","image2.jpeg","image3.jpeg","image4.jpeg","image5.jpeg",
"image6.jpeg","image7.jpeg","image8.jpeg","image9.jpeg","image10.jpeg",
"image11.jpeg","image12.jpeg","image13.jpeg","image14.jpeg","image15.jpeg",
"image16.jpeg","image17.jpeg","image18.jpeg","image19.jpeg","image20.jpeg"
];

let index=0;

function nextPhoto(){
    let img = document.getElementById("albumImg");

    index++;

    if(index < photos.length){
        img.src = photos[index];
    }else{
        index = 0;
        buildFrame();
        showPage("page5");
    }
}

function startAlbum(){
    let img = document.getElementById("albumImg");
    index = 0;
    img.src = photos[0];
}

function buildFrame(){
    let container=document.getElementById("frame");
    container.innerHTML="";

    photos.forEach(p=>{
        let img=document.createElement("img");
        img.src=p;
        container.appendChild(img);
    });
}

// 🎉 FINAL
function goFinal(){
    showPage("page6");

    let msg = document.getElementById("finalMsg");
    msg.innerHTML = "Many more happy returns 💖✨";
}

function celebrate(){
    alert("💖 You are special 💖");
}

// ✨ EFFECTS
function sparkles(){
    setInterval(()=>{
        let s=document.createElement("div");
        s.innerHTML="✨";
        s.className="spark";
        s.style.left=Math.random()*100+"vw";
        s.style.top=Math.random()*100+"vh";
        document.body.appendChild(s);
        setTimeout(()=>s.remove(),2000);
    },700);
}

function edgeHearts(){
    let container=document.getElementById("borders");

    ["top","bottom","left","right"].forEach(side=>{
        let div=document.createElement("div");
        div.className="border-"+side;

        for(let i=0;i<15;i++){
            let h=document.createElement("span");
            h.innerHTML="💖";
            div.appendChild(h);
        }
        container.appendChild(div);
    });
}