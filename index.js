let startButton = document.getElementById("start_button");
let stopButton = document.getElementById('stop_button');
let myRequestId;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
const petriDish = document.getElementById("moleculeSim").getContext("2d");
const draw = (x, y, c, s) => {
    petriDish.fillStyle = c;
    petriDish.fillRect(x, y, s, s);
}

var molecules = [];
const molecule = (x, y, c) => {
    return { x: x, y: y, vx: 0, vy: 0, color: c };
}

const random = () => {
    return Math.random() * 500;
}

const create = (number, color) => {
    for (let i = 0; i < number; i++) {
        molecules.push(molecule(random(), random(), color));
    }
}

  
function updateSliders(){
    RULES = {
        lightblue: {
            lightblue: document.getElementById("blue_on_blue").value,
            red: document.getElementById("blue_on_red").value,
            lightgreen: document.getElementById("blue_on_green").value,
            yellow: document.getElementById("blue_on_yellow").value,
        },
        red: {
            lightblue: document.getElementById("red_on_blue").value,
            red: document.getElementById("red_on_red").value,
            lightgreen: document.getElementById("red_on_green").value,
            yellow: document.getElementById("red_on_yellow").value,
        },

        lightgreen: {
            lightblue: document.getElementById("green_on_blue").value,
            red: document.getElementById("green_on_red").value,
            lightgreen: document.getElementById("green_on_green").value,
            yellow: document.getElementById("green_on_yellow").value,
        },
        
        yellow: {
            lightblue: document.getElementById("yellow_on_blue").value,
            red: document.getElementById("yellow_on_red").value,
            lightgreen: document.getElementById("yellow_on_green").value,
            yellow: document.getElementById("yellow_on_yellow").value,
        },
      }
      console.log(JSON.stringify(RULES));
    return RULES;
      
}

function applyRules(RULES) {
    let speedSlider = document.getElementById("speed");
    for (let i = 0; i < molecules.length; i++) {
      let fx = 0;
      let fy = 0;
      const a = molecules[i];
      for (let j = 0; j < molecules.length; j++) {
        if (j !== i) {
          const b = molecules[j];
          const g = RULES[a.color][b.color];
          if (g !== undefined) {
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            if (dx !== 0 || dy !== 0) {
              const d = dx * dx + dy * dy;
              if (d < 6400) {
                const F = g / Math.sqrt(d);
                fx += F * dx;
                fy += F * dy;
              }
            }
          }
        }
      }
      a.vx = (a.vx + fx) * speedSlider.value;
      a.vy = (a.vy + fy) * speedSlider.value;
      a.x += a.vx;
      a.y += a.vy;

      
      // making the particles bounce off the walls
      if (a.x <= 0) {
        a.vx *= -1;
        a.x = 0;
      }
      if (a.x >= 500) {
        a.vx *= -1;
        a.x = 500;
      }
      if (a.y <= 0) {
        a.vy *= -1;
        a.y = 0;
      }
      if (a.y >= 500) {
        a.vy *= -1;
        a.y = 500;
      }
    }
}


function reset(){
    petriDish.clearRect(0, 0, 500, 500);
    draw(0, 0, "black", 500);
    molecules = [];
}


update=()=>{
    updatedRules = updateSliders();
    applyRules(updatedRules);
    petriDish.clearRect(0, 0, 500, 500);
    draw(0, 0, "black", 500);
    for (i = 0; i < molecules.length; i += 1) {
        draw(molecules[i].x, molecules[i].y, molecules[i].color, 2.5);
    }
    myRequestId = window.requestAnimationFrame(update);
}


draw(0, 0, "black", 500);

function start() {
    create(document.getElementById("numBlue").value, "lightblue");
    create(document.getElementById("numRed").value, "red");
    create(document.getElementById("numGreen").value, "lightgreen");
    create(document.getElementById("numYellow").value, "yellow");
    update();    
}

