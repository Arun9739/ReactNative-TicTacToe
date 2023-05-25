import react, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export default function App() {
  const [notification, setNotification] = useState("Player x to start!");
  const [refresh, setRefresh] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState("X");

  const [board, setBoard] = useState([
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
  ]);

  const pressField = (index) => {
    let newBoard = board;
    if (newBoard[index] !== "X" && newBoard[index] !== "O") {
      if (currentPlayer == "X") {
        newBoard[index] = "X";
        setCurrentPlayer("O");
        setNotification("Player O to move ");
      } else {
        newBoard[index] = "O";
        setCurrentPlayer("X");
        setNotification("Player X to move ");
      }
      setBoard(newBoard);
      setRefresh(!refresh);
      checkIfPlayerWon();
    }
  };

  const checkIfPlayerWon = () => {
    if (board[0] == borad[1] && board[1] == board[2] && board[0] != "") {
      playerWon(board[0]);
    } else if (board[3] == borad[4] && board[4] == board[5] && board[3] != "") {
      playerWon(board[3]);
    } else if (board[6] == borad[7] && board[7] == board[8] && board[6] != "") {
      playerWon(board[6]);
    } else if (board[0] == borad[4] && board[4] == board[8] && board[0] != "") {
      playerWon(board[0]);
    } else if (board[2] == borad[4] && board[4] == board[6] && board[2] != "") {
      playerWon(board[2]);
    } else if (board[0] == borad[3] && board[3] == board[6] && board[0] != "") {
      playerWon(board[0]);
    } else if (board[1] == borad[4] && board[4] == board[7] && board[1] != "") {
      playerWon(board[1]);
    } else if (board[2] == borad[5] && board[5] == board[8] && board[2] != "") {
      playerWon(board[2]);
    }
  };

  const playerWon = async (symbol) => {
    setNotification("Player " + symbol + " won!");
    await delay(2000);

    setBoard([" ", " ", " ", " ", " ", " ", " ", " ", " "]);

    if (symbol == "O") setNotification("Player X to move");
    else setNotification("Player O to move");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text style={styles.txt1}>TicTacToe</Text>
      <Text style={styles.txt2}>{notification}</Text>

      <View style={styles.flatListContainer}>
        <FlatList
          style={styles.list}
          data={board}
          numColumns={3}
          refreshing={true}
          extraData={refresh}
          renderItem={({ item, index }) => {
            <TouchableOpacity
              style={styles.square}
              onPress={() => pressField()}
            >
              <Text style={styles.txtXO}>{item}</Text>
            </TouchableOpacity>;
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  flatListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 370,
    width: '100%'
  },
  txt1: {
    fontSize: 60,

  },
  txt2: {
    fontSize: 20,
  },
  txtXO: {
    fontSize: 60,
  },
  list: {
    width: 300,
    height: 300,
  },
  square: {
    height: 100,
    width: 100,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center"
  },
});
