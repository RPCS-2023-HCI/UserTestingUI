import './Navbar.css';

function Navbar() {
  return (
    <div className='nav'>
      <div className='left'>
        <img className='logo' 
             src='/f1tenth-logo.png'
             alt="logo of F1 Tenth"
        />
        <h1>Diagnostic Dashboard</h1>
      </div>
      
      <div className='right'>
        <h3>📄Menu</h3>
        <h3>👤User Name</h3>
      </div>
    </div>
  );
}

export default Navbar;