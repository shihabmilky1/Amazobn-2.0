import { StarIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Currency from 'react-currency-formatter'
import { useDispatch } from 'react-redux'
import { addToBasket, removeFromBasket } from '../slices/basketSlice'
import toast from 'react-hot-toast';

function CheckoutProducts({
    id,
    title,
    price,
    category,
    description,
    image,
    rating,
    hasPrime }) {
    const dispatch = useDispatch();
    const addItemToBasket = () => {
        const product = {
            id,
            title,
            price,
            category,
            description,
            image,
            rating,
            hasPrime
        }
        dispatch(addToBasket(product), toast.success('Successfully toasted!'))
    }
    const removeItemFromBasket = () => {
        dispatch(removeFromBasket({ id }), toast.success('Successfully toasted!'))
    }
    return (
        <div className="grid grid-cols-5">
            <Image src={image} height={200} width={200} objectFit='contain' />
            <div className="col-span-3 mx-5">
                <p>{title}</p>
                <div className="flex">
                    {Array(rating).fill().map((_, i) => (
                        <StarIcon className="text-yellow-500 h-5" />
                    ))}
                </div>
                <p className="text-xs my-2 line-clamp-3">{description}</p>
                <Currency quantity={price} className="" />

                {hasPrime && (
                    <div className="flex items-center space-x-2">
                        <img
                            loading="lazy"
                            src='https://links.papareact.com/fdw'
                            alt=""
                            className="w-12" />
                        <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
                    </div>
                )}
            </div>
            {/* ADD AND REMOVE BUTTONS */}
            <div className="flex flex-col space-y-2 my-auto justify-self-end">
                <button onClick={addItemToBasket} className="button">Add to Basket</button>
                <button onClick={removeItemFromBasket} className="button">Remove From Basket</button>
            </div>

        </div>
    )
}

export default CheckoutProducts
