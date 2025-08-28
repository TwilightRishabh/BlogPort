import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Posts", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-between py-4">
          
          {/* Logo */}
          <Link to="/">
            <Logo width="100px" />
          </Link>

          {/* Navigation Links */}
          <ul className="flex items-center space-x-6">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="relative  text-blue-600  font-medium hover:text-blue-300 transition-colors duration-200
                                 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px]
                                 after:bg-gray-800 after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav> 
      </Container>
    </header>
  );
}

export default Header;
