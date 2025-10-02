export interface UpdateProfileFormData {
	firstname: string;
	lastname: string;
}

export interface UpdateProfileData extends UpdateProfileFormData {
	userId: string | number;
}