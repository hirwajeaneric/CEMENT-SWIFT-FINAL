import React, { useContext, useEffect, useState } from "react";
import { SearchForm as SearchFormStyles, FormElement, CustomButton } from '../styles/GeneralStyledComponents';
import { ScrollContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function SearchForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { showSearchForm } = useContext(ScrollContext);
    const [searchName, setSearchName] = useState('');
    const [searchLocation, setSearchLocation] = useState('');
    const [searchOption, setSearchOption] = useState('all');

    const handleSearchLocation = ({currentTarget: input}) => {
        setSearchLocation(input.value);
        dispatch({type: 'booking/dynamicSearch', payload: input.value });
    }

    const handleSearchOption = ({ currentTarget: input }) => {
        setSearchOption(input.value);
        if (input.value === 'all') {
            dispatch({ type:'user/changeSearchOption', payload: input.value });
            dispatch({ type:'booking/changeSearchOption', payload: input.value });
        } else if (input.value === 'name') {
            dispatch({ type:'user/changeSearchOption', payload: input.value });
        } else if (input.value === 'location') {
            dispatch({ type:'booking/changeSearchOption', payload: input.value });
        }
    }

    const handleSearchName = ({currentTarget: input}) => {
        setSearchName(input.value);
        dispatch({type: 'user/dynamicSearch', payload: input.value });
    }

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
        <SearchFormStyles style={{ gap: '20px' }} onSubmit={Search}>
            {window.location.pathname === '/search' && <>
                <h3 style={{ color: 'black' }}>Options: </h3>
                <FormElement>
                    <select onChange={handleSearchOption} style={{ background:'white', color: 'black' }} name="searchOption" id="searchOption">
                        <option value={''}>Choose option</option>
                        <option value={'all'}>All</option>
                        <option value={'location'}>Location</option>
                        <option value={'name'}>Name</option>
                    </select>
                </FormElement>
            </>}
            {(searchOption === 'all' || searchOption === 'name' ) && <FormElement>
                <input type="text" 
                    id="name" 
                    name="name"
                    value={searchName} 
                    placeholder="Search by name" 
                    onChange={window.location.pathname === '/search' ? handleSearchName : handleNameInput} 
                    style={{ 
                        color:'black',
                        background: 'white', 
                        borderRadius: '5px', 
                        width: showSearchForm && '170px',
                    }}
                />
            </FormElement>}
            {(searchOption === 'all' || searchOption === 'location' ) && <FormElement>
                <input 
                    type="text" 
                    id="location" 
                    name="location"
                    value={searchLocation} 
                    placeholder="Search by location" 
                    onChange={window.location.pathname === '/search' ? handleSearchLocation : handleLocationInput}
                    style={{ 
                        color: 'black',
                        background: 'white', 
                        borderRadius: '5px', 
                        width: showSearchForm && '170px',
                    }}    
                />
            </FormElement>}
            {window.location.pathname !== '/search' && <CustomButton type='submit' >Search</CustomButton>}
        </SearchFormStyles>
    )
}
