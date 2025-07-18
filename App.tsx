import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { ToastProvider } from "./utils/toast";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { Provider as PaperProvider, MD3LightTheme } from "react-native-paper";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

// Theme configuration
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#2D3142",
    secondary: "#4F5D75",
    background: "#F3F3F3",
    surface: "#FFFFFF",
  },
};

// Define types for our stack navigation
type RootStackParamList = {
  Main: undefined;
  Settings: undefined;
  AccountSettings: undefined;
  SettingsStack: undefined;
};

// Define types for our tab navigation
type RootTabParamList = {
  Home: undefined;
  Explore: undefined;
  MoodMate: undefined;
  Journey: undefined;
  Trends: undefined;
};

type HomeScreenNavigationProp = BottomTabNavigationProp<
  RootTabParamList,
  "Home"
>;

// Create navigators
const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

// Import the new HomeScreen component
import HomeScreen from "./app/HomeScreen";

// Settings Stack Navigator
function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} />
    </Stack.Navigator>
  );
}

// Settings Screen
function SettingsScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.settingsHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.settingsContent}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color="#FFF" />
          </View>
          <Text style={styles.userName}>Daksh Shukla</Text>
        </View>

        {/* Settings Options */}
        <View style={styles.settingsGroup}>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigation.navigate("AccountSettings")}
          >
            <View style={styles.settingLeft}>
              <Ionicons
                name="person-outline"
                size={22}
                color="#555"
                style={styles.settingIcon}
              />
              <Text style={styles.settingText}>Account Settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#BBB" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons
                name="notifications-outline"
                size={22}
                color="#555"
                style={styles.settingIcon}
              />
              <Text style={styles.settingText}>Notifications</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#BBB" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons
                name="moon-outline"
                size={22}
                color="#555"
                style={styles.settingIcon}
              />
              <Text style={styles.settingText}>Appearance</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#BBB" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons
                name="lock-closed-outline"
                size={22}
                color="#555"
                style={styles.settingIcon}
              />
              <Text style={styles.settingText}>Privacy</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#BBB" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons
                name="help-circle-outline"
                size={22}
                color="#555"
                style={styles.settingIcon}
              />
              <Text style={styles.settingText}>Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#BBB" />
          </TouchableOpacity>
        </View>

        {/* Version Info */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>MoodMate</Text>
          <Text style={styles.versionNumber}>Beta 0.1</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Account Settings Screen
function AccountSettingsScreen({ navigation }: any) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingSurname, setIsEditingSurname] = useState(false);
  const [isEditingAge, setIsEditingAge] = useState(false);
  const [name, setName] = useState("Daksh");
  const [surname, setSurname] = useState("Shukla");
  const [age, setAge] = useState("21");

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            // In a real app, this would handle account deletion
            Alert.alert("Account Deleted", "Your account has been deleted.");
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.settingsHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.accountContent}>
        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.accountSectionTitle}>PERSONAL INFORMATION</Text>

          {/* Name Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Name</Text>
            <View style={styles.fieldValue}>
              {isEditingName ? (
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  autoFocus
                  onBlur={() => setIsEditingName(false)}
                  onSubmitEditing={() => setIsEditingName(false)}
                />
              ) : (
                <>
                  <Text style={styles.fieldText}>{name}</Text>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => setIsEditingName(true)}
                  >
                    <Ionicons name="pencil" size={18} color="#6B64F3" />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>

          {/* Surname Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Surname</Text>
            <View style={styles.fieldValue}>
              {isEditingSurname ? (
                <TextInput
                  style={styles.input}
                  value={surname}
                  onChangeText={setSurname}
                  autoFocus
                  onBlur={() => setIsEditingSurname(false)}
                  onSubmitEditing={() => setIsEditingSurname(false)}
                />
              ) : (
                <>
                  <Text style={styles.fieldText}>{surname}</Text>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => setIsEditingSurname(true)}
                  >
                    <Ionicons name="pencil" size={18} color="#6B64F3" />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>

          {/* Age Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Age</Text>
            <View style={styles.fieldValue}>
              {isEditingAge ? (
                <TextInput
                  style={styles.input}
                  value={age}
                  onChangeText={setAge}
                  keyboardType="numeric"
                  autoFocus
                  onBlur={() => setIsEditingAge(false)}
                  onSubmitEditing={() => setIsEditingAge(false)}
                />
              ) : (
                <>
                  <Text style={styles.fieldText}>{age}</Text>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => setIsEditingAge(true)}
                  >
                    <Ionicons name="pencil" size={18} color="#6B64F3" />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </View>

        {/* Account Information */}
        <View style={styles.section}>
          <Text style={styles.accountSectionTitle}>ACCOUNT INFORMATION</Text>

          {/* Email Field - Non-editable */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Email Address</Text>
            <View style={styles.nonEditableFieldValue}>
              <Text style={styles.nonEditableFieldText}>
                daksh1.mitmpl2022@learner.manipal.edu
              </Text>
            </View>
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.dangerSection}>
          <Text style={styles.dangerSectionTitle}>DANGER ZONE</Text>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteAccount}
          >
            <Text style={styles.deleteButtonText}>Delete My Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

