import React, { useState } from "react";
import { Animated, Text, View, StyleSheet, StatusBar, Platform } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import LinearGradient from "react-native-linear-gradient";

const SwipeableQuickActions = ({ children }) => {
  const [translateX] = useState(new Animated.Value(-280)); // panel width

  const openPanel = () => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const closePanel = () => {
    Animated.spring(translateX, {
      toValue: -280,
      useNativeDriver: true,
    }).start();
  };

  const statusBarHeight = StatusBar.currentHeight || (Platform.OS === 'ios' ? 44 : 0);

  return (
    <GestureRecognizer
      onSwipeRight={openPanel}
      onSwipeLeft={closePanel}
      style={{ flex: 1 }}
    >
      <Animated.View style={[styles.sidePanel, { transform: [{ translateX }] }]}>
        <LinearGradient
          colors={["#1E3A8A", "#3B82F6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[styles.gradientBackground, { paddingTop: statusBarHeight }]}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Quick Actions</Text>
            <View style={styles.headerDivider} />
          </View>

          <View style={styles.actionsContainer}>
            <View style={[styles.actionItem, { borderLeftColor: "#60A5FA" }]}>
              <View style={[styles.colorDot, { backgroundColor: "#60A5FA" }]} />
              <Text style={styles.actionText}>Dashboard</Text>
            </View>

            <View style={[styles.actionItem, { borderLeftColor: "#34D399" }]}>
              <View style={[styles.colorDot, { backgroundColor: "#34D399" }]} />
              <Text style={styles.actionText}>Messages</Text>
            </View>

            <View style={[styles.actionItem, { borderLeftColor: "#F59E0B" }]}>
              <View style={[styles.colorDot, { backgroundColor: "#F59E0B" }]} />
              <Text style={styles.actionText}>Settings</Text>
            </View>

            <View style={[styles.actionItem, { borderLeftColor: "#EF4444" }]}>
              <View style={[styles.colorDot, { backgroundColor: "#EF4444" }]} />
              <Text style={styles.actionText}>Logout</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Swipe to close</Text>
          </View>
        </LinearGradient>
      </Animated.View>

      <View style={{ flex: 1 }}>{children}</View>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
sidePanel: {
  position: "absolute",
  left: 0,
  top: 0,
  bottom: 0,
  width: 280,
  backgroundColor: "#fff",           // Make sure background is set for shadows to show
  borderTopRightRadius: 20,
  borderBottomRightRadius: 20,
  // iOS Shadow
  shadowColor: "#000",
  shadowOffset: { width: 4, height: 0 },
  shadowOpacity: 0.35,
  shadowRadius: 10,
  // Android Shadow (elevation)
  elevation: 15,
  overflow: "hidden",
  zIndex: 10,
},

  gradientBackground: {
    flex: 1,
    paddingHorizontal: 25,
    paddingBottom: 25,
    justifyContent: "flex-start",
  },
  headerContainer: {
    marginBottom: 30,
    marginTop: 10, // Additional spacing after status bar
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 5,
  },
  headerDivider: {
    height: 3,
    width: 40,
    backgroundColor: "#60A5FA",
    borderRadius: 2,
  },
  actionsContainer: {
    gap: 15,
    flex: 1,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
  },
  colorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  actionText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    position: "absolute",
    bottom: 25,
    left: 25,
    right: 25,
  },
  footerText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 12,
    textAlign: "center",
  },
});

export default SwipeableQuickActions;