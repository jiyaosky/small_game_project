<template>
  <div class="position-relative scene" ref="sceneRef">
    <div
      class="position-absolute w-100 h-100 bg-dark d-flex justify-content-center align-items-center"
      v-if="!(progress === 100 && flag)"
    >
      <div class="w-50 text-center">
        <p class="lead text-light mb-2">加载中</p>
        <div class="progress">
          <div
            class="bg-info text-dark"
            role="progressbar"
            :style="`width: ${progress}%;`"
          >
            {{ progress }}%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  BloomEffect,
  EffectComposer,
  EffectPass,
  RenderPass,
} from "postprocessing";

export default {
  props: ["path"],
  setup(props) {
    const sceneRef = ref(null);
    const progress = ref(0);
    const flag = ref(false);

    console.log(props.path);

    let scene, renderer, camera, controls, spotLight, composer;

    const init = () => {
      // Scene
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x212529);

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(sceneRef.value.clientWidth, sceneRef.value.clientHeight);
      renderer.toneMapping = THREE.ReinhardToneMapping;
      renderer.toneMappingExposure = 3;
      renderer.shadowMap.enabled = true;
      sceneRef.value.appendChild(renderer.domElement);

      // Camera
      const aspect = sceneRef.value.clientWidth / sceneRef.value.clientHeight;
      camera = new THREE.PerspectiveCamera(60, aspect, 0.01, 1000);
      camera.position.set(0, 3, 5);

      // Camera Controls
      controls = new OrbitControls(camera, renderer.domElement);
      controls.update();

      // Light
      const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 2);
      scene.add(hemiLight);

      spotLight = new THREE.SpotLight(0xffa95c, 4);
      spotLight.castShadow = true;
      spotLight.shadow.bias = -0.0001;
      spotLight.shadow.mapSize.width = 10000;
      spotLight.shadow.mapSize.height = 10000;
      scene.add(spotLight);

      // Post Processing
      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));

      const effectPass = new EffectPass(
        camera,
        new BloomEffect({
          intensity: 3,
          luminanceThreshold: 0.8,
          width: 100,
          height: 100,
        })
      );
      composer.addPass(effectPass);

      // Loading Manager
      const manager = new THREE.LoadingManager();
      manager.onProgress = (url, itemsLoaded, itemsTotal) => {
        progress.value = (itemsLoaded / itemsTotal) * 100;
        if ((itemsLoaded / itemsTotal) * 100 === 100) {
          setTimeout(() => {
            flag.value = true;
          }, 1000);
        }
      };

      // Loader
      const loader = new GLTFLoader(manager);
      loader.load(props.path, (result) => {
        const model = result.scene.children[0];
        model.scale.set(1, 1, 1);
        model.traverse((n) => {
          if (n.isMesh) {
            n.castShadow = true;
            n.receiveShadow = true;
            if (n.material.map) n.material.map.anisotropy = 100;
          }
        });
        scene.add(model);
        animate();
      });
    };

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      spotLight.position.set(
        camera.position.x + 5,
        camera.position.y + 5,
        camera.position.z - 5
      );
      // renderer.render(scene, camera);
      composer.render();
    };

    const onCanvasResize = () => {
      camera.aspect = sceneRef.value.clientWidth / sceneRef.value.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(sceneRef.value.clientWidth, sceneRef.value.clientHeight);
      composer.setSize(sceneRef.value.clientWidth, sceneRef.value.clientHeight);
    };

    onMounted(() => {
      window.addEventListener("resize", onCanvasResize, false);
      init();
    });

    return {
      sceneRef,
      progress,
      flag,
    };
  },
};
</script>

<style scoped>
.scene {
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
}
.w-20 {
  width: 20%;
}
.h-small {
  height: 10px;
}
</style>
