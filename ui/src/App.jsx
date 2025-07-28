// Import the Chat component from the components directory
import Chat from './components/Chat';
// Import the CSS styles for this component
import './App.css';

// Main App component - the root component of our React application
function App() {
  return (
    <div className="App">
      {/* 
        Render the Chat component which contains:
        - Chat interface
        - Message handling
        - API communication
      */}
      <Chat />
    </div>
  );
}

// Export the App component as the default export
export default App;
