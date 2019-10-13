import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { AppMaterialModule } from './app-material.module';
import * as FileSaver from 'file-saver';
import { LoadingComponent } from './components/loading/loading.component';
import { PerfilUsuarioComponent } from './components/perfil/perfil-usuario.component';

// Modulo que importa y exporta los componentes y modulos usados entre los modulos y que pueden ser llamados por ellos.
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ChartsModule,
        AppMaterialModule
    ],
    declarations: [
        LoadingComponent
    ],
    exports: [
        // Modulos generales
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ChartsModule,
        AppMaterialModule,

        // //Componentes modal generales
        LoadingComponent
    ],
    entryComponents: [
    ]
})

export class AppSharedModule { }
