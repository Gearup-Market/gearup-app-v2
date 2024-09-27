"use client";
import React, { useEffect, useState } from "react";

const Countdown: React.FC<{ start: number; setValue?: (num: number) => void }> = ({
	start,
	setValue
}) => {
	const [count, setCount] = useState(start);

	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (count > 0) {
			timer = setInterval(() => {
				setCount(prevCount => {
					if (prevCount === 0) {
                        if (setValue) setValue(0);
                        return 0
                    };
                    if (setValue) setValue(prevCount - 1);
					return prevCount - 1;
				});
			}, 1000);
		}

		return () => {
			clearInterval(timer);
		};
	}, [count, start]);

	return <span>{count}</span>;
};

export default Countdown;
