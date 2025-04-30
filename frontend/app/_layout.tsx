import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    // Navigate to the first onboarding screen on initial load
    router.replace('/onboarding/page1');
  }, []); // Empty dependency array ensures this runs only once after the initial render

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="report" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding/page1" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding/page2" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding/page3" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}