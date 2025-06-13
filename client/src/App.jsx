

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Hero from './components/Hero';
// import Feature from './components/Feature';
// import Categories from './components/Categories';
// import FeaturedProducts from './components/FeaturedProducts';
// import WhyChooseUs from './components/WhyChooseUs';
// import Shop from './components/Shop';
// import SingleProductPage from './components/SingleProductPage';
// import BlogHighlights from './components/BlogHighlights';
// import PartnerTestimonials from './components/PartnerTestimonials';
// import CTASection from './components/CTASection';
// import ShopPage from './components/ShopPage';
// import BlogPage from './components/BlogPage';
// import BlogPost from './components/BlogPost';
// import About from './components/About';
// import ProductDetails from './components/ProductDetails';
// import AdminPage from './components/AdminPage';
// import AdminPanel from './components/AdminPanel';
// import AdminDashboard from './components/AdminDashboard';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import { AuthProvider } from './context/AuthContext';
// import 'antd/dist/reset.css';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <div>
//                 <Hero />
//                 <Feature />
//                 <Categories />
//                 <FeaturedProducts />
//                 <WhyChooseUs />
//                 <Shop />
//                 <BlogHighlights />
//                 <PartnerTestimonials />
//                 <CTASection />
//               </div>
//             }
//           />
//           <Route path="/shop" element={<ShopPage />} />
//           <Route path="/shop/:category" element={<ShopPage />} />
//           <Route path="/product/:id" element={<ProductDetails />} />
//           <Route path="/blog" element={<BlogPage />} />
//           <Route path="/blog/:id" element={<BlogPost />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/admin" element={<AdminDashboard />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Feature from './components/Feature';
import Categories from './components/Categories';
import FeaturedProducts from './components/FeaturedProducts';
import WhyChooseUs from './components/WhyChooseUs';
import Shop from './components/Shop';
import SingleProductPage from './components/SingleProductPage';
import BlogHighlights from './components/BlogHighlights';
import PartnerTestimonials from './components/PartnerTestimonials';
import CTASection from './components/CTASection';
import ShopPage from './components/ShopPage';
import BlogPage from './components/BlogPage';
import BlogPost from './components/BlogPost';
import About from './components/About';
import ProductDetails from './components/ProductDetails';
import AdminPage from './components/AdminPage';
import AdminPanel from './components/AdminPanel';
import AdminDashboard from './components/AdminDashboard';
import AuthPage from './components/AuthPage'; // Added AuthPage import
import { AuthProvider } from './context/AuthContext';
import DealsReviewsPage from './components/DealsReviewsPage';
import 'antd/dist/reset.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Hero />
                <Feature />
                <Categories />
                <FeaturedProducts />
                <WhyChooseUs />
                <Shop />
                <BlogHighlights />
                <PartnerTestimonials />
                <CTASection />
              </div>
            }
          />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:category" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<AuthPage />} /> {/* Replaced /login and /signup with /auth */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/deals-reviews" element={<DealsReviewsPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;