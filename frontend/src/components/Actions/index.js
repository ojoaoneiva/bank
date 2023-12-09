import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFolder, faTags, faCreditCard, faChartLine, faCog } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from '@react-navigation/native';

export default function Actions({ name, id, email }) {
    const navigation = useNavigation();

    const handleTransfer = () => {
        navigation.navigate('Transfer', { screen: 'TransferAmountScreen' });
    }

    const handleIncomings = () => {
        navigation.navigate('History', { type: 'incomings' });
    }

    const handleExpenses = () => {
        navigation.navigate('History', { type: 'expenses' });
    }
    const handleProfile = () => {
        navigation.navigate('Profile', { name, id, email });
    };

    const handleAds0 = () => {
        navigation.navigate('Advertises', { type: '0' });
      }

    return (
        <ScrollView style={styles.container} horizontal={true} showsHorizontalScrollIndicator={false}>

            <TouchableOpacity style={styles.actionButton} onPress={handleIncomings}>
                <View style={styles.areaButton}>
                    <FontAwesomeIcon icon={faFolder} size={26} style={styles.actionButton2} color="#000" />
                </View>
                <Text style={styles.labelButton}>Incomings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={handleExpenses}>
                <View style={styles.areaButton}>
                    <FontAwesomeIcon icon={faTags} size={26} color="#000" />
                </View>
                <Text style={styles.labelButton}>Expenses</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={handleTransfer}>
                <View style={styles.areaButton}>
                    <FontAwesomeIcon icon={faCreditCard} size={26} color="#000" />
                </View>
                <Text style={styles.labelButton}>Transfer</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={handleAds0}>
                <View style={styles.areaButton}>
                <FontAwesomeIcon icon={faChartLine} size={26} color="#000" />
                </View>
                <Text style={styles.labelButton}>Invest</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={handleProfile}>
                <View style={styles.areaButton}>
                    <FontAwesomeIcon icon={faCog} size={26} color="#000" />
                </View>
                <Text style={styles.labelButton}>Seetings</Text>

            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        maxHeight: 300,
        marginBottom: 14,
        marginTop: 18,
        paddingEnd: 14,
        paddingStart: 14
    },
    actionButton: {
        alignItems: "center",
        marginRight: 32,
    },
    actionButton2: {
        color: 'none',
    },
    areaButton: {
        backgroundColor: "#ecf0f1",
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    labelButton: {
        marginTop: 4,
        textAlign: "center",
        fontWeight: "bold",
    }
});