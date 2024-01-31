import  { Link }  from "react-router-dom"
import  './NavBar.css'

export const Navbar = () => {
    return (
       <nav className="navbar">
          <h2>
            <Link to={`/`}>Clean</Link>
          </h2>
          <ul>
            <li><Link to={`/`}>Home</Link></li>
            <li><Link to={`/new`} className="new-btn">New Post</Link></li>
          </ul>
       </nav>
    )
}

export default Navbar
