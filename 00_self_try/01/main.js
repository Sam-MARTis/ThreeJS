import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
let canvas, renderer;
const fov = 75;
const AR = 2;
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, AR, near, far);
const scene = new THREE.Scene();
const boxDims = [1, 1, 1];
const geometry = new THREE.BoxGeometry(boxDims[0], boxDims[1], boxDims[2]);
const material = new THREE.MeshBasicMaterial({ color: "#440088" });
const cube = new THREE.Mesh(geometry, material);
const init = () => {
  canvas = document.getElementById("testCanvas");
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
//   canvas.style.width = window.innerWidth;?
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  camera.position.z = 2;

  scene.add(cube);
  makeRender();
};

const makeRender = () => {
  renderer.render(scene, camera);
};

addEventListener("DOMContentLoaded", init);
