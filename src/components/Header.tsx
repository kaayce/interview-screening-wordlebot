import SmartToy from "@mui/icons-material/SmartToy";
import { Box, IconButton, Link, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const Header = () => {
    return (
        <Box display="flex" justifyContent="center">
            <Box mt={2} display="flex" columnGap={2} alignItems="center">
                <SmartToy color="primary" sx={{ fontSize: 60 }} />
                <Typography variant="h1" color="primary">
                    Wordle Bot
                </Typography>
                <Link
                    color="primary"
                    component={IconButton}
                    variant="body2"
                    href="https://github.com/kaayce/interview-screening-wordlebot/blob/main/description.md"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <InfoIcon />
                </Link>
            </Box>
        </Box>
    );
};

export default Header;
