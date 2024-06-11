import * as THREE from 'three';

function render(time, cube, scene, camera, renderer) {
	time = performance.now() * 0.001;

	cube.rotation.x = time;
	cube.rotation.y = time;

	renderer.render(scene, camera);

	requestAnimationFrame(() => render(time, cube, scene, camera, renderer));
}

function main() {
	const canvas = document.querySelector('#c');
	const renderer = new THREE.WebGLRenderer({antialias: true, canvas});

	const fov = 75;
	const aspect = 2;  // 画布默认值
	const near = 0.1;
	const far = 5;
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.z = 2;

	const scene = new THREE.Scene();

	const boxWidth = 1;
	const boxHeight = 1;
	const boxDepth = 1;
	const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

	const material = new THREE.MeshBasicMaterial({color: 0x44aa88});
	const cube = new THREE.Mesh(geometry, material);

	scene.add(cube);

	requestAnimationFrame(() => render(null, cube, scene, camera, renderer));
}

main()


