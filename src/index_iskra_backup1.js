
import "./study/style.less";
import { THREE, OrbitControls, GenerateCanvas, GLTFLoader } from "./study/settings";
import { DirectionalLight } from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';


const canvas = GenerateCanvas();
let renderer, scene, camera, controls, composer, outlinePass;

function init() {
	renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.shadowMap.enabled = true;



    //renderer.shadowMap.type = THREE.PCFSoftShadowMap;


	scene = new THREE.Scene();

    scene.fog = new THREE.Fog( 0x000000, 40, 150 );
    
    


    const loader_env = new RGBELoader();
    loader_env.load("./hdr/Bathroom.hdr", texture =>{
        texture.mapping = THREE.EquirectangularReflectionMapping;
        //scene.background = texture;
        scene.environment = texture;
    });

    

    // perspective 카메라
	
    camera = new THREE.PerspectiveCamera(
		20,
		window.innerWidth / window.innerHeight,
        0.1,
        500
	);
    
	camera.position.set(0, 0, 10);
	controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.minDistance = 8;
    controls.maxDistance = 40;
    controls.maxPolarAngle = Math.PI / 2.1;

    
    

    composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloompass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.3,
        0.5,
        0.9
    );
    composer.addPass(bloompass);
/*
    const bokehpass = new BokehPass(scene, camera, {
        focus: 15,
        aperture : 0.005,
        maxblur : 0.002,
        width: window.innerWidth,
        height: window.innerHeight



    });
    composer.addPass(bokehpass);
*/
  

   
    //텍스쳐 추가
    const textureLoader = new THREE.TextureLoader();
    const roughness_base = textureLoader.load('./image/grid_1.png');
    const screen_base = textureLoader.load('./image/norma.png');
    const screen_base2 = textureLoader.load('./image/monster.png');
    const screen_base3 = textureLoader.load('./image/juicy.png');
    const screen_base4 = textureLoader.load('./image/drawshop.png');
   
    const plastic_rough = textureLoader.load('./image/Plastic_Rough_001_roughness.jpg');
    plastic_rough.wrapS = THREE.RepeatWrapping;
    plastic_rough.wrapT = THREE.RepeatWrapping;
    plastic_rough.repeat.set(3,3);

    const plastic_normal = textureLoader.load('./image/Plastic_Rough_001_normal.jpg');
    plastic_normal.wrapS = THREE.RepeatWrapping;
    plastic_normal.wrapT = THREE.RepeatWrapping;
    plastic_normal.repeat.set(3,3);

    const ground = textureLoader.load('./image/ground.png');
    ground.wrapS = THREE.RepeatWrapping;
    ground.wrapT = THREE.RepeatWrapping;
    ground.repeat.set(4,4);

//Light_GRP_start-------------------------------------------------------------------------

	const directionalLightA = new THREE.DirectionalLight(0xD2EFFF, 1);
	directionalLightA.position.set(-8, 8, 10);
	scene.add(directionalLightA);
    
    directionalLightA.castShadow = true;
    directionalLightA.shadow.mapSize.width = 8192;
    directionalLightA.shadow.mapSize.height = 8192;
    directionalLightA.shadow.radius = 1.5;


   
/*
    scene.add( new THREE.CameraHelper(  directionalLightA.shadow.camera ) );
*/
    directionalLightA.shadow.camera.top = 16;
    directionalLightA.shadow.camera.bottom = -16;

    directionalLightA.shadow.camera.left = -16;
    directionalLightA.shadow.camera.right = 16;
    directionalLightA.shadow.camera.near = 0.1;

    directionalLightA.shadow.camera.far = 500;


    const directionalLightB = new THREE.DirectionalLight(0xD2EFFF, 0.05);
	directionalLightB.position.set(10, 5, -10);
	scene.add(directionalLightB);

    const directionalLightC = new THREE.DirectionalLight(0xD2EFFF, .05);
	directionalLightC.position.set(0, 5, 0);
	scene.add(directionalLightC);

   
