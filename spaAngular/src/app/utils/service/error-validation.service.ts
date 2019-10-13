import { Injectable } from '@angular/core';

@Injectable()
export class ErrorValidationService {
    constructor() {

    }

    isEmail(email: string): boolean {
        const re = /^[a-zA-Z_0-9.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        // return re.test(email);
        return true;
    }

    isNumber(value: any): number {
        if (Number.isNaN(parseFloat(value)) || value.toString().includes('e')) { return 0.00; } else { return Number.parseFloat(value); }
    }

    setNumber(input: any, decimales: number): number {
        let value = input.value;
        if (value == null) { return value; }
        if (value !== '') {
            value = Number.parseFloat(this.isNumber(value).toFixed(decimales));
            if (input.min && input.min > value) { value += value * -2; }
            if (input.max && input.max < value) { value = 0.00; }
        }
        return value;
    }

    setNumberEnteroString(input: any, l: number): string {
        let value = input.value;
        if (value == null) { return value; }
        let sValue: string = value.toString();
        value = sValue = sValue.replace(/\./g, '');
        if (value !== '') {
            if (l < sValue.length) { value = sValue.slice(0, l); }
        }
        return value;
    }

    setNumberPositive(input: any, decimales: number, max: number): number {
        let value = input.value;
        if (value == null) { return value; }
        if (value !== '') {
            value = Number.parseFloat(this.isNumber(value).toFixed(decimales));
            if (0 > value) { value += value * -2; }
            if (max < value) { value = 0.00; }
        }
        return value;
    }

    setNumberFixedSat(value: number, decimales: number) {
        const cien = Math.pow(10, decimales);
        return (Math.round(value * cien) / cien);
    }

    setNumberFloor(value: number, decimales: number) {
        const cien = Math.pow(10, decimales);
        return (Math.floor(value * cien) / cien);
    }

    setNumberRound(value: number, decimales: number) {
        const cien = Math.pow(10, decimales);
        return (Math.round(value * cien) / cien);
    }

    setNumberRound2(value: number, decimales: number) {
        const cien = Math.pow(10, decimales);
        const x = Number.parseFloat(this.isNumber(value).toFixed(decimales));
        return (x);
    }

    getFileName(file: any): string {
        const division = file.name.split('.');
        const name: string = division.length > 0 ? division[0] : 'archivo';
        return name.trim();
    }

    isValidFileSize(file: any): boolean {
        const MAX_FILE_SIZE = 1024 * 1024 * 5;
        if (file.size > MAX_FILE_SIZE) { return false; }
        return true;
    }

    isValidSomeFileExtension(file: any, exts: any[]): boolean {
        const division = file.name.split('.');
        const ext = division.length > 0 ? division[division.length - 1] : 'txt';

        const z = exts.findIndex(e => e === ext.toLowerCase());
        if (z === -1) { return false; }
        return true;
    }

    isValidFileImgExtension(file: any): boolean {
        const FILE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'svg', 'gif'];

        const division = file.name.split('.');
        const ext = division.length > 0 ? division[division.length - 1] : 'txt';

        const z = FILE_EXTENSIONS.findIndex(e => e === ext.toLowerCase());
        if (z === -1) { return false; }
        return true;
    }

    isValidFileExtension(file: any): boolean {
        const FILE_EXTENSIONS = ['pdf', 'xml', 'rar', 'zip',
            'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt',
            'png', 'jpg', 'jpeg', 'svg', 'gif', 'cert', 'key'];

        const division = file.name.split('.');
        const ext = division.length > 0 ? division[division.length - 1] : 'txt';

        if (FILE_EXTENSIONS.findIndex(ext.toLowerCase()) === -1) { return false; }
        return true;
    }

    validateFile(file: any): boolean {
        if (file == null) { return false; }
        return this.isValidFileSize(file) && this.isValidFileExtension(file);
    }

    validateFileImg(file: any): boolean {
        if (file == null) { return false; }
        return this.isValidFileSize(file) && this.isValidFileImgExtension(file);
    }

    getFechaZeroString(date: Date): string {
        const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return date.getFullYear() + '-' + month + '-' + day;
    }

    getFechaEspZeroString(date: Date): string {
        const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return day + '/' + month + '/' + date.getFullYear();
    }

}
