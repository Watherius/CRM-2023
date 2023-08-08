import api from "../api/config";

export default class FormsService {

    static async getForms() {
        return api.get('/forms')
    }

    /*static async fetchUserApplications() {
        return api.get('/user/applications')
    }

    static async applicationId(id) {
        return api.get(`/application/${id}`)
    }

    static async applicationIdSave(course_id, application_id, fields) {
        return api.post(`/application/save`, {course_id, application_id, fields})
    }

    static async applicationIdSubmit(id) {
        return api.get(`/application/submit/${id}`)
    }*/
}