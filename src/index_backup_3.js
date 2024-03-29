
import "./study/style.less";
import { THREE, OrbitControls, GenerateCanvas, GLTFLoader } from "./study/settings";
import { DirectionalLight } from "three";

const canvas = GenerateCanvas();
let renderer, scene, camera, controls;

function init() {
	renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.shadowMap.enabled = true;
    //renderer.shadowMap.type = THREE.PCFSoftShadowMap;


	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(
		32,
		window.innerWidth / window.innerHeight
	);
	camera.position.set(0, 0, 10);
	controls = new OrbitControls(camera, canvas);
    

	const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	directionalLight.position.set(1, 1, 1);
	scene.add(directionalLight);

    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.radius = 8;

	const sphere = new THREE.SphereGeometry();
	const material = new THREE.MeshStandardMaterial();
	const mesh = new THREE.Mesh(sphere, material);
	//scene.add(mesh);

	// start gltf load (type below)
    const loader = new GLTFLoader();
    loader.load("/gltf/rocket.glb",gltf =>{
      const model = gltf.scene;
      model.traverse(obj=>{
        if (obj.isMesh){
        console.log(obj);
        obj.castShadow = true;
        obj.receiveShadow = true;
        obj.material.metalness = 0;
        }
      })
      scene.add(model);
    });
	// end gltf load
	render();
}

function render() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
	controls.update();
}

init();
