import Stats from "@/app/(frontend)/(dashboard)/(statistics)/Stats"

import { mockStatistics } from "@/lib/mock-data"

export default function Statistics() {

    return (
        <div className="container mx-auto my-8">
            <Stats stats={mockStatistics} />
        </div>
    )
}
