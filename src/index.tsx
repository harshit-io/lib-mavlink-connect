import { NativeModules } from 'react-native';

const { LibMavlinkConnect } = NativeModules;

if (!LibMavlinkConnect) {
  throw new Error('LibMavlinkConnect native module is not available. Make sure react-native-lib-mavlink-connect is properly installed.');
}

/**
 * Initializes the telemetry connection
 */

export function initTelemetry(): Promise<string> {
  return LibMavlinkConnect.telemInit();  // Make sure this matches the Kotlin method name
}

/**
 * Gets MAVLink data in JSON format
 */
export function getMavlinkData(): Promise<string> {
  return LibMavlinkConnect.getMavlinkDataJson();
}

/**
 * Sends a guided command to the drone
 * @param command - The command to send (e.g., "TAKEOFF")
 */
export function sendGuidedCommand(command: string): Promise<string> {
  return LibMavlinkConnect.sendGuidedCommand(command);
}

/**
 * Stops the telemetry connection
 */
export function stopTelemetry(): Promise<string> {
  return LibMavlinkConnect.telemStop();
}

// You can also export additional utilities, types, or constants
export const MavlinkCommands = {
  TAKEOFF: "TAKEOFF",
  LAND: "LAND",
  RTL: "RTL",
  // Add other commands as needed
};