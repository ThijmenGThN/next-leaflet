import { Link } from "@/locales/navigation"
import { useTranslations } from "next-intl"

export default function Page() {
    const t = useTranslations()

    return (
        <>
            <Link href="/login">Login</Link>
        </>
    )
}
