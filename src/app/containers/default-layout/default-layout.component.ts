import {Component, OnInit} from '@angular/core';
import { INavData } from '@coreui/angular';
import { navItems } from '../../_nav';
import { navNormalItems } from '../../_navNormal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {

  public sidebarMinimized = false;
  public navItems = navItems;
  public navNormalItems = navNormalItems;
  public checkRoleId = <any>localStorage.getItem('roledId');
  public itemNavs: INavData[]
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  ngOnInit(): void {
    // debugger
    if(this.checkRoleId == 1){
      this.itemNavs = navItems
    }else{
      this.itemNavs = navNormalItems
    }
    console.log(this.itemNavs)
    
  }
  // public logout(){
   
  // }
  // checkRole(){
  //   const roleId = <any>localStorage.getItem('roleId');
  //   if(roleId == 1){
  //    this.checkRoleId = true
  //   }else{
  //     this.checkRoleId = false
  //   }
    
  // }
}
