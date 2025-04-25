package com.libmavlinkconnect

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class MavlinkLibraryModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    init {
        try {
            System.loadLibrary("testmavlink")  // Load libmavlink.so
            android.util.Log.d("MavlinkLibraryModule", "mavlink library loaded successfully")
        } catch (e: UnsatisfiedLinkError) {
            android.util.Log.e("MavlinkLibraryModule", "Failed to load mavlink library: ${e.message}")
        }
    }

    override fun getName(): String {
        return "example"
    }

    
    @ReactMethod
    fun sayHello(promise: Promise) {
        try {
            val result = sayHelloNative()
            promise.resolve(result)
        } catch (e: Exception) {
            promise.reject("ERROR", e.message)
        }
    }
    @ReactMethod
    fun telemInit(promise: Promise) {
        try {
            TelemInit()  // Call native function
            promise.resolve("connection built")
        } catch (e: Exception) {
            promise.reject("ERROR", e.message)
        }
    }
    @ReactMethod
    fun getMavlinkDataJson(promise: Promise) {
        try {
            val result = getMavlinkDataJson()
            promise.resolve(result)
        } catch (e: Exception) {
            promise.reject("ERROR", e.message)
        }
    }

    @ReactMethod
    fun sendGuidedCommand(promise: Promise) {
        try {
            sendGuidedCommandNative("TAKEOFF")
            promise.resolve("Guided command sent")
        } catch (e: Exception) {
            promise.reject("ERROR", e.message)
        }
    }
    private external fun sayHelloNative(): String
    private external fun sendGuidedCommandNative(command: String)
    private external fun TelemInit(): String
    private external fun getMavlinkDataJson(): String

}