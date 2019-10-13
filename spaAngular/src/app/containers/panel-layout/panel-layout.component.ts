import { Component, OnInit, OnDestroy } from '@angular/core';
import { IdentityUserService } from "../../utils/IdentityUser/identity-user.service";

@Component({
  selector: 'app-panel-layout',
  templateUrl: './panel-layout.component.html',
  styleUrls: ['./panel-layout.component.css']
})
export class PanelLayoutComponent implements OnInit, OnDestroy {

  /** panel-layout ctor */
  constructor(
      public identityUserService: IdentityUserService,
  ) {

  }

  ngOnInit(): void {
      this.identityUserService.openSidebar = true;
      this.isMobile();
  }

  isMobile() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          this.identityUserService.openSidebar = false;
      }
  }

  ngOnDestroy(): void {
      //this.identityUserService.resete();
  }

  changeOpen() {
      this.identityUserService.openSidebar = !this.identityUserService.openSidebar;
  }

}
