import { useState } from "react";
import SignalCellular4BarIcon from "@mui/icons-material/SignalCellular4Bar";
import { Box, IconButton, Menu, MenuItem, Stack, TextFieldProps } from "@mui/material";

import { ClueValues, Clue } from "../api/types";

type GuessTileProps = {
    value: string;
    interactive?: boolean;
    clue?: ClueValues;
    updateState?: (newClue: ClueValues) => void;
} & TextFieldProps;

const GuessTile = ({ interactive, value, clue, updateState }: GuessTileProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const updateClue = (clue: ClueValues) => () => {
        if (updateState) {
            updateState(clue);
        }
        handleClose();
    };

    return (
        <Box sx={{ position: "relative", width: "3.5em" }}>
            <Box
                sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    p: 2,
                    borderRadius: 1,
                    bgcolor: getBackgroundColor(clue),
                    cursor: interactive ? "pointer" : "default",
                }}
                onClick={handleClick}
            >
                {value}
            </Box>
            <Stack
                direction="row"
                justifyContent="end"
                sx={{ position: "absolute", bottom: 0, right: 0 }}
            >
                {interactive && (
                    <>
                        <IconButton aria-label="delete" onClick={handleClick} sx={{ p: 0 }}>
                            <SignalCellular4BarIcon color="primary" />
                        </IconButton>{" "}
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                        >
                            {Object.entries(Clue).map(([color, value]) => (
                                <MenuItem key={value} value={value} onClick={updateClue(value)}>
                                    {color}
                                </MenuItem>
                            ))}
                        </Menu>
                    </>
                )}
            </Stack>
        </Box>
    );
};

const Color = {
    g: "green",
    y: "yellow",
    x: "lightgrey",
};

function getBackgroundColor(clue?: ClueValues) {
    if (clue) return Color[clue];
    return Color.x;
}

export default GuessTile;
