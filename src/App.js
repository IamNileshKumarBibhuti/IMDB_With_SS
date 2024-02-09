import React, { useState, useEffect } from 'react';
import { Flex, Button, ThemeProvider } from '@sparrowengg/twigs-react';
import Main from './components/main'; // Ensure this path matches your file structure
import MovieSurveyGenerator from './components/MovieSurveyGenerator'; // Ensure this path matches your file structure

const App = () => {
  // Initialize with 'survey' to show MovieSurveyGenerator first
  const [activeComponent, setActiveComponent] = useState('survey');
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [client, setClient] = useState(null);

  useEffect(() => {
    // Placeholder for your initialization logic
    const initializeClient = async () => {
      try {
        // Simulate client initialization with a delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setClient({}); // Simulated client object, replace with actual initialization
        setIsAppLoaded(true);
      } catch (error) {
        console.error('Error initializing client:', error);
      }
    };

    initializeClient();
  }, []);

  // Function to render the active component based on the current state
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'main':
        return <Main client={client} />;
      case 'survey':
        return <MovieSurveyGenerator />;
      default:
        return <Main client={client} />;
    }
  };

  return (
    <ThemeProvider theme={{ fonts: { body: "'DM Sans', sans-serif" } }}>
      {isAppLoaded ? (
        <Flex flexDirection="column" alignItems="center" css={{ width: "100%", minHeight: "100vh", padding: "$5" }}>
          <Flex justifyContent="space-between" css={{ width: "100%", maxWidth: "800px", marginBottom: "$5" }}>
            <Button onClick={() => setActiveComponent('main')} variant={activeComponent === 'main' ? 'solid' : 'outline'}>
              Home
            </Button>
            <Button onClick={() => setActiveComponent('survey')} variant={activeComponent === 'survey' ? 'solid' : 'outline'}>
              Generate Survey
            </Button>
          </Flex>
          {renderActiveComponent()}
        </Flex>
      ) : (
        <Flex alignItems="center" justifyContent="center" css={{ flex: 1 }}>Loading...</Flex>
      )}
    </ThemeProvider>
  );
};

export default App;
