"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Login {
    constructor({ id, userId, timestamp, token }) {
        this.id = id;
        this.userId = userId;
        this.timestamp = timestamp;
        this.token = token;
    }
    // Getters
    getId() { return this.id; }
    getUserId() { return this.userId; }
    getTimestamp() { return this.timestamp; }
    getToken() { return this.token; }
    toString() {
        return `Login [id=${this.id}, userId=${this.userId}, timestamp=${this.timestamp}]`;
    }
}
exports.default = Login;
