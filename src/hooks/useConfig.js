import { useEffect, useState } from 'react';

const useConfig = () => {
    const [config, setConfig] = useState(null);
    const [error, setError] = useState(null); // Add an error state to track fetch issues

    useEffect(() => {
        console.log('Fetching config.json...');

        // Attempt to fetch the config file
        fetch('/config.json')
            .then((response) => {
                console.log('Response status:', response.status); // Log the response status

                if (!response.ok) {
                    throw new Error('Failed to load config.json');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Config data:', data); // Log the data received from config.json
                setConfig(data);
            })
            .catch((error) => {
                console.error('Error loading config:', error); // Log the error
                setError(error.message); // Update error state
            });
    }, []); // Empty dependency array ensures this runs once when the component mounts

    // Log the current state of config and error
    console.log('Current config:', config);
    console.log('Error state:', error);

    return { config, error }; // Return both config and error for better debugging
};

export default useConfig;
