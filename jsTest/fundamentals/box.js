import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';
function main() {
    const canvas = document.querySelector('#c');
    // webGL渲染器
    const renderer = new THREE.WebGLRenderer({canvas})

    // 设置背景色
    // renderer.setClearColor(0xFFFFFF, 1.0);

    // 响应式设置canvas
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


    // 镜头
    const fov = 40;
    const aspect = 2;
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    console.log(camera);
    camera.position.z = 120
    
    // 初始化场景
    const scene = new THREE.Scene();
    // 设置背景颜色
    scene.background = new THREE.Color(0xAAAAAA)
    // 灯光
    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
    }

    // 方块
    // const boxWidth = 1;
    // const boxHeight = 1;
    // const boxDepth = 1;
    // const widthSegments = 4;
    // const heightSegments = 4;
    // const depthSegments = 4;
    // const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth, widthSegments, heightSegments, depthSegments);

    // 平面圆
    const radius = 2;
    const segments = 10;
    const thetaStart = Math.PI * 1.58;
    const thetaLength = Math.PI * 1.1;
    const geometry = new THREE.CircleGeometry(radius, segments, thetaStart, thetaLength);

    // 添加图元的函数
    const objects = [];
    const spread = 15;
    function addObject(x, y, obj) {
        obj.position.x = x * spread;
        obj.position.y = y * spread;
        scene.add(obj);
        objects.push(obj);
    }
    // 生成随机颜色的材质
    function createMaterial() {
        const material = new THREE.MeshPhongMaterial({
            side: THREE.DoubleSizd,
        })
        const hue = Math.random();
        const saturation = 1;
        const luminance = .5;
        material.color.setHSL(hue, saturation, luminance);
       
        return material;
    }


    // function makeInstance(geometry, color, x) {
    //     const material = new THREE.MeshPhongMaterial({color});
        
    //     const cube = new THREE.Mesh(geometry, material);
    //     scene.add(cube);

    //     cube.position.x = x;

    //     return cube;
    // }

    function addSolidGeometry(x, y, geometry) {
        const mesh = new THREE.Mesh(geometry, createMaterial());
        addObject(x, y, mesh);
    }

    {
        const width = 8;
        const height = 8;
        const depth = 8;
        addSolidGeometry(-2, -2, new THREE.BoxGeometry(width, height, depth));
    }


    // const material = new THREE.MeshPhongMaterial({color: 0x44aa88});
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    function render(time) {
        time *= 0.0001;
        // cube.rotation.x = time;
        // cube.rotation.y = time;
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        objects.forEach((obj, ndx) => {
            const speed = .1 + ndx * .05;
            const rot = time * speed;
            obj.rotation.x = rot;
            obj.rotation.y = rot;
        });

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    
    requestAnimationFrame(render);
}

main();