/*
    const dirAHelper = new THREE.DirectionalLightHelper(directionalLightA);
    scene.add(dirAHelper);

    const dirBHelper = new THREE.DirectionalLightHelper(directionalLightB);
    scene.add(dirBHelper);

    const dirCHelper = new THREE.DirectionalLightHelper(directionalLightC);
    scene.add(dirCHelper);
*/
//Light_GRP_end-------------------------------------------------------------------------


	const sphere = new THREE.SphereGeometry();
	const material = new THREE.MeshStandardMaterial();
	const mesh = new THREE.Mesh(sphere, material);
	//scene.add(mesh);

 
    
	// start gltf load (type below)
  

    const loader = new GLTFLoader();
    loader.load("./gltf/chip_only_1.glb",gltf =>{
      //addOutlineObject(gltf.scene);
      const model = gltf.scene;
      model.position.set(0,0,0);
      model.scale.set(.5,.5,.5);

       
      camera.position.copy(gltf.cameras[0].position);
      camera.rotation.copy(gltf.cameras[0].rotation);

      model.traverse(obj=>{
        if (obj.isMesh){
        console.log(obj);
        obj.castShadow = true;
        obj.receiveShadow = true;
        obj.material.metalness = 0;
        obj.material.envMapIntensity = 0;
        }
      });

      model.getObjectByName('bottom_base').material.color.setHex(0x111111);
      model.getObjectByName('bottom_base').material.metalness = .8;
      model.getObjectByName('bottom_base').material.roughness = .8;
      model.getObjectByName('bottom_base').material.envMapIntensity = .2;  
      model.getObjectByName('bottom_base').material.roughnessMap = roughness_base;   

      model.getObjectByName('bottom_steel').material.color.setHex(0x333333);
      model.getObjectByName('bottom_steel').material.metalness = .6;
      model.getObjectByName('bottom_steel').material.roughness = .2;
      model.getObjectByName('bottom_steel').material.envMapIntensity = 1;

      model.getObjectByName('bottom_line').material.color.setHex(0xffffff);
      model.getObjectByName('bottom_line').material.emissive.setHex(0xffffff);
      model.getObjectByName('bottom_line').material.emissiveIntensity = 1;

      model.getObjectByName('bottom_dot').material.color.setHex(0xffffff);
      model.getObjectByName('bottom_dot').material.emissive.setHex(0xffffff);
      model.getObjectByName('bottom_dot').material.emissiveIntensity = 1;

      model.getObjectByName('middle_base').material.color.setHex(0x333333);
      model.getObjectByName('middle_base').material.metalness = .8;
      model.getObjectByName('middle_base').material.roughnessMap = roughness_base;
      model.getObjectByName('middle_base').material.roughness = .8;
      model.getObjectByName('middle_base').material.envMapIntensity = .7;
      
      model.getObjectByName('middle_corner').material.color.setHex(0xffffff);
      model.getObjectByName('middle_corner').material.metalness = 1;
      model.getObjectByName('middle_corner').material.roughness = .1;
      model.getObjectByName('middle_corner').material.envMapIntensity = 1;

      model.getObjectByName('middle_text').material.color.setHex(0xffffff);
      model.getObjectByName('middle_text').material.emissive.setHex(0xffffff);
      model.getObjectByName('middle_text').material.emissiveIntensity = 1;
  
      model.getObjectByName('top_base_front').material.color.setHex(0xACACAC);
      model.getObjectByName('top_base_front').material.metalness = .1;
      model.getObjectByName('top_base_front').material.roughnessMap =  plastic_rough;
      model.getObjectByName('top_base_front').material.normalMap = plastic_normal;
      model.getObjectByName('top_base_front').material.normalScale = {
        "x": .06,
        "y": .06
    }
      model.getObjectByName('top_base_front').material.envMapIntensity = .1;

      model.getObjectByName('top_base_back').material.color.setHex(0xACACAC);
      model.getObjectByName('top_base_back').material.metalness = .1;
      model.getObjectByName('top_base_back').material.roughnessMap =  plastic_rough;
      model.getObjectByName('top_base_back').material.normalMap = plastic_normal;
      model.getObjectByName('top_base_back').material.normalScale = {
        "x": .06,
        "y": .06
    }
      model.getObjectByName('top_base_back').material.envMapIntensity = .1;

      model.getObjectByName('top_text').material.color.setHex(0xACACAC);
      model.getObjectByName('top_text').material.metalness = .1;
      model.getObjectByName('top_text').material.roughnessMap =  plastic_rough;
      model.getObjectByName('top_text').material.normalMap = plastic_normal;
      model.getObjectByName('top_text').material.normalScale = {
        "x": .06,
        "y": .06
    }
      model.getObjectByName('top_text').material.envMapIntensity = .1;

      model.getObjectByName('top_back').material.color.setHex(0xF1C65F);
      model.getObjectByName('top_back').material.metalness = 1;
      model.getObjectByName('top_back').material.roughness = .2;
      model.getObjectByName('top_back').material.envMapIntensity = 1;

      //model.getObjectByName('top_base').material.roughness = .3;
      model.getObjectByName('top_base_back').material.envMapIntensity = .7;
      model.getObjectByName('top_base_front').material.envMapIntensity = .7;

      model.getObjectByName('top_screen').material.map = screen_base;
      model.getObjectByName('top_screen').material.metalness = 0.1;
      model.getObjectByName('top_screen').material.roughness = 0.1;
      model.getObjectByName('top_screen').material.emissiveMap = screen_base;
      model.getObjectByName('top_screen').material.emissive = {
        r:1, g:1, b:1
      };
      model.getObjectByName('top_screen').material.emissiveIntensity = .45;

      model.getObjectByName('top_edge').material.color.setHex(0xffffff);
      model.getObjectByName('top_edge').material.emissive.setHex(0xffffff);
      model.getObjectByName('top_edge').material.emissiveIntensity = 1;

      scene.add(model);
    });

    /*
    function addOutlineObject(object) {
      objectsToOutline.push(object);
      outlinePass.selectedObjects = objectsToOutline;
    */

	// end gltf load




    const loader3 = new GLTFLoader();
    loader3.load("./gltf/chip_only_1.glb",gltf =>{
      const model1 = gltf.scene;
      model1.position.set(6,0,9);
      model1.scale.set(.5,.5,.5);
      model1.traverse(obj=>{
        if (obj.isMesh){
        console.log(obj);
        obj.castShadow = true;
        obj.receiveShadow = true;
        obj.material.metalness = 0;
        obj.material.envMapIntensity = 0;
        }
      });

      model1.getObjectByName('bottom_base').material.color.setHex(0x111111);
      model1.getObjectByName('bottom_base').material.metalness = .8;
      model1.getObjectByName('bottom_base').material.roughness = .8;
      model1.getObjectByName('bottom_base').material.envMapIntensity = .2;  
      model1.getObjectByName('bottom_base').material.roughnessMap = roughness_base;   

      model1.getObjectByName('bottom_steel').material.color.setHex(0x333333);
      model1.getObjectByName('bottom_steel').material.metalness = .6;
      model1.getObjectByName('bottom_steel').material.roughness = .2;
      model1.getObjectByName('bottom_steel').material.envMapIntensity = 1;

      model1.getObjectByName('bottom_line').material.color.setHex(0xffffff);
      model1.getObjectByName('bottom_line').material.emissive.setHex(0xffffff);
      model1.getObjectByName('bottom_line').material.emissiveIntensity = 1;

      model1.getObjectByName('bottom_dot').material.color.setHex(0xffffff);
      model1.getObjectByName('bottom_dot').material.emissive.setHex(0xffffff);
      model1.getObjectByName('bottom_dot').material.emissiveIntensity = 1;

      model1.getObjectByName('middle_base').material.color.setHex(0x333333);
      model1.getObjectByName('middle_base').material.metalness = .8;
      model1.getObjectByName('middle_base').material.roughnessMap = roughness_base;
      model1.getObjectByName('middle_base').material.roughness = .8;
      model1.getObjectByName('middle_base').material.envMapIntensity = .7;
      
      model1.getObjectByName('middle_corner').material.color.setHex(0xffffff);
      model1.getObjectByName('middle_corner').material.metalness = 1;
      model1.getObjectByName('middle_corner').material.roughness = .1;
      model1.getObjectByName('middle_corner').material.envMapIntensity = 1;

      model1.getObjectByName('middle_text').material.color.setHex(0xffffff);
      model1.getObjectByName('middle_text').material.emissive.setHex(0xffffff);
      model1.getObjectByName('middle_text').material.emissiveIntensity = 1;
  
      model1.getObjectByName('top_base_front').material.color.setHex(0xACACAC);
      model1.getObjectByName('top_base_front').material.metalness = .1;
      model1.getObjectByName('top_base_front').material.roughnessMap =  plastic_rough;
      model1.getObjectByName('top_base_front').material.normalMap = plastic_normal;
      model1.getObjectByName('top_base_front').material.normalScale = {
        "x": .06,
        "y": .06
    }
      model1.getObjectByName('top_base_front').material.envMapIntensity = .1;

      model1.getObjectByName('top_base_back').material.color.setHex(0xACACAC);
      model1.getObjectByName('top_base_back').material.metalness = .1;
      model1.getObjectByName('top_base_back').material.roughnessMap =  plastic_rough;
      model1.getObjectByName('top_base_back').material.normalMap = plastic_normal;
      model1.getObjectByName('top_base_back').material.normalScale = {
        "x": .06,
        "y": .06
    }
      model1.getObjectByName('top_base_back').material.envMapIntensity = .1;

      model1.getObjectByName('top_text').material.color.setHex(0xACACAC);
      model1.getObjectByName('top_text').material.metalness = .1;
      model1.getObjectByName('top_text').material.roughnessMap =  plastic_rough;
      model1.getObjectByName('top_text').material.normalMap = plastic_normal;
      model1.getObjectByName('top_text').material.normalScale = {
        "x": .06,
        "y": .06
    }
      model1.getObjectByName('top_text').material.envMapIntensity = .1;

      model1.getObjectByName('top_back').material.color.setHex(0xF1C65F);
      model1.getObjectByName('top_back').material.metalness = 1;
      model1.getObjectByName('top_back').material.roughness = .2;
      model1.getObjectByName('top_back').material.envMapIntensity = 1;

      //model.getObjectByName('top_base').material.roughness = .3;
      model1.getObjectByName('top_base_back').material.envMapIntensity = .7;
      model1.getObjectByName('top_base_front').material.envMapIntensity = .7;

      model1.getObjectByName('top_screen').material.map = screen_base2;
      model1.getObjectByName('top_screen').material.metalness = 0.1;
      model1.getObjectByName('top_screen').material.roughness = 0.1;
      model1.getObjectByName('top_screen').material.emissiveMap = screen_base2;
      model1.getObjectByName('top_screen').material.emissive = {
        r:1, g:1, b:1
      };
      model1.getObjectByName('top_screen').material.emissiveIntensity = .45;

      model1.getObjectByName('top_edge').material.color.setHex(0xffffff);
      model1.getObjectByName('top_edge').material.emissive.setHex(0xffffff);
      model1.getObjectByName('top_edge').material.emissiveIntensity = 1;
      
      scene.add(model1);
    });


    const loader4 = new GLTFLoader();
    loader4.load("./gltf/chip_only_1.glb",gltf =>{
      const model = gltf.scene;
      model.position.set(-4,0,8);
      model.scale.set(.5,.5,.5);
      model.traverse(obj=>{
        if (obj.isMesh){
        console.log(obj);
        obj.castShadow = true;
        obj.receiveShadow = true;
        obj.material.metalness = 0;
        obj.material.envMapIntensity = 0;
        }
      });

      model.getObjectByName('bottom_base').material.color.setHex(0x111111);
      model.getObjectByName('bottom_base').material.metalness = .8;
      model.getObjectByName('bottom_base').material.roughness = .8;
      model.getObjectByName('bottom_base').material.envMapIntensity = .2;  
      model.getObjectByName('bottom_base').material.roughnessMap = roughness_base;   

      model.getObjectByName('bottom_steel').material.color.setHex(0x333333);
      model.getObjectByName('bottom_steel').material.metalness = .6;
      model.getObjectByName('bottom_steel').material.roughness = .2;
      model.getObjectByName('bottom_steel').material.envMapIntensity = 1;

      model.getObjectByName('bottom_line').material.color.setHex(0xffffff);
      model.getObjectByName('bottom_line').material.emissive.setHex(0xffffff);
      model.getObjectByName('bottom_line').material.emissiveIntensity = 1;

      model.getObjectByName('bottom_dot').material.color.setHex(0xffffff);
      model.getObjectByName('bottom_dot').material.emissive.setHex(0xffffff);
      model.getObjectByName('bottom_dot').material.emissiveIntensity = 1;

      model.getObjectByName('middle_base').material.color.setHex(0x333333);
      model.getObjectByName('middle_base').material.metalness = .8;
      model.getObjectByName('middle_base').material.roughnessMap = roughness_base;
      model.getObjectByName('middle_base').material.roughness = .8;
      model.getObjectByName('middle_base').material.envMapIntensity = .7;
      
      model.getObjectByName('middle_corner').material.color.setHex(0xffffff);
      model.getObjectByName('middle_corner').material.metalness = 1;
      model.getObjectByName('middle_corner').material.roughness = .1;
      model.getObjectByName('middle_corner').material.envMapIntensity = 1;

      model.getObjectByName('middle_text').material.color.setHex(0xffffff);
      model.getObjectByName('middle_text').material.emissive.setHex(0xffffff);
      model.getObjectByName('middle_text').material.emissiveIntensity = 1;
  
      model.getObjectByName('top_base_front').material.color.setHex(0xACACAC);
      model.getObjectByName('top_base_front').material.metalness = .1;
      model.getObjectByName('top_base_front').material.roughnessMap =  plastic_rough;
      model.getObjectByName('top_base_front').material.normalMap = plastic_normal;
      model.getObjectByName('top_base_front').material.normalScale = {
        "x": .06,
        "y": .06
    }
      model.getObjectByName('top_base_front').material.envMapIntensity = .1;

      model.getObjectByName('top_base_back').material.color.setHex(0xACACAC);
      model.getObjectByName('top_base_back').material.metalness = .1;
      model.getObjectByName('top_base_back').material.roughnessMap =  plastic_rough;
      model.getObjectByName('top_base_back').material.normalMap = plastic_normal;
      model.getObjectByName('top_base_back').material.normalScale = {
        "x": .06,
        "y": .06
    }
      model.getObjectByName('top_base_back').material.envMapIntensity = .1;

      model.getObjectByName('top_text').material.color.setHex(0xACACAC);
      model.getObjectByName('top_text').material.metalness = .1;
      model.getObjectByName('top_text').material.roughnessMap =  plastic_rough;
      model.getObjectByName('top_text').material.normalMap = plastic_normal;
      model.getObjectByName('top_text').material.normalScale = {
        "x": .06,
        "y": .06
    }
      model.getObjectByName('top_text').material.envMapIntensity = .1;

      model.getObjectByName('top_back').material.color.setHex(0xF1C65F);
      model.getObjectByName('top_back').material.metalness = 1;
      model.getObjectByName('top_back').material.roughness = .2;
      model.getObjectByName('top_back').material.envMapIntensity = 1;

      //model.getObjectByName('top_base').material.roughness = .3;
      model.getObjectByName('top_base_back').material.envMapIntensity = .7;
      model.getObjectByName('top_base_front').material.envMapIntensity = .7;

      model.getObjectByName('top_screen').material.map = screen_base3;
      model.getObjectByName('top_screen').material.metalness = 0.1;
      model.getObjectByName('top_screen').material.roughness = 0.1;
      model.getObjectByName('top_screen').material.emissiveMap = screen_base3;
      model.getObjectByName('top_screen').material.emissive = {
        r:1, g:1, b:1
      };
      model.getObjectByName('top_screen').material.emissiveIntensity = .45;

      model.getObjectByName('top_edge').material.color.setHex(0xffffff);
      model.getObjectByName('top_edge').material.emissive.setHex(0xffffff);
      model.getObjectByName('top_edge').material.emissiveIntensity = 1;
      
      scene.add(model);
    });

    const loader5 = new GLTFLoader();
    loader5.load("./gltf/chip_only_1.glb",gltf =>{
      const model = gltf.scene;
      model.position.set(4,0,-8);
      model.scale.set(.5,.5,.5);
      model.traverse(obj=>{
        if (obj.isMesh){
        console.log(obj);
        obj.castShadow = true;
        obj.receiveShadow = true;
        obj.material.metalness = 0;
        obj.material.envMapIntensity = 0;
        }
      });

      model.getObjectByName('bottom_base').material.color.setHex(0x111111);
      model.getObjectByName('bottom_base').material.metalness = .8;
      model.getObjectByName('bottom_base').material.roughness = .8;
      model.getObjectByName('bottom_base').material.envMapIntensity = .2;  
      model.getObjectByName('bottom_base').material.roughnessMap = roughness_base;   

      model.getObjectByName('bottom_steel').material.color.setHex(0x333333);
      model.getObjectByName('bottom_steel').material.metalness = .6;
      model.getObjectByName('bottom_steel').material.roughness = .2;
      model.getObjectByName('bottom_steel').material.envMapIntensity = 1;

      model.getObjectByName('bottom_line').material.color.setHex(0xffffff);
      model.getObjectByName('bottom_line').material.emissive.setHex(0xffffff);
      model.getObjectByName('bottom_line').material.emissiveIntensity = 1;

      model.getObjectByName('bottom_dot').material.color.setHex(0xffffff);
      model.getObjectByName('bottom_dot').material.emissive.setHex(0xffffff);
      model.getObjectByName('bottom_dot').material.emissiveIntensity = 1;

      model.getObjectByName('middle_base').material.color.setHex(0x333333);
      model.getObjectByName('middle_base').material.metalness = .8;
      model.getObjectByName('middle_base').material.roughnessMap = roughness_base;
      model.getObjectByName('middle_base').material.roughness = .8;
      model.getObjectByName('middle_base').material.envMapIntensity = .7;
      
      model.getObjectByName('middle_corner').material.color.setHex(0xffffff);
      model.getObjectByName('middle_corner').material.metalness = 1;
      model.getObjectByName('middle_corner').material.roughness = .1;
      model.getObjectByName('middle_corner').material.envMapIntensity = 1;

      model.getObjectByName('middle_text').material.color.setHex(0xffffff);
      model.getObjectByName('middle_text').material.emissive.setHex(0xffffff);
      model.getObjectByName('middle_text').material.emissiveIntensity = 1;
  
      model.getObjectByName('top_base_front').material.color.setHex(0xACACAC);
      model.getObjectByName('top_base_front').material.metalness = .1;
      model.getObjectByName('top_base_front').material.roughnessMap =  plastic_rough;
      model.getObjectByName('top_base_front').material.normalMap = plastic_normal;
      model.getObjectByName('top_base_front').material.normalScale = {
        "x": .06,
        "y": .06
    }
      model.getObjectByName('top_base_front').material.envMapIntensity = .1;

      model.getObjectByName('top_base_back').material.color.setHex(0xACACAC);
      model.getObjectByName('top_base_back').material.metalness = .1;
      model.getObjectByName('top_base_back').material.roughnessMap =  plastic_rough;
      model.getObjectByName('top_base_back').material.normalMap = plastic_normal;
      model.getObjectByName('top_base_back').material.normalScale = {
        "x": .06,
        "y": .06
    }
      model.getObjectByName('top_base_back').material.envMapIntensity = .1;

      model.getObjectByName('top_text').material.color.setHex(0xACACAC);
      model.getObjectByName('top_text').material.metalness = .1;
      model.getObjectByName('top_text').material.roughnessMap =  plastic_rough;
      model.getObjectByName('top_text').material.normalMap = plastic_normal;
      model.getObjectByName('top_text').material.normalScale = {
        "x": .06,
        "y": .06
    }
      model.getObjectByName('top_text').material.envMapIntensity = .1;

      model.getObjectByName('top_back').material.color.setHex(0xF1C65F);
      model.getObjectByName('top_back').material.metalness = 1;
      model.getObjectByName('top_back').material.roughness = .2;
      model.getObjectByName('top_back').material.envMapIntensity = 1;

      //model.getObjectByName('top_base').material.roughness = .3;
      model.getObjectByName('top_base_back').material.envMapIntensity = .7;
      model.getObjectByName('top_base_front').material.envMapIntensity = .7;

      model.getObjectByName('top_screen').material.map = screen_base4;
      model.getObjectByName('top_screen').material.metalness = 0.1;
      model.getObjectByName('top_screen').material.roughness = 0.1;
      model.getObjectByName('top_screen').material.emissiveMap = screen_base4;
      model.getObjectByName('top_screen').material.emissive = {
        r:1, g:1, b:1
      };
      model.getObjectByName('top_screen').material.emissiveIntensity = .45;

      model.getObjectByName('top_edge').material.color.setHex(0xffffff);
      model.getObjectByName('top_edge').material.emissive.setHex(0xffffff);
      model.getObjectByName('top_edge').material.emissiveIntensity = 1;
      
      scene.add(model);
    });



    const loader2 = new GLTFLoader();
    loader2.load("./gltf/plan_only.glb",gltf =>{
      const model_plan = gltf.scene;
      model_plan.position.set(0,0,0);
      model_plan.scale.set(2,2,2);
      model_plan.traverse(obj=>{
        if (obj.isMesh){
        console.log(obj);
        obj.castShadow = true;
        obj.receiveShadow = true;
        obj.material.metalness = 0;
        obj.material.envMapIntensity = 0;
        }
      });
      model_plan.getObjectByName('Plan').material.map = ground;
      model_plan.getObjectByName('Plan').material.color.setHex(0x666666);
      model_plan.getObjectByName('Plan').material.metalness = .2;
      model_plan.getObjectByName('Plan').material.roughness = .8;
      model_plan.getObjectByName('Plan').material.roughnessMap = ground;
      model_plan.getObjectByName('Plan').material.bumpMap = ground;
      model_plan.getObjectByName('Plan').material.bumpScale = 0.08;
      

      
      
      model_plan.getObjectByName('Plan').material.envMapIntensity = 0.2; 
      scene.add(model_plan);
    });





	render();
}

function render() {
	requestAnimationFrame(render);
	//renderer.render(scene, camera);
	composer.render();
    controls.update();
    
}

init();
