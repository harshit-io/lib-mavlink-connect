import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { initTelemetry, getMavlinkData } from 'react-native-lib-mavlink-connect';

const MavlinkDataComponent: React.FC = () => {
    const [mavlinkData, setMavlinkData] = useState<string>("Fetching...");

    useEffect(() => {
        let mavlinkInterval: NodeJS.Timeout | null = null;

        const startMavlinkDataFetching = async () => {
            try {
                // Initialize MAVLink connection
                await initTelemetry();
                console.log("MAVLink connection initialized");

                // Start fetching MAVLink data at regular intervals
                mavlinkInterval = setInterval(async () => {
                    try {
                        const mavlinkJson = await getMavlinkData();
                        setMavlinkData(mavlinkJson);
                        console.log("Fetched MAVLink data:", mavlinkJson);
                    } catch (error) {
                        console.error("Error fetching MAVLink data:", error);
                    }
                }, 1000); // Fetch data every 1 second
            } catch (error) {
                console.error("Error initializing MAVLink:", error);
            }
        };

        startMavlinkDataFetching();

        return () => {
            if (mavlinkInterval) {
                clearInterval(mavlinkInterval);
                console.log("Stopped MAVLink data fetching");
            }
        };
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>MAVLink Data:</Text>
            <Text style={styles.data}>{mavlinkData}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        margin: 8
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8
    },
    data: {
        fontSize: 14,
        fontFamily: 'monospace'
    }
});

export default MavlinkDataComponent;