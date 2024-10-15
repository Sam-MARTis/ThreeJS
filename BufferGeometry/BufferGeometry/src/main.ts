import * as THREE from "three";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const makeRender = (t=0) => {

  // obj.rotation.y = 0.001*t

  

renderer.render(scene, camera);
controls.update()
requestAnimationFrame(makeRender)
};


const canvas = document.querySelector("canvas") as HTMLCanvasElement;
canvas.width = window.innerWidth * devicePixelRatio;
canvas.height = window.innerHeight * devicePixelRatio;
const fov = 75;
const AR = canvas.width/canvas.height;
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, AR, near, far);
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({antialias: true, canvas})


makeRender()
