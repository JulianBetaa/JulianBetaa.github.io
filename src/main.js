import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { animateCamera, animateTorus } from "./animations";

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(6));
scene.background = new THREE.Color(0x242424);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ambient Light
const light = new THREE.AmbientLight(0xffffff, 0.8);
light.position.set(10, 10, 10);
scene.add(light);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(14, 12, 10);
camera.lookAt(0, 0, 0);
const cameraMoveSpeed = 3;
const move = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  up: false,
  down: false,
};
document.addEventListener("keydown", (e) => {
  if (e.key === "w") move.forward = true;
  if (e.key === "s") move.backward = true;
  if (e.key === "a") move.left = true;
  if (e.key === "d") move.right = true;
  if (e.key === "e") move.up = true;
  if (e.key === "q") move.down = true;
});
document.addEventListener("keyup", (e) => {
  if (e.key === "w") move.forward = false;
  if (e.key === "s") move.backward = false;
  if (e.key === "a") move.left = false;
  if (e.key === "d") move.right = false;
  if (e.key === "e") move.up = false;
  if (e.key === "q") move.down = false;
});

// Orbit Controls with Mouse
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 1, 0);

// Load 3D Model
const loader = new GLTFLoader();
loader.load(
  "Room.glb",
  function (gltf) {
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error("An error happened");
  }
);

// Torus Shape
const geometry = new THREE.TorusGeometry(30, 6, 29, 40);
const material = new THREE.MeshBasicMaterial({
  color: 0xff6347,
  wireframe: true,
});
const betterMaterial = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

function componentToHex(c) {
  let hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return parseInt(
    componentToHex(r) + componentToHex(g) + componentToHex(b),
    16
  );
}

function getColor(time) {
  return rgbToHex(
    Math.floor(Math.abs(Math.sin(time)) * 255),
    Math.floor(Math.abs(Math.sin(time + 2)) * 255),
    Math.floor(Math.abs(Math.sin(time + 4)) * 255)
  );
}

let lastFrameTime = 0;
function animate(thisFrameTime) {
  torus.material.color.setHex(getColor(thisFrameTime * 0.001));
  requestAnimationFrame(animate);
  thisFrameTime *= 0.001; // convert to seconds
  const delta = thisFrameTime - lastFrameTime;
  lastFrameTime = thisFrameTime;

  animateTorus(delta, torus);
  animateCamera(delta, camera, move, cameraMoveSpeed);

  renderer.render(scene, camera);
}

requestAnimationFrame(animate);
