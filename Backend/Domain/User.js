"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor({ id, name, password, contacts = [], notes = [], logins = [], createdAt, updatedAt }) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.contacts = contacts;
        this.notes = notes;
        this.logins = logins;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    // Getters
    getId() { return this.id; }
    getName() { return this.name; }
    getPassword() { return this.password; }
    getContacts() { return this.contacts; }
    getNotes() { return this.notes; }
    getLogins() { return this.logins; }
    getCreatedAt() { return this.createdAt; }
    getUpdatedAt() { return this.updatedAt; }
    toString() {
        return `User [id=${this.id}, name=${this.name}, createdAt=${this.createdAt}, updatedAt=${this.updatedAt}]`;
    }
}
exports.default = User;
