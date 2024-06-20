import * as THREE from 'three';


function main() {
	const objects = [];

	const radius = 1;
	const widthSegments = 6;
	const heightSegments = 6;
	const sphereGeometry = new THREE.SphereGeometry(
		radius, widthSegments, heightSegments);

	const sunMaterial = new THREE.Mesh(sphereGeometry, sunMaterial);
	const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
	sunMesh.scale.set(5, 5, 5);
	scene.add(sunMesh);
	objects.push(sunMesh);
}
