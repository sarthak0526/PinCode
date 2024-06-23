import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
} from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [pincode, setPincode] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchPressed, setSearchPressed] = useState(false); // State to track if search button is pressed
  const result = `https://api.postalpincode.in/pincode/${pincode}`;

  useEffect(() => {
    if (searching && pincode.length === 6 && /^\d+$/.test(pincode)) {
      setIsLoading(true);
      fetch(result)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.length > 0 && data[0].PostOffice) {
            setResponse(data[0].PostOffice);
            setError(null); // Reset error if data is found
          } else {
            setResponse([]);
            setError("No data found for the provided Pincode.");
          }
          setIsLoading(false);
          setSearching(false);
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
          setSearching(false);
        });
    }
  }, [searching, pincode]);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const handleInputChange = (text) => {
    // Allow only numbers and limit to 6 digits
    if (/^\d{0,6}$/.test(text)) {
      setPincode(text);
      setError(null); // Reset error when input changes
    }
  };

  const handleSearch = () => {
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      Keyboard.dismiss(); // Dismiss the keyboard
      setSearching(true);
      setSearchPressed(true); // Set search pressed true
    } else {
      setError("Invalid pincode. Please enter a 6-digit number.");
      setResponse([]); // Clear response on invalid input
      setSearchPressed(false); // Reset search pressed state
    }
  };

  const handleHome = () => {
    setPincode("");
    setResponse([]);
    setSearching(false);
    setSearchPressed(false); // Reset search pressed state
    setError(null); // Reset error on home action
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openModal(item)} style={styles.card}>
      <Card>
        <Card.Content>
          <Title style={styles.cardTitle}>{item.Name}</Title>
          <Paragraph style={styles.cardText}>Branch Type: {item.BranchType}</Paragraph>
          <Paragraph style={styles.cardText}>Delivery Status: {item.DeliveryStatus}</Paragraph>
          <Paragraph style={styles.cardText}>Circle: {item.Circle}</Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <Icon
        name="home"
        size={30}
        color="#ffffff"
        style={styles.homeIcon}
        onPress={handleHome}
      />
      <View style={styles.middleContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter 6-digit Pincode"
            keyboardType="numeric"
            maxLength={6}
            value={pincode}
            onChangeText={handleInputChange}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Icon name="search" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6200ea" />
        </View>
      )}
      {error && !searching && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      {!isLoading && response.length === 0 && searching && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Searching...</Text>
        </View>
      )}
      {!isLoading && response.length === 0 && !searching && searchPressed && (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No data found for the provided Pincode.</Text>
        </View>
      )}
      <FlatList
        data={response}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalHeader}>Details</Text>
              <View style={styles.modalContent}>
                {selectedItem && (
                  <>
                    <Text style={styles.modalText}>Name: {selectedItem.Name}</Text>
                    <Text style={styles.modalText}>Branch Type: {selectedItem.BranchType}</Text>
                    <Text style={styles.modalText}>Delivery Status: {selectedItem.DeliveryStatus}</Text>
                    <Text style={styles.modalText}>Circle: {selectedItem.Circle}</Text>
                    <Text style={styles.modalText}>District: {selectedItem.District}</Text>
                    <Text style={styles.modalText}>Division: {selectedItem.Division}</Text>
                    <Text style={styles.modalText}>Region: {selectedItem.Region}</Text>
                    <Text style={styles.modalText}>Block: {selectedItem.Block}</Text>
                    <Text style={styles.modalText}>State: {selectedItem.State}</Text>
                    <Text style={styles.modalText}>Country: {selectedItem.Country}</Text>
                    <Text style={styles.modalText}>Pincode: {selectedItem.Pincode}</Text>
                    {/* Add other fields as needed */}
                  </>
                )}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  middleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  searchButton: {
    height: 50,
    backgroundColor: "#6200ea",
    marginLeft: 10,
    borderRadius: 10,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  errorText: {
    color: "#ff0000",
    fontSize: 16,
  },
  loadingText: {
    color: "#ffffff",
    fontSize: 16,
  },
  noDataContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  noDataText: {
    color: "#ffffff",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#ffddc1",
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    padding: 20,
  },
  cardTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    maxHeight: "80%",
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalContent: {
    marginTop: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 5,
  },
});
