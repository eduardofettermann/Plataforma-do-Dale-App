import { Routes, Route } from 'react-router-dom';

import { Home } from '../pages/Home';

import { Profile } from '../pages/Profile';

import { Students } from '../pages/Students';

import { Login } from '../pages/Login';

export function AppRoutes() {
    return (
        <Routes>

            <Route path="profile/:studentId" element={<Profile />} />

            <Route path="students/" element={<Students />} />

            <Route path="/" element={<Home />}/>
            
            <Route path="login/" element={<Login />} />
            {/* <Route path="/profile/:id" element={<Profile />} /> */}

        </Routes>
    )
}