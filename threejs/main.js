import * as THREE from 'three';

function render(time, cubes, scene, camera, renderer) {
	time = performance.now() * 0.001;

	const canvas = renderer.domElement;
	camera.aspect = canvas.clientWidth / canvas.clientHeight;
	camera.updateProjectionMatrix();

	cubes.forEach((cube, ndx) => {
		const speed = 1 + ndx * 0.1;
		const rot = time *speed;
		cube.rotation.x = rot;
		cube.rotation.y = rot;
	});

	renderer.render(scene, camera);
	requestAnimationFrame(() => render(time, cubes, scene, camera, renderer));
}

function makeInstance(scene, geometry, color, x) {
	const material = new THREE.MeshPhongMaterial({color});

	const cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	cube.position.x = x;

	return cube;

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

	{
		const color = 0xFFFFFF;
		const intensity = 3;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(1, -1, 4);
		scene.add(light);
	}

	const boxWidth = 1;
	const boxHeight = 1;
	const boxDepth = 1;
	const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

	const cubes = [
		makeInstance(scene, geometry, 0x44aa88, 0),
		makeInstance(scene, geometry, 0x8844aa, -2),
		makeInstance(scene, geometry, 0xaa8844, 2),
	];

	requestAnimationFrame(() => render(null, cubes, scene, camera, renderer));
}

main()


