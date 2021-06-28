import Header from "../components/Header";
import Image from 'next/image'
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../slices/basketSlice";
import CheckoutProducts from "../components/CheckoutProducts";
import Currency from 'react-currency-formatter'
import { useSession } from "next-auth/client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import toast from 'react-hot-toast';


const stripePromise = loadStripe(process.env.stripe_public_key)


function Checkout() {
    const items = useSelector(selectItems)
    const total = useSelector(selectTotal)
    const [session] = useSession()

    const createCheckoutSession = async () => {
        const stripe = await stripePromise;

        //Call the backend to create the checkout session
        const checkoutSession = await axios.post('/api/create-checkout-session', {
            items: items,
            email: session.user.email,
        });

        //redirect users
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id,
        });

        if (result.error) {
            alert(result.error.message)
        }
        if (result.success) {
            alert(result.success.message)
        }

    }

    return (
        <div className="bg-gray-100">
            <Header />
            <main className="lg:flex max-w-screen-2xl mx-auto">
                {/* Left */}
                <div className="flex-grow m-5 shadow-sm">
                    <Image
                        src='https://links.papareact.com/ikj'
                        width={1220}
                        height={250}
                        objectFit="contain"
                    />

                    <div className="flex flex-col p-5 space-y-10 bg-white">
                        <h1 className="text-3xl pb-4 border-b">
                            {items.length === 0 ? 'You Basket is empty' : 'Your Shopping Basket'}
                        </h1>

                        {items.map((item, i) => (
                            <CheckoutProducts
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                category={item.category}
                                description={item.description}
                                image={item.image}
                                rating={item.rating}
                                hasPrime={item.hasPrime}
                            />
                        ))}

                    </div>

                </div>



                {/* Right */}
                <div className="flex flex-col bg-white p-10 shadow-md">
                    {items.length > 0 && (
                        <>
                            <h2 className="whitespace-nowrap">
                                Subtotal ({items.length} items) :
                                <span className="font-bold">
                                    <Currency quantity={total} />
                                </span>
                            </h2>


                            <button
                                role="link"
                                onClick={createCheckoutSession}
                                disabled={!session}
                                className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
                                {!session ? 'Sign in to checkout' : 'Proceed to checkout'}
                            </button>
                        </>

                    )}
                </div>
            </main>
        </div>
    )
}

export default Checkout
