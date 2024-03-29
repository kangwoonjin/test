import "./study/style.less";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let renderer, scene, camera, controls;
function init() {
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);

    renderer = new THREE.WebGLRenderer({canvas:canvas, antialias: true});
    renderer.setSize(window.innerWidth,window.innerHeight);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera();
    camera.fov = 1;
    camera.aspect = window.innerWidth/window.innerHeight;
    //camera.near = 16.8;
    //camera.far = 17;
    camera.updateProjectionMatrix();

    camera.position.set(50,50,50);
    //camera.lookAt(0,0,0);
    controls = new OrbitControls(camera, canvas);
    //controls.enableRotate = false;
    //controls.enableZoom = false;
    //controls.enablePan = false;
    controls.enableDamping = true;

    const light1 = new THREE.DirectionalLight();
    const light2 = new THREE.DirectionalLight();
    light1.position.set(1,2,3);
    scene.add(light1);

    light2.intensity = 0.3;
    light2.position.set(-1,-2,-3);
    scene.add(light2);


    const geo = new THREE.BoxGeometry();
    const material = new THREE.MeshPhongMaterial();
    const mesh = new THREE.Mesh(geo, material);
    scene.add(mesh);

    render();
}

function render() {
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(render);

}


init();




















/*
import "./study/style.less";
import { template } from "./template2";
const instance = new template();
instance.make_name();
/*
//import { SampleClass } from "./template";
import { point_event } from "./template_point";

//import { StudyHelper } from "/src/study/study-helper";

//import { SampleClass, function1, string1 } from "/src/sample.js";

//const helper = new StudyHelper();

// type below

//const sampleInstance = new SampleClass();
//helper.addBlock("test");
//const instance = new SampleClass();
const instance = new point_event();
/*
instance.createA();
instance.createB();
instance.createC();

instance.go_name();
instance.paragraph();
instance.points();
*/