# TaskTrove System Documentation
By Paul Ashioya, Noah Diderich

## Product Owner
Tryve

## Developers
- Noah Diderich
- Paul Ashioya

## Company Coaches / QA
- Maarten Cautreels
- Fréderik Noels

## Introduction
The purpose of this document is to define and describe the project's requirements and spell out the system’s functionality and constraints.

### 1.1 Overview
The product is a mobile application that utilizes Tryve's existing products (Location Toolkit) to allow users to keep track of their current location on a monday.com board while providing additional features such as real-time location tracking and task assignment based on location.

### 1.2 Business Context
TaskTrove aims to enhance the productivity and efficiency of field technicians by providing real-time location tracking, task management, and location-based reminders. This integration will help technicians manage their tasks more effectively while ensuring location-specific data is accurately tracked and utilized.

## General Description

### 2.1 Product Functions
- **Real-Time Location Tracking**: Continuous tracking of user location, updated at regular intervals.
- **Location-Based Task Assignment**: Displaying tasks and technician locations on a map.
- **Location-Based Reminders**: Geofencing to trigger reminders based on proximity to specified locations.
- **User Authentication and Authorization**: Secure log-in using Monday OAuth.
- **Customizable Tracking Settings**: Options to pause tracking and configure work hours.
- **Notification System**: Sending timely and relevant alerts for various events.
- **Offline Support**: Ensuring the app functions smoothly in offline mode with local data storage.

### 2.2 Similar System Information
- **monday.com**: A project and work management platform with capabilities in task management, human resources, and CRM. It also contains a mobile app whose functionality overlaps in some areas.
- **Location Toolkit**: An app developed by Tryve for the monday.com Marketplace to enhance location-specific functionalities.

### 2.3 User Characteristics
- **Field Technicians**: Primary users who require real-time location tracking and task management.
- **Project Managers**: Secondary users who need to assign and monitor tasks based on technician locations.

### 2.4 User Problem Statement
Technicians need a reliable way to track their real-time location and manage tasks efficiently while in the field. Project managers require accurate location data to assign tasks effectively and ensure timely completion.

### 2.5 General Constraints
- **Platform Dependency**: The application must integrate seamlessly with monday.com.
- **Data Privacy**: User data must be handled securely to protect user privacy.
- **Real-Time Processing**: The system should process and update location data as close to real-time as possible.

## Functional Requirements
- The app needs to retrieve the user's current location and send it to monday.com with all the necessary information to update the correct board, column, and item.
- The app needs to allow technicians to configure the start and end times of their workday so that tracking automatically starts and stops accordingly.
- Provide options for technicians to pause location tracking.
- Location data should be sent to a designated field in the technician's monday.com board item at regular intervals (e.g., every 10 minutes).
- Implement Monday OAuth for sign-in to enhance the authentication system and ensure only authorized technicians can access the app. This will allow technicians to log in using their monday.com credentials, providing a seamless and secure authentication process.
- The app needs to utilize its integration with monday.com to display the user's assigned tasks as well as the task locations.
- The app needs to display technicians' real-time locations along with assigned tasks on a map.
- The app needs to trigger reminders based on proximity to specified locations.
- Retrieve task locations from monday.com and store them locally.
- Notifications should be timely and relevant, triggered by proximity to predefined locations or task deadlines.

## Non-Functional Requirements
### Security
- **Authentication**: Use Monday OAuth for secure user login.
- **Data Encryption**: Encrypt sensitive user data on the user's mobile device and follow GDPR best practices to ensure user data is secure and private.
- **Access Control**: Ensure users can only access information on their monday.com boards they are authorized to access.

## Operational Scenarios
- **Real-Time Tracking Start**: A technician starts their workday, and their location is continuously tracked and updated on the monday.com board.
- **Task Assignment**: A project manager assigns tasks to technicians based on their real-time locations, visible on a map.
- **Location-Based Reminder**: A technician receives a reminder to perform a task when they approach a specified location.
- **Notification Alert**: The system sends a notification to a technician about an upcoming task deadline or update.
- **Offline Operation**: A technician works in an area with no internet connectivity, and the app stores data locally, syncing when a connection is restored.

# Development Guide

1. After cloning the project, simply navigate to the TaskTrove app folder.
2. Follow the instructions from the following expo documentation page:
   - [Expo Setup Documentation](https://docs.expo.dev/get-started/installation/)
3. **ENV configurations** - To run the application you need to set up your environment variables. Fill out the env variables in the template file and rename it to `.env`.

# Installation Guide

1. **Download the APK**
   - Download the latest APK build from the following drive folder:
     [TaskTrove - Latest APK](https://drive.google.com/drive/folders/1MfakO3rUxXHPLQDLIMF-QRM75H0iN9qU?usp=drive_link)
2. **Transfer the APK to Your Device**
   - Transfer the downloaded APK file to your Android device.
3. **Install the APK**
   - Open the transferred APK file on your Android device.
   - Follow the on-screen prompts to install TaskTrove.
4. **Follow the Onboarding Process**
   - Launch the TaskTrove app after installation.
   - Complete the onboarding process as directed by the app.

# User Manual

## Prerequisites

### monday.com Account Setup
- Ensure you have at least one board on your monday.com account that includes a location type column and at least one item.

### Full Functionality Requirements
- To access the app's full functionality, you will need a second board on your monday.com account. This board should also contain:
  - A location column
  - A description column

## Onboarding Steps

1. **Login**
   - Open the TaskTrove app.
   - Log in using your monday.com credentials via the monday OAuth authentication system.
2. **Configure Boards**
   - Select the board(s) from your monday.com account that you will use with TaskTrove.
   - Ensure the primary board contains the necessary location type column and items.
3. **Additional Board Setup (Optional)**
   - For full functionality, configure the second board with the required location and description columns.

## Possible Additional Features

There are a couple of features that can be added to the TaskTrove project:

1. **Background tasks**: At the moment, everything in the app except the location tracking and the geofencing happens only when the app is in the foreground. Once we put the app in the background, it doesn't make API calls, it doesn't update tasks, and it doesn't do other important tasks. However, having these tasks occur when the app is in the background could mean an external backend could be needed.

2. **Push notifications**: Similarly to the previous point, the notifications right now are at their most basic level. Notifications don’t appear when the app is in the background. For that, an external backend would be needed that sends push notifications directly to the phone. It is very possible and not hard to do but requires the app to be registered to Firebase and that adds a lot of extra complexity.

3. **iOS support**: The app in itself already runs on an iOS emulator, the issue here is the building and deployment part that requires some extra complexity, especially in the OAuth part. Apple requires every app in the app store to have the option to sign in using their Apple account, which defeats the purpose of signing in with your monday account. The only solution would be that monday implements some sort of Apple support.

4. **Schedule tasks**: At the moment, to turn on or off tracking during work hours, we do it by checking for the time every minute and toggling location tracking according to it. This is not performant and should be replaced by the toggling being triggered automatically at the hours the user had chosen. However, to our knowledge, it isn't possible yet in expo.
