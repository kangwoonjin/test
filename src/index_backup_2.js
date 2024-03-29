import "./study/style.less";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";


let renderer, scene, camera, controls;

const canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);


function init() {
    renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.1;


//Camera-----------------------------------------------------------------------
    scene = new THREE.Scene();
    const loader = new RGBELoader();
    loader.load("/hdr/mountain.hdr", texture =>{
        texture.mapping = THREE.EquirectangularReflectionMapping;
        //scene.background = texture;
        scene.environment = texture;
    });

    camera = new THREE.PerspectiveCamera();
    camera.fov = 35;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    camera.position.set(0,0,10);
    controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;






//Geometry-----------------------------------------------------------------------
    const geo = new THREE.SphereGeometry();
    const material = new THREE.MeshStandardMaterial({
        color : new THREE.Color("#FFFFFF"),
        roughness : 0.3,
        metalness : 1,
        //emissive : new THREE.Color("#979797"),


    });
    const mesh1 = new THREE.Mesh(geo, material);
    const mesh2 = new THREE.Mesh(geo, material);
    mesh2.position.set(3,0,0);

    const geo_plane = new THREE.PlaneGeometry(10,10);
    const plane = new THREE.Mesh(geo_plane, material);
    plane.position.set(0,-1,0);
    plane.rotation.set(Math.PI*-0.5,0,0);

    mesh1.castShadow = true;
    mesh1.receiveShadow = true;
    mesh2.castShadow = true;
    mesh2.receiveShadow = true;
    plane.castShadow = true;
    plane.receiveShadow = true;

    scene.add(mesh1);
    //scene.add(mesh2);
    scene.add(plane);




//Light-----------------------------------------------------------------------
    const DirectionalLight = new THREE.DirectionalLight(0xFFFFFFF, .55);
    DirectionalLight.position.set(2,2,2);
    DirectionalLight.castShadow = true;
    DirectionalLight.shadow.blurSamples = 20;
    DirectionalLight.shadow.radius = 10;
    DirectionalLight.shadow.mapSize.width = 1024;
    DirectionalLight.shadow.mapSize.height = 1024;

    //scene.add(DirectionalLight);

    const pointLight = new THREE.PointLight(0x6366F1, 0.3);
    pointLight.position.set(-2,-2,-2);
    //scene.add(pointLight);

    const AmbientLight = new THREE.AmbientLight(0xFE7B7B, .2);
    AmbientLight.position.set(0,0,0);
    //scene.add(AmbientLight);

    const HemisphereLight = new THREE.HemisphereLight(0xFFFFFF, 0x000000, 0.15);
    //scene.add(HemisphereLight);

    const dirHelper = new THREE.DirectionalLightHelper(DirectionalLight);
    scene.add(dirHelper);

    const pointHelper = new THREE.PointLightHelper(pointLight);
    //scene.add(pointHelper);

    const hemiHelper = new THREE.HemisphereLightHelper(HemisphereLight);
    scene.add(hemiHelper);
    
    render();
}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    controls.update();

}

init();