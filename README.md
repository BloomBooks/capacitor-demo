# capacitor-demo

A technology demonstrator that will experiment with using CapacitorJS to build cross-platform mobile apps.

# Prerequisites

1. `npm install -g @capacitor/cli` or equivalent
2. Follow steps in https://capacitorjs.com/docs/getting-started/environment-setup for any platforms you're interested in.
3. `npx cap add [android|ios|electron`

## Other Android Prerequisites

You need JDK 11 or higher to gradle build it. Download JDK's from: https://www.oracle.com/java/technologies/downloads

## Other iOS Prerequisites

1. You need xCode 13+ to run Capacitor
2. To install xCode 13+, you need MacOS 13+
3. MacBook Pros prior to 2017 are not compatible with macOS 13.

# Build process

## Simple Development Cycle (Android/iOS)

1. Edit the code
2. `yarn build` or equivalent.
3. `npx cap sync`
4. `npx cap run [android|ios`

## Simple Development Cycle (Electron)

1. Edit the code
2. `yarn build` or equivalent.
3. `npx cap sync @capacitor-community/electron`
4. `npx cap open @capacitor-community/electron`

## Live Reload Cycle

Prerequisites:

    npm install -g @ionic/cli native-run

Workflow

1. `ionic cap run android -l --external`
2. Select the device/emulator and Wi-Fi network to use. (They should be on the same WiFi network as the development machine)
3. If you edit a .tsx file and save it, the app should automatically reload.

See https://capacitorjs.com/docs/guides/live-reload for more info.
