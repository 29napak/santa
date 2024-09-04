// App.tsx
import React from 'react';
import SantaForm from './components/SantaForm';
import './App.css'; // Import CSS for glitter animation

const App = () => {
    return (
        <div className="app-container">
            {/* Creating star animation */}
            <div className="stars">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="star"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`
                        }}
                    ></div>
                ))}
            </div>
            <SantaForm />
        </div>
    );
};

export default App;
