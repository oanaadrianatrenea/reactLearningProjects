import { useSelector, useDispatch } from "react-redux";
import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles';

const CartIcon = () => {
    const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);
    const numberOfCartItems = useSelector(selectCartCount);

    const ToggleIsCartOpen = () => {
        
        dispatch(setIsCartOpen(!isCartOpen));

        //setIsCartOpen(!isCartOpen);
    }

    return (
        <CartIconContainer onClick={ToggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon' />
            <ItemCount>{numberOfCartItems}</ItemCount>
        </CartIconContainer>
    )
} 

export default CartIcon;

