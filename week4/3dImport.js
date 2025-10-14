import * as THREE from "https://cdn.skypack.dev/three@0.180.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.180.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.180.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
