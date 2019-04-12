
import { Text ,Container} from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PetCard from '../components/PetCard';

export default class MyPet extends Component {
    render() {
        return (
            <Container style={styles.container}>
                <PetCard></PetCard>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
})
