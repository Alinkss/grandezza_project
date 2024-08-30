'use client';
import { Formik, FormikHelpers, FormikValues } from 'formik';
import { contactFormSchema } from '@/assets/validationSchemas';
import axios from 'axios';

const initialValues = { firstName: '', email: '', typeOfHelp: '' };

const onSubmit = (
	values: FormikValues,
	{ setSubmitting }: FormikHelpers<typeof initialValues>
) => {
	setTimeout(async () => {
		setSubmitting(false);
		await axios.post(
			process.env.NEXT_PUBLIC_BASE_SERVER_URL + '/contact',
			values
		);
	}, 200);
};

export default function Contact() {
	return (
		<div className="bg-[#800080] w-full p-12 flex flex-col gap-8">
			<div className="w-fit relative left-[25%] text-white">
				<i>Say Hello</i>
				<p className="text-3xl font-semibold">Contact</p>
			</div>
			<Formik
				initialValues={initialValues}
				validationSchema={contactFormSchema}
				onSubmit={onSubmit}>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
				}) => (
					<form
						onSubmit={handleSubmit}
						className="flex flex-col gap-8 w-fit m-auto">
						<div className="flex flex-col gap-4 text-white">
							<div className="input-wrapper">
								<div className="flex flex-col gap-1">
									<p className="ml-2">First name</p>
									<input
										type="text"
										name="firstName"
										className="contact-input"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.firstName}
									/>
								</div>
								<p className="contact-input-error">
									{errors.firstName && touched.firstName && errors.firstName}
								</p>
							</div>

							<div className="input-wrapper">
								<div className="flex flex-col gap-1">
									<p className="ml-2">Email</p>
									<input
										type="text"
										name="email"
										className="contact-input"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.email}
									/>
								</div>
								<p className="contact-input-error">
									{errors.email && touched.email && errors.email}
								</p>
							</div>

							<div className="input-wrapper">
								<div className="flex flex-col gap-1">
									<p className="ml-2">How can we help you?</p>
									<textarea
										name="typeOfHelp"
										className="contact-input resize-none h-[150px]"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.typeOfHelp}
									/>
								</div>
								<p className="contact-input-error">
									{errors.typeOfHelp && touched.typeOfHelp && errors.typeOfHelp}
								</p>
							</div>
						</div>
						<button
							type="submit"
							disabled={isSubmitting}
							className="bg-[#edc8ea] inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
							Submit
						</button>
					</form>
				)}
			</Formik>
		</div>
	);
}
