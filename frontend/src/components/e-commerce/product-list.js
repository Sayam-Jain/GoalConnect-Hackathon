import { useState, useEffect } from "react";
import { Heart, ShoppingCart, X } from "lucide-react";
import Navbar from "./e-navbar";
import Cart from "./cart";

const products = [
    {
        id: 1,
        name: "Team India Jersey",
        price: 5000,
        image: "https://six5six.in/cdn/shop/files/INDIA-JerseyLarge_1200x1200.jpg?v=1697440965",
    },
    {
        id: 2,
        name: "FC Goa Home Jersey",
        price: 7000,
        image: "https://six5six.in/cdn/shop/files/FCG-Home-FrontLarge_900x.jpg?v=1723974426",
    },
    {
        id: 3,
        name: "Dream Team India Jersey",
        price: 6500,
        image: "https://six5six.in/cdn/shop/files/WC-India-Fan-Jersey-Front-01Large_836d308d-3762-4bf1-96c6-bbaa6335adf8_1024x1024.jpg?v=1717663843",
    },
    {
        id: 4,
        name: "LSG Jersey",
        price: 5600,
        image: "https://six5six.in/cdn/shop/files/LSG-499-Replica-Front-499Large_1024x1024.jpg?v=1710317035",
    },
    {
        id: 5,
        name: "Chennaiyin FC Home Jersey",
        price: 4500,
        image: "https://six5six.in/cdn/shop/files/CFC-Home-FrontLarge_900x.jpg?v=1724308243",
    },
    {
        id: 6,
        name: "Shoes",
        price: 4999,
        image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png",
    },
    {
        id: 7,
        name: "Indian Football Poster",
        price: 299,
        image: "https://ih1.redbubble.net/image.4430435012.9125/fposter,small,wall_texture,square_product,600x600.jpg",
    },
    {
        id: 8,
        name: "Indian Football Tiger Poster",
        price: 399,
        image: "https://ih1.redbubble.net/image.5403838423.3512/fposter,small,wall_texture,square_product,600x600.jpg",
    },
];

function ProductList() {
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        setIsSidebarOpen(isCartOpen || isFavoritesOpen);
    }, [isCartOpen, isFavoritesOpen]);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const toggleFavorite = (product) => {
        setFavorites((prev) =>
            prev.some((item) => item.id === product.id)
                ? prev.filter((item) => item.id !== product.id)
                : [...prev, product],
        );
    };

    const addToCart = (product) => {
        setCart((prev) => {
            const existingItem = prev.find((item) => item.id === product.id);
            if (existingItem) {
                return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const handleSearch = (searchTerm) => {
        if (searchTerm.trim() === "") {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()),
            );
            setFilteredProducts(filtered);
        }
    };

    const handleClearSearch = () => {
        setFilteredProducts(products);
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const closeCart = () => {
        setIsCartOpen(false);
    };

    const toggleFavorites = () => {
        setIsFavoritesOpen(!isFavoritesOpen);
    };

    const closeFavorites = () => {
        setIsFavoritesOpen(false);
    };

    const handleMobileMenuClick = () => {
        // You can add any specific logic here if needed
        console.log("Mobile menu clicked");
    };

    return (
        <div className="relative">
            <Navbar
                onSearch={handleSearch}
                onClearSearch={handleClearSearch}
                cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
                onCartClick={toggleCart}
                favoriteCount={favorites.length}
                onFavoritesClick={toggleFavorites}
                onMobileMenuClick={handleMobileMenuClick}
            />
            {isCartOpen && <Cart items={cart} setCart={setCart} onClose={closeCart} />}
            {isFavoritesOpen && (
                <div className="fixed right-0 top-[64px] h-[calc(100vh-64px)] w-full sm:w-64 bg-white shadow-lg p-4 overflow-y-auto z-50">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-800">Your Favorites</h2>
                        <button onClick={closeFavorites} className="text-gray-500 hover:text-gray-700">
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                    {favorites.map((item) => (
                        <div key={item.id} className="mb-4 border-b pb-2">
                            <h3 className="font-semibold text-gray-800">{item.name}</h3>
                            <p className="text-gray-600">₹{item.price.toFixed(2)}</p>
                            <button
                                className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                onClick={() => toggleFavorite(item)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
                                hoveredProduct === product.id && !isSidebarOpen ? "shadow-lg transform scale-105" : ""
                            }`}
                            onMouseEnter={() => !isSidebarOpen && setHoveredProduct(product.id)}
                            onMouseLeave={() => setHoveredProduct(null)}
                        >
                            <div className="p-4">
                                <h2 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">{product.name}</h2>
                            </div>
                            <div className="p-4">
                                <img src={product.image} alt={product.name} className="w-full h-40 sm:h-48 object-cover mb-4" />
                                <p className="text-base sm:text-lg font-semibold text-gray-800">₹{product.price.toFixed(2)}</p>
                            </div>
                            <div className="p-4 flex justify-between">
                                <button
                                    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                                    onClick={() => toggleFavorite(product)}
                                >
                                    <Heart
                                        className={
                                            favorites.some((item) => item.id === product.id)
                                                ? "fill-red-500 stroke-red-500"
                                                : "stroke-gray-600"
                                        }
                                    />
                                </button>
                                <button
                                    className="flex items-center px-3 sm:px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm sm:text-base"
                                    onClick={() => addToCart(product)}
                                >
                                    <ShoppingCart className="mr-1 sm:mr-2 h-4 w-4" /> Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductList;
