
export default async function OrderDetailPage({ params }) {
    const { orderId } = params;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`,
        { cache: "no-store" }
    );
    const order = await res.json();

    return <>hi</>;
}
