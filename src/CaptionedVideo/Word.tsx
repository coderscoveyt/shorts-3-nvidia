import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {TheBoldFont} from '../load-font';
import {makeTransform, scale, translateY} from '@remotion/animation-utils';

const fontFamily = TheBoldFont;

export const Word: React.FC<{
	enterProgress: number;
	text: string;
	stroke: boolean;
}> = ({enterProgress, text, stroke}) => {

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				top: undefined,
				bottom: 75,
				height: 150,
			}}
		>
			<div
				style={{
					fontSize: '4.25rem',
					textAlign: 'center',
					color: 'white',
					background: 'black',
					WebkitTextStroke: stroke ? '20px black' : undefined,
					transform: makeTransform([
						scale(interpolate(enterProgress, [0, 1], [0.8, 1])),
						translateY(interpolate(enterProgress, [0, 1], [50, 0])),
					]),
					fontFamily,
					textTransform: 'uppercase',
				}}
			>
				{text}
			</div>
		</AbsoluteFill>
	);
};
