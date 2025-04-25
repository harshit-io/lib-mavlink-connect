#include <jni.h>
#include "react-native-lib-mavlink-connect.h"

extern "C"
JNIEXPORT jdouble JNICALL
Java_com_libmavlinkconnect_LibMavlinkConnectModule_nativeMultiply(JNIEnv *env, jclass type, jdouble a, jdouble b) {
    return libmavlinkconnect::multiply(a, b);
}
