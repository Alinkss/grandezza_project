import { object, string } from 'yup';

export const contactFormSchema = object({
	firstName: string()
		.required('First name is required')
		.max(40, 'First name must be 40 characters or less'),
	email: string().required('Email is required').email('Invalid email address'),
	typeOfHelp: string().max(400, 'Message cannot be longer than 400 characters'),
});

export const loginSchema = object({
	email: string().required('Email is required').email('Invalid email address'),
	password: string()
		.required('Password is required')
		.min(8, 'Password must be at least 8 characters long')
		.matches(
			/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/gim,
			'Password does not contain special characters'
		),
});

export const signUpSchema = object({
	firstName: string()
		.required('First Name is required')
		.min(3, 'First Name must be at least 3 characters long')
		.matches(/^[a-zA-Z]+$/gim, 'First name cannot contain special characters'),
	lastName: string()
		.required('Last Name is required')
		.min(3, 'Last Name must be at least 3 characters long')
		.matches(/^[a-zA-Z]+$/gim, 'Last name cannot contain special characters'),
	email: string().required('Email is required').email('Invalid email address'),
	password: string()
		.required('Password is required')
		.min(8, 'Password must be at least 8 characters long')
		.matches(
			/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/gim,
			'Password does not contain special characters'
		),
});

export const newCommentValidateSchema = object().shape({
	newCommentText: string()
		.required('Comment text is required!')
		.min(2, 'Comment text is too short!'),
});
