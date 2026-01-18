import React, { useState, createRef } from "react";
import {
  View, Alert, ActivityIndicator,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
} from "react-native";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { deleteUser } from "../redux/UserSlice";
import { useDispatch } from "react-redux";
import ToastModal from "../components/Toast";

const HomePage = () => {
  const navigation = useNavigation();
  const users = useSelector((state: RootState) => state.users.users);
  const [loading, setLoading] = useState(false);

  const [menuUser, setMenuUser] = useState<any>(null);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
  };

  const dotRef = createRef<TouchableOpacity>();
  const dispatch = useDispatch();

  const handleDeleteUser = () => {
    Alert.alert(
      "Delete User",
      "Are you sure you want to delete this user?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setMenuUser(null);
            setLoading(true);

            setTimeout(() => {
              dispatch(deleteUser(menuUser.id));
              setLoading(false);

              showToast("User deleted successfully", "success");
            }, 500);
          },
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Home Page" />

      <TouchableOpacity
        onPress={() => navigation.navigate("CreateUser")}
        style={styles.createUserButton}
      >
        <Text style={styles.btnText}>+ Create User</Text>
      </TouchableOpacity>

      {users.length === 0 ? (
        <Text style={styles.noDataText}>No user data</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          removeClippedSubviews={false}
          renderItem={({ item }) => {

            return (
              <View style={styles.card}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 4,
                  }}
                >
                  <Text style={styles.name}>{item.name}</Text>

                  <TouchableOpacity
                    onPress={(event) => {
                      const { pageX, pageY } = event.nativeEvent;

                      setMenuPos({
                        x: pageX - 140,
                        y: pageY + 8,
                      });

                      setMenuUser(item);
                    }}
                  >
                    <Text style={styles.name}>⋮</Text>
                  </TouchableOpacity>

                </View>

                <View
                  style={{
                    height: 1,
                    backgroundColor: "#ccc",
                    marginVertical: 2,
                  }}
                />

                <View style={styles.row}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.label}>Email: </Text>
                    <Text style={styles.email}>{item.email}</Text>
                  </View>

                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.label}>Age: </Text>
                    <Text style={styles.email}>{item.age}</Text>
                  </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.label}>Address:</Text>
                  <View style={{ flexDirection: "row", gap: 2 }}>
                    <Text style={styles.email}>{item.city},</Text>
                    <Text style={styles.email}>{item.state},</Text>
                    <Text style={styles.email}>{item.country}</Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}

      { /* Modal for Edit/Delete Menu */}
      {menuUser && (
        <Modal transparent animationType="fade">
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setMenuUser(null)}
          >
            <View
              style={[
                styles.menuBox,
                {
                  top: menuPos.y,
                  left: menuPos.x,
                },
              ]}
            >
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setMenuUser(null);
                  navigation.navigate("EditUser", {
                    editUser: menuUser,
                  });
                }}
              >
                <Text style={styles.menuText}>Edit</Text>
              </TouchableOpacity>


              <TouchableOpacity
                style={styles.menuItem}
                onPress={handleDeleteUser}
              >
                <Text style={[styles.menuText, { color: "red" }]}>
                  Delete
                </Text>
              </TouchableOpacity>


            </View>
          </TouchableOpacity>
        </Modal>
      )}
      {loading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.2)",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <ActivityIndicator size="large" color="#144a6aff" />
        </View>
      )}
      <ToastModal
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, visible: false })}
      />

    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  createUserButton: {
    backgroundColor: "#144a6aff",
    padding: 10,
    margin: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  noDataText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: "#777",
  },
  card: {
    margin: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    elevation: 2,
    borderLeftColor: "#144a6aff",
    borderLeftWidth: 6,
    position: "relative",
    overflow: "visible",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: "#555",
  },
  row: {
    flexDirection: "row",
    gap: 50,
    marginVertical: 4,
  },
  label: {
    fontWeight: "bold",
    fontSize: 14,
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "transparent",
  },
  menuBox: {
    position: "absolute",
    backgroundColor: "#fff",
    width: 140,
    borderRadius: 10,
    elevation: 20,
    paddingVertical: 6,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  menuText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
