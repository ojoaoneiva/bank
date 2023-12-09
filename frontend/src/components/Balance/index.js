import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Balance({ saldo, showValue }) {
    return (
        <View style={styles.container}>

            <View style={styles.item}>
                <Text style={styles.itemTitle}>Balance</Text>
                {showValue ?
                    <View style={styles.content}>
                        <Text style={styles.currencySymbol}>R$</Text>
                        <Text style={styles.balance}>{saldo}</Text>
                    </View> :
                    <View style={styles.content}>
                        <View style={styles.structure}></View>
                    </View>}

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingStart: 18,
        paddingEnd: 18,
        marginTop: -24,
        marginStart: 14,
        marginEnd: 14,
        borderRadius: 4,
        paddingTop: 22,
        paddingBottom: 22,
        zIndex: 99
    },
    itemTitle: {
        fontSize: 20,
        color: "black",
    },
    content: {
        flexDirection: "row",
        alignItems: "center"
    },
    currencySymbol: {
        color: "#dadada",
        marginRight: 6
    },
    balance: {
        fontSize: 22,
    },
    expences: {
        fontSize: 22,
        color: "#e74e3c",
    },
    structure: {
        marginTop: 10,
        marginBottom: 9,
        width: 80,
        height: 10,
        backgroundColor: "#dadada",
        borderRadius: 8
    }
})