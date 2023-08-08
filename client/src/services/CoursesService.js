import api from "../api/config";

export default class CoursesService {

    static async getCourses() {
        return api.get('/courses')
    }

    static async getCourseId(id) {
        return api.get(`/courses/${id}`)
    }


    /*static async fetchUserApplications() {
        return api.get('/user/applications')
    }

    static async applicationIdSave(course_id, application_id, fields) {
        return api.post(`/application/save`, {course_id, application_id, fields})
    }

    static async applicationIdSubmit(id) {
        return api.get(`/application/submit/${id}`)
    }*/
}