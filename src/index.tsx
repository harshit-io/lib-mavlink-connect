import { NativeModules } from 'react-native';

const { LibMavlinkConnect } = NativeModules;

// Export the functions from the native module
export const telemInit = async (): Promise<string> => {
  try {
    const result = await LibMavlinkConnect.telemInit();
    return result;
  } catch (error) {
    throw new Error("Error initializing telemetry: " + error.message);
  }
};

export const getMavlinkDataJson = async (): Promise<string> => {
  try {
    const result = await LibMavlinkConnect.getMavlinkDataJson();
    return result;
  } catch (error) {
    throw new Error("Error fetching Mavlink data: " + error.message);
  }
};

export const sendGuidedCommand = async (command: string): Promise<string> => {
  try {
    const result = await LibMavlinkConnect.sendGuidedCommand(command);
    return result;
  } catch (error) {
    throw new Error("Error sending guided command: " + error.message);
  }
};
