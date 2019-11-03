/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { FileInputComponent } from './file-input.component';

let component: FileInputComponent;
let fixture: ComponentFixture<FileInputComponent>;

describe('file-input component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FileInputComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(FileInputComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});