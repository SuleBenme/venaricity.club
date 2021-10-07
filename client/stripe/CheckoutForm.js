import React, {useState} from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import CardSection from './CardSection';
import {prueba, confirmPayment} from './../tournament/api-tournament'
import auth from './../auth/auth-helper'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function CheckoutForm(props) {
  const jwt = auth.isAuthenticated()
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProccessing] = useState(false)

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    
    if(!props.tournamentId || !props.values || !props.userId){
      props.showError("You have to sign in!")
      return;
    }

    setProccessing(true)

    const payload = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)
    })

    if(payload.error){
      props.showError(data.error)
      return
    }

    console.log(payload)

    const abortController = new AbortController()
    const signal = abortController.signal

    prueba({t: jwt.token}, signal).then( async (data) => {
        if (data && data.error) {
          props.showError(data.error)
        } else {
          const client_secret = data.client_secret
          const payment_id = data.payment_id
          const result = await stripe.confirmCardPayment(client_secret, {
            payment_method: payload.paymentMethod.id
            }
          );
      
          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            console.log(result.error.message);
          } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
                console.log("Payment succeeded")

                const data = {
                  tournamentId: props.tournamentId,
                  payment_id: payment_id, 
                  payment_type: 'stripe' ,
                  participant: {teamName: props.values.teamName , byUser: props.userId}
                }

                confirmPayment({t: jwt.token}, data).then( async (data) => {
                    if (data && data.error) {
                        console.log(data.error)
                        props.showError(data.error)
                    } else {
                        console.log(data)
                        setProccessing(false)
                        props.closePayment(data)
                    }
                })
              // Show a success message to your customer
              // There's a risk of the customer closing the window before callback
              // execution. Set up a webhook or plugin to listen for the
              // payment_intent.succeeded event that handles any business critical
              // post-payment actions.
            }
          }
        }
    })

  };

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <Button type="submit" color="secondary" variant="contained" disabled={processing || !stripe}>
          {processing && <div><CircularProgress size={14} />Loading</div>}
          {!processing && 'Confirm payment'}
      </Button>
    </form>
  );
}