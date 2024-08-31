import LoginForm from './LoginForm';

export default function Login() {
	return (
		<div className="flex-[2_1_auto] min-h-[70%] flex flex-col justify-center items-center gap-12">
			<p className="text-3xl font-semibold">Log In</p>
			<LoginForm />
		</div>
	);
}
