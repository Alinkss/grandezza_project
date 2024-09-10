'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FormikHelpers, FormikValues, useFormik } from 'formik';
import { signUpSchema as validationSchema } from '@/assets/validationSchemas';
import PasswordRequirementsHint from '@/components/forms/PasswordRequirementsHint';
import ChangePasswordVisibilityButton from '@/components/forms/ChangePasswordVisibilityButton';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { storeJwtToken } from '@/app/store/storeUtils';

const initialValues = {
	email: '',
	password: '',
	firstName: '',
	lastName: '',
};

export default function SignUpForm() {
	const router = useRouter();
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

	const onSubmit = (
		value: typeof initialValues,
		{ setSubmitting }: FormikHelpers<typeof initialValues>
	) => {
		setTimeout(async () => {
			const newUser = new FormData();

			newUser.append('id', uuidv4());
			newUser.append('username', value.email.split('@')[0]);
			newUser.append('first_name', value.firstName);
			newUser.append('last_name', value.lastName);
			newUser.append('email', value.email);
			newUser.append('date_joined', new Date().toISOString());
			newUser.append('telephone', '+380000000000');
			newUser.append('password1', value.password);
			newUser.append('password2', value.password);

			const jwtToken = await axios
				.post(
					process.env.NEXT_PUBLIC_BASE_SERVER_URL + '/blogregistration',
					newUser
				)
				.then((res) => res.data.token);

			storeJwtToken(jwtToken);
			setSubmitting(false);
			router.push('/');
			router.refresh();
		}, 200);
	};

	const {
		values,
		errors,
		touched,
		handleSubmit,
		handleBlur,
		handleChange,
		isSubmitting,
	} = useFormik({
		initialValues,
		validationSchema,
		onSubmit,
	});

	return (
		<form
			className="flex flex-col gap-8 w-1/4 max-sm:w-4/5"
			onSubmit={handleSubmit}>
			<div className="flex flex-col gap-4">
				<div className="flex flex-row items-center justify-between gap-12">
					<div className="inputWrapper max-w-[42%]">
						<div className="placeholderWrapper">
							<label htmlFor="firstName" className="placeholder">
								First Name
							</label>
							{errors.firstName && touched.firstName && (
								<p className="error text-right" style={{ fontSize: '12px' }}>
									{errors.firstName}
								</p>
							)}
						</div>
						<input
							id="firstName"
							name="firstName"
							type="text"
							className="input"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.firstName}
						/>
					</div>

					<div className="inputWrapper max-w-[42%]">
						<div className="placeholderWrapper">
							<label htmlFor="lastName" className="placeholder">
								Last Name
							</label>
							{errors.lastName && touched.lastName && (
								<p className="error text-right" style={{ fontSize: '12px' }}>
									{errors.lastName}
								</p>
							)}
						</div>
						<input
							id="lastName"
							name="lastName"
							type="text"
							className="input"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.lastName}
						/>
					</div>
				</div>

				<div className="inputWrapper">
					<div className="placeholderWrapper">
						<label htmlFor="email" className="placeholder">
							Email
						</label>
						{errors.email && touched.email && (
							<p className="error">{errors.email}</p>
						)}
					</div>
					<input
						id="email"
						name="email"
						type="email"
						className="input"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.email}
					/>
				</div>

				<div className="inputWrapper">
					<div className="placeholderWrapper">
						<div className="flex flex-row gap-[0.2rem]">
							<label htmlFor="password" className="placeholder">
								Password
							</label>
							<PasswordRequirementsHint />
						</div>
						{errors.password && touched.password && (
							<p className="error">{errors.password}</p>
						)}
					</div>
					<div className="flex flex-row gap-2">
						<input
							id="password"
							name="password"
							type={isPasswordVisible ? 'text' : 'password'}
							className="input"
							style={{ width: '100%' }}
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.password}
						/>
						<ChangePasswordVisibilityButton
							isPasswordVisible={isPasswordVisible}
							setIsPasswordVisible={setIsPasswordVisible}
						/>
					</div>
				</div>

				<div className="flex flex-row justify-end">
					<button
						className="text-sm text-gray-400 transition hover:text-black"
						tabIndex={-1}>
						<Link href={'/login'} tabIndex={-1}>
							Already have account? Log in →
						</Link>
					</button>
				</div>
			</div>

			<button type="submit" disabled={isSubmitting} className="submitButton">
				Sign up
			</button>
		</form>
	);
}
