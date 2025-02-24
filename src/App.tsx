import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop'; // Import ScrollToTop
import Home from './pages/Home';
import Sustainability from './pages/Sustainability';
import HowWeWork from './pages/HowWeWork';
import ProductsCollection from './pages/ProductsCollection';
import Visionnaire from './pages/Visionnaire';

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* Ensures every page starts at the top */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sustainability" element={<Sustainability />} />
        <Route path="/how-we-work" element={<HowWeWork />} />
        <Route path="/productscollection" element={<ProductsCollection />} />
        <Route path="/visionnaire" element={<Visionnaire />} />
      </Routes>
    </Router>
  );
}

export default App;