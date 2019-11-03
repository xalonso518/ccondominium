/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { VisualizarPdfComponent } from './visualizar-pdf.component';

let component: VisualizarPdfComponent;
let fixture: ComponentFixture<VisualizarPdfComponent>;

describe('VisualizarPdf component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ VisualizarPdfComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(VisualizarPdfComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});