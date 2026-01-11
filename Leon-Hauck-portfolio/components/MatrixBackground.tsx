import React, { useEffect, useRef } from 'react';

interface MatrixBackgroundProps {
    words?: string[]; // Words to extract characters from, or display
    fontSize?: number;
    opacity?: number;
    speed?: number;
}

const MatrixBackground: React.FC<MatrixBackgroundProps> = ({
    words = ['PYTHON', 'SQL', 'DATA', 'REACT', 'CODE', 'LEON', 'ANALYSIS'],
    fontSize = 16,
    opacity = 0.05,
    speed = 60,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Matrix characters - mix of Katakana, Latin, and Numbers, plus characters from user words
        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        // Combine standard matrix chars with letters from user's words to personalize it
        const customChars = words.join('').toUpperCase() + ' ';
        const alphabet = katakana + latin + nums + customChars;

        const columns = Math.floor(canvas.width / fontSize);

        // State for each column
        // drops[i] = current y position (row)
        const drops: number[] = [];
        // columnData[i] = { word: string, charIndex: number } - which word is falling and which char next
        const columnData: { word: string; charIndex: number }[] = [];

        // Initialize drops and column data
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100; // Start widely scattered above
            columnData[i] = {
                word: words[Math.floor(Math.random() * words.length)],
                charIndex: 0
            };
        }

        const draw = () => {
            // translucent black background to show trail
            ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0'; // Green text
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < columns; i++) {
                const data = columnData[i];

                // Get the current character from the assigned word
                // If charIndex exceeds word length, we might print a space or reset
                let text = '';

                if (data.charIndex < data.word.length) {
                    text = data.word.charAt(data.charIndex);
                } else {
                    // Gap between words
                    text = ' ';
                }

                // Randomly make some characters brighter/white
                if (Math.random() > 0.98) {
                    ctx.fillStyle = '#FFF';
                } else {
                    ctx.fillStyle = '#0F0';
                }

                // Draw the character
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Update state for next frame

                // Move drop down
                drops[i]++;

                // Advance character index
                // We only advance char index if the drop is actually on screen or falling
                // To keep words intact, we simple advance charIndex every frame for this column
                columnData[i].charIndex++;

                // Reset condition: 
                // If drop is effectively off screen (randomized) OR we finished the word and want a gap?
                // Actually, simpler: when drops[i] resets to 0 (top), we pick a new word.
                // We also need to handle the case where the word finishes mid-screen. We want to start a new word or leave a gap.

                // Improved logic:
                // If we finished the word (plus some gap), reset charIndex to 0 and pick new word?
                // But we want the "stream" to be continuous? 
                // The standard matrix effect is one continuous stream per column.
                // If we want "PYTHON" then "SQL" in the same column:

                if (data.charIndex >= data.word.length + 5) { // +5 for gap
                    columnData[i].word = words[Math.floor(Math.random() * words.length)];
                    columnData[i].charIndex = 0;
                }

                // Reset drop to top randomly after it has crossed screen
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                    // When resetting to top, we should probably reset the word too so it starts fresh at top
                    columnData[i].word = words[Math.floor(Math.random() * words.length)];
                    columnData[i].charIndex = 0;
                }
            }
        };

        const interval = setInterval(draw, speed);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [words, fontSize, opacity, speed]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: 0.15 }} // Overall component opacity to blend with background color
        />
    );
};

export default MatrixBackground;
