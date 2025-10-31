import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'

import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link, useNavigate } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_droptown from '../Assets/dropdown_icon.png'

const Navbar = () => {

 const [menu,setMenu] = useState("shop");
 const {getTotalCartItems}= useContext(ShopContext);
 const menuRef = useRef();
 const navigate = useNavigate();

 const dropdown_toggle = (e) =>{
      menuRef.current.classList.toggle('nav-menu-visible');
      e.target.classList.toggle('open');
 } 

 const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');

  navigate('/login');
 }

 const isLoggedIn = localStorage.getItem('token');

  return (
    <div className='navbar'>
      <div className='nav-logo'> 
          <img src={logo} alt="" />
          <p>SHOPPING</p>
      </div>
      <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_droptown} alt="" />
        <ul ref={menuRef} className='nav-menu'>
          <li onClick={()=>{setMenu("shop")}}><Link style={{ textDecoration: 'none'}} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("mens")}}><Link style={{ textDecoration: 'none'}} to='/mens'>Men</Link>{menu==="mens"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("womens")}}><Link style={{ textDecoration: 'none'}} to='womens'>Women</Link>{menu==="womens"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("kids")}}><Link style={{ textDecoration: 'none'}} to='/kids' >Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
        </ul>
        <div className='nav-login-cart'>
          {isLoggedIn ? (
            <button onClick={handleLogout} className='logout-btn'>Logout</button>
          ): (<Link to='/login'><button>Login</button></Link>)}
            
            <Link to='/cart'><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
    </div>
  )
}

export default Navbar
