import * as PIXI from 'pixi.js';
import io from 'socket.io-client';
import { Howl, Howler } from 'howler';
const socket = io('http://localhost:4000');

console.log("started")
var direction = "";
socket.on("direction", (data) => {
    direction = data;
})

var counter = 0;
var sound = new Howl({
    src: ['/assets/boop.wav']
});


const bgsound = new Howl({
    src: ['/assets/bg.wav']
});

const app = new PIXI.Application({ backgroundColor: 0x1099bb });
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);
const style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
    zIndex: 1000,
});

document.body.appendChild(app.view);
const basicText = new PIXI.Text(generateText(counter), style);
const textBounds = basicText.getBounds();
basicText.x = app.screen.width / 2 - textBounds.width / 2;
basicText.y = 100;
basicText.zIndex = 1000;

// create a new Sprite from an image path
const bTex = [];
bTex.push(PIXI.Texture.from('/assets/boaz.png'))
bTex.push(PIXI.Texture.from('/assets/boaz2.png'))
bTex.push(PIXI.Texture.from('/assets/boaz3.png'))
bTex.push(PIXI.Texture.from('/assets/boaz4.png'))
bTex.push(PIXI.Texture.from('/assets/boaz5.png'))
bTex.push(PIXI.Texture.from('/assets/boaz6.png'))
bTex.push(PIXI.Texture.from('/assets/boaz7.png'))
bTex.push(PIXI.Texture.from('/assets/boaz8.png'))
bTex.push(PIXI.Texture.from('/assets/boaz9.png'))
bTex.push(PIXI.Texture.from('/assets/boaz10.png'))
bTex.push(PIXI.Texture.from('/assets/boaz11.png'))

const tTex = [];
tTex.push(PIXI.Texture.from('/assets/elmo.png'))
tTex.push(PIXI.Texture.from('/assets/lilo.png'))
tTex.push(PIXI.Texture.from('/assets/saitama.png'))
tTex.push(PIXI.Texture.from('/assets/stitch.png'))
tTex.push(PIXI.Texture.from('/assets/cyborg.png'))

var boaz = PIXI.Sprite.from(getRandomTexture(bTex));
const tzruya = PIXI.Sprite.from(getRandomTexture(tTex));

// center the sprite's anchor point
boaz.anchor.set(0.5);
tzruya.anchor.set(0.5);

// move the sprite to the center of the screen
boaz.x = app.screen.width / 2;
boaz.y = app.screen.height / 2;

var loc = newRandomLocation(tzruya);

tzruya.x = loc.x;
tzruya.y = loc.y;
while (testForAABB(boaz, tzruya)) {
    loc = newRandomLocation(tzruya);
    tzruya.x = loc.x;
    tzruya.y = loc.y;
}

console.log()


app.stage.addChild(boaz);
app.stage.addChild(tzruya);

app.stage.addChild(basicText);

function testForAABB(object1, object2) {
    const bounds1 = object1.getBounds();
    const bounds2 = object2.getBounds();

    return bounds1.x < bounds2.x + bounds2.width
        && bounds1.x + bounds2.width > bounds2.x
        && bounds1.y < bounds2.y + bounds2.height
        && bounds1.y + bounds2.height > bounds2.y;
}

// Listen for animate update
app.ticker.add((delta) => {
    // just for fun, let's rotate mr rabbit a little
    // delta is 1 if running at 100% performance
    // creates frame-independent transformation
    //boaz.rotation += 0.1 * delta;
    const speed = 5

    const boazBounds = boaz.getBounds();
    var moving = false;
    var x = boaz.position.x;
    var y = boaz.position.y;
    if (direction === "centerleft") {
        x = boaz.position.x - speed * delta;
        if (x < boazBounds.width / 2) {
            x = boaz.position.x;
        }
        moving = true;

    }
    else if (direction === "centerright") {
        x = boaz.position.x + speed * delta;
        if (x > app.screen.width - boazBounds.width / 2) {
            x = boaz.position.x
        }
        moving = true;
    } else if (direction === "middleup") {
        y = boaz.position.y - speed * delta;
        if (y < boazBounds.height / 2) {
            y = boaz.position.y;
        }
        moving = true;
    } else if (direction === "middledown") {
        y = boaz.position.y + speed * delta;
        if (y > app.screen.height - boazBounds.height / 2) {
            y = boaz.position.y;
        }
        moving = true;
    }

    if (!moving) {
        bgsound.pause();
    } else {
        if (!bgsound.playing()) {
            bgsound.play();
        }

    }


    if (testForAABB(boaz, tzruya)) {
        boaz.texture = getRandomTexture(bTex);
        tzruya.texture = getRandomTexture(tTex);
        counter++;

        basicText.text = generateText(counter)
        const loc = newRandomLocation(tzruya);
        sound.play();
        tzruya.position.set(loc.x, loc.y)
    }

    boaz.position.set(x, y)
});


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function newRandomLocation(object) {

    const bound = object.getBounds();
    const x = getRandomInt(bound.width / 2, app.screen.width - bound.width / 2);
    const y = getRandomInt(bound.height / 2, app.screen.height - bound.height / 2);
    return { x, y }
}

function generateText(counter) {
    return `Score\n ${counter}`
}

function getRandomTexture(arr) {
    return arr[getRandomInt(0, arr.length - 1)]
}