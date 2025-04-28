package com.libmavlinkconnect

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = LibMavlinkConnectModule.NAME)
class LibMavlinkConnectModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    companion object {
        const val NAME = "LibMavlinkConnect"
    }

    init {
        try {
            System.loadLibrary("testmavlink")
            Log.d(NAME, "Mavlink library loaded successfully")
        } catch (e: UnsatisfiedLinkError) {
            Log.e(NAME, "Failed to load mavlink library: ${e.message}")
        }
    }

    override fun getName(): String {
        return NAME
    }

    @ReactMethod
    fun telemInit(promise: Promise) {
        try {
            val result = TelemInit()
            Log.d(NAME, "Telemetry initialized: $result")
            promise.resolve(result)
        } catch (e: Exception) {
            Log.e(NAME, "Error initializing telemetry: ${e.message}")
            promise.reject("TELEMETRY_INIT_ERROR", "Error initializing telemetry: ${e.message}")
        }
    }

    @ReactMethod
    fun getMavlinkDataJson(promise: Promise) {
        try {
            val result = getMavlinkDataJson()
            Log.d(NAME, "Mavlink Data: $result")
            promise.resolve(result)
        } catch (e: Exception) {
            Log.e(NAME, "Error fetching mavlink data: ${e.message}")
            promise.reject("MAVLINK_DATA_ERROR", "Error fetching mavlink data: ${e.message}")
        }
    }

    @ReactMethod
    fun sendGuidedCommand(command: String, promise: Promise) {
        try {
            sendGuidedCommandNative(command)
            Log.d(NAME, "Guided command '$command' sent successfully.")
            promise.resolve("Guided command '$command' sent successfully.")
        } catch (e: Exception) {
            Log.e(NAME, "Error sending guided command: ${e.message}")
            promise.reject("SEND_GUIDED_COMMAND_ERROR", "Error sending guided command: ${e.message}")
        }
    }

    // ADD THIS MISSING METHOD
    fun sendEvent(eventName: String, eventData: String) {
        Log.d(NAME, "Sending event to JS: $eventName with data: $eventData")
        reactContext
            .getJSModule(RCTDeviceEventEmitter::class.java)
            .emit(eventName, eventData)
    }

    // Native method declarations
    private external fun sayHelloNative(): String
    private external fun TelemInit(): String
    private external fun getMavlinkDataJson(): String
    private external fun sendGuidedCommandNative(command: String)
}
