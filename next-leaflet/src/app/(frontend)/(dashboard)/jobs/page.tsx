import Tabs from "./JobsTab"

import { getJobs } from "@/actions/jobs"

export default async function Jobs() {

    const jobs = await getJobs()

    return (
        <div className="container mx-auto my-8">
            <Tabs jobs={jobs} />
        </div>
    )
}
