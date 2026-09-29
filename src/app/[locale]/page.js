

import HomeElectronics from "@/app/[locale]/home/electronics/page";
import ProductService from "@/services/product.service"
import CategoryService from "@/services/category.service"

const Home = async () => {
	const products = await ProductService.getProductAll()
	const productsBestseller = await ProductService.getProductBestseller()
	const productsNewest = await ProductService.getProductNewest()
	const categories = await CategoryService.getCategoryAll()
	return (
		<HomeElectronics
			products={products}
			productsBestseller={productsBestseller}
			productsNewest={productsNewest}
			categories={categories} />
	);
}

export default Home;
