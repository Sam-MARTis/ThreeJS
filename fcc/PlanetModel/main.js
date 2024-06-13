import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const makeRender = (t=0) => {

  obj.rotation.y = 0.001*t

  

renderer.render(scene, camera);
controls.update()
requestAnimationFrame(makeRender)
};


const canvas = document.getElementById("testCanvas");
canvas.width = window.innerWidth * devicePixelRatio;
canvas.height = window.innerHeight * devicePixelRatio;
const fov = 75;
const AR = canvas.width/canvas.height;
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, AR, near, far);
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({antialias: true, canvas})


const geo = new THREE.IcosahedronGeometry(1.0, 6);

const loader = new THREE.TextureLoader()

const material = new THREE.MeshStandardMaterial({map: loader.load("./earthmap1k.jpg")});
const light = new THREE.DirectionalLight("#ffffff", 4);
const obj = new THREE.Mesh(geo, material)

const wireMat = new THREE.MeshBasicMaterial({color: "white", wireframe: true})
const wireMesh = new THREE.Mesh(geo, wireMat)
wireMesh.scale.setScalar(1.002)
const earthGroup = new THREE.Group()






camera.position.z = 4;
light.position.set(-2,0,0);
earthGroup.rotation.z = -23.4 *Math.PI/180
earthGroup.add(obj)
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.03;


scene.add(light);
scene.add(earthGroup)
// obj.add(wireMesh)


makeRender()
