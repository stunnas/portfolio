'use client';
import React, { useState, useEffect, useRef } from 'react';
import ResetSVG from '../reusable-items/icons/resetSVG';
import LoadingBar from '../reusable-items/loaders/loading-bar/loadingBar';

const defaultText = "This is a sample text for the typing speed test. Try to type this as accurately and quickly as you can.";

const TypingSpeedTool = () => {
    const [sampleSentence, setSampleSentence] = useState(defaultText); 
    const [userInput, setUserInput] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [timer, setTimer] = useState(60);
    const [initialTime, setInitialTime] = useState(timer);
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const intervalRef = useRef(null);
    const textInputRef = useRef(null);
    const sampleSentenceRef = useRef(null);
    const timeOptions = [30, 60, 120];

    const fetchSentence = async () => {
        setIsLoading(true);
        const url = 'https://contentai-net-text-generation.p.rapidapi.com/v1/text/blog-articles?category=video-games';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'e8bc5ff14emsh81b7a10ec0778f4p10267bjsncbb9452355be',
                'X-RapidAPI-Host': 'contentai-net-text-generation.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            if (result && result.text) {
                const textWithoutNewlines = result.text
                .replace(/\r?\n|\r/g, ' ') // This regex gets rid of newline characters
                .replace(/\s+/g, ' '); // This regex collapses multiple spaces
                setSampleSentence(textWithoutNewlines);
                console.log(textWithoutNewlines);
            } else {
                console.error('Sentence not found in response:', result);
                setSampleSentence(defaultText);
            }
        } catch (error) {
            console.error(error);
            // In case of an error, fall back to the default text
            setSampleSentence(defaultText);
        } finally {
            setIsLoading(false);
        }
    };

    const resetTest = () => {
        console.log('Resetting test, initial time:', initialTime);
        setTimer(initialTime);
        setUserInput('');
        setCurrentIndex(0);
        setStarted(false);
        setFinished(false);
        fetchSentence();
        focusInput();
        
    };

    const setTime = (seconds) => {
        setInitialTime(seconds);
    };

    useEffect(() => {
        resetTest();
    }, [initialTime]);


    // Start the timer when the test starts
    useEffect(() => {
        if (started && !finished) {
            intervalRef.current = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }

        return () => clearInterval(intervalRef.current);
    }, [started, finished]);

    // Stop the timer when it reaches 0 or when the test is finished
    useEffect(() => {
        if (timer === 0 || (started && currentIndex === sampleSentence.length)) {
            clearInterval(intervalRef.current);
            setFinished(true);
            textInputRef.current && textInputRef.current.blur();
        }
    }, [timer, currentIndex, started, sampleSentence]);


    useEffect(() => {
        // Scroll to the current index position
        if (sampleSentenceRef.current) {
            const scrollAmount = currentIndex * (16 + 4); // width of char + margin
            sampleSentenceRef.current.scrollLeft = scrollAmount - sampleSentenceRef.current.offsetWidth / 2; // Center the current character
        }
    }, [currentIndex]);

    const handleInputChange = (event) => {
        const input = event.target.value;
        setUserInput(input);
        setCurrentIndex(input.length);

        if (!started) {
            setStarted(true);
        }

        if (input.length >= sampleSentence.length) {
            setFinished(true);
            clearInterval(intervalRef.current);
        }
    };

    //click anywhere in test container to focus to input field.
    const focusInput = () => {
        textInputRef.current && textInputRef.current.focus();
    };

    const calculateWPM = () => {
        const wordsTyped = userInput.trim().split(' ').length;
        const timeSpent = started ? (initialTime - timer) / 60 : 1;
        const wpm = wordsTyped / timeSpent;
        return Math.round(wpm);
    };

    const calculateAccuracy = () => {
        const correctChars = userInput.split('').filter((char, index) => char === sampleSentence[index]).length;
        return (((correctChars)  / currentIndex) * 100).toFixed(0);
    };

    return (
        <>
            <div className="typingTestContainer" onClick={focusInput}>
                <div className="sampleText" ref={sampleSentenceRef}>
                    {isLoading && <LoadingBar/>}
                    {sampleSentence && sampleSentence.split('').map((char, index) => {
                    let charClass = char === ' ' ? 'space' : 'char';
                    let isCorrect = userInput[index] === char;
                    let isIncorrect = index < userInput.length && userInput[index] !== char;

                    // Add 'correctChar' or 'incorrectChar' class based on user input
                    if (isCorrect) {
                        charClass += ' correctChar';
                    } else if (isIncorrect) {
                        charClass += ' incorrectChar';
                    }

                    if (index === currentIndex) {
                        charClass += ' currentChar'; 
                    }

                    // Use non-breaking space for layout for spaces
                    let displayChar = char === ' ' ? '\u00A0' : char;

                    // Handle punctuation marks
                    if (['.', ',', ';', ':', '!', '?'].includes(char)) {
                        charClass += ' punctuation';
                    }

                    return (
                        <span key={index} className={charClass}>
                        {displayChar}
                        </span>
                    );
                    })}
                </div>
                <input ref={textInputRef} type="text" value={userInput} spellCheck="false" autoComplete="off" onChange={handleInputChange} disabled={isLoading || finished} id="typingInput" className="typingInput"/>
            </div>
            <div className="stats">
                <div id="timeStat" className="stat">
                    <p>Time left:</p>
                    <h2>{timer}s</h2>
                </div>
                <div id="speedStat" className="stat">
                    <p>Speed:</p>
                    <h2>{calculateWPM()} WPM</h2>
                </div>
                <div id="accuracyStat" className="stat">
                    <p>Accuracy:</p>
                    <h2>{calculateAccuracy()}%</h2>
                </div>
            </div>
            <div className="buttonContainer">
                {timeOptions.map((option) => (
                    <button key={option} onClick={() => setTime(option)}>
                    {option}s
                    </button>
                ))}
                <button onClick={resetTest}><ResetSVG/></button>
            </div>
            
        </>
    )
}

export default TypingSpeedTool;