function Star({ fill, index }) {
    const clipId = `star-clip-${index}`;

    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            className="m-1"
        >
            <defs>
                <clipPath id={clipId}>
                    <rect
                        width={16 * fill}
                        height="16"
                    />
                </clipPath>
            </defs>

            {/* Empty/background star */}
            <path
                fill="none"
                stroke="currentColor"
                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
            />

            {/* Filled portion */}
            <path
                fill="gold"
                clipPath={`url(#${clipId})`}
                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
            />
        </svg>
    );
}
export { Star };