import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';
import {GUI} from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';
function main() {
    const canvas = document.querySelector('#c');
    // webGL渲染器
    const renderer = new THREE.WebGLRenderer({canvas})

    const gui = new GUI();

    // 设置背景色
    renderer.setClearColor(0xAAAAAA);
    // 影子
    renderer.shadowMap.enabled = true;

    // 镜头
    function makeCamera(fov = 40) {
        const aspect = 2;
        const zNear = 0.1;
        const zFar = 1000;
        return new THREE.PerspectiveCamera(fov, aspect, zNear, zFar);
    }
    const camera = makeCamera();
    console.log(camera);
    camera.position.set(8, 4, 10).multiplyScalar(3);
    camera.lookAt(0, 0, 0);
    
    // 初始化场景
    const scene = new THREE.Scene();

    // 设置点光源
    {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.PointLight(color, intensity);
        // 设置光源位置
        light.position.set(0, 20, 0);
        scene.add(light);
        // 影子
        light.castShadow = true;
        light.shadow.mapSize.width = 2048;
        light.shadow.mapSize.height = 2048;

        // ???
        const d = 50;
        light.shadow.camera.left = -d;
        light.shadow.camera.right = d;
        light.shadow.camera.top = d;
        light.shadow.camera.bottom = -d;
        light.shadow.camera.near = 1;
        light.shadow.camera.far = 50;
        light.shadow.bias = 0.001;
    }

    // 直光光源
    {
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 2, 4);
        scene.add(light);
    }

    // 活动平地
    const groundGeometry = new THREE.PlaneGeometry(50, 50);
    const groundMaterial = new THREE.MeshPhongMaterial({color: 0xCC8866});
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    groundMesh.rotation.x = Math.PI * -.5;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // 坦克长方体长宽高
    const carWidth = 4;
    const carHeight = 1;
    const carLength = 8;
  
    const tank = new THREE.Object3D();
    scene.add(tank);
    // 设置坦克身体的材质和块
    const bodyGeometry = new THREE.BoxGeometry(carWidth, carHeight, carLength);
    const bodyMaterial = new THREE.MeshPhongMaterial({color: 0x6688AA});
    const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
    bodyMesh.position.y = 1.4;
    bodyMesh.castShadow = true;
    tank.add(bodyMesh);

    // 坦克视角镜头
    const tankCameraFov = 75;
    const tankCamera = makeCamera(tankCameraFov);
    tankCamera.position.y = 3;
    tankCamera.position.z = -6;
    tankCamera.rotation.y = Math.PI;
    bodyMesh.add(tankCamera);
  
    // 轮子
    const wheelRadius = 1; // 半径
    const wheelThickness = .5;  // 宽度
    const wheelSegments = 6; //面数
    // 圆柱体
    const wheelGeometry = new THREE.CylinderGeometry(
        wheelRadius,     // top radius
        wheelRadius,     // bottom radius
        wheelThickness,  // height of cylinder
        wheelSegments);
    // 圆柱体材质
    const wheelMaterial = new THREE.MeshPhongMaterial({color: 0x888888});
    // 轮子位置
    const wheelPositions = [
      [-carWidth / 2 - wheelThickness / 2, -carHeight / 2,  carLength / 3],
      [ carWidth / 2 + wheelThickness / 2, -carHeight / 2,  carLength / 3],
      [-carWidth / 2 - wheelThickness / 2, -carHeight / 2, 0],
      [ carWidth / 2 + wheelThickness / 2, -carHeight / 2, 0],
      [-carWidth / 2 - wheelThickness / 2, -carHeight / 2, -carLength / 3],
      [ carWidth / 2 + wheelThickness / 2, -carHeight / 2, -carLength / 3],
    ];
    const wheelMeshes = wheelPositions.map((position) => {
      const mesh = new THREE.Mesh(wheelGeometry, wheelMaterial);
      mesh.position.set(...position);
      mesh.rotation.z = Math.PI * .5;
      mesh.castShadow = true;
      bodyMesh.add(mesh);
      return mesh;
    });

    // 炮台---半球
    const domeRadius = 2;
    const domeWidthSubdivisions = 12;
    const domeHeightSubdivisions = 12;
    const domePhiStart = 0;
    const domePhiEnd = Math.PI * 2;
    const domeThetaStart = 0;
    const domeThetaEnd = Math.PI * .5;
    const domeGeometry = new THREE.SphereGeometry(
      domeRadius, domeWidthSubdivisions, domeHeightSubdivisions,
      domePhiStart, domePhiEnd, domeThetaStart, domeThetaEnd);
    const domeMesh = new THREE.Mesh(domeGeometry, bodyMaterial);
    domeMesh.castShadow = true;
    bodyMesh.add(domeMesh);
    domeMesh.position.y = .5;

    // 炮管---长方体
    const turretWidth = .1;
    const turretHeight = .1;
    const turretLength = carLength * .75 * .2;
    const turretGeometry = new THREE.BoxGeometry(
        turretWidth, turretHeight, turretLength);
    const turretMesh = new THREE.Mesh(turretGeometry, bodyMaterial);
    const turretPivot = new THREE.Object3D();
    turretMesh.castShadow = true;
    turretPivot.scale.set(5, 5, 5);
    turretPivot.position.y = .5;
    turretMesh.position.z = turretLength * .5;
    turretPivot.add(turretMesh);
    bodyMesh.add(turretPivot);
    // 炮管视角--瞄准
    const turretCamera = makeCamera();
    turretCamera.position.y = .75 * .2;
    turretMesh.add(turretCamera);

    // 目标物--球
    const targetGeometry = new THREE.SphereGeometry(.5, 6, 3);
    const targetMaterial = new THREE.MeshPhongMaterial({color: 0x00FF00, flatShading: true});
    const targetMesh = new THREE.Mesh(targetGeometry, targetMaterial);
    const targetOrbit = new THREE.Object3D();
    const targetElevation = new THREE.Object3D();
    const targetBob = new THREE.Object3D();
    targetMesh.castShadow = true;
    scene.add(targetOrbit);
    targetOrbit.add(targetElevation);
    targetElevation.position.z = carLength * 2;
    targetElevation.position.y = 8;
    targetElevation.add(targetBob);
    targetBob.add(targetMesh);
    // 目标物视角
    const targetCamera = makeCamera();
    const targetCameraPivot = new THREE.Object3D();
    targetCamera.position.y = 1;
    targetCamera.position.z = -2;
    targetCamera.rotation.y = Math.PI;
    targetBob.add(targetCameraPivot);
    targetCameraPivot.add(targetCamera);

    // 应该是路线吧
    const curve = new THREE.SplineCurve( [
        new THREE.Vector2( -10, 0 ),
        new THREE.Vector2( -5, 5 ),
        new THREE.Vector2( 0, 0 ),
        new THREE.Vector2( 5, -5 ),
        new THREE.Vector2( 10, 0 ),
        new THREE.Vector2( 5, 10 ),
        new THREE.Vector2( -5, 10 ),
        new THREE.Vector2( -10, -10 ),
        new THREE.Vector2( -15, -8 ),
        new THREE.Vector2( -10, 0 ),
    ] );

    const points = curve.getPoints( 50 );  
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
    const splineObject = new THREE.Line( geometry, material );
    splineObject.rotation.x = Math.PI * .5;
    splineObject.position.y = 0.05;
    scene.add(splineObject);


    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }
    

    const targetPosition = new THREE.Vector3();
    const tankPosition = new THREE.Vector2();
    const tankTarget = new THREE.Vector2();
  
    const cameras = [
      { cam: camera, desc: 'detached camera', },
      { cam: turretCamera, desc: 'on turret looking at target', },
      { cam: targetCamera, desc: 'near target looking at tank', },
      { cam: tankCamera, desc: 'above back of tank', },
    ];
  
    const infoElem = document.querySelector('#info');

    function render(time) {
        time *= 0.001;
        
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            cameras.forEach((cameraInfo) => {
                const camera = cameraInfo.cam;
                camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix();
            });
        }

        // move target移动目标物
        targetOrbit.rotation.y = time * .27;
        targetBob.position.y = Math.sin(time * 2) * 4;
        targetMesh.rotation.x = time * 7;
        targetMesh.rotation.y = time * 13;
        targetMaterial.emissive.setHSL(time * 10 % 1, 1, .25);
        targetMaterial.color.setHSL(time * 10 % 1, 1, .25);

        // 移动坦克
        const tankTime = time * .05;
        curve.getPointAt(tankTime % 1, tankPosition);
        curve.getPointAt((tankTime + 0.01) % 1, tankTarget);
        tank.position.set(tankPosition.x, 0, tankPosition.y);
        tank.lookAt(tankTarget.x, 0, tankTarget.y);
        
        // 炮管朝向
        targetMesh.getWorldPosition(targetPosition);
        turretPivot.lookAt(targetPosition);
        
        // 炮管摄像机朝向
        turretCamera.lookAt(targetPosition);

        // 目标物摄像机朝向
        tank.getWorldPosition(targetPosition);
        targetCameraPivot.lookAt(targetPosition);

        // 旋转
        wheelMeshes.forEach((obj) => {
            obj.rotation.x = time * 3;
        });


        const camera = cameras[time * .25 % cameras.length | 0];
        infoElem.textContent = camera.desc;


        renderer.render(scene, camera.cam);
        
        requestAnimationFrame(render);
    }
    
    requestAnimationFrame(render);

}

main();