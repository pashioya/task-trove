import { Link, Stack } from "expo-router";

export default function Boards() {
  return (
    <>
      <Stack.Screen options={{ title: "Boards" }} />
      <Link href="/">Home</Link>
    </>
  );
}
