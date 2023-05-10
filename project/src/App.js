import { useState, useEffect } from 'react';
import Paper from "@material-ui/core/Paper";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RoomIcon from "@mui/icons-material/Room";
import RoomInfo from './components/Roominfo';

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        color: "green",
        "&$selected": { color: "red" }
    },
    selected: {}
});

const API_URL = "http://localhost:8000/api/rooms/";

export default function App() {
    const classes = useStyles();
    const [value, setValue] = useState("");
    const [rooms, setRooms] = useState([]);
    const [sensorData, setSensorData] = useState([]);

    useEffect(() => {
        searchRooms();
    }, []);

    const searchRooms = async () => {
        const response = await fetch(`${API_URL}`);
        const data = await response.json();
        setRooms(data);
    };

    const sensorsInRoom = async (event, newValue) => {
        setValue(newValue);
        const response = await fetch(`http://localhost:8000/api/room/${newValue}/sensors`);
        const data = await response.json();
        setSensorData(data);
        console.log(data)
    };

    return (
        <div>
            <Paper>
                <BottomNavigation showLabels={true} value={value} onChange={sensorsInRoom}>
                    {rooms.map((r, index) => (
                        <BottomNavigationAction label={r.room} value={r.room} icon={<RoomIcon />} key={index} classes={classes} />
                    ))}
                </BottomNavigation>
            </Paper>
            <RoomInfo room={value} sensorData={sensorData} /> {/* Передача информации о датчиках в компонент RoomInfo */}
        </div>
    );
}
