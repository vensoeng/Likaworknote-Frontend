import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import WebLoader from "../../components/WebLoader";
import '../../assets/css/admin/header.css';
import '../../assets/css/from.css';

import { NavLink, useLocation } from 'react-router-dom';
import { 
    HamburgerMenu,
    Stickynote,
    HomeHashtag,
    Setting2,
    MainComponent,
    BrifecaseTimer
} from 'iconsax-reactjs';

function AdminLayout() {
    const location = useLocation();
    const { user, getProfileImage, loading } = useAuth();
    const [toggleAside, setToggleAside] = useState<boolean>(false);

    const getPageTitle = () => {
        switch (location.pathname) {
            case '/admin/dashboard':
                return 'ផ្ទាំងគ្រប់គ្រង';
            case '/tasks':
                return 'ផ្ទាំងភារកិច្ច';
            case '/type/tasks':
                return 'ផ្ទាំងប្រភេទ';
            case '/user/setting':
                return 'ផ្ទាំងកំណត់';
            default:
                return 'ផ្ទាំងគ្រប់គ្រង';
        }
    };

    if (loading) {
        return <WebLoader>កំពុងផ្ទុក</WebLoader>;
    }

    const handleToggleAside = () => {
        setToggleAside((prev) => !prev);
    };

    const handleNavigation = () => {
        setToggleAside(false);
    };
    return (
        <>
            {/* Header */}
            <header className={toggleAside ? "web-head active-dash" : "web-head"}>
                <div className="wh-box df-s">
                    <div className="row">
                        <div className='row-box df-l'>
                            <button 
                                className='icon-ra wah-action icon-sm df-c'
                                onClick={() => handleToggleAside()}
                            >
                                <HamburgerMenu/>
                            </button>
                            <div className='txt'>
                                <h1>{getPageTitle()}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className='row-box df-l'>
                            <ul className='df-c'>
                                <li>
                                    <div className="btn btn-create">
                                        <NavLink to="/tasks" className='df-c'>
                                            <Stickynote />
                                            <span>បន្ថែមភារកិច្ច</span>
                                        </NavLink>
                                    </div>
                                </li>
                            </ul>
                            <NavLink to='/user/setting' className='user-infor df-l'>
                                <div className='user-profile icon over-h'>
                                    <img src={getProfileImage(user?.pr_img)} className='img-c' alt="user images!" />
                                </div>
                                <h2>{user?.firstName || ''} {user?.lastName || ''}</h2>
                            </NavLink>
                            <div className='menu toggle-menu'>
                                <div className='menu-box icon-sm over-h df-c'>
                                  <HamburgerMenu/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Aside Sidebar */}
            <aside className='web-aside'>
                <div className='wa-box'>
                    <div className='wa-head'>
                        <div className='wah-box df-s'>
                            <h2>ជម្រើសម៉ឺនុយ</h2>
                            <button 
                                className='wah-action icon-sm df-c'
                                onClick={() => handleToggleAside()}
                            >
                                <HamburgerMenu/>
                            </button>
                        </div>
                    </div>
                    <div className='wa-con'>
                        <div className='wac-box scroll-y'>
                            <ul>
                                <li>
                                    <NavLink 
                                        className={({ isActive }) => isActive ? "df-l active" : "df-l"} 
                                        to="/user/dashboard"
                                        onClick={handleNavigation}
                                    >
                                        <div className='icon icon-sm over-h df-c'>
                                            <HomeHashtag />
                                        </div>
                                        <p>ផ្ទាំងគ្រប់គ្រង</p>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        className={({ isActive }) => isActive ? "df-l active" : "df-l"}
                                        to="/tasks"
                                        onClick={handleNavigation}
                                    >
                                        <div className='icon icon-sm over-h df-c'>
                                            <Stickynote />
                                        </div>
                                        <p>ភារកិច្ច</p>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        className={({ isActive }) => isActive ? "df-l active" : "df-l"} 
                                        to="/type/tasks"
                                        onClick={handleNavigation}
                                    >
                                        <div className='icon icon-sm over-h df-c'>
                                            <MainComponent />
                                        </div>
                                        <p>ប្រភេទភារកិច្ច</p>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        className={({ isActive }) => isActive ? "df-l active" : "df-l"} 
                                        to="/user/setting"
                                        onClick={handleNavigation}
                                    >
                                        <div className='icon icon-sm over-h df-c'>
                                            <Setting2 />
                                        </div>
                                        <p>ការកំណត់</p>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='wa-foot'>
                        <div className='waf-box'>
                            <blockquote>
                                <p><strong>Likaworknote</strong> Open Source Project!</p>
                                <a href='/service'>@Version 1.0.0</a>
                            </blockquote>
                        </div>
                    </div>
                </div>
                <div className="web-aside-overlay" onClick={() => handleToggleAside()}></div>
            </aside>
        </>
    );
}

export default AdminLayout;