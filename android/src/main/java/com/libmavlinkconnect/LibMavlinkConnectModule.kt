package com.libmavlinkconnect

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = LibMavlinkConnectModule.NAME)
class LibMavlinkConnectModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    companion object {
        const val NAME = "LibMavlinkConnect"
    }

    init {
        try {
            System.loadLibrary("testmavlink")  // Load the .so file
            android.util.Log.d(NAME, "mavlink library loaded successfully")
        } catch (e: UnsatisfiedLinkError) {
            android.util.Log.e(NAME, "Failed to load mavlink library: ${e.message}")
        }
    }

    override fun getName(): String {
        return NAME
    }
// Should be:
    @ReactMethod
    fun telemInit(promise: Promise) {
    try {
        val result = TelemInit()  // This calls your native C++ function
        promise.resolve(result)
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
    fun sendGuidedCommand(command: String, promise: Promise) {
        try {
            sendGuidedCommandNative(command)
            promise.resolve("Guided command sent")
        } catch (e: Exception) {
            promise.reject("ERROR", e.message)
        }
    }

    // Native method declarations
    private external fun sayHelloNative(): String
    private external fun TelemInit(): String
    private external fun getMavlinkDataJson(): String
    private external fun sendGuidedCommandNative(command: String)
}