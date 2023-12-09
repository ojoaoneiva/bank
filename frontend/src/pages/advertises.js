import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import image0 from '../../assets/93426714.png';
import image1 from '../../assets/9342671.png';
import image2 from '../../assets/93426712.png';
import image3 from '../../assets/93426715.png';

const Advertises = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [ad, setAd] = useState([])

    const handleGoBack = () => {
        navigation.goBack();
    };

    const ads0 = {
        title: "Grow Your Wealth, Unleash Financial Freedom",
        content: "Embark on a journey to financial prosperity. Our investment opportunities pave the way to unprecedented growth. Witness your money work for you, and unlock exclusive benefits as you navigate the path to financial freedom.",
        image: image0
    };
    
    const ads1 = {
        title: "Increase Your Credit Limit While Your Money Grows",
        content: "Discover the benefits of a higher credit limit. Invite friends to join and unveil exclusive emblems together.",
        image: image1
    };
    const ads2 = {
        title: "Travel with Confidence - Bank Explorer Card",
        content: "Introducing the Bank Explorer Card. Your key to worry-free travel, offering travel insurance, airport lounge access, and more. Apply now and explore the world.",
        image: image2
    };

    const ads3 = {
        title: "Embrace Cashback Delights with Bank Rewards",
        content: "Get more from your purchases with Bank Rewards. Enjoy cashback on every transaction, exclusive discounts, and personalized offers. Start saving with every swipe.",
        image: image3
    };

    const chooseAd = () => {
        if (route.params.type === '0') {
            setAd(ads0);
        } else if (route.params.type === '1') {
            setAd(ads1);
        } else if (route.params.type === '2') {
            setAd(ads2);
        } else {
            setAd(ads3);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            chooseAd();
        }, [])
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton}>
                <Text style={styles.close} onPress={handleGoBack}>{"<"}</Text>
            </TouchableOpacity>

            <View style={styles.ad}>
                <Text style={styles.title}>{ad.title}</Text>
                <Text style={styles.content}>{ad.content}</Text>
                {ad.image && <Image style={styles.image} source={ad.image} />}
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderBottomWidth: 0.5,
        borderBottomColor: "#dadada",
        padding: 25,
        backgroundColor: 'rgb(250, 195, 215)'
    },
    ad: {
        paddingTop: '30%',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    image: {
        width: '100%',
        height: 250,
        marginTop: '40%'
    },
    content: {
        fontSize: 18,
        marginTop: 15
    },
    close: {
        position: 'absolute',
        top: 20,
        left: 4,
        fontSize: 36,
        padding: 10,
        zIndex: 2,
    }
});

export default Advertises;