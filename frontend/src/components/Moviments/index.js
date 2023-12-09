import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowAltCircleUp, faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';

export default function Moviments({ data, name, fromUser }) {
    const [showValue, setShowValue] = useState(true)

    const formatDate = (dateString) => {
        const parsedDate = parseISO(dateString);
        return format(parsedDate, 'dd MMM', { locale: pt });
    };

    return (

        <TouchableOpacity style={styles.container} onPress={() => setShowValue(!showValue)}>

            <View style={styles.content}>

                <View style={styles.areaButton}>
                    {fromUser !== name ?
                        <FontAwesomeIcon icon={faArrowAltCircleUp} style={styles.icon} size={24} color="#2ecc71" /> :
                        <FontAwesomeIcon icon={faArrowAltCircleDown} style={styles.icon} size={24} color="gray" />
                    }
                </View>

                <View style={styles.info}>
                    <Text style={styles.label}>{fromUser === name ? data.toUser.name : fromUser}</Text>
                    <Text style={styles.date}>{formatDate(data.created_at)}</Text>
                </View>
                <Text
                    style={fromUser !== name ? styles.value : styles.expences}>
                    {fromUser !== name ? `R$${data.amount}` : `R$-${data.amount}`}
                </Text>

            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        marginBottom: 7,
        borderBottomWidth: 0.5,
        borderBottomColor: "#dadada",
    },
    content: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        marginTop: 2,
        marginBottom: 8
    },
    date: {
        color: "gray",
        fontWeight: "bold",
        textTransform: 'uppercase'
    },
    label: {
        fontWeight: "bold",
        fontSize: 16,
        textTransform: 'capitalize'
    },
    value: {
        fontSize: 16,
        color: "#2ecc71",
        fontWeight: "bold"
    },
    expences: {
        fontSize: 16,
        color: "gray",
        fontWeight: "bold"
    },
    structure: {
        marginTop: 5,
        width: 80,
        height: 10,
        backgroundColor: "#dadada",
        borderRadius: 8
    },
    areaButton: {
        backgroundColor: "#ecf0f1",
        height: 50,
        width: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    info: {
        position: 'absolute',
        left: 80
    }
})