interface PageContainerProps {
	children: React.ReactNode;
	maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export function PageContainer({ children, maxWidth = "2xl" }: PageContainerProps) {
	const maxWidthClasses = {
		sm: "max-w-sm",
		md: "max-w-md",
		lg: "max-w-lg",
		xl: "max-w-xl",
		"2xl": "max-w-2xl",
		full: "max-w-full"
	};

	return (
		<div className="min-h-screen bg-background">
			<div className={`mx-auto px-6 py-8 ${maxWidthClasses[maxWidth]}`}>
				{children}
			</div>
		</div>
	);
}