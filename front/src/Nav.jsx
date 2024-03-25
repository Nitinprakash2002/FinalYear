function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/services">Services</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
// .navbar {
//   background-color: #333;
//   overflow: hidden;
// }
//
// .nav-links {
//   list-style: none;
//   padding: 0;
//   margin: 0;
//   display: flex;
//   justify-content: flex-start;
// }
//
// .nav-links li a {
//   display: block;
//   color: white;
//   text-align: center;
//   padding: 14px 16px;
//   text-decoration: none;
// }
//
// .nav-links li a:hover {
//   background-color: #ddd;
//   color: black;
// }
//
// @media (max-width: 768px) {
//   .nav-links {
//     flex-direction: column;
//   }
// }
