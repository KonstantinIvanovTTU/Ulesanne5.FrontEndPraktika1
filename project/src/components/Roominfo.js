import React from 'react';
import { Table, TableBody, TableRow, TableCell, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        textAlign: 'center',
    },
    tableCell: {
        textAlign: 'center',
    },
});

export default function RoomInfo({ room, sensorData }) {
    const classes = useStyles();

    return (
        <div>
            <h2 className={classes.root}>Sensors in room: {room}</h2>
            <Table>
                <TableBody>
                    {sensorData.map((sensor, index) => (
                        <TableRow key={index}>
                            <TableCell className={classes.tableCell}>{sensor.sensorname}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}