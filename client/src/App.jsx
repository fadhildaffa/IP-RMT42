import router from './route/Index'
import { RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
function App() {

  return (
    
    <GoogleOAuthProvider clientId="981028212529-jegfjv3vhdadlkkii67tthhsv9hisjom.apps.googleusercontent.com">
    <RouterProvider router={router}/> 
    </GoogleOAuthProvider>
    
  )
}

export default App
