import { NativeModules } from 'react-native';
const { LibMavlinkConnect } = NativeModules;

// Export the functions from the native module
export const telemInit = async (): Promise<string> => {

 try {
 const result = await LibMavlinkConnect.telemInit();
 return result;
    }
     catch (error) {
      if (error instanceof Error) {
        throw new Error("Error initializing telemetry: " + error.message);
      } else {
        throw new Error("Error initializing telemetry: " + String(error));
      }

 }

};



export const getMavlinkDataJson = async (): Promise<string> => {

 try {

 const result = await LibMavlinkConnect.getMavlinkDataJson();

 return result;

 } catch (error) {

 if (error instanceof Error) {

 throw new Error("Error fetching Mavlink data: " + error.message);

 } else {

 throw new Error("Error fetching Mavlink data: " + String(error));

 }

 }

};



export const sendGuidedCommand = async (command: string): Promise<string> => {

 try {

 const result = await LibMavlinkConnect.sendGuidedCommand(command);

 return result;

 } catch (error) {

 if (error instanceof Error) {

 throw new Error("Error sending guided command: " + error.message);

 } else {

 throw new Error("Error sending guided command: " + String(error));

 }

 }

};