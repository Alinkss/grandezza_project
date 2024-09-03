export default function PageContent() {
	return (
		<>
			{/* {isOpenSuccessWindow && (
				<ShowSuccessNotification successText="You have successfully added this item to your cart" />
			)} */}

			<div className="pt-6">
				<Breadcrumb productTitle={productData.title} />
				<PhotoCarousel photoIds={productData.photoIds} />

				<div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
					<Title title={productData.title} />
					<Option
						productPrice={productData.price}
						commentsAmount={productComments.length}
						handleClickBuyButton={handleClickBuyButton}
					/>
					<Details productDescription={productData.description} />
					<Comments
						productComments={productComments}
						sendCommentToServer={sendCommentToServer}
					/>
				</div>
			</div>
		</>
	);
}
