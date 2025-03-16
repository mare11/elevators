import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

const MATERIAL_MODULES = [MatListModule, MatIconModule, MatButtonModule, MatDividerModule, MatGridListModule, MatCardModule,
    MatSlideToggleModule, MatInputModule, MatFormFieldModule, MatTooltipModule, MatChipsModule];

@NgModule({
    declarations: [],
    imports: MATERIAL_MODULES,
    exports: MATERIAL_MODULES
})
export class AppMaterialModule { }