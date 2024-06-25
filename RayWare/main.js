import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

var canvas, /*场景*/ scene, /*相机*/ camera, /*渲染器*/ renderer, /*手势控制*/ controls, /*环境光*/ ambient;
var width = 1920; //窗口宽度
var height = 1080; //窗口高度
var k = width / height; //窗口宽高比

/**创建场景对象Scene*/
function initScene() {
    scene = new THREE.Scene();
}

/**相机设置*/
function initCamera() {
    var s = 150; //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机对象
    // camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    const fov = 40;
	const aspect = 2; // the canvas default
	const near = 0.1;
	const far = 1000;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(300, 30, 30); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
}

function initLights() {
    //点光源
    var point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    scene.add(point); //点光源添加到场景中
    //环境光
    ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);
}

/**创建渲染器对象*/
function initRenderer() {
    canvas = document.querySelector( '#c' );
    renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    renderer.setClearColor(0xffffff, 1); //设置背景颜色
}

function initCube() {
	const boxWidth = 1;
	const boxHeight = 1;
	const boxDepth = 1;
	const geometry = new THREE.BoxGeometry( boxWidth, boxHeight, boxDepth );

	const material = new THREE.MeshBasicMaterial( { color: 0x44aa88 } ); // greenish blue

	const cube = new THREE.Mesh( geometry, material );
	scene.add( cube );
}

function loadSTLTestFile() {
    const loader = new STLLoader();
    loader.load('models/yachi.stl', function(geometry){
        // const material = new THREE.MeshPhongMaterial( { color: 0xff9c7c, side: THREE.DoubleSide, specular: 0x494949, shininess: 12 } );
        const material = new THREE.MeshLambertMaterial({color: 0x0000ff});
        const mesh = new THREE.Mesh( geometry, material );

        mesh.position.set( 0, - 0.25, 0.6 );
        mesh.rotation.set( 0, Math.PI*2, 0 );
        mesh.rotation.set(Math.PI, 0, 0);
        mesh.scale.set( 0.5, 0.5, 0.5 );

        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add(mesh);
    });
}

//辅助对象 Helper
function helpers() {
    //AxesHelper  - 坐标轴辅助
    scene.add(new THREE.AxesHelper(200));
}

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if ( needResize ) {
        renderer.setSize( width, height, false );
    }

    return needResize;
}

function render() {
    if(resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
	renderer.render( scene, camera );
    requestAnimationFrame(render);
}

function main() {

    initScene();
    initCamera();
    initLights();
    initRenderer();
    initCube();

    helpers();

    loadSTLTestFile();
    render();
}

main();
