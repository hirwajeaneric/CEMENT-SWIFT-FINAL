import { Link } from "react-router-dom";
import { stringCompressor } from "../utils/helper_functions/StringCompressor";

/* eslint-disable react/prop-types */
const ProductCard = ({ product }) => {
    const { image, name, description, price } = product;
    return (
        <Link 
            to={`/product/${product.id}`} 
            style={{ display: "flex", flexDirection: 'column', width: '20%', color: "black", textDecoration: "none" }}
        >
            <img src={image} alt="" />
            <p style={{ margin: '20px 0 10px', fontSize: '100%', fontWeight: 'bold' }}>{stringCompressor(name, 25)}...</p>
            <span>{stringCompressor(description, 24)}...</span>
            <span>{price} Rwf</span>
        </Link>
    )
}

export default ProductCard