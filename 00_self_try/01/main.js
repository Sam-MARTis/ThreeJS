import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
let canvas, renderer, cubes;
const fov = 75;
const AR = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, AR, near, far);
const scene = new THREE.Scene();
const boxDims = [1, 1, 1];
const geometry = new THREE.BoxGeometry(boxDims[0], boxDims[1], boxDims[2]);
const material = new THREE.MeshPhongMaterial({ color: "#8800BB" });
// const cube = new THREE.Mesh(geometry, material);
const light = new THREE.DirectionalLight({color: "#FFFFFF", intensity:5});

const init = () => {
  canvas = document.getElementById("testCanvas");
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  camera.position.z = 2;
  light.position.set(-1,2,4);


//   scene.add(cube);
  scene.add(light);
  cubes = [
    makeInstance(geometry, "#FF0011", -2),
    makeInstance(geometry, "#00FF11", 2),
    makeInstance(geometry, "#1100FF", 0)
  ]
  makeRender();
};


const makeInstance = (geometry, colour, x) =>{
    const material = new THREE.MeshPhongMaterial({color:colour})
    const obj = new THREE.Mesh(geometry, material)
    scene.add(obj)
    obj.position.x = x
    return obj
}
const makeRender = (t=0) => {
    // console.log(t);
    cubes.forEach((cube, index) => {

        cube.rotation.x = t*0.001*100 * (index+1)*Math.PI /180 
       cube.rotation.y = t*0.001 + 100*Math.cos(t/300)*Math.PI/180
    })
    

  renderer.render(scene, camera);
  requestAnimationFrame(makeRender)
};

addEventListener("DOMContentLoaded", init);
