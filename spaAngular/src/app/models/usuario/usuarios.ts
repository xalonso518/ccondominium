export class Usuarios {

    // tslint:disable-next-line: variable-name
    constructor(_id = '', user = '', pass = '', nombre = '') {
        this._id = _id;
        this.user = user;
        this.pass = pass;
        this.nombre = nombre;
    }

    // tslint:disable-next-line: variable-name
    _id: string;
    user: string;
    pass: string;
    nombre: string;
}
