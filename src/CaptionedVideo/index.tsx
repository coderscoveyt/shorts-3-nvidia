import {useCallback, useEffect, useState} from 'react';
import {
	AbsoluteFill,
	Audio,
	CalculateMetadataFunction,
	cancelRender,
	continueRender,
	delayRender,
	Easing,
	getStaticFiles,
	Img,
	interpolate,
	OffthreadVideo,
	Sequence,
	staticFile,
	useCurrentFrame,
	watchStaticFile,
} from 'remotion';
import {z} from 'zod';
import Subtitle from './Subtitle';
import {loadFont} from '../load-font';
import {NoCaptionFile} from './NoCaptionFile';
import Circle from './Circle';

const center = {
	width: '1080px',
	height: '1920px',
	display: 'grid',
	placeItems: 'center'
}

const tight = {
	position: 'absolute',
	width: `calc(1080px * 0.4)`,
	height: "900px"
}

const shorts = staticFile(`/shorts3.wav`);
const nvidia = staticFile(`/nvidia.jpg`);
const b200 = staticFile(`/b200.jpg`);
const h100 = staticFile(`/h100.jpg`);
const h100Announcement = staticFile(`/h100-announcement.png`);
const transistor = staticFile(`/transistor.jpg`);
const operatingCosts = staticFile(`/operating-costs.png`);
const chatgpt = staticFile(`/chatgpt.png`);
const gbsuperchip = staticFile(`/gbsuperchip.png`);
const graceCpu = staticFile(`/grace-cpu.jpg`);
const params = staticFile(`/params.png`);
const modernAi = staticFile(`/modern-ai.jpg`);
const bg = staticFile(`/bg.wav`);

export type SubtitleProp = {
	id: number;
	start: number;
	end: number;
	text: string;
};

export const captionedVideoSchema = z.object({
	src: z.string(),
});

export const calculateCaptionedVideoMetadata: CalculateMetadataFunction<
	z.infer<typeof captionedVideoSchema>
> = async ({props}) => {
	const fps = 30;

	return {
		fps,
		durationInFrames: 1410,
	};
};

const getFileExists = (file: string) => {
	const files = getStaticFiles();
	const fileExists = files.find((f) => {
		return f.src === file;
	});
	return Boolean(fileExists);
};

