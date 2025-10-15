//tutorial:https://www.youtube.com/watch?v=kduBV0OhrII
//tut2:https://www.youtube.com/watch?v=aOQuuotM-Ww
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const w = window.innerWidth;
const h = window.innerHeight;


const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setClearColor(0xffc0cb);
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, w / h, 1, 1000);
camera.position.set(0, 5, 12);
//camera.lookAt(0, 0, 0);
renderer.setSize(w, h);

const controls = new OrbitControls(camera, renderer.domElement);
const modelTarget = [
    new THREE.Vector3(-4, 2, -4), //LB
    new THREE.Vector3(4, 2, -4), //Drama
    new THREE.Vector3(0, 2, 5), //Lay
];

controls.target.set(0, 2, 0);
controls.enableDamping = true;

let currentTarget = 0;



const groundGeometry = new THREE.PlaneGeometry(20, 20, 20, 20);
groundGeometry.rotateX(-Math.PI / 2);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0xffc0cb,
  side: THREE.DoubleSide
});
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
scene.add(groundMesh);

const spotLight = new THREE.SpotLight(0xffffff, 3000, 100, .50, 1);
spotLight.position.set(0, 25, 0);
scene.add(spotLight);





renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

groundMesh.receiveShadow = true;

const loader = new GLTFLoader();
//Load models
loader.load( '/BG-LB Pose.glb', function (gltf) {
    const model = gltf.scene;
  model.position.set(-4, 0, -4);
  model.rotation.y = -Math.PI / 4; //turn toward center
  model.scale.set(1, 1, 1);

  scene.add(gltf.scene);

}, undefined, function (error) {

  console.error(error);

} );

loader.load( '/BG-Drama Pose.glb', function (gltf) {
    const model = gltf.scene;
  model.position.set(4, 0, -4);
  model.rotation.y = -Math.PI / 4; //face outward
  model.scale.set(1, 1, 1);

  scene.add(gltf.scene);

}, undefined, function (error) {

  console.error(error);

} );

loader.load( '/BG-Lay Pose.glb', function (gltf) {
   const model = gltf.scene;
  model.position.set(0, 0, 5);
  model.rotation.y = Math.PI; //face away from center
  model.scale.set(1, 1, 1);
  scene.add(model); 
  scene.add(gltf.scene);

}, undefined, function (error) {

  console.error(error);

} );



const ambientLight= new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
keyLight.position.set(5, 10, 5);
keyLight.castShadow = true;
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
fillLight.position.set(-5, 5, -5);
scene.add(fillLight);

function focusOnModel(index){
    const target = modelTarget[index];
    controls.target.copy(target);

    camera.position.set(target.x, target.y + 3, target.z);

    //https://threejs.org/docs/#examples/en/controls/OrbitControls.getAzimuthalAngle

    controls.minAzimuthAngle = -Infinity;
    controls.maxAzimuthAngle = Infinity;
    controls.minPolarAngle = Math.PI / 8;
    controls.maxPolarAngle = Math.PI / 1.5;
}

window.addEventListener('keydown', (event) =>{  //when left or right arrow keys are pressed, the camera will snap to the next model
    if(event.key === 'ArrowRight'){
        currentTarget = (currentTarget + 1) % modelTarget.length;
        focusOnModel(currentTarget);
    }
    if(event.key === 'ArrowLeft'){
        currentTarget = (currentTarget - 1 + modelTarget.length) % modelTarget.length;
        focusOnModel(currentTarget);
    }
})

focusOnModel(0);

function animate() {
  requestAnimationFrame(animate); 
  controls.update(); 
  renderer.render(scene, camera);
}

animate();

