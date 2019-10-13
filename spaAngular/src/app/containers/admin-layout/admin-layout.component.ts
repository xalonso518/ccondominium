import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionService } from '../../utils/service/session.service';
import { IdentityUserService } from 'src/app/utils/IdentityUser/identity-user.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    public identityUserService: IdentityUserService,
    private sessionService: SessionService) {
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

  changeOpen() {
    this.identityUserService.openSidebar = !this.identityUserService.openSidebar;
  }
}
