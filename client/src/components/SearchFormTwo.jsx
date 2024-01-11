import React, { useContext } from "react";
import { ScrollContext } from "../App";
import { useEffect, useState } from "react";
import { SearchForm as SearchFormStyles, CustomInputField1 } from '../styles/GeneralStyledComponents';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function SearchFormTwo() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { showSearchForm } = useContext(ScrollContext);
    const [searchName, setSearchName] = useState('');
    const [searchLocation, setSearchLocation] = useState('');

    const handleLocationInput = ({ currentTarget: input }) => {
        setSearchLocation(input.value);
    }

    const handleNameInput = ({ currentTarget: input }) => {
        setSearchName(input.value);
    }

    useEffect(() => {
        console.log(window.location.pathname);
    },[])
    
    const Search = (e) => {
        e.preventDefault();

        if (searchName && searchLocation) {
            dispatch({type: 'user/manualSearch', payload: searchName });
            dispatch({type: 'booking/manualSearch', payload: searchLocation });
        } else if (searchName && !searchLocation) {
            dispatch({type: 'user/manualSearch', payload: searchName });
        } else if (!searchName && searchLocation) {
            dispatch({type: 'booking/manualSearch', payload: searchLocation });
        }

        navigate('/search');
    }

    return (
        <SearchFormStyles onSubmit={Search}>
            <CustomInputField1 
                type="text" 
                id="name" 
                name="name" 
                value={searchName} 
                placeholder="Search by name" 
                onChange={handleNameInput} 
                style={{ 
                    color:'white',
                    background: 'transparent', 
                    border: '1px solid white',
                    borderRadius: '10px 0 0 10px', 
                    width: showSearchForm && '170px',
                }}
            />
            <CustomInputField1 
                type="text" 
                id="location" 
                name="location"
                value={searchLocation} 
                placeholder="Search by location" 
                onChange={handleLocationInput}
                style={{ 
                    color: 'white',
                    background: 'transparent', 
                    border: '1px solid white',
                    width: showSearchForm && '170px',
                }}
            />
            <CustomInputField1 
                type='submit'
                value='Search'
                style={{ 
                    color: 'white',
                    background: 'transparent', 
                    border: '1px solid white',
                    borderRadius: '0 10px 10px 0',
                }}
            />
        </SearchFormStyles>
    )
}
