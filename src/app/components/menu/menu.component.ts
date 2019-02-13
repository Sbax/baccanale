import { Component, OnInit, Input } from "@angular/core";
import { Menu } from "src/app/interfaces/menu";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent {
  @Input()
  menu: Menu;

  @Input()
  showYear: boolean;

  constructor() {}
}
