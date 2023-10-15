import { ButtonField } from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

type BlogLayoutProps = {
  children?: React.ReactNode
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  const { currentUser, isAuthenticated, logOut } = useAuth()
  return (
    <div className="p-5">
      <header>
        <h1 className="text-4xl font-bold">
          <Link to={routes.home()}>Redwood Blog</Link>
        </h1>
        <nav>
          <ul>
            <li>
              <Link to={routes.home()}>Home</Link>
            </li>
            <li>
              <Link to={routes.contact()}>Contact</Link>
            </li>
            <li>
              <Link to={routes.about()}>About</Link>
            </li>
            <li>
              {isAuthenticated ? (
                <div>
                  <p>Logged in as: {currentUser.email}</p>
                  <button name="logout" onClick={logOut}>
                    Logout
                  </button>
                </div>
              ) : (
                <Link to={routes.login()}>Login</Link>
              )}
            </li>
          </ul>
        </nav>
      </header>
      <main className="p-5 border border-gray-300 rounded-xl shadow-md">
        {children}
      </main>
    </div>
  )
}

export default BlogLayout
