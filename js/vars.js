
let canvas, ctx
let end = false
let frames = 0;
let imgLoaded = 0

const GAME_SIZE = 1800;
const MAP_INDEX = 2
const FLOOR_INDEX = 3

const imagesSrc = [
    'media/img/87x8cq.png',
    'media/img/player.png',
    'media/img/mapa.png',
    'media/img/chao.png',
    'media/img/items1.png',
    'media/img/wolf.png',
]
const videosSrc = []


let images = []
let items = []
let nearItems = []

// help functions

const calcDistance = (x1, y1, x2, y2) => {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    return distance;
}

const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const convertImageToImageData = (image) => {
    let canvasConverter = document.createElement('canvas');
    canvasConverter.width = image.width;
    canvasConverter.height = image.height;
  
    let ctxConverter = canvasConverter.getContext('2d');
    ctxConverter.drawImage(image, 0, 0);
  
    return ctxConverter.getImageData(0, 0, canvasConverter.width, canvasConverter.height);
};

const tag = {
    player: 'player',
    sheep: 'sheep',
    wolf: 'wolf',
    villager: 'villager',
}

const IA = {
    predator: 'predator',
    prey: 'prey',
}

// prefabs
const tree1 = {
    width: 26,
    height: 18,
    imgIndex: 0,
    sx: 78,
    sy: 215
}
const tree2 = {
    width: 36,
    height: 27,
    imgIndex: 0,
    sx: 136,
    sy: 203,
}
const tree3 = {
    width: 37,
    height: 44,
    imgIndex: 0,
    sx: 199,
    sy: 187,
}
const tree4 = {
    width: 48,
    height: 69,
    imgIndex: 0,
    sx: 257,
    sy: 166,
}
const tree5 = {
    width: 94,
    height: 131,
    imgIndex: 0,
    sx: 330,
    sy: 103,
}
const tree6 = {
    width: 113,
    height: 187,
    imgIndex: 0,
    sx: 448,
    sy: 53,
}
const genericItem = {
    width: 32,
    height: 32,
    imgIndex: 4,
}

// player
const player = {
    x: 0,
    y: 0,
    orientation: 's',
    width: 53,
    height: 65,
    imgIndex: 1,
    sx: 11,
    sy: 17,
    items: [],
}


// objs
const getRandomObj = (objs) => {
    return objs[Math.floor(Math.random() * objs.length)]
}

let objs = []
let allObjs = null

const getObjMap = () => {
    if (allObjs) {
        return allObjs
    }

    allObjs = []

    const imgData = convertImageToImageData(images[MAP_INDEX])

    for (let y = 0; y < imgData.height; y++) {
        for (let x = 0; x < imgData.width; x++) {
          let index = (y * imgData.width + x) * 4;
          let red = imgData.data[index];
          let green = imgData.data[index + 1];
          let blue = imgData.data[index + 2];

          if (
            red == 25 &&
            green == 130 &&
            blue == 56
          ) {
            //   allObjs.push({
            //     x: x * 50,
            //     y: y * 50,
            //     ...getRandomObj([tree6, tree2,tree1, tree3,tree4, tree5]),
            //   })
          }
        }
      }

    return allObjs
}

// items

// let genericItemIndex = 0
// for (let i = 1; i <= 150; i++) {
//     let locX = Math.floor(Math.abs(50 * Math.sin(i) + 0.5 * Math.sin(5 * i) + 0.3 * Math.sin(10 * i) + 0.2 * Math.sin(20 * i)) * 2e2)
//     let locY = Math.floor(Math.abs(40 * Math.sin(10 * i) + 0.2 * Math.sin(20 * i)) * 3e2)

//     console.log(i, locX, locY);
//     items.push({
//         x: locX,
//         y: locY,
//         sx: (genericItemIndex++ % 16) * genericItem.width,
//         sy: 0,
//         ...genericItem
//     })
// }



// mobs

let mobs = [
    {
        x: player.x,
        y: player.y + 150,
        width: 85,
        height: 64,
        imgIndex: 5,
        sx: 3,
        sy: 0,
        tags: [tag.wolf],
        enemies: [tag.sheep],
        hp: 100,
        speed: 1,
        attack: 15,
        defense: 15,
        hunger: 100,
        thirst: 100,
        sleep: 100,
        drop: [
            {
                sx: 0,
                sy: 0,
                ...genericItem
            }
        ],
        IA: {
            type: IA.predator,
        },
    },
    {
        x: player.x + 150,
        y: player.y + 150,
        width: 89,
        height: 65,
        imgIndex: 5,
        sx: 100,
        sy: 0,
        tags: [tag.sheep],
        enemies: [tag.wolf],
        hp: 75,
        speed: 2,
        attack: 0,
        defense: 0,
        hunger: 100,
        thirst: 100,
        sleep: 100,
        drop: [
            {
                sx: 0,
                sy: 0,
                ...genericItem
            }
        ],
        IA: {
            type: IA.prey,
        },
    },

]



