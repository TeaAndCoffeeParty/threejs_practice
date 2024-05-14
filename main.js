import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

let scene = new THREE.Scene();  
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);  
camera.position.z = 5;
let renderer = new THREE.WebGLRenderer();  
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x444444, 1); 
document.body.appendChild(renderer.domElement);

let loader = new STLLoader();  
loader.load('./models/yachi.stl', function (geometry) {  
    let material = new THREE.MeshBasicMaterial({ color: 0x00ffff }); // 设置材质和颜色，这里使用绿色  
    let mesh = new THREE.Mesh(geometry, material); // 创建网格模型  
    mesh.rotation.x += 180
    scene.add(mesh); // 将模型添加到场景中  
});

const controls = new OrbitControls(camera, renderer.domElement);  
function initOrbitControls() {
    controls.enableDamping = true; // an animation loop is required when enabling damping  
    controls.dampingFactor = 0.25;  
    controls.enableZoom = true;  
    controls.zoomSpeed = 1.0;  
    controls.minDistance = 100;  
    controls.maxDistance = 500;  
}

const pointLight = new THREE.PointLight(0xffffff, 1, 100); // 创建一个白色的点光源，强度为1，距离为100  
pointLight.position.set(50, 50, 50); // 设置点光源的位置  
scene.add(pointLight); // 将点光源添加到场景中
// // 添加环境光  
// let ambientLight = new THREE.AmbientLight(0x404040);  
// scene.add(ambientLight);  

// // 添加平行光  
// let directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);  
// directionalLight.position.set(1, 1, 1).normalize();  
// scene.add(directionalLight); 

function animate() {  
    requestAnimationFrame(animate); // 请求下一帧动画  
    controls.update();
    renderer.render(scene, camera); // 渲染场景和相机  
}  

function main() {
    initOrbitControls();

    
    animate(); // 启动动画循环
}

main()
