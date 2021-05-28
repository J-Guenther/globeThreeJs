import {Component, OnInit} from '@angular/core';
import {WebglAvailabilityService} from "./webGL/webgl-availability.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  webGlAvailable = false;
  warning: string | undefined;
  title = 'globeThreeJs';

  constructor(private webglAvailabilityService: WebglAvailabilityService) {
  }

  ngOnInit(): void {
    const canvas = document.querySelector(".availabilityTest canvas");
    if (this.webglAvailabilityService.isWebGLAvailable(canvas)) {
      this.webGlAvailable = true;
    } else {
      this.webGlAvailable = false;
      this.warning = this.webglAvailabilityService.getWebGLErrorMessage();
    }
  }
}