function updateVals(){
    document.getElementById("b1").value = document.getElementById("blue_on_blue").value;
    document.getElementById("b2").value = document.getElementById("blue_on_red").value;
    document.getElementById("b3").value = document.getElementById("blue_on_green").value;
    document.getElementById("b4").value = document.getElementById("blue_on_yellow").value;

    document.getElementById("r1").value = document.getElementById("red_on_blue").value;
    document.getElementById("r2").value = document.getElementById("red_on_red").value;
    document.getElementById("r3").value = document.getElementById("red_on_green").value;
    document.getElementById("r4").value = document.getElementById("red_on_yellow").value;

    document.getElementById("g1").value = document.getElementById("green_on_blue").value;
    document.getElementById("g2").value = document.getElementById("green_on_red").value;
    document.getElementById("g3").value = document.getElementById("green_on_green").value;
    document.getElementById("g4").value = document.getElementById("green_on_yellow").value;

    document.getElementById("y1").value = document.getElementById("yellow_on_blue").value;
    document.getElementById("y2").value = document.getElementById("yellow_on_red").value;
    document.getElementById("y3").value = document.getElementById("yellow_on_green").value;
    document.getElementById("y4").value = document.getElementById("yellow_on_yellow").value;

    document.getElementById("speedVal").value = document.getElementById("speed").value;
}

function randomizeSliders(){
    document.getElementById("blue_on_blue").value = (getRandomInt(200) - 100)/100;
    document.getElementById("blue_on_red").value = (getRandomInt(200) - 100)/100;
    document.getElementById("blue_on_green").value = (getRandomInt(200) - 100)/100;
    document.getElementById("blue_on_yellow").value = (getRandomInt(200) - 100)/100;
    
    document.getElementById("red_on_blue").value = (getRandomInt(200) - 100)/100;
    document.getElementById("red_on_red").value = (getRandomInt(200) - 100)/100;
    document.getElementById("red_on_green").value = (getRandomInt(200) - 100)/100;
    document.getElementById("red_on_yellow").value = (getRandomInt(200) - 100)/100;
    
    document.getElementById("green_on_blue").value = (getRandomInt(200) - 100)/100;
    document.getElementById("green_on_red").value = (getRandomInt(200) - 100)/100;
    document.getElementById("green_on_green").value = (getRandomInt(200) - 100)/100;
    document.getElementById("green_on_yellow").value = (getRandomInt(200) - 100)/100;
    
    document.getElementById("yellow_on_blue").value = (getRandomInt(200) - 100)/100;
    document.getElementById("yellow_on_red").value = (getRandomInt(200) - 100)/100;
    document.getElementById("yellow_on_green").value = (getRandomInt(200) - 100)/100;
    document.getElementById("yellow_on_yellow").value = (getRandomInt(200) - 100)/100;

    document.getElementById("speed").value = ".45";
    updateVals();
}

function preset1(){
    document.getElementById("blue_on_blue").value = ".84";
    document.getElementById("blue_on_red").value = "-.81";
    document.getElementById("blue_on_green").value = "-.63";
    document.getElementById("blue_on_yellow").value = "-.62";
    
    document.getElementById("red_on_blue").value = "-.9";
    document.getElementById("red_on_red").value = ".07";
    document.getElementById("red_on_green").value = "-.81";
    document.getElementById("red_on_yellow").value = "-.42";
    
    document.getElementById("green_on_blue").value = "-.9";
    document.getElementById("green_on_red").value = "-.63";
    document.getElementById("green_on_green").value = ".88";
    document.getElementById("green_on_yellow").value = "-.11";
    
    document.getElementById("yellow_on_blue").value = "-.82";
    document.getElementById("yellow_on_red").value = "-.49";
    document.getElementById("yellow_on_green").value = "-.63";
    document.getElementById("yellow_on_yellow").value = ".49";

    document.getElementById("speed").value = ".45";
    updateVals();
}

