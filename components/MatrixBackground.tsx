import React, { useEffect, useRef } from 'react';

interface MatrixBackgroundProps {
    words?: string[]; // Words that fall vertically, letter by letter
    fontSize?: number;
    trail?: number; // 0..1 — how fast the trail fades (lower = longer trail)
    speed?: number; // ms between steps
}

interface Stream {
    y: number; // head position, in rows
    step: number; // rows advanced per tick
    word: string;
    charIndex: number;
    gap: number; // filler glyphs left before the next word starts
    last: string; // last glyph drawn, repainted in green once the head moves on
    lastIsWord: boolean;
}

const KATAKANA = 'アカサタナハマヤラワイキシチニヒミリウクスツヌフムユルエケセテネヘメレオコソトノホモヨロヲン';
const DIGITS = '0123456789';
const FILLER = KATAKANA + DIGITS;

const HEAD_COLOR = '#d6ffe0';
const WORD_COLOR = '#00ff41';
const FILLER_COLOR = '#0a8f2a';
const BACKGROUND = '4, 8, 6'; // background-dark, as rgb

const pick = <T,>(list: ArrayLike<T>): T => list[Math.floor(Math.random() * list.length)];

const MatrixBackground: React.FC<MatrixBackgroundProps> = ({
    words = ['PYTHON', 'SQL', 'DATA', 'REACT', 'CODE', 'LEON', 'ANALYSIS'],
    fontSize = 16,
    trail = 0.07,
    speed = 55,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // Kept in a ref so a language switch swaps the words without restarting the rain
    const wordsRef = useRef(words);
    wordsRef.current = words;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        let width = 0;
        let height = 0;
        let streams: Stream[] = [];

        const newStream = (y: number): Stream => ({
            y,
            step: 0.5 + Math.random() * 0.5, // never above 1, so no row is skipped
            word: pick(wordsRef.current),
            charIndex: 0,
            gap: Math.floor(Math.random() * 12),
            last: '',
            lastIsWord: false,
        });

        const resize = () => {
            // Cap the pixel ratio: sharp on retina without quadrupling the fill cost
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
            ctx.textBaseline = 'top';

            const columns = Math.ceil(width / fontSize);
            const rows = height / fontSize;
            // Keep the streams that are already falling; only add/remove the difference
            streams = Array.from({ length: columns }, (_, i) => streams[i] ?? newStream(Math.random() * -rows));
        };

        const nextGlyph = (s: Stream): { glyph: string; isWord: boolean } => {
            if (s.gap > 0) {
                s.gap--;
                return { glyph: pick(FILLER), isWord: false };
            }
            const glyph = s.word.charAt(s.charIndex++);
            if (s.charIndex >= s.word.length) {
                s.word = pick(wordsRef.current);
                s.charIndex = 0;
                s.gap = 3 + Math.floor(Math.random() * 10);
            }
            // Spaces inside multi-word terms become filler so the stream never breaks
            return glyph === ' ' ? { glyph: pick(FILLER), isWord: false } : { glyph, isWord: true };
        };

        const tick = () => {
            // Translucent fill over the previous frame is what leaves the fading trail
            ctx.fillStyle = `rgba(${BACKGROUND}, ${trail})`;
            ctx.fillRect(0, 0, width, height);

            for (let i = 0; i < streams.length; i++) {
                const s = streams[i];
                const prevRow = Math.floor(s.y);
                s.y += s.step;
                const row = Math.floor(s.y);
                if (row === prevRow) continue;

                const x = i * fontSize;

                // The glyph that was the bright head becomes part of the green trail
                if (s.last) {
                    ctx.fillStyle = `rgb(${BACKGROUND})`;
                    ctx.fillRect(x, prevRow * fontSize, fontSize, fontSize);
                    ctx.fillStyle = s.lastIsWord ? WORD_COLOR : FILLER_COLOR;
                    ctx.fillText(s.last, x, prevRow * fontSize);
                }

                const { glyph, isWord } = nextGlyph(s);
                ctx.fillStyle = HEAD_COLOR;
                ctx.fillText(glyph, x, row * fontSize);
                s.last = glyph;
                s.lastIsWord = isWord;

                if (row * fontSize > height && Math.random() > 0.975) {
                    streams[i] = newStream(-1);
                }
            }
        };

        let frame = 0;
        let lastTick = 0;

        const loop = (now: number) => {
            frame = requestAnimationFrame(loop);
            if (now - lastTick < speed) return;
            lastTick = now;
            tick();
        };

        const start = () => {
            cancelAnimationFrame(frame);
            if (reducedMotion.matches) {
                // No animation: paint one settled frame and stop
                ctx.clearRect(0, 0, width, height);
                for (let i = 0; i < 90; i++) tick();
                return;
            }
            if (!document.hidden) frame = requestAnimationFrame(loop);
        };

        const onResize = () => {
            resize();
            start();
        };

        resize();
        start();

        window.addEventListener('resize', onResize);
        document.addEventListener('visibilitychange', start);
        reducedMotion.addEventListener('change', start);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('resize', onResize);
            document.removeEventListener('visibilitychange', start);
            reducedMotion.removeEventListener('change', start);
        };
    }, [fontSize, trail, speed]);

    return (
        <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
            <canvas ref={canvasRef} className="w-full h-full opacity-30 md:opacity-40" />
            {/* Darkens the middle of the screen, where the content sits, and lets the rain show at the edges */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(4,8,6,0.85)_0%,rgba(4,8,6,0.65)_50%,rgba(4,8,6,0.2)_100%)]" />
        </div>
    );
};

export default MatrixBackground;
