/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { PerfilUsuarioComponent } from './perfil-usuario.component';

let component: PerfilUsuarioComponent;
let fixture: ComponentFixture<PerfilUsuarioComponent>;

describe('perfilUsuario component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ PerfilUsuarioComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(PerfilUsuarioComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});