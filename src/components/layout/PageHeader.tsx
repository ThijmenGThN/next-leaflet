interface PageHeaderProps {
	title: string;
	description?: string;
	children?: React.ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
	return (
		<div className="flex items-center justify-between mb-8">
			<div className="space-y-1">
				<h1 className="text-3xl font-bold text-foreground">{title}</h1>
				{description && (
					<p className="text-muted-foreground">{description}</p>
				)}
			</div>
			{children}
		</div>
	);
}