import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
let SPEED = 5;
const makeRender = (t = 0) => {
  // obj.rotation.y = 0.001*t
  // lightsMesh.rotation.y = 0.001*t
  let p1 = path.getPointAt((t * 0.001 * 0.01 * SPEED) % 1);
  let p2 = path.getPointAt(((t + 50) * 0.001 * 0.01 * SPEED) % 1);
  camera.position.set(p1.x, p1.y, p1.z)
  camera.lookAt(p2)
  light.position.set(p2.x, p2.y, p2.z)
  console.log(p1.x / SCALE, p1.y / SCALE, p1.z / SCALE);

  renderer.render(scene, camera);
  // controls.update()
  requestAnimationFrame(makeRender);
};
const points = [
  [0, 0, 0],
  [1, 0, 0],
  [3, 1, 4],
  [4, 2, 5],
  [3, 3, 6],
  [2, 4, 7],
  [3, 6, 8],
  [4, 7, 6],
  [3, 8, 5],
  [-3, 6, 4],
  [-6, 4, 3],
  [-8, 0, 0],
  [0, 0, 0],
];
let SCALE = 0.2;
//Convert the array of points into vertices
for (let i = 0; i < points.length; i++) {
  const x = points[i][0];
  const y = points[i][1];
  const z = points[i][2];
  points[i] = new THREE.Vector3(x * SCALE, y * SCALE, z * SCALE);
}
//Create a path from the points
const path = new THREE.CatmullRomCurve3(points);

const canvas = document.getElementById("testCanvas");
canvas.width = window.innerWidth * devicePixelRatio;
canvas.height = window.innerHeight * devicePixelRatio;
const fov = 75;
const AR = canvas.width / canvas.height;
const near = 0.01;
const far = 0.5;
const camera = new THREE.PerspectiveCamera(fov, AR, near, far);
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
const light = new THREE.PointLight(0xffffff, 1);

const tubeGeometry = new THREE.TubeGeometry(path, 250, 0.05, 10, true);
// const tubeGeometry = new THREE.BufferGeometry().setFromPoints(path.getPoints(1000));
const tubeMaterial = new THREE.MeshBasicMaterial({
  color: "red",
  side: THREE.DoubleSide,
  wireframe: true,
});
const edges = new THREE.EdgesGeometry(tubeGeometry, 1);
const lineMat = new THREE.LineBasicMaterial({color: "#aa00ff"});
const tubeLines = new THREE.LineSegments(edges, lineMat);
const tubeMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);



scene.fog = new THREE.FogExp2(0x000000, 4);
scene.add(tubeMesh);

camera.position.z = 4;
light.position.set(-1, 0, 0);

// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;
// controls.dampingFactor = 0.03;

scene.add(light);
// obj.add(wireMesh)

makeRender();
