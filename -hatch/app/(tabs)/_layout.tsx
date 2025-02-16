import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="homepage"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
     <Tabs.Screen
        name="studypage"
        options={{
          title: 'Timers',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="clock-o" color={color} />,
        }}
      />
    </Tabs>
  );
}
