import LoadingButton from "@mui/lab/LoadingButton";
import { useCallback, useEffect, useState } from "react";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";

import GuessTile from "./GuessTile";
import { ClueValues } from "../api/types";
import LoadingPlaceholder from "./LoadingPlaceholder";
import { WordleRequestItem, WordleResponse, fetchWordleResult } from "../api/api";

export type CharacterState = {
    char: string;
    clue: ClueValues;
};

const SUCCESS_STRING = "ggggg" as const;
const MAX_ATTEMPTS = 6;

const Guess = () => {
    const [guess, setGuess] = useState("");
    const [attemptsCount, setAttemptsCount] = useState(0);
    const [wordState, setWordState] = useState<CharacterState[]>(stringToState(guess));

    const [isLoading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isComplete, setIsComplete] = useState(false);

    const fetchGuess = useCallback(async () => {
        setLoading(true);
        setErrorMessage("");
        try {
            const { guess, clue } = stateToString(wordState);

            if (guess.toLocaleLowerCase() === SUCCESS_STRING) {
                setIsComplete(true);
                return;
            }

            const request: WordleRequestItem = { word: guess.toLocaleLowerCase(), clue: clue };
            const response: WordleResponse = await fetchWordleResult(
                !!attemptsCount ? [request] : []
            );
            setGuess(response.guess);

            setAttemptsCount(attemptsCount + 1);
            setWordState(stringToState(response.guess));
        } catch (error) {
            setErrorMessage(
                error instanceof Error ? error.message : "Error fetching data. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }, [attemptsCount, wordState]);

    useEffect(() => {
        if (attemptsCount === 0) {
            fetchGuess();
        }
    }, [fetchGuess, attemptsCount]);

    const handleSubmit = async () => await fetchGuess();

    const updateState = (index: number, newClue: ClueValues) => {
        const newWordState = wordState.map((item, i) =>
            i === index ? { ...item, clue: newClue } : item
        );
        setWordState(newWordState);
    };

    const letters = guess.toUpperCase().split("");

    if (!isComplete && attemptsCount > MAX_ATTEMPTS) {
        return (
            <Stack textAlign="center">
                <Typography variant="body1" fontWeight="bold" my={10}>
                    You lost, better luck next time✌🏿
                </Typography>
                <Button variant="contained" onClick={() => window.location.reload()}>
                    Try again?
                </Button>
            </Stack>
        );
    } else if (isComplete) {
        return (
            <Typography variant="body1" fontWeight="bold" my={10} textAlign="center">
                Congratulations🥳 You have completed the puzzle!
            </Typography>
        );
    } else if (isLoading && attemptsCount === 0) return <LoadingPlaceholder />;

    return (
        <Stack gap={3} justifyContent="center" my={3} color="text">
            <Typography variant="h2">
                {attemptsCount > 1 ? "Guess #" + attemptsCount : "Welcome!👋🏿"}
            </Typography>
            <Typography variant="body1">
                {attemptsCount > 1 ? "Word to Guess:" : "Let's begin with this word"}
            </Typography>
            <Stack direction="row" gap={2}>
                {letters.map((char, index) => (
                    <GuessTile key={char + index} value={char} />
                ))}
            </Stack>
            <div>
                <Typography variant="body1">Enter the response you got back</Typography>
                <Typography variant="caption">
                    Match the color you received in Wordle using the blue dropdown.
                </Typography>
            </div>
            <Stack direction="row" gap={2}>
                {letters.map((char, index) => (
                    <GuessTile
                        key={char + index}
                        value={char}
                        clue={wordState[index].clue}
                        updateState={(clue) => updateState(index, clue)}
                        interactive
                    />
                ))}
            </Stack>
            <Box textAlign="right" display={attemptsCount !== 0 ? undefined : "none"}>
                <LoadingButton loading={isLoading} variant="contained" onClick={handleSubmit}>
                    Submit
                </LoadingButton>
            </Box>

            {errorMessage && <Typography variant="body1">{errorMessage}</Typography>}
            <Divider />
        </Stack>
    );
};

function stringToState(word: string): CharacterState[] {
    return word.split("").map((char) => ({ char, clue: "x" }));
}

function stateToString(list: CharacterState[]) {
    return {
        guess: list.map((item) => item.char).join(""),
        clue: list.map((item) => item.clue).join(""),
    };
}

export default Guess;
