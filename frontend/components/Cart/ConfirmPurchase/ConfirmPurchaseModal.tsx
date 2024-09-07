import { paymentMethods } from '@/assets/paymentMethods';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { Formik } from 'formik';

interface Props {
	handleCloseConfirmPurchaseModal: () => void;
}

export default function ConfirmPurchaseModal({
	handleCloseConfirmPurchaseModal,
}: Props) {
	return (
		<div className="w-screen h-screen bg-gray-600/80 flex justify-center items-center text-white">
			<div className="bg-gray-700 rounded-xl p-10 flex flex-col gap-4">
				<div className="flex flex-row justify-between items-center">
					<p className="font-semibold text-xl">Confirm Purchase</p>
					<button
						className="text-3xl"
						onClick={handleCloseConfirmPurchaseModal}>
						&times;
					</button>
				</div>
				<div className="flex flex-col gap-8">
					<Formik
						initialValues={{
							fullName: '',
							city: '',
							address: '',
							postalCode: '',
							paymentMethod: '',
						}}
						validationSchema={null}
						onSubmit={(values, { setSubmitting }) => {
							console.log('start anim');
						}}>
						{({
							values,
							errors,
							touched,
							handleChange,
							handleBlur,
							handleSubmit,
							isSubmitting,
						}) => (
							<form className="flex flex-col gap-6" onSubmit={handleSubmit}>
								<div className="flex flex-col gap-4">
									<div className="flex flex-col gap-1">
										<label htmlFor="fullName" className="text-sm">
											Enter your full name
										</label>
										<input
											className="min-w-[20rem] block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-[#c9c9c9]"
											type="text"
											name="fullName"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.fullName}
										/>
										{errors.fullName && touched.fullName && errors.fullName}
									</div>
									<div className="flex flex-col gap-1">
										<label htmlFor="city" className="text-sm">
											Enter your city
										</label>
										<input
											className="min-w-[20rem] block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-[#c9c9c9]"
											type="text"
											name="city"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.city}
										/>
										{errors.city && touched.city && errors.city}
									</div>
									<div className="flex flex-col gap-1">
										<label htmlFor="address" className="text-sm">
											Enter your address
										</label>
										<div className="flex flex-col gap-2">
											<input
												className="min-w-[20rem] block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-[#c9c9c9]"
												type="text"
												name="address"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.address}
											/>
											{errors.address && touched.address && errors.address}
										</div>
									</div>
									<div className="flex flex-col gap-1">
										<label htmlFor="postalCode" className="text-sm">
											Enter your postal code
										</label>
										<div className="flex flex-col gap-2">
											<input
												className="min-w-[20rem] block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-[#c9c9c9]"
												type="number"
												name="postalCode"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.postalCode}
											/>
											{errors.postalCode &&
												touched.postalCode &&
												errors.postalCode}
										</div>
									</div>
									<div className="flex flex-col gap-1">
										<label htmlFor="paymentMethod" className="text-sm">
											Choose payment method
										</label>
										<div className="flex flex-col">
											<Autocomplete
												name="paymentMethod"
												onChange={handleChange}
												aria-label="paymentMethodAutocomplete"
												placeholder="Choose payment method"
												variant="underlined"
												defaultItems={paymentMethods}
												classNames={{
													clearButton: 'hidden',
													base: 'after:bg-gray-200',
													listboxWrapper: 'bg-gray-800 rounded-lg px-1',
													listbox: 'hover:bg-gray-800',
												}}>
												{(item) => (
													<AutocompleteItem
														className="text-white"
														key={item.value}>
														{item.label}
													</AutocompleteItem>
												)}
											</Autocomplete>
											<div className="m-auto w-[95%] h-[2px] bg-gray-500" />
										</div>
									</div>
									<button
										className="mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
										type="submit"
										disabled={isSubmitting}>
										Confirm
									</button>
								</div>
							</form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
}
