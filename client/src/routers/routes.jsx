import Error404 from "../pages/Error404";
import Applications from "../pages/Applications";

import Login from '../pages/Login'
import Registration from '../pages/Registration'
import MyCourses from "../pages/MyCourses";
import CourseInfo from "../pages/CourseInfo";
import Statement from "../pages/Statement";
import StatementHistory from "../pages/StatementHistory";
import Forms from "../pages/Forms";
import Courses from "../pages/Courses";
import FormCreate from "../pages/FormCreate";

export const studentRoutes = [
    {path: '/not-page', element: <Error404 />},
    {path: '/applications', element: <MyCourses />, exact: true},
    {path: '/applications/:id/info', element: <CourseInfo />, exact: true},
    {path: '/applications/:id/statement', element: <Statement />, exact: true},
    {path: '/applications/:id/history', element: <StatementHistory />, exact: true},
]

export const managerRoutes = [
    {path: '/applications', element: <Applications />, exact: true},
    {path: '/applications/:id/statement', element: <Statement />, exact: true},
    {path: '/applications/:id/history', element: <StatementHistory />, exact: true},
    {path: '/courses', element: <Courses />, exact: true},
    {path: '/forms', element: <Forms />, exact: true},
    {path: '/forms/create', element: <FormCreate />, exact: true},
    {path: '/not-page', element: <Error404 />}
]

/*export const privatRoutes = [
    {path: '/not-page', element: <Error404 />, exact: true},
]*/

export const publicRoutes = [
    {path: '/login', element: <Login />},
    {path: '/registration', element: <Registration />}
]