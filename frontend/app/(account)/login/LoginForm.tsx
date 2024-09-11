'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FormikHelpers, FormikValues, useFormik } from 'formik';
import { loginSchema as validationSchema } from '@/assets/validationSchemas';
import axios from 'axios';
import PasswordRequirementsHint from '@/components/forms/PasswordRequirementsHint';
import ChangePasswordVisibilityButton from '@/components/forms/ChangePasswordVisibilityButton';
import { useRouter } from 'next/navigation';
import { storeJwtToken } from '@/app/store/storeUtils';

const initialValues = {
	email: '',
	password: '',
};

export default function LoginForm() {
	const router = useRouter();
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

	const onSubmit = (
		value: FormikValues,
		{ setSubmitting }: FormikHelpers<typeof initialValues>
	) => {
		setTimeout(async () => {
			const loggingUser = new FormData();
			loggingUser.append('username', value.email.split('@')[0]);
			loggingUser.append('password', value.password);

			const jwtToken = await axios
				.post(
					process.env.NEXT_PUBLIC_BASE_SERVER_URL + '/blog/login_jwt',
					loggingUser
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
						<Link href={'/signup'} tabIndex={-1}>
							Not signed up yet? Create account →
						</Link>
					</button>
				</div>
			</div>

			<button type="submit" disabled={isSubmitting} className="submitButton">
				Log In
			</button>
		</form>
	);
}
