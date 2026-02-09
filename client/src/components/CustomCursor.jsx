import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isPointer, setIsPointer] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 150 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            const isClickable =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('button') ||
                target.closest('a') ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsPointer(isClickable);
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="custom-cursor"
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
            }}
        >
            <motion.div
                className="cursor-inner"
                animate={{
                    scale: isPointer ? 2.5 : 1,
                    backgroundColor: isPointer ? 'rgba(0, 255, 170, 0.2)' : 'rgba(0, 255, 170, 1)',
                    border: isPointer ? '1px solid rgba(0, 255, 170, 0.5)' : 'none',
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            />
            {isPointer && (
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="cursor-text"
                >
                    VIEW
                </motion.div>
            )}
        </motion.div>
    );
};

export default CustomCursor;
