import React from 'react'
import { Header, Segment, Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

export const home = () => {
    return (
        <Container>
            <Header as='h3' block textAlign='center'>
                Exotic pet house admin
            </Header>
        </Container>
    )
}