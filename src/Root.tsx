import {Composition, staticFile} from 'remotion';
import {
	CaptionedVideo,
	calculateCaptionedVideoMetadata,
	captionedVideoSchema,
} from './CaptionedVideo';

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
	return (
		<Composition
			id="CaptionedVideo"
			component={CaptionedVideo}
			calculateMetadata={calculateCaptionedVideoMetadata}
			schema={captionedVideoSchema}
			durationInFrames={1410}
			width={1080}
			height={1920}
			defaultProps={{src: staticFile('shorts3.mp4')}}
		/>
	);
};
