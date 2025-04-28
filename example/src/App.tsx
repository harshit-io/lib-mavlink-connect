import React, { useEffect, useState } from 'react';
import { View, Text, Button, useColorScheme } from 'react-native';
// Assuming your index.tsx is in a folder called 'lib-mavlink-connect'
import { telemInit, getMavlinkDataJson, sendGuidedCommand } from './../../src/index';

const MavlinkComponent: React.FC = () => {
  const [mavlinkData, setMavlinkData] = useState<string>('Fetching...');
  const [isTelemInitialized, setIsTelemInitialized] = useState<boolean>(false);

  const colorScheme = useColorScheme();  // Detects whether the device is in light or dark mode

  useEffect(() => {
    const initializeTelemetry = async () => {
      try {
        const result = await telemInit();  // Initialize MAVLink telemetry
        console.log("Telemetry Initialized:", result);
        setIsTelemInitialized(true);
      } catch (error) {
        console.error("Error initializing telemetry:", error);
      }
    };

    const fetchMavlinkData = async () => {
      try {
        const data = await getMavlinkDataJson();  // Fetch MAVLink data
        setMavlinkData(data);
        console.log("MAVLink Data:", data);
      } catch (error) {
        console.error("Error fetching MAVLink data:", error);
      }
    };

    initializeTelemetry(); // Initialize telemetry when the component mounts

    // Start fetching MAVLink data after telemetry is initialized
    if (isTelemInitialized) {
      const dataInterval = setInterval(() => {
        fetchMavlinkData();
      }, 1000);  // Fetch data every 1 second

      // Clear the interval when the component unmounts
      return () => clearInterval(dataInterval);
    }
  }, [isTelemInitialized]); // Re-run effect when telemetry is initialized

  const handleSendGuidedCommand = () => {
    sendGuidedCommand("TAKEOFF")
      .then((response) => {
        console.log("Guided Command Response:", response);
      })
      .catch((error) => {
        console.error("Error sending guided command:", error);
      });
  };

  // Define styles based on color scheme (light or dark)
  const styles = {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colorScheme === 'dark' ? '#121212' : '#FFFFFF',
      padding: 20,
    },
    text: {
      color: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
      fontSize: 16,
    },
    title: {
      color: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
      fontSize: 18,
      fontWeight: 'bold',
    },
    button: {
      backgroundColor: colorScheme === 'dark' ? '#6200EE' : '#3700B3',
      color: colorScheme === 'dark' ? '#FFFFFF' : '#FFFFFF',
      marginTop: 20,
      padding: 10,
      borderRadius: 5,
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native MAVLink Library</Text>
      <Text style={styles.text}>MAVLink Data:</Text>
      <Text style={styles.text}>{mavlinkData}</Text>
      <Button
        title="Send Guided Command"
        onPress={handleSendGuidedCommand}
        color={styles.button.backgroundColor}  // Set button color based on theme
      />
    </View>
  );
};

export default MavlinkComponent;
