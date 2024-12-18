import React from 'react';
import '../styles/DefaultDashboardContent.css';

const DefaultDashboardContent = () => {
  return (
    <div className="default-dashboard-content">
      <div className="card">
        <h3>Card 1</h3>
        <p>This is some content for card 1.</p>
      </div>
      <div className="card">
        <h3>Card 2</h3>
        <p>This is some content for card 2.</p>
      </div>
      <div className="card">
        <h3>Card 3</h3>
        <p>This is some content for card 3.</p>
      </div>
    </div>
  );
};

export default DefaultDashboardContent;