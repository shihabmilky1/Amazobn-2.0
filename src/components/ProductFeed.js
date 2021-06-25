import Product from "./Product"

function ProductFeed({ products }) {
    return (
        <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:-mt-52 mx-auto">

            {products.slice(0, 4).map(({ id, title, price, category, description, image }) => (
                <Product
                    key={id}
                    category={category}
                    description={description}
                    title={title}
                    price={price}
                    image={image}
                />

            ))}
            <img src="https://links.papareact.com/dyz" alt="" className="md:col-span-full" />

            <div className="md:col-span-2">
                {products.slice(4, 5).map(({ id, title, price, category, description, image }) => (
                    <Product
                        key={id}
                        category={category}
                        description={description}
                        title={title}
                        price={price}
                        image={image}
                    />

                ))}
            </div>
            {products.slice(5, products.length).map(({ id, title, price, category, description, image }) => (
                <Product
                    key={id}
                    category={category}
                    description={description}
                    title={title}
                    price={price}
                    image={image}
                />
            ))}
        </div>
    )
}

export default ProductFeed
