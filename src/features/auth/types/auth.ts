export interface LoginFormData {
	email: string;
	password: string;
}

export interface RegisterFormData {
	email: string;
	password: string;
	confirmPassword: string;
	firstname: string;
	lastname: string;
}

export interface ForgotPasswordFormData {
	email: string;
}

export interface ResetPasswordFormData {
	password: string;
	confirmPassword: string;
}

export interface AuthResponse {
	success: boolean;
	user?: any;
	message?: string;
}

export interface AuthError {
	message: string;
	field?: string;
}