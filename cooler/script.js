gsap.registerPlugin(TextPlugin, EasePack);

var tl = gsap.timeline({defaults: {duration: 2, ease: "none"}});






const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
};

const texts = [
    "L",
    "A",
    "R",
    "S",
];

const morphTime = 1;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
    }

    setMorph(fraction);
}

function setMorph(fraction) {
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
}

function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
        if (shouldIncrementIndex) {
            textIndex++;
        }

        doMorph();
    } else {
        doCooldown();
    }
}

animate();

flaggy_neutral = document.getElementById("flaggy_neutral");
flaggy_happy = document.getElementById("flaggy_happy");
flaggy_sad = document.getElementById("flaggy_sad");
all_flaggies = [flaggy_sad, flaggy_happy, flaggy_neutral];
// Make the DIV element draggable:

for (let i = 0; i < all_flaggies.length; i++) {
    dragElement(all_flaggies[i]);
}


let rotCount = 0;
let check = null

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        if (check === null) {
            check = prompt("Is L.A.R.S. the best CTF team in the world?", "Yes")
        }
        if (check.toLowerCase() !== "yes") {
            flaggy_neutral.style.display = "none";
            flaggy_sad.style.display = "block";
            flaggy_happy.style.display = "none";

            alert("You are not allowed to pull out the flaggy until you admit that L.A.R.S. is the best CTF team in the world!")
            check = null;
            return;
        }
        flaggy_neutral.style.display = "none";
        flaggy_sad.style.display = "none";
        flaggy_happy.style.display = "block";


        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {

        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:

        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        let angle = Math.floor(Math.random() * 20) - 10;

        for (let i = 0; i < all_flaggies.length; i++) {
            let elmnt = all_flaggies[i];
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";


            if (rotCount % 10 === 0)
                elmnt.style.transform = "rotate(" + angle + "deg)";
        }


        rotCount += 1;
    }

    elmnt.offsetTop - pos2

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}








var container = $("#demo"),
    _sentenceEndExp = /(\.|\?|!)$/g; //regular expression to sense punctuation that indicates the end of a sentence so that we can adjust timing accordingly

//this function just takes a string of text and splits it into an array based on the maximum length that should be allowed to exist in each line, and when it encounters the end of a sentence (ending in ".", "?", or "!"), it will force a line break too.
function buildChunks(text, maxLength) {
    if (maxLength === undefined) {
        return text.split(" ");
    }
    var words = text.split(" "),
        wordCount = words.length,
        chunk = [],
        chunks = [], i;
    for (i = 0; i < wordCount; i++){
        chunk.push(words[i]);
        if (_sentenceEndExp.test(words[i]) || i === wordCount - 1 || chunk.join(" ").length + words[i+1].length > maxLength) {
            chunks.push(chunk.join(" "));
            chunk = [];
        }
    }
    return chunks;
}


/* taken from https://codepen.io/GreenSock/pen/DpRrWV */
function machineGun(chunks, maxLength) {
    //in case "chunks" isn't an array, we'll build chunks automatically
    if (!(chunks instanceof Array)) {
        chunks = buildChunks(chunks, maxLength);
    }

    var tl = new TimelineMax({delay:0.6, repeat:2, repeatDelay:4}),
        time = 0,
        chunk, element, duration, isSentenceEnd, i;

    for (i = 0; i < chunks.length; i++) {
        chunk = chunks[i];
        isSentenceEnd = _sentenceEndExp.test(chunk) || (i === chunks.length - 1);
        element = $("<h3>" + chunk + "</h3>").appendTo(container);
        duration = Math.max(0.5, chunk.length * 0.08); //longer words take longer to read, so adjust timing. Minimum of 0.5 seconds.
        if (isSentenceEnd) {
            duration += 0.5; //if it's the last word in a sentence, drag out the timing a bit for a dramatic pause.
        }
        //set opacity and scale to 0 initially. We set z to 0.01 just to kick in 3D rendering in the browser which makes things render a bit more smoothly.
        TweenLite.set(element, {autoAlpha:0, scale:0, z:0.01});
        //the SlowMo ease is like an easeOutIn but it's configurable in terms of strength and how long the slope is linear. See https://www.greensock.com/v12/#slowmo and https://api.greensock.com/js/com/greensock/easing/SlowMo.html
        tl.to(element, duration, {scale:1.2,  ease:SlowMo.ease.config(0.25, 0.9)}, time)
            //notice the 3rd parameter of the SlowMo config is true in the following tween - that causes it to yoyo, meaning opacity (autoAlpha) will go up to 1 during the tween, and then back down to 0 at the end.
            .to(element, duration, {autoAlpha:1, ease:SlowMo.ease.config(0.25, 0.9, true)}, time);
        time += duration - 0.05;
        if (isSentenceEnd) {
            time += 0.5; //at the end of a sentence, add a pause for dramatic effect.
        }
    }
}

machineGun("We are L.A.R.S. We win every CTF. We are the best in the World. No one can defeat us. We never lose. We always win. We take all flags and we don't give them back. You should be scared, because we also take your flag.", 12);


const canvas = document.getElementById('flags')

const jsConfetti = new JSConfetti({ canvas })

function fire() {
    jsConfetti.addConfetti({
        emojis: ['🏳️‍🌈', '🚩️', '🏳️‍⚧️', '🏴‍☠️', '🏳️', '🏴'],
    })
    setTimeout(fire, 700)
}
fire()




















