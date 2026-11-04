import React from 'react'

function ProductDetail({ product }) {
    return (
        <div className="product-item">
            <div className="product-image-container">
                <img className="product-image" src={product.thumbnail} alt={product.title} />
            </div>
            <h2 className="product-title">{product.title}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-price">Price: ${product.price}</p>
        </div>
    )
}

export default ProductDetail