export const CaptionedVideo: React.FC<{
	src: string;
}> = ({src}) => {
	const frame = useCurrentFrame()
	const [subtitles, setSubtitles] = useState<SubtitleProp[]>([]);
	const [handle] = useState(() => delayRender());
	const translateY = interpolate(frame, [460, 470], [0, 1920], {
		easing: Easing.inOut(x => x),
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp'
	})

	const opacity = interpolate(frame, [655, 680], [1, 0], {
		easing: Easing.inOut(x => x),
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp'
	});

	const percentage = interpolate(frame, [800, 815], [0, 100])

	const subtitlesFile = src
		.replace(/.mp4$/, '.json')
		.replace(/.mkv$/, '.json')
		.replace(/.mov$/, '.json')
		.replace(/.webm$/, '.json');

	const fetchSubtitles = useCallback(async () => {
		try {
			await loadFont();
			const res = await fetch(subtitlesFile);
			const data = await res.json();
			setSubtitles(data);
			continueRender(handle);
		} catch (e) {
			cancelRender(e);
		}
	}, [handle, subtitlesFile]);

	useEffect(() => {
		fetchSubtitles();

		const c = watchStaticFile(subtitlesFile, () => {
			fetchSubtitles();
		});

		return () => {
			c.cancel();
		};
	}, [fetchSubtitles, src, subtitlesFile]);

	return (
		<AbsoluteFill style={{backgroundColor: 'white'}}>
			<AbsoluteFill>
				<OffthreadVideo
					style={{ objectFit: 'cover', height: '1920px' }}
					src={src}
				/>
				<Sequence from={140} durationInFrames={25}>
					<div style={center}>
						<Img src={nvidia} style={{ width: '1080px', height: '1080px' }} />
					</div>
				</Sequence>
				<Sequence from={180} durationInFrames={70}>
					<div style={center}>
						<Img src={b200} style={{ width: '1080px', height: '1080px' }} />
					</div>
				</Sequence>
				<Sequence from={350} durationInFrames={70}>
					<h1 style={{ marginTop: '5rem', textAlign: 'center', width: '1080px', color: 'white', fontSize: '5rem', fontFamily: 'sans-serif' }}>
						208{frame > 375 ? ".000.000.000 X" : ""}
					</h1>
					<Sequence from={45}>
						<div style={center}>
							<Img src={transistor} style={{ width: '1080px', height: '1080px' }} />
						</div>
					</Sequence>
				</Sequence>
				<Sequence from={460} durationInFrames={20}>
					<h1 style={{ marginTop: '5rem', textAlign: 'center', width: '1080px', fontSize: '35rem', fontFamily: 'sans-serif', transform: `translateY(${translateY}px)`, color: 'firebrick' }}>
						&darr;
					</h1>
				</Sequence>
				<Sequence from={510} durationInFrames={30}>
					<div style={center}>
						<Img src={operatingCosts} style={{ width: '1080px', height: '1750px' }} />
					</div>
				</Sequence>
				<Sequence from={570} durationInFrames={30}>
					<div style={center}>
						<Img src={chatgpt} style={{ width: '1080px', height: '1080px' }} />
					</div>
				</Sequence>
				<Sequence from={655} durationInFrames={25}>
					<div style={center}>
						<h1 style={{ opacity, textAlign: 'center', width: '1080px', fontSize: '22rem', fontFamily: 'sans-serif', color: 'firebrick' }}>
							-25%
						</h1>
					</div>
				</Sequence>
				<Sequence from={700} durationInFrames={30}>
					<div style={center}>
						<Img src={h100} style={{ width: '1080px', height: '1080px' }} />
					</div>
				</Sequence>
				<Sequence from={740} durationInFrames={80}>
					<div style={center}>
						<Img src={h100Announcement} style={{ width: '1080px', height: '1080px' }} />
					</div>
					<Sequence from={60}>
						<div style={{ position: 'absolute', top: "1125px", left: '-1rem' }}>
							<Circle percentage={percentage} />
						</div>
					</Sequence>
				</Sequence>
				<Sequence from={870} durationInFrames={50}>
					<div style={{ ...center, height: '1800px', width: '1080px' }}>
						<Img src={gbsuperchip} />
					</div>
				</Sequence>
				<Sequence from={965} durationInFrames={140}>
					<Img src={b200} style={{ ...tight, left: 0 }} />
					<Sequence from={5}>
						<h1 style={{ marginLeft: '3rem', marginRight: '3rem', textAlign: 'center', width: '1080px', fontSize: '25rem', fontFamily: 'sans-serif', color: 'white' }}>+</h1>
						<Sequence from={10}>
							<Img src={b200} style={{ ...tight, right: 0 }} />
							<Sequence from={25}>
								<h1 style={{ marginTop: "50rem", textAlign: 'center', width: '1080px', fontSize: '25rem', fontFamily: 'sans-serif', color: 'white' }}>+</h1>
								<Sequence from={25}>
									<Img src={graceCpu} style={{ position: 'absolute', bottom: '200px', width: '1080px', height: '500px' }} />
								</Sequence>
							</Sequence>
						</Sequence>
					</Sequence>
				</Sequence>
				<Sequence from={1190} durationInFrames={70}>
					<Img src={params} style={{ position: 'absolute', top: '35rem', width: '1080px', height: '700px' }} />
				</Sequence>
				<Sequence from={1275} durationInFrames={70}>
					<Img src={modernAi} style={{ position: 'absolute', top: '35rem', width: '1080px', height: '700px' }} />
				</Sequence>
				<Audio src={shorts} />
				<Audio src={bg} />
			</AbsoluteFill>
			{subtitles.map((subtitle, index) => {
				const subtitleStartFrame = subtitle.start;
				const subtitleEndFrame = subtitle.end;
				const durationInFrames = subtitleEndFrame - subtitleStartFrame;
				if (frame < subtitleStartFrame || frame > subtitleEndFrame) return null;
				return (
					<Sequence
						from={subtitleStartFrame}
						durationInFrames={durationInFrames}
					>
						<Subtitle key={index} text={subtitle.text} />;
					</Sequence>
				);
			})}
			{getFileExists(subtitlesFile) ? null : <NoCaptionFile />}
		</AbsoluteFill>
	);
};
