import Header from "../components/Header"
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
function orders() {
    const router = useRouter()
    const [session] = useSession()
    return (
        <div>
            <Header />
            <main className="max-w-screen-2xl mx-auto p-10">
                <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">Your Orders</h1>

                {session ? (
                    <h2>X Orders</h2>
                ) : <h2>Please sign In see yours orders</h2>}









            </main>
        </div>
    )
}

export default orders