// MoodMate Screen
function MoodMateScreen() {
  return <MoodMate />;
}

// Import Explore component
import Explore from "./app/explore";
// Import Journey component
import Journey from "./app/journey";
// Import MoodMate component
import MoodMate from "./app/moodmate";

// Explore Screen
function ExploreScreen() {
  return <Explore />;
}

function JourneyScreen() {
  return <Journey />;
}

// Trends Screen
function TrendsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Trends</Text>
        <Text style={styles.subtitle}>Track your mood progress</Text>
      </View>

      <View style={styles.chartsContainer}>
        <View style={styles.chart}>
          <Text style={styles.chartTitle}>Weekly Mood</Text>
          <View style={styles.placeholderChart}>
            <Text style={styles.placeholderText}>
              Mood analytics chart will be displayed here
            </Text>
          </View>
        </View>

        <View style={styles.chart}>
          <Text style={styles.chartTitle}>Monthly Overview</Text>
          <View style={styles.placeholderChart}>
            <Text style={styles.placeholderText}>
              Monthly mood data will be displayed here
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Main Tab Navigator
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Explore") {
            iconName = "compass-outline";
          } else if (route.name === "MoodMate") {
            return (
              <View style={styles.centerButtonContainer}>
                <Ionicons name="chatbubble-ellipses" size={26} color="#FFF" />
              </View>
            );
          } else if (route.name === "Journey") {
            iconName = "document-text-outline";
          } else if (route.name === "Trends") {
            iconName = "stats-chart-outline";
          }

          return iconName ? (
            <Ionicons name={iconName as any} size={size} color={color} />
          ) : null;
        },
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#BDBDBD",
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
          borderTopWidth: 1,
          borderTopColor: "#EFEFEF",
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen
        name="MoodMate"
        component={MoodMateScreen}
        options={{
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen name="Journey" component={JourneyScreen} />
      <Tab.Screen name="Trends" component={TrendsScreen} />
    </Tab.Navigator>
  );
}

// Home Stack to allow navigation to settings
function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Main" component={HomeScreen} />
      <Stack.Screen name="SettingsStack" component={SettingsStack} />
    </Stack.Navigator>
  );
}

