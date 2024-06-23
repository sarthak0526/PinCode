### Postal Code Details App

This project is a React Native application that allows users to retrieve details of postal offices based on a provided 6-digit pincode. Here’s an overview of its functionality and features:

### Features:
- **Search Functionality**: Users can enter a 6-digit pincode to search for postal office details.
- **Modal Display**: Displays detailed information about each postal office in a modal when a card is tapped.
- **Error Handling**: Handles errors gracefully and displays appropriate messages when no data is found or an invalid pincode is entered.
- **Responsive Design**: Designed to work on various screen sizes using React Native components and styles.

### Components Used:
- **React Hooks**: Utilizes `useState` and `useEffect` for managing component state and performing side effects like API calls.
- **React Native Paper**: Utilizes components like `Card`, `Title`, and `Paragraph` from `react-native-paper` for consistent UI design.
- **Third-party Libraries**: Uses `react-native-vector-icons` for icons and `react-native-gesture-handler` for gesture support.

### How to Use:
1. **Enter Pincode**: Input a valid 6-digit pincode into the text input.
2. **Search**: Press the search button to retrieve postal office details.
3. **View Details**: Tap on a card to view detailed information about a postal office in a modal.
4. **Home Button**: Clears the input and results to start a new search.

### Installation:
To run this project locally, ensure you have React Native set up in your development environment and follow these steps:
1. Clone this repository.
2. Navigate to the project directory and install dependencies using `npm install`.
3. Connect a mobile device or set up an emulator.
4. Run the app using `npx react-native run-android` or `npx react-native run-ios`.

### Dependencies:
- `react-native`
- `react-native-paper`
- `react-native-vector-icons`
- `react-native-gesture-handler`

### Screenshots:
![WhatsApp Image 2024-06-23 at 22 43 29_8fdf5b99](https://github.com/sarthak0526/PinCode/assets/92181453/eba0b92b-0170-4c83-b1e7-ff14c3d48395)
![WhatsApp Image 2024-06-23 at 22 43 29_3542d438](https://github.com/sarthak0526/PinCode/assets/92181453/1fee9506-e15b-4720-9e9f-fcfe147b36b3)
![WhatsApp Image 2024-06-23 at 22 43 30_db8affae](https://github.com/sarthak0526/PinCode/assets/92181453/fcdc7368-70a4-4c3d-800e-d2d8d12a7b47)



### Future Enhancements:
- Implement caching for improved performance.
- Add location-based services for automatic pincode detection.
- Enhance UI/UX with animations and transitions.

### Contributing:
Contributions are welcome! Please fork the repository and submit pull requests with improvements or fixes.


By following these instructions, you can deploy and explore this React Native application for retrieving postal office details based on pincode input effectively.
