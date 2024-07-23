"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Contact {
    constructor({ id, name, address, email, cellphone, profilePicture, userId, notes = [], createdAt, updatedAt }) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.email = email;
        this.cellphone = cellphone;
        this.profilePicture = profilePicture;
        this.userId = userId;
        this.notes = notes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    // Getters
    getId() { return this.id; }
    getName() { return this.name; }
    getAddress() { return this.address; }
    getEmail() { return this.email; }
    getCellphone() { return this.cellphone; }
    getProfilePicture() { return this.profilePicture; }
    getUserId() { return this.userId; }
    getNotes() { return this.notes; }
    getCreatedAt() { return this.createdAt; }
    getUpdatedAt() { return this.updatedAt; }
    toString() {
        return `Contact [id=${this.id}, name=${this.name}, address=${this.address}, createdAt=${this.createdAt}, updatedAt=${this.updatedAt}]`;
    }
}
exports.default = Contact;
