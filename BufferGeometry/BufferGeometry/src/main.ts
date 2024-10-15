import * as THREE from "three";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const makeRender = (t = 0) => {
  // obj.rotation.y = 0.001*t

  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(makeRender);
};
const displacementFunction = (x: number, y: number) => {
  return { x: x + y / 10, y: y + x / 10 };
};

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
canvas.width = window.innerWidth * devicePixelRatio;
canvas.height = window.innerHeight * devicePixelRatio;
const fov = 75;
const AR = canvas.width / canvas.height;
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, AR, near, far);
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

const maxx = 3;
const maxy = 3;
const step = 1;
const size = 0.1;

const light = new THREE.AmbientLight("#ffffff", 1);

const geometry = new THREE.BufferGeometry();

const vertices = new Float32Array([
  -1, -1, 0, 3, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0,
]);
const colours = new Float32Array([
  0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
]);

const xVals:number[][] = [];
const yVals:number[][] = [];
const colourVals:number[][][] = [];

for(let j=0; j< maxy; j++){
    xVals.push([])
    yVals.push([])
    colourVals.push([])

for(let i = 0; i<maxx; i++){
    xVals[j].push(i)
    yVals[j].push(j)
    colourVals[j].push([1, 0, i/maxx])
}
}

const createVertices = (xArr: number[][], yArr: number[][]) => {
  const vertices = [];
  for (let j = 0; j < yArr.length-1; j++) {
    for (let i = 0; i < xArr.length-1; i++) {
        vertices.push(xArr[j][i], yArr[j][i], 0);
        vertices.push(xArr[j][i+1], yArr[j][i+1], 0);
        vertices.push(xArr[j+1][i], yArr[j+1][i], 0);
        vertices.push(xArr[j+1][i+1], yArr[j+1][i+1], 0);
        vertices.push(xArr[j+1][i], yArr[j+1][i], 0);
        vertices.push(xArr[j][i+1], yArr[j][i+1], 0);
    }
  }
    return new Float32Array(vertices);
};
const createColourVertices = (colourVals: number[][][]) => {
    const vertices = []
    for (let j = 0; j < colourVals.length; j++) {
        for (let i = 0; i < colourVals.length; i++) {
            vertices.push(colourVals[i][j][0], colourVals[i][j][1], colourVals[i][j][2], colourVals[i][j][0], colourVals[i][j][1], colourVals[i][j][2], colourVals[i][j][0], colourVals[i][j][1], colourVals[i][j][2]   );
        }
      }
        return new Float32Array(vertices);

}


const v2 = createVertices(xVals, yVals);
// const v2 = new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0])
console.log(v2)
const c2 = createColourVertices(colourVals)

geometry.setAttribute("position", new THREE.BufferAttribute(v2, 3));
geometry.setAttribute("color", new THREE.BufferAttribute(c2, 3));
// geometry.setIndex(new THREE.BufferAttribute(indices, 1));

const material = new THREE.MeshStandardMaterial({
  vertexColors: true,
// color: "white",
  wireframe: false,
});

const obj = new THREE.Mesh(geometry, material);

scene.add(obj);

camera.position.z = 2;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

scene.add(light);

makeRender();
