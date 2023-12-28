particlesJS("bg", {
  particles: {
    number: {
      value: 10000,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: [
        "#ff0000",
        "#ff0d00",
        "#ff1a00",
        "#ff2600",
        "#ff3300",
        "#ff4000",
        "#ff4d00",
        "#ff5900",
        "#ff6600",
        "#ff7300",
        "#ff8000",
        "#ff8c00",
        "#ff9900",
        "#ffa600",
        "#ffb300",
        "#ffbf00",
        "#ffcc00",
        "#ffdd00",
        "#ffea00",
        "#fff700",
        "#fbff00",
        "#eeff00",
        "#e1ff00",
        "#d5ff00",
        "#c8ff00",
        "#bbff00",
        "#aeff00",
        "#a2ff00",
        "#95ff00",
        "#88ff00",
        "#7bff00",
        "#6fff00",
        "#62ff00",
        "#55ff00",
        "#48ff00",
        "#3cff00",
        "#2fff00",
        "#22ff00",
        "#15ff00",
        "#09ff00",
        "#00ff04",
        "#00ff11",
        "#00ff1e",
        "#00ff2b",
        "#00ff37",
        "#00ff44",
        "#00ff51",
        "#00ff5e",
        "#00ff6a",
        "#00ff77",
        "#00ff88",
        "#00ff95",
        "#00ffa2",
        "#00ffae",
        "#00ffbb",
        "#00ffc8",
        "#00ffd5",
        "#00ffe1",
        "#00ffee",
        "#00fffb",
        "#00f7ff",
        "#00eaff",
        "#00ddff",
        "#00d0ff",
        "#00c4ff",
        "#00b7ff",
        "#00aaff",
        "#009dff",
        "#0091ff",
        "#0084ff",
        "#0077ff",
        "#006aff",
        "#005eff",
        "#0051ff",
        "#0044ff",
        "#0037ff",
        "#002bff",
        "#001eff",
        "#0011ff",
        "#0004ff",
        "#0900ff",
        "#1500ff",
        "#2200ff",
        "#3300ff",
        "#4000ff",
        "#4d00ff",
        "#5900ff",
        "#6600ff",
        "#7300ff",
        "#8000ff",
        "#8c00ff",
        "#9900ff",
        "#a600ff",
        "#b300ff",
        "#bf00ff",
        "#cc00ff",
        "#d900ff",
        "#e600ff",
        "#f200ff",
        "#ff00ff",
      ],
    },
    opacity: {
      value: 1,
      random: false,
      anim: {
        enable: true,
        speed: 0.4,
        opacity_min: 0,
        sync: false,
      },
    },
    size: {
      value: 5,
      random: true,
      anim: {
        enable: true,
        speed: 20,
        size_min: 0,
        sync: false,
      },
    },
    line_linked: {
      enable: false,
    },
    move: {
      enable: true,
      speed: 20,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "bubble",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 100,
        size: 1,
        duration: 3,
        opacity: 1,
        speed: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
});

const timeout = 20000;

// setTimeout(() => {
//   generateObject();
//   setInterval(() => {
//     generateObject();
//   }, timeout);
// }, timeout);

function generateObject() {
  let whale = document.getElementById("whaleParty");
  let petuniaBowl = document.getElementById("petuniaBowlParty");
  let randomLeftOffset = Math.floor(Math.random() * 70) + 1,
    randomSelector = Math.floor(Math.random() * 2) + 1,
    current,
    newObject;

  if (randomSelector === 1) {
    current = whale;
    speak(whaleDialog);
    console.log(whaleDialog);
  } else {
    current = petuniaBowl;
    speak(flowerPotDialog);
    console.log(flowerPotDialog);
  }
  newObject = current.cloneNode(true);
  current.parentNode.replaceChild(newObject, current);
  newObject.classList.add("dropObject");
  newObject.style.left = randomLeftOffset.toString() + "%";
}
