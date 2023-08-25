import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeIcon as HomeOutline,
  UserCircleIcon as UserOutline,
  ShoppingBagIcon as BagOutline,
  ChatBubbleLeftIcon as ChatOutline,
} from "react-native-heroicons/outline";
import {
  HomeIcon as HomeSolid,
  UserCircleIcon as UserSolid,
  ShoppingBagIcon as BagSolid,
  ChatBubbleLeftIcon as ChatSolid,
} from "react-native-heroicons/solid";
// Redux
import { Provider } from "react-redux";
import store from "../stores/index";

// Component
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import HomeScreen from "../screens/HomeScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import ChatScreen from "../screens/ChatScreen";
import ProfileScreen from "../screens/ProfileScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import DetailPackage from "../screens/DetailPackage";
// ThemeColors
import { themeColors } from "../themes";
import { LogBox, View } from "react-native";

// Functions
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// Layout Variable
const ios = Platform.OS == "ios";
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

// Component
export default function AppNavigation() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={HomeTabs}
          />
          <Stack.Screen
            name="Welcome"
            options={{ headerShown: false }}
            component={WelcomeScreen}
          />
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={LoginScreen}
          />
          <Stack.Screen
            name="SignUp"
            options={{ headerShown: false }}
            component={SignUpScreen}
          />
          <Stack.Screen
            name="Edit"
            options={{ headerShown: false }}
            component={EditProfileScreen}
          />
          <Stack.Screen
            name="Package"
            options={{ headerShown: false }}
            component={DetailPackage}
          />
          {/* Nambah screen payment */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => menuIcons(route, focused),
        tabBarStyle: {
          height: 75,
          alignItems: "center",
          borderTopColor: themeColors.bg3,
          borderTopWidth: 1,
          backgroundColor: themeColors.bg,
        },
        tabBarItemStyle: {
          marginTop: ios ? 30 : 0,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const menuIcons = (route, focused) => {
  let icon;

  if (route.name === "Home") {
    icon = focused ? (
      <HomeSolid size="30" color={themeColors.bg3} />
    ) : (
      <HomeOutline size="30" strokeWidth={2} color={themeColors.bg3} />
    );
  } else if (route.name === "Chat") {
    icon = focused ? (
      <ChatSolid size="30" color={themeColors.bg3} />
    ) : (
      <ChatOutline size="30" strokeWidth={2} color={themeColors.bg3} />
    );
  } else if (route.name === "Profile") {
    icon = focused ? (
      <UserSolid size="30" color={themeColors.bg3} />
    ) : (
      <UserOutline size="30" strokeWidth={2} color={themeColors.bg3} />
    );
  }

  let buttonClass = focused ? "bg-white" : "";
  return (
    <View
      className={"flex items-center rounded-full p-3 shadow " + buttonClass}
    >
      {icon}
    </View>
  );
};
