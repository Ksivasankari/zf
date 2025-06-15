import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App.tsx';
// import './index.css';
// import { MemberProvider } from './context/MemberContext'; // ✅ adjust path if needed

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <MemberProvider>
//       <App />
//     </MemberProvider>
//   </StrictMode>
// );
