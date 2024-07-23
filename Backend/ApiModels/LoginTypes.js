"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginResponse = void 0;
class LoginResponse {
    constructor(login) {
        this.id = login.id;
        this.userId = login.userId;
        this.timestamp = login.timestamp;
        this.token = login.token;
    }
}
exports.LoginResponse = LoginResponse;
