import { Injectable } from "@angular/core";
import { NbToastrService } from "@nebular/theme";

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor(
    private nbToastrService: NbToastrService
  ){}

  // nebular toast
  showToast(position, status, iconName, message: string, submessage: string) {
    const iconConfig = { icon: iconName, pack: 'eva' };
    this.nbToastrService.show(
    submessage,
    message,
    { position, status, iconPack: iconConfig.pack, icon: iconConfig.icon});
  }

}