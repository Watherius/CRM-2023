import { Link, NavLink, useLocation } from "react-router-dom"

export default function Breadcrumbs() {
    const location = useLocation()
    let currentLink = ''

    const crumbs = location.pathname.split('/')
        .filter(crumb => crumb !== '')
        .map(crumb => {
            currentLink =+ `/${crumb}`
            return (
                <div className="app__header-breadcrumb-item" key={crumb}>
                    <Link className="app__header-breadcrumb-item-link" to={currentLink}>{crumb}</Link>
                </div>
            )
        })

    return (
        <ul className='app__header-breadcrumb'>
            {crumbs}
        </ul>
    )
}