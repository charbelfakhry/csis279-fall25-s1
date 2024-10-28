import React from 'react';
import DataGrid from './datagrid/DataGrid';

const ProductsDataGrid = () => {
    const columns = [
        { label: 'ID', field: 'product_id' },
        { label: 'Name', field: 'product_name' },
        { label: 'Category', field: 'product_cat' },
        { label: 'Price', field: 'product_price' }
    ];

    const rows = [
        { product_id: 1, product_name: 'Laptop 1', product_cat: 'Elect.', product_price: '$1000' },
        { product_id: 2, product_name: 'Laptop 2', product_cat: 'Elect.', product_price: '$1000' },
        { product_id: 3, product_name: 'Laptop 3', product_cat: 'Elect.', product_price: '$1000' },
        { product_id: 4, product_name: 'Laptop 4', product_cat: 'Elect.', product_price: '$1000' },
        { product_id: 5, product_name: 'Laptop 5', product_cat: 'Elect.', product_price: '$1000' },
        { product_id: 6, product_name: 'Laptop 6', product_cat: 'Elect.', product_price: '$1000' },
        { product_id: 7, product_name: 'Laptop 7', product_cat: 'Elect.', product_price: '$1000' },
        { product_id: 8, product_name: 'Laptop 8', product_cat: 'Elect.', product_price: '$1000' },
        { product_id: 9, product_name: 'Laptop 9', product_cat: 'Elect.', product_price: '$1000' },
    ];

    return (
        <div>
            <h1>Products</h1>
            <DataGrid columns={columns} rows={rows} />
        </div>
    );
};

export default ProductsDataGrid;
