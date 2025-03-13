export default class ModelsUser {
    constructor(id, name, lastname, email, phone, rol, message, dateCreate = new Date(), dateUpdate = new Date()) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.phone = phone;
        this.rol = rol;
        this.message = message;
        this.dateCreate = dateCreate;
        this.dateUpdate = dateUpdate;
    }
}
