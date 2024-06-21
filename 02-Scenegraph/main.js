import * as THREE from 'three';

function main() {
	// 创建场景
	const scene = new THREE.Scene();

	// 创建相机
	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.z = 5;

	// 创建渲染器并添加到HTML中
	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	// 创建一个几何体和材质
	const geometry = new THREE.BoxGeometry();
	const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

	// 创建一个网格并添加到场景中
	const cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	// 渲染场景
	function render() {
		requestAnimationFrame(render);

		// 旋转网格
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;

		// 渲染
		renderer.render(scene, camera);
	}

	// 开始渲染循环
	render();
}

main()
