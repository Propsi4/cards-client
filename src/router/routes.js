import App from "../App";
import Lobby from "../components/Lobby/Lobby";


export const publicRoutes = [
    {path: '/play/:roomID', element: <App/>},
    {path: '/', element: <Lobby/>},
]

