"use client"

import pb from '@/helpers/pocketbase'

export default function Client() {

    pb.collection('products').getFullList()
        .then(records => console.log(records))
        .catch(error => { })

    return (
        <>

        </>
    )
}
