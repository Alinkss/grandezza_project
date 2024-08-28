import * as Yup from 'yup';

export const contactFormSchema = Yup.object({
	firstName: Yup.string()
		.required('First name is required')
		.max(40, 'First name must be 40 characters or less'),
	email: Yup.string()
		.required('Email is required')
		.email('Invalid email address'),
	typeOfHelp: Yup.string().max(
		400,
		'Message cannot be longer than 400 characters'
	),
});

export const loginSchema = Yup.object({
	email: Yup.string()
		.required('Email is required')
		.email('Invalid email address'),
	password: Yup.string()
		.required('Password is required')
		.min(8, 'Password must be at least 8 characters long')
		.matches(
			/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/gim,
			'Password does not contain special characters'
		),
});

export const signUpSchema = Yup.object({
	firstName: Yup.string()
		.required('First Name is required')
		.min(3, 'First Name must be at least 3 characters long')
		.matches(/^[a-zA-Z]+$/gim, 'First name cannot contain special characters'),
	lastName: Yup.string()
		.required('Last Name is required')
		.min(3, 'Last Name must be at least 3 characters long')
		.matches(/^[a-zA-Z]+$/gim, 'Last name cannot contain special characters'),
	email: Yup.string()
		.required('Email is required')
		.email('Invalid email address'),
	password: Yup.string()
		.required('Password is required')
		.min(8, 'Password must be at least 8 characters long')
		.matches(
			/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/gim,
			'Password does not contain special characters'
		),
});
