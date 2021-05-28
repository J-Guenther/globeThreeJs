import {Component, OnInit} from '@angular/core';
import * as THREE from 'three';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

@Component({
  selector: 'app-globe',
  templateUrl: './globe.component.html',
  styleUrls: ['./globe.component.scss']
})
export class GlobeComponent implements OnInit {


  constructor() {
  }

  ngOnInit(): void {
    const canvas = document.querySelector(".threeContainer canvas");
    this.renderScene(canvas)
  }

  renderScene(canvas): void {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({canvas: canvas});

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    camera.position.z = 1;

    // scene.add(new THREE.AmbientLight(0x333333));

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 1, 1);
    scene.add(light);

    const loader = new THREE.TextureLoader();

    const map = loader.load('assets/blenderguru/Albedo.jpg');
    const bumpMap = loader.load('assets/blenderguru/Bump_small.jpg');
    const specularMap = loader.load('assets/blenderguru/Ocean_Mask_inverted_small.png');
    console.log({map});
    console.log({specularMap});


    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 32, 32),
      new THREE.MeshPhongMaterial({
        map: map,
        bumpMap: bumpMap,
        bumpScale: 0.001,
        specularMap: specularMap,
        specular: new THREE.Color('grey'),
        shininess: 10
      })
    );
    scene.add(sphere);
    //webgl2renderingcontext.uniform2fv: argument 2 could not be converted to any of: float32array

    const cloudTexture = loader.load('assets/blenderguru/Clouds_small.png');
    const clouds = new THREE.Mesh(
      new THREE.SphereGeometry(0.503, 32, 32),
      new THREE.MeshLambertMaterial({
        alphaMap: cloudTexture,
        opacity: 1,
        transparent: true,
      })
    );
    sphere.add(clouds);


    function resizeCanvasToDisplaySize() {
      const canvas = renderer.domElement;
      // look up the size the canvas is being displayed
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      // adjust displayBuffer size to match
      if (canvas.width !== width || canvas.height !== height) {
        // you must pass false here or three.js sadly fights the browser
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        // update any render target sizes here
      }
    }

    // const controls = new TrackballControls(camera, canvas);
    const controls = new OrbitControls(camera, canvas);

    const animate = function () {
      resizeCanvasToDisplaySize();
      controls.update();
      sphere.rotation.y += 0.0005;
      clouds.rotation.y += 0.0005;
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();
  }
}
