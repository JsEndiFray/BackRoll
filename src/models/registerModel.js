export default class registerModels {
    constructor(id, username, password,email, rol, dateCreate = new Date(), dateUpdate = new Date()) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.rol = rol;
        this.dateCreate = new Date();
        this.dateUpdate = new Date();
    }
}