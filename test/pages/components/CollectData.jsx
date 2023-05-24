import Axios from "axios";

// Set type room for select
const typeRoom = [
  { value: "Conference", text: "Conference Room" },
  { value: "Meeting", text: "Meeting Room" },
];

// Set number of room in Conference room
const numberInRoomConferece = [
  { value: 1, text: 1 },
  { value: 2, text: 2 },
  { value: 3, text: 3 },
];
// Set number of room in Meeting room
const numberInRoomMeeting = [
  { value: 1, text: 1 },
  { value: 2, text: 2 },
  { value: 3, text: 3 },
  { value: 4, text: 4 },
];

const getAdmin = async () => {
  try {
    const adminData = await Axios.get("http://localhost:3001/adminlist");
    return adminData.data;
  } catch (error) {
    console.log(error);
  }
};

const getData = async () => {
  try {
    const userData = await Axios.get("http://localhost:3001/customer");
    return userData.data;
  } catch (error) {
    console.log(error);
  }
};

export { typeRoom, numberInRoomConferece, numberInRoomMeeting, getAdmin, getData };