import { CART_ACTION_TYPES } from './cart.types';
import { createAction } from '../../utils/reducer/reducer.utils';

const addCartItem = (cartItems, productToAdd) => {
    const item = cartItems.find(i => i.id === productToAdd.id);

    if(item){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
        {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem)
    }

    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, productToRemove) => {
    const item = cartItems.find(i => i.id === productToRemove.id);

    if(item){
        if(item.quantity === 1){
            return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
        }else{
            return cartItems.map((cartItem) => cartItem.id === productToRemove.id ?
                {...cartItem, quantity: cartItem.quantity - 1}
                : cartItem)
        }
    }

    return cartItems;
}

const deleteCartItem = (cartItems, productToDelete) => {
    const item = cartItems.find(i => i.id === productToDelete.id);

    if(item){
        return cartItems.filter((cartItem) => cartItem.id !== productToDelete.id);
    }

    return cartItems;
}

export const setIsCartOpen = (boolean) => 
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);


export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemToCart = (cartItems, productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const deleteItemToCart = (cartItems, productToDelete) => {
    const newCartItems = deleteCartItem(cartItems, productToDelete);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}