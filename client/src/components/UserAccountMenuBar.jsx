import { NavLink } from "react-router-dom";
import { FullPageContainer, PageSizedContainer, RowFlexedContainer } from "../styles/GeneralStyledComponents";
import { useEffect, useState } from "react";

export default function UserAccountMenuBar() {
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('userInfo')));
    }, []);

    return (
        <FullPageContainer style={{ background: 'white', marginTop:'80px', color: 'black', padding: '10px 0px' }}>
            <PageSizedContainer style={{ padding: '0px'}}>
                <RowFlexedContainer style={{ justifyContent:'center', background: 'white', width: '100%', gap: '20px', alignItems: "center" }}>
                    {(user.userType !== 'Manager' && user.userType !== 'DJ') && <NavLink className='secondary-menu-item' to={'/dash/my-bookings'}>My bookings</NavLink>}
                    {user.userType === 'Manager' &&
                        <>
                            <NavLink className='secondary-menu-item' to={'/dash/'}>Dashboard / Home</NavLink>
                            <NavLink className='secondary-menu-item' to={'/dash/bookings'}>Bookings</NavLink>
                            <NavLink className='secondary-menu-item' to={'/dash/schedules'}>Schedules</NavLink>
                            <NavLink className='secondary-menu-item' to={'/dash/djs'}>DJs</NavLink>
                        </>
                    }
                    <NavLink className='secondary-menu-item' to={'/dash/settings'}>Settings</NavLink>
                </RowFlexedContainer>
            </PageSizedContainer>
        </FullPageContainer>
    )
}
