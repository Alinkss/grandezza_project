export type Assortment = {
	pets: Pet[];
	categories: Category[];
	products: Product[];
};

export type Pet = {
	id: number;
	type: string;
	name: string;
	price: string;
	description: string;
	images: string;
	category_id: number;
	avaible: boolean;
	gender_id: number;
	fur_id: number | null;
	color_id: number | null;
	coat_id: number;
	breed_id: number;
	size_id: number | null;
};

export type Category = {
	id: number;
	name: string;
};

export type Product = {
	id: number;
	category_id: number;
	name: string;
	avaible: boolean;
	stock: number;
	price: string;
	description: string;
	image: string;
};
