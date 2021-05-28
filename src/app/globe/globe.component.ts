import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-globe',
  templateUrl: './globe.component.html',
  styleUrls: ['./globe.component.scss']
})
export class GlobeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, 2, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer({canvas: document.querySelector(".threeContainer canvas")});

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;

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

    const animate = function () {

      resizeCanvasToDisplaySize();

      requestAnimationFrame( animate );

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render( scene, camera );
    };

    if ( WEBGL.isWebGLAvailable() ) {

      // Initiate function or other initializations here
      animate();

    } else {

      const warning = WEBGL.getWebGLErrorMessage();
      document.getElementById( 'container' ).appendChild( warning );

    }
  }

}
