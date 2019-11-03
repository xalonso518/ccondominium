import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileInput } from "../../../models/file/FileInput";
import { ErrorValidationService } from "../../../utils/service/error-validation.service";
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { ConstantsCatalogos } from "../../../utils/constants/ConstantsCatalogos";

@Component({
    selector: 'app-multiple-file-input',
    templateUrl: './multiple-file-input.component.html',
    styleUrls: ['./multiple-file-input.component.css']
})
/** MultipleFileInput component*/
export class MultipleFileInputComponent {
    @Input() name: string;
    @Input() ext: string[];
    @Input() placeholder: string;
    @Output() onChangeFile = new EventEmitter<FileInput[]>();
    files: FileInput[] = new Array();

    /** file-input ctor */
    constructor(
        private toastr: ToastrService,
        private errorValidationService: ErrorValidationService,
        private _DomSanitizationService: DomSanitizer
    ) {

    }

    onChange(event: any) {
        var files = event.srcElement.files;
        for (var i = 0; i < files.length; i++) {
            this.setFileInput(files[i], files[i].name);
        }
        this.emitFiles();
    }

    drop(event: any, name: string) {
        event.preventDefault();
        if (event.dataTransfer.items) {
            for (var i = 0; i < event.dataTransfer.items.length; i++) {
                if (event.dataTransfer.items[i].kind === 'file') {
                    this.setFileInput(event.dataTransfer.items[i].getAsFile(), event.dataTransfer.files[i].name);
                }
            }
            this.emitFiles();
        }
    }

    dragover(event: any) {
        event.preventDefault();
        event.srcElement.classList.add('file-drop-zone-drop');
    }

    dragleave(event: any) {
        event.srcElement.classList.remove('file-drop-zone-drop');
    }

    setFileInput(file: any, name: string) {
        if (file != undefined) {
            if (!this.errorValidationService.isValidSomeFileExtension(file, this.ext)) {
                this.toastr.error('Archivo' + name + ' no cumple con la extensión requerida', 'Error');
            } else {
                if (file) {
                    if (name == "NA") name = this.errorValidationService.getFileName(file);
                    this.files.push(new FileInput(file, name, window.URL.createObjectURL(file)));                    
                }
            }
        }
    }

    emitFiles() {
        this.onChangeFile.emit(this.files);
        this.files = new Array();
    }
}