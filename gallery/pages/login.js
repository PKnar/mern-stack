import {Button,Form,Icon,Message,Segment} from 'semantic-ui-react'
import Link from 'next/link'
import React from 'react';
import catchErrors from '../utils/catchErrors'
import baseUrl from '../utils/baseUrl';
import axios from 'axios'
import {handleLogin} from '../utils/auth'

const INITIAL_USER={
  email:'',
  password:''
}

function Signup() {

  const[user,setUser]=React.useState(INITIAL_USER)
  const [disabled,setDisabled]=React.useState(true)
  const [loading,setLoading]=React.useState(false)
  const [error,setError] = React.useState('')
  React.useEffect(()=>{
  const isUser=Object.values(user).every(el=>Boolean(el))
  isUser? setDisabled(false):setDisabled(true)
},[user])

  function handleChange(event){
  const {name,value}=event.target
   setUser(prevState => ({...prevState,[name]:value}))

  }

async function handleSubmit(e){
  e.preventDefault()
  try{
     setLoading(true)
     setError('')
     const url =`${baseUrl}/api/login`
     const payload= {...user}
     const response = await axios.post(url,payload)
     handleLogin(response.data)
  }catch(error){
    catchErrors(error,setError)
  }finally{
   setLoading(false)
  }
}


  return <>
    <Message 
    attached
    icon='privacy'
    header='Welcome back!'
    content = 'Login with email and password'
    color='blue'
    />
    <Form error={Boolean(error)} onSubmit={handleSubmit} loading={loading}>
      <Segment>
        <Message 
        error
        header='Oops!'
        content={error}
        />
         <Form.Input
            fluid
            icon='envelope'
            iconPosition='left'
            label='Email'
            placeholder='Email'
            name='email'
            onChange={handleChange}
            value={user.email}
            type='email'
        />
           <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            label='Password'
            placeholder='Password'
            name='password'
            onChange={handleChange}
            value={user.password}
            type='password'
        />
        <Button 
         icon ='sign in'
         type='submit'
         color='orange'
         content='Login'
         disabled={disabled || loading}
        />
      </Segment>
    </Form>
    <Message attached='bottom' warning>
      <Icon name='help'/>
      New user?{''}
      <Link href='/signup' >
        <a>Signup here</a>
      </Link>{''} instead.
    </Message>
  </>;
}

export default Signup;
