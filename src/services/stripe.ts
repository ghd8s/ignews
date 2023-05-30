import Stripe from 'stripe'; // Importing the Stripe module

const stripeApiKey = process.env.STRIPE_API_KEY

if (!stripeApiKey) {
  throw new Error('Stripe API key is missing');
}

export const stripe = new Stripe(
  stripeApiKey, 
  {
    apiVersion: '2022-11-15',
    appInfo: {
      name: 'Ignews',
      version: '2022-11-15',
    }
  },
);
