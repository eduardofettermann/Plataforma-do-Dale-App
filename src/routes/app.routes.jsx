import { Routes, Route } from 'react-router-dom';

import { Home } from '../pages/Home';

import { Profile } from '../pages/Profile';

import { Students } from '../pages/Students';

import { Login } from '../pages/Login';

import useAuth from './use.auth';

const Private = ({ Item }) => {
    const { signed } = useAuth();

    return signed ? <Item /> : <Login />;
}


export function AppRoutes() {
    return (
        <Routes>

            <Route path="profile/:studentId" element={<Profile />} />

            <Route path="students/" element={<Students />} />

            <Route path="/home" element={<Private Item={Home} />}/>
            
            <Route path="/" element={<Login />} />

            <Route path="*" element={<Login />} />
            {/* <Route path="/profile/:id" element={<Profile />} /> */}

        </Routes>
    )
}