// Root Stack Navigator
export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <ToastProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Main" component={MainTabNavigator} />
              <Stack.Screen name="Settings" component={SettingsScreen} />
              <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} />
              <Stack.Screen name="SettingsStack" component={SettingsStack} />
            </Stack.Navigator>
          </NavigationContainer>
          <StatusBar style="auto" />
        </ToastProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16,
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
    marginTop: 10,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoText: {
    fontSize: 20,
    color: "#999",
    marginLeft: 6,
  },
  profileButton: {
    padding: 4,
  },
  greetingContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  greeting: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  dateSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dateSliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  sliderArrow: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  dateSlider: {
    paddingHorizontal: 10,
    alignItems: "center",
  },
  dayItem: {
    alignItems: "center",
    width: 40,
  },
  selectedDayItem: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dayText: {
    fontSize: 16,
    color: "#999",
    marginBottom: 4,
  },
  selectedDayText: {
    color: "#333",
  },
  dateText: {
    fontSize: 22,
    color: "#999",
    fontWeight: "500",
  },
  selectedDateText: {
    color: "#333",
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEE",
    marginVertical: 20,
  },
  sectionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 14,
    color: "#999",
    letterSpacing: 1.5,
    marginBottom: 16,
    textAlign: "center",
  },
  cardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    height: 200,
    borderRadius: 20,
    padding: 20,
    justifyContent: "flex-end",
  },
  darkCard: {
    backgroundColor: "#1E1E1E",
  },
  lightCard: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#EEE",
  },
  cardContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
    marginBottom: 8,
    lineHeight: 28,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#999",
    lineHeight: 20,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 20,
  },
  whiteCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FFF",
  },
  moonShape: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#333",
    borderTopWidth: 0,
    borderRightWidth: 0,
    transform: [{ rotate: "60deg" }],
  },
  favoritesPlaceholder: {
    height: 100,
    backgroundColor: "#FFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
  },
  chartsContainer: {
    flex: 1,
    gap: 16,
  },
  chart: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    marginBottom: 12,
  },
  placeholderChart: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
  },
  placeholderText: {
    color: "#777",
    textAlign: "center",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#EFEFEF",
    backgroundColor: "#FFF",
  },
  brandingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  brandingRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  stoicText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  curatedText: {
    fontSize: 14,
    color: "#999",
  },
  mobbinText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  // Settings specific styles
  settingsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  placeholder: {
    width: 44, // Same width as back button for balance
  },
  settingsContent: {
    flex: 1,
  },
  accountContent: {
    flex: 1,
    padding: 16,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#6B64F3",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  userName: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
  },
  settingsGroup: {
    backgroundColor: "#FFF",
    marginTop: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#EEE",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    marginRight: 12,
  },
  settingText: {
    fontSize: 16,
    color: "#333",
  },
  versionContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },
  versionText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
  },
  versionNumber: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  section: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  accountSectionTitle: {
    fontSize: 13,
    fontWeight: "500",
    color: "#888",
    marginBottom: 16,
    letterSpacing: 1,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  fieldValue: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    paddingBottom: 8,
  },
  fieldText: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    padding: 0,
  },
  editButton: {
    padding: 4,
  },
  nonEditableFieldValue: {
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    padding: 12,
  },
  nonEditableFieldText: {
    fontSize: 16,
    color: "#777",
  },
  dangerSection: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
  },
  dangerSectionTitle: {
    fontSize: 13,
    fontWeight: "500",
    color: "#FF4E4E",
    marginBottom: 16,
    letterSpacing: 1,
  },
  deleteButton: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#FF4E4E",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FF4E4E",
  },
  centerButtonContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  // MoodMate specific styles
  moodmateContainer: {
    flex: 1,
    backgroundColor: "#F8F8FC",
  },
  moodmateHeader: {
    padding: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: "#6B64F3",
  },
  headerContent: {
    alignItems: "center",
  },
  moodmateLogoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  moodmateLogoText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFF",
    marginLeft: 10,
    letterSpacing: 0.5,
  },
  moodmateSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
  },
  moodmateContentContainer: {
    padding: 20,
  },
  welcomeSection: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
  },
  featuresSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  featureCard: {
    width: "31%",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  featureIconBg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
    textAlign: "center",
  },
  featureDescription: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
  },
  chatSection: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  newChatButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0E5FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  newChatText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B64F3",
    marginLeft: 4,
  },
  chatArea: {
    padding: 15,
    minHeight: 200,
  },
  botMessageContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  botAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#6B64F3",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  botMessage: {
    backgroundColor: "#F0E5FF",
    borderRadius: 18,
    borderTopLeftRadius: 4,
    padding: 12,
    maxWidth: "80%",
  },
  messageText: {
    fontSize: 15,
    color: "#333",
  },
  inputPlaceholder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8F8FC",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 15,
  },
  inputPlaceholderText: {
    fontSize: 15,
    color: "#888",
  },
});
