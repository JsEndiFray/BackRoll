export default class register {
    constructor(id, user_id, username, password, rol, dateCreate = new Date(), dateUpdate = new Date()) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.rol = rol;
        this.dateCreate = new Date();
        this.dateUpdate = new Date();
    }
}