import {Button,Segment,Divider} from 'semantic-ui-react'
import React from 'react';
import StripeCheckout from 'react-stripe-checkout'
import calculateCartTotal from '../../utils/calculateCartTotal'

function CartSummary({products,handleCheckout,success}) {
 const [isCartEmpty,setCartEmpty]= React.useState(false);
 const [cartAmount,setCartAmount] = React.useState(0)
 const [stripeAmount,setStripeAmount] = React.useState(0)

 React.useEffect(()=>{
  const {cartTotal,stripeTotal} =calculateCartTotal(products)
 
  setCartAmount(cartTotal)
  setStripeAmount(stripeTotal)
  setCartEmpty(products.length === 0)
 },[products])


  return (
    <>
    <Divider/>
    <Segment clearing size='large'>
      <strong>Sub total :</strong> ${cartAmount}
      <StripeCheckout
         name='React Reverse'
         amount={stripeAmount}
         image={products.length>0?products[0].product.mediaUrl:''}
         currency='USD'
         shippingAddress={true}
         billingAddress={true}
         zipCode={true}
         token={handleCheckout}
         triggerEvent='onClick'
         stripeKey='pk_test_nXM44oRg9WnzO4laxUR0Gx8v00MuuaRDMi'
 >
      <Button 
       disabled={isCartEmpty || success}
       icon='cart'
       color='teal'
       floated='right'
       content ='Checkout'
      />
      </StripeCheckout>
    </Segment>
    </>
  )
}

export default CartSummary;
