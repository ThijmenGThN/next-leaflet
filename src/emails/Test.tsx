import React from 'react'
import { Body, Html, Container, Tailwind, Text } from '@react-email/components'

export default function Email() {
    return (
        <Html>
            <Tailwind
                config={{
                    plugins: [require('@tailwindcss/forms')],
                    theme: {
                        extend: {
                            colors: {
                                "primary": '#11999e',
                                "primary-dark": '#0e7d81'
                            }
                        }
                    }
                }}
            >
                <Body className='bg-white font-sans'>
                    <Container>
                        <Text>
                            Test
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}
