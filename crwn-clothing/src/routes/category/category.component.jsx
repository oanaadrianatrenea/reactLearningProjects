
import { useParams } from 'react-router-dom';
import { useState, Fragment } from 'react';
import ProductCard from '../../components/product-card/product-card.component';

import './category.styles.scss';
import { useEffect } from 'react';

import { selectCategoriesMap } from '../../store/categories/category.selector';
import { useSelector } from "react-redux";

const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);

    const [ products, setProducts ] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [categoriesMap, category]);

    return (
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className='category-container'>
                {
                    products && // categories will be bringed async and at the time of the render, it will crash otherwise.
                    // we will have to wait until the categories and unfiltered products are bringed from db and only then display them
                    products.map((product) => <ProductCard key={product.id} product={product} />)
                }
            </div>
        </Fragment>
        
        
    );
}

export default Category;