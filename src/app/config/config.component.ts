import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app-material-module';
import { Config } from '../common/types';
import { ConfigService } from '../service/config.service';

@Component({
  selector: 'app-config',
  imports: [FormsModule, AppMaterialModule],
  templateUrl: './config.component.html',
  styleUrl: './config.component.css'
})
export class ConfigComponent {

  config: Config;

  constructor(private configService: ConfigService) {
    this.config = JSON.parse(JSON.stringify(configService.getConfig())); // make a clone so it doesn't change the config on every change in UI
  }

  updateConfig() {
    this.configService.updateConfig(this.config);
  }
}
