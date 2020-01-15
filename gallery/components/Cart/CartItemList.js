import {Header,Segment,Button,Icon,Item,Message} from 'semantic-ui-react'
import {useRouter} from 'next/router'

function CartItemList({products,user,handleRemoveFromCart,success}) {

  const router = useRouter()
  
  function mapCartProductsToIt(products){
    return products.map(p=>({
      childKey:p.product._id,
      header:(
        <Item.Header as='a' 
         onClick={()=>router.push(`/product?_id=${p.product._id}`)}
        >
        {p.product.name}
        </Item.Header>
      ),

      image:p.product.mediaUrl,
      meta:`${p.quantity} x $${p.product.price}`,
      fluid:'true',
      extra:(
        <Button
          basic
          icon='remove'
          floated='right'
          onClick={()=>handleRemoveFromCart(p.product._id)}

        />
      )
     
    }))
  }

  if(success){
    return(
      <Message 
        success 
        header='Success!'
        content ='Your order and payment has been accepted'
        icon ='start outline'
      />
    )
  }

 if(products.length===0){
  return(
    <Segment placeholder secondary color='teal' inverted textAlign='center'>
      <Header icon>
           <Icon name = 'shopping basket'/>
           No products in your cart. Add some! 
      </Header>
        <div>
          {user?(
            <Button color='orange'
              onClick={()=>router.push('/')}
            >
              View Products
            </Button>
          ):(
            <Button color='blue'
            onClick={()=>router.push('/')}
            >
              Login to Add Produvts
            </Button>
          )
        
        }
        </div>

    </Segment>
  )
 }


 return <Item.Group items={mapCartProductsToIt(products)}/>
  
}

export default CartItemList;
