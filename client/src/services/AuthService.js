import api from "../api/config";

export default class AuthService {
    static async login(email, password) {
        return api.post('/login', {email, password})
    }

    static async registration(firstName, secondName, middleName, phone, email, password) {
        return api.post('/registration', {firstName, secondName, middleName, phone, email, password})
    }

    static async logout() {
        return api.post('/logout')
    }
}