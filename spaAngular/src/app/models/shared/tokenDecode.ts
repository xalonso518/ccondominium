export class TokenDecode {
    public userId: string;
    public user: string;
    public tipo: string;
    public expires: string;

    constructor(id: string) {
        this.userId = id;
    }
}
