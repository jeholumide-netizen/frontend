import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    {/* Redirect root to login page instead of shop */}
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    
                    {/* Login/Signup page */}
                    <Route path="/login" element={<LoginSignup/>}/>
                    
                    {/* Protected shop route - only accessible after login */}
                    <Route path="/shop" element={
                        <ProtectedRoute>
                            <Shop/>
                        </ProtectedRoute>
                    }/>
                    
                    {/* Other protected routes */}
                    <Route path="/mens" element={
                        <ProtectedRoute>
                            <ShopCategory banner={men_banner} category="men"/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/womens" element={
                        <ProtectedRoute>
                            <ShopCategory banner={women_banner} category="women"/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/kids" element={
                        <ProtectedRoute>
                            <ShopCategory banner={kid_banner} category="kid"/>
                        </ProtectedRoute>
                    }/>
                    
                    {/* Public routes */}
                    <Route path="/product" element={<Product/>}/>
                    <Route path="/product/:productId" element={<Product/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/order" element={<PlaceOrder />}/>
                   
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;