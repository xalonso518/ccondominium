import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-panel',
  templateUrl: './sidebar-panel.component.html',
  styleUrls: ['./sidebar-panel.component.css']
})
export class SidebarPanelComponent implements OnInit {
  isOpen = false;
  isOpenMain = true;
  isSelected: boolean[] = [
      false,
      false,
      false,
      false,
      false
  ];

  constructor() { }

  ngOnInit() {
  }

  open(option: number) {
      this.isOpen = true;
      this.isOpenMain = false;
      this.isSelected[option] = true;
  }

  close(option: number) {
      this.isOpen = false;
      this.isOpenMain = true;
      this.isSelected[option] = false;
  }

}
