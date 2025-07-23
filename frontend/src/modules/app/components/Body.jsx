import { Route, Routes } from 'react-router-dom';
import Home from './Home';

import AgenciesEditor from '../../editors/AgenciesEditor.jsx';
import StopsEditor from '../../editors/StopsEditor.jsx';
import RoutesEditor from '../../editors/RoutesEditor.jsx';
import CalendarEditor from '../../editors/CalendarEditor.jsx';


const Body = () => {
    return (
        <main className='mt-3 mb-3'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/agencies' element={<AgenciesEditor />} />
                <Route path='/stops' element={<StopsEditor />} />
                <Route path='/routes' element={<RoutesEditor />} />
                <Route path='/calendar' element={<CalendarEditor />} />
            </Routes>
        </main>
    );
};

export default Body;
