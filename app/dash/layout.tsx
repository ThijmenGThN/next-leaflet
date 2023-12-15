import Shell from "@/components/dash/Shell"

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <Shell>
            {children}
        </Shell>
    )
}
