import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebglAvailabilityService {

  constructor() {
  }

  isWebGLAvailable(canvas): boolean {
    // https://github.com/mrdoob/three.js/blob/master/examples/jsm/WebGL.js

    try {
      return !!(window.WebGLRenderingContext && canvas.getContext('webgl2'));
    } catch (e) {
      return false;
    }
  }

  getWebGLErrorMessage() {
    return this.getErrorMessage(2);
  }

  getErrorMessage(version) {

    const names = {
      1: 'WebGL',
      2: 'WebGL 2'
    };

    const contexts = {
      1: window.WebGLRenderingContext,
      2: window.WebGL2RenderingContext
    };

    let message = 'Your $0 does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">$1</a>';

    if (contexts[version]) {
      message = message.replace('$0', 'graphics card');
    } else {
      message = message.replace('$0', 'browser');
    }
    message = message.replace('$1', names[version]);
    return message;
  }
}
