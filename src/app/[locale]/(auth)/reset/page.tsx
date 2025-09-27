import ResetPasswordFlow from "@/features/auth/components/ResetPasswordFlow";

interface PageProps {
	searchParams: Promise<{ token?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
	const params = await searchParams;
	return <ResetPasswordFlow token={params.token} />;
}
