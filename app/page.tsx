
import Hero from "@/components/Hero"

import pb from '@/helpers/pocketbase'

import Client from "./client"

export default async function Page() {

    const posts = await pb.collection('posts').getFullList()

    console.log(posts)

    return (
        <>
            <Hero />

            <Client />
        </>
    )

}
