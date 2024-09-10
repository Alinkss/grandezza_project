'use client';
import { useState } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

export default function GoogleMapsCoordinates() {
	const [markerPosition] = useState({
		lat: 48.438878629703396,
		lng: 35.051545491521516,
	});

	return (
		<div className="w-[60%] max-sm:w-full max-sm:min-h-[300px]">
			<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_CLOUD_SERVICE_API!}>
				<Map
					defaultZoom={17}
					defaultCenter={markerPosition}
					gestureHandling={'greedy'}
					disableDefaultUI>
					<Marker position={markerPosition} />
				</Map>
			</APIProvider>
		</div>
	);
}
