import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

let canvas, renderer, object;
const fov = 75;
const AR = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 50000;
const camera = new THREE.PerspectiveCamera(fov, AR, near, far);
const scene = new THREE.Scene();

const light = new THREE.AmbientLight(0xFFFFFF, 10);  // Color and intensity separately

canvas = document.getElementById("projectCanvas");
canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;
renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;
controls.enableZoom = true;

scene.add(light);

const loader = new GLTFLoader();
loader.load(
  "models/rocket/scene.gltf",
  (gltf) => {
    object = gltf.scene;
    centerStuff(object);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (err) => {
    console.error(err);
  }
);

const centerStuff = (object) => {
  object.position.set(0, 0, 570);
  scene.add(object);
};

const radius = 1000;  // Radius of the circular orbit
let angle = 0;  // Initial angle

const makeRender = (t = 0) => {
  
  // Update the camera position to orbit around the object
  angle += 0.01;  // Increment the angle to create rotation
  camera.position.x = radius * Math.sin(angle);
  camera.position.z = radius * Math.cos(angle);
  camera.position.y = 150;  // Keep the camera at the same height as the object
  
  // Ensure the camera is always looking at the object
  if (object){
  camera.lookAt(object.position);
  }
  
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(makeRender);
};

// Initialize rendering
makeRender();
