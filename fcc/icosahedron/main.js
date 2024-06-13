import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const makeRender = (t=0) => {

  // obj.rotation.y = 0.001*t

  

renderer.render(scene, camera);
controls.update()
requestAnimationFrame(makeRender)
};


const canvas = document.getElementById("testCanvas");
canvas.width = window.innerWidth * devicePixelRatio;
canvas.height = window.innerHeight * devicePixelRatio;
const fov = 75;
const AR = 2;
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, AR, near, far);
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({antialias: true, canvas})


const geo = new THREE.IcosahedronGeometry(1.0, 6);
const material = new THREE.MeshStandardMaterial({ color: "#ffffff" , flatShading: true});
const light = new THREE.HemisphereLight("#ffffff", "#0000ff");
const obj = new THREE.Mesh(geo, material)

const wireMat = new THREE.MeshBasicMaterial({color: "white", wireframe: true})
const wireMesh = new THREE.Mesh(geo, wireMat)
wireMesh.scale.setScalar(1.002)






camera.position.z = 2;
// light.position.set(-2,2,4);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.03;


scene.add(light);
scene.add(obj)
obj.add(wireMesh)


makeRender()
