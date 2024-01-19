import ReactDOM  from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { QueryProvider } from './lib/react_query/QueryProvider';
import { ThemeProvider } from './context/ThemeContext';
ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider>
    <BrowserRouter>
        <QueryProvider>
         <AuthProvider>
             <App/>
        </AuthProvider>
        </QueryProvider>
    </BrowserRouter>
    </ThemeProvider>
    
)