function preset2(){
    document.getElementById("blue_on_blue").value = ".84";
    document.getElementById("blue_on_red").value = "-.81";
    document.getElementById("blue_on_green").value = "-.63";
    document.getElementById("blue_on_yellow").value = "-.62";
    
    document.getElementById("red_on_blue").value = "-.9";
    document.getElementById("red_on_red").value = ".07";
    document.getElementById("red_on_green").value = "-.81";
    document.getElementById("red_on_yellow").value = "-.42";
    
    document.getElementById("green_on_blue").value = "-.9";
    document.getElementById("green_on_red").value = "-.63";
    document.getElementById("green_on_green").value = ".88";
    document.getElementById("green_on_yellow").value = "-.11";
    
    document.getElementById("yellow_on_blue").value = "-.82";
    document.getElementById("yellow_on_red").value = "-.49";
    document.getElementById("yellow_on_green").value = "-.63";
    document.getElementById("yellow_on_yellow").value = ".49";

    document.getElementById("speed").value = ".45";
    updateVals();
}

function preset3(){
    document.getElementById("blue_on_blue").value = ".84";
    document.getElementById("blue_on_red").value = "-.81";
    document.getElementById("blue_on_green").value = "-.63";
    document.getElementById("blue_on_yellow").value = "-.62";
    
    document.getElementById("red_on_blue").value = "-.9";
    document.getElementById("red_on_red").value = ".07";
    document.getElementById("red_on_green").value = "-.81";
    document.getElementById("red_on_yellow").value = "-.42";
    
    document.getElementById("green_on_blue").value = "-.9";
    document.getElementById("green_on_red").value = "-.63";
    document.getElementById("green_on_green").value = ".88";
    document.getElementById("green_on_yellow").value = "-.11";
    
    document.getElementById("yellow_on_blue").value = "-.82";
    document.getElementById("yellow_on_red").value = "-.49";
    document.getElementById("yellow_on_green").value = "-.63";
    document.getElementById("yellow_on_yellow").value = ".49";

    document.getElementById("speed").value = ".45";
    updateVals();
}

function preset4(){
    document.getElementById("blue_on_blue").value = ".84";
    document.getElementById("blue_on_red").value = "-.81";
    document.getElementById("blue_on_green").value = "-.63";
    document.getElementById("blue_on_yellow").value = "-.62";
    
    document.getElementById("red_on_blue").value = "-.9";
    document.getElementById("red_on_red").value = ".07";
    document.getElementById("red_on_green").value = "-.81";
    document.getElementById("red_on_yellow").value = "-.42";
    
    document.getElementById("green_on_blue").value = "-.9";
    document.getElementById("green_on_red").value = "-.63";
    document.getElementById("green_on_green").value = ".88";
    document.getElementById("green_on_yellow").value = "-.11";
    
    document.getElementById("yellow_on_blue").value = "-.82";
    document.getElementById("yellow_on_red").value = "-.49";
    document.getElementById("yellow_on_green").value = "-.63";
    document.getElementById("yellow_on_yellow").value = ".49";

    document.getElementById("speed").value = ".45";
    updateVals();
}

function preset5(){
    document.getElementById("blue_on_blue").value = ".84";
    document.getElementById("blue_on_red").value = "-.81";
    document.getElementById("blue_on_green").value = "-.63";
    document.getElementById("blue_on_yellow").value = "-.62";
    
    document.getElementById("red_on_blue").value = "-.9";
    document.getElementById("red_on_red").value = ".07";
    document.getElementById("red_on_green").value = "-.81";
    document.getElementById("red_on_yellow").value = "-.42";
    
    document.getElementById("green_on_blue").value = "-.9";
    document.getElementById("green_on_red").value = "-.63";
    document.getElementById("green_on_green").value = ".88";
    document.getElementById("green_on_yellow").value = "-.11";
    
    document.getElementById("yellow_on_blue").value = "-.82";
    document.getElementById("yellow_on_red").value = "-.49";
    document.getElementById("yellow_on_green").value = "-.63";
    document.getElementById("yellow_on_yellow").value = ".49";

    document.getElementById("speed").value = ".45";
    updateVals();
}