import ResetPasswordFlow from "@/features/auth/components/ResetPasswordFlow";

interface PageProps {
	searchParams: { token?: string };
}

export default function Page({ searchParams }: PageProps) {
	return <ResetPasswordFlow token={searchParams.token} />;
}
