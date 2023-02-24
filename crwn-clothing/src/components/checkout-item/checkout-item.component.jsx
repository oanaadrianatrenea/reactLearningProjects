import './checkout-item.styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemToCart, deleteItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

const CheckoutItem = ({checkoutItem}) => {
    const { name, quantity, imageUrl, price } = checkoutItem;
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

    const increaseQuantity = () => dispatch(addItemToCart(cartItems, checkoutItem));
    const decreaseQuantity = () => dispatch(removeItemToCart(cartItems, checkoutItem));
    const deleteProduct = () => dispatch(deleteItemToCart(cartItems, checkoutItem));

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={decreaseQuantity}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={increaseQuantity}>&#10095;</div>
            </span>
            <span className='price'>${price}</span>
            
            <div className='remove-button' onClick={deleteProduct}>
                &#10005;
            </div>
           <hr></hr>
        </div>
    )
}

export default CheckoutItem