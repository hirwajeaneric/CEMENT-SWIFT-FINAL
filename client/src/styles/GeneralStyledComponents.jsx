import { Box, TextField, Button, Select } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const FullPageContainer = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 0 auto;
    position: relative;
`;

export const BodySections = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    heigh: 100%;
    position: relative;
`;

export const RowFlexedContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    .secondary-menu-item {
        color: black;
        text-decoration: none;
        font-size: 90%;
        
        &:hover {
            color: purple;
        }

        &.active {
            color: green;
            font-weight: 500;
        }
    }

    .image-container {
        height: 400px;

        @media (max-width: 768px) {
            height: 250px;
        }
    
        @media (max-width: 480px) {
        
        }
    }

    .left, .right, .image-container {
        display: flex;
        align-items: center;
        width: 48%;

        @media (max-width: 768px) {
            width: 100%;
            margin-bottom: 20px;
        }
    
        @media (max-width: 480px) {
        }
    }

    @media (max-width: 1024px) {
        padding: 0 40px;        
    }

    @media (max-width: 768px) {
        flex-wrap: wrap;
        padding: 0 30px;
    }

    @media (max-width: 480px) {
        padding: 0 10px;
    }
`;

export const PageLoadingComponent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 80vh;
`;

export const RowFlexedContainer2 = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;

    .left, .right {
        width: 48%;
    }

    @media (max-width: 1024px) {
                
    }

    @media (max-width: 768px) {
        flex-wrap: wrap;
        
        .left, .right {
            width: 100%;
        }   
        .left {
            margin-bottom: 20px;
        }
    }

    @media (max-width: 480px) {
        
    }

`;

export const RowFlexedContainerForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: nowrap;

    input, textarea, select {
        padding: 8px 12px;
        background: white;
        border: 1px solid gray;
        border-radius: 5px;
        width: 100%;
        color: black;
        font-family: poppins;
    }

    .left, .right {
        width: 48%;

        .data-container {
            font-size: 90%;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            flex-wrap: nowrap;
            margin-bottom: 10px;

            .description {
                width: 40%;
                color: grey;
                font-weight: 500;
            }

            .data {
                width: 60%;
            }
        }
    }

    @media (max-width: 1024px) {
        flex-wrap: nowrap;
    }

    @media (max-width: 768px) {
        flex-wrap: wrap;

        .left, .right {
            width: 100%;
        }   
        .left {
            margin-bottom: 20px;
        }
    }

    @media (max-width: 480px) {
        
    }

`;

export const MapContainer = styled.div`
    width: 100%; 
    height: 400px;
    margin: 20px 0;
    border: 1px solid gray; 
    border-radius: 5px;
    

    iframe {
        width: 100%;
        height: 100%;
    }

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        height: 300px;
        margin: 40px 0;
    }

    @media (max-width: 480px) {
        height: 200px;
        margin: 20px 0;
    }
`;

export const PageSizedContainer = styled.div`;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1240px;
    width: 100%;
    flex-direction: column;
    align-items: center;
    padding: 80px 80px;

    @media (max-width: 1024px) {
        padding: 50px 40px;        
    }

    @media (max-width: 768px) {
        padding: 50px 30px;
    }

    @media (max-width: 480px) {
        padding: 40px 10px;
    }
`;

export const NavigationBarContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    transition: background-color 0.3s;
    display: flex;
    justify-content: center;
    height: 70px;
    align-items: center;
    padding: 0 80px; 
    z-index: 9999; 
    left: 50%; 
    transform: translateX(-50%); 

    img {
        width: 100px;
    }   

    .inner-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 80px;
        max-width: 1240px;
        width: 100%;
        gap: 10px;
    }

    @media (max-width: 1024px) {
      padding: 0 40px;        
    }

    @media (max-width: 768px) {
        padding: 0 30px;
        height: 60px;
    }

    @media (max-width: 480px) {
        padding: 0 10px;
        height: 50px;
    }
`;

export const DesktopNavigation = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    font-size: 90%;

    a {
        font-weight: 500;
        color: black;
        text-decoration: inherit;
        font-size: 90%;
    }
    
    a:hover {
        color: #535bf2;
    }

    a.active {
        color: #535bf2;
    }

    button {
        border: none;
        background: black;
        color: white;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5px;
        font-size: 90%;
        cursor: pointer;
        flex-wrap: nowrap;
        font-size: 100%;
        padding: 15px;
        border-radius: 10px;

        svg {
            font-size: 150%;
        }
    }

    @media (max-width: 1024px) {
      display: none;        
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const RightNavigationCommands = styled.div`
    display: none;
    
    @media (max-width: 1024px) {
        display: flex;
        flex-direction: row;
        align-items: center; 
        gap: 20px; 
        border: none;
        background: none; 
    }
`;

export const MobileSignInSignUpButton = styled.button`
    display: none;
    cursor: pointer;

    @media (max-width: 1024px) {
        display: flex;
        align-items: center;
        gap: 5px;
        border: none;
        background: none;
        
        svg {
            color: white;
            font-size: 150%;
        }        
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const CustomMobileMenu = styled.button`
    display: none;
    cursor: pointer;
    color: white;
    border: 0px;
    background: none; 
    padding: 0px;

    svg {
        color: white;
        font-size: 200%;
    }
    
    @media (max-width: 1024px) {
        display: flex;       
    }

    @media (max-width: 768px) {
    
    }

    @media (max-width: 480px) {
        
    }
`;

export const CustomNavigationBox = styled(Box)`
    position: absolute;
    top: 0px;
    right: 0px;
    width: 30%;
    height: 100%;
    background-color: grey;
    display: flex;
    flex-direction: column;
    gap: 30px;

    a, button {
        color: white;
        text-decoration: none;
        width: 100%;
    }

    a.active {
        color: orange;
    }

    button {
        border: none;
        font-size: 100%;
        text-align: left;
        background: none;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        gap: 10px;
        align-items: center;

    }

    @media (max-width: 1024px) {
              
    }

    @media (max-width: 768px) {
        width: 50%;
    }

    @media (max-width: 480px) {
        width: 70%;
    }
`;

export const CustomButton = styled.button`
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #3399ff;
    cursor: pointer;
    transition: border-color 0.25s;
    color: white;

    &:hover {
        border-color: #646cff;
    }

    &focus,
    &:focus-visible {
        outline: 4px auto -webkit-focus-ring-color;
    }
`;

export const HeaderOne1 = styled.h1`
    font-size: 3.1em;
    line-height: 1.1;

    @media (max-width: 768px) {
        font-size: 2.2em;
    }

    @media (max-width: 480px) {
        width: 100%;
        font-size: 2.0em;
    }
`;

export const CustomParagraph = styled.p`
    font-size: 0.9em;
    line-height: 1.6;

    @media (max-width: 768px) {
        // font-size: 2.2em;
    }

    @media (max-width: 480px) {
        // width: 100%;
        
    }

`;

export const RatingsContainer = styled.p`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 10px;

    .ratings {
        display: flex;
        flex-direction: row;
        gap: 20px;
        align-items: center;
    }

    button {
        gap: 10px;
        svg {
            font-size: 100%;
        }
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }

`;

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
`;

export const CustomImageDetailsBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 70%;
    background-color: white;
    box-shadow: 24px;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-item: flex-start;

    div.image-container {
        width: 100%;
        height: 75%;
    }

    div.image-details {
        padding: 10px;
    }

    @media (max-width: 820px) {
        width: 80%;
        height: 40%;
    
    }

    @media (max-width: 480px) {
        width: 95%;
        height: 50%;
    }
`;

export const CustomRatingBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    min-height: 50%;
    background-color: white;
    box-shadow: 24px;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-item: flex-start;
    padding: 40px 20px 40px;
    gap: 20px;

    h1 {
        font-weight: 400;
        text-align: center;
    }

    div.image-details {
        padding: 10px;
    }

    @media (max-width: 820px) {
        width: 80%;
        min-height: 40%;
    
    }

    @media (max-width: 480px) {
        width: 95%;
        min-height: 50%;

        h1 {
            font-size: 1.5rem;
        }
    }
`;

export const CustomInputField1 = styled.input`
    color: gray;
    font-size: 90%;
    background-color: transparent;
    padding: 12px 12px;
    border: 0px;

    @media (max-width: 768px) {
        
    }
`;

export const CustomButtonTwo = styled(Button)`
    
    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        width: 100%;
    }
`;

export const CustomSelect = styled(Select)`
    
    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        width: 90%;
        
    }
`;

export const FormElement = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 10px;

    label {
        font-size: 90%;
        color: black;
    }

    p {
        font-size: 90%;
        color: tomato;
    }

    textarea {
        font-size: 110%;
        font-family: 'Trebuchet MS', Arial, sans-serif;
    }

    input, textarea, select, option {
        width: 100%;
        padding: 12px 12px;
        border: 1px solid #b3cccc;
        border-radius: 3px;
        font-size: 100%;
    }

    button {
        width: 100%;
    }

    .input-with-icon {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;

        svg {
            font-size: 200%;
            color: black;
        }

        div {
            border-top: 1px solid #b3cccc;
            border-bottom: 0px;
            border-left: 0px;
            border-right: 0px;
            border-radius: 3px;
            width:100%;
                
            input, textarea, select, option {
                padding: 12px 12px;
                font-size: 100%;
                border-top: 0px;
                border-bottom: 0px;
                border-left: 0px;
                border-right: 0px;
            }

            label {
                padding-left: 12px;
            }
        }
    }
`;

export const CustomTextField = styled(TextField)`
    
    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        width: 90%;
        
    }
`;

export const FormInputsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;        
    gap: 5px;
    color: black;

    label, input, p {
        width: 100%;
    }
    
    label {
        font-size: 90%;
    }

    p {
        font-size: 90%;
        color: gray;
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const ProfilePictureForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 48%;   
    gap: 20px;   
    
    @media (max-width: 768px) {
        width: 100%;
    }

    @media (max-width: 690px) {
        
    }
`;

export const GalleryForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%; 
    gap: 10px;     

    div.form-container {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
        width: 100%;        
        flex-wrap: nowrap;

        div.input-container {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            gap: 5px;
            width: 32%;        
            color: black;
    
            label, input, textarea, p {
                width: 100%;
            }
    
            input, textarea {
                background: white;
                color: black;
                padding: 10px 12px;
                border: 1px solid gray;
                border-radius: 5px;
                font-family: poppins;
                font-size: 100%;
            }
    
            label {
                font-size: 90%;
            }
    
            p {
                color: tomato;
            }
        }
    }

    @media (max-width: 768px) {
        div.form-container {
            flex-wrap: wrap;

            div.input-container {
                width: 46%;  
                margin-bottom: 10px;      
            }
        }
    }

    @media (max-width: 480px) {
        div.form-container {
            div.input-container {
                width: 100%;        
            }   
        }
    }
`;

export const CustomMaterialUiButton = styled(Button)`
    
    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        width: 90%;
    }
`;

export const SearchForm = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    // padding: 5px;
    border-radius: 5px;
    gap: 5px;  

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        flex-wrap: wrap;
        gap: 10px;  
    }
`;

export const SearchForm2 = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: 1px solid gray;   
    padding: 0;
    margin: 0;

    @media (max-width: 768px) {
        
    }

    @media (max-width: 700px) {
        display: none;  
    }
`;

export const FooterContainer = styled(Box)`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
    padding: 0 80px;
    background: black;
    font-size: 80%;

    .inner-footer-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        max-width: 1240px;
    
        .top-part, .bottom-part {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            gap: 10px;
            padding: 40px 0px;

            .left {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                width: 20%;
                gap: 10px;

                svg {
                    font-size: 200%;
                }
            }
        }

        .top-part {
            border-bottom: 1px solid grey;
        }
    }

    a {
        text-decoration: none;
        color: white;
    }

    img {
        width: 100px;
    }   

    @media (max-width: 1024px) {
      padding: 0 40px;        
    }

    @media (max-width: 768px) {
        padding: 0 30px;

        .inner-footer-container {
            .top-part, .bottom-part {
                flex-direction: column;
                flex-wrap: wrap;
                padding: 20px 0;
                justify-content: space-between;
                align-items: center;

                .left {
                    width: 70%;
                    margin-bottom: 10px;
                }
            }
        }
    }

    @media (max-width: 480px) {
        padding: 0 10px;
    }
`;

export const Card1 = styled.div`
    width: 30%;
    
    .image-card {
        border-radius: 5px;
        background-size: contain;
        background-origin: top;
        height: 180px;
        width: 100%;
    }

    .description {
        color: #1b1d21;
        margin-top: 10px;
        font-weight: 500;
    }

    @media (max-width: 768px) {
        width: 40%;      
    }

    @media (max-width: 480px) {
        width: 100%;
    }
`;

export const Card2 = styled.div`
    width: 150px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 200px;
    border-radius:10px;
    padding: 20px;

    .image-card {
        border-radius: 50%;
        background-size: cover;
        background-origin: top;
        height: 110px;
        width: 110px;
        
        &:hover {
            box-shadow: 0 0px 20px 0 rgba(0, 0, 0, 0.10);
        }
    }

    .description {
        color: #1b1d21;
        font-weight: 500;
        font-size: 90%;
        text-align: center;
    }

    @media (max-width: 768px) {
        width: 40%;
    }

    @media (max-width: 480px) {
        width: 43%;
        padding: 10px;

        .image-card {
            height: 110px;
            width: 110px;
        }      
    }
`;

export const DjBasicInfo = styled.div`
    width: 48%; 
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;   
    color: black;

    h1 {
        font-size: 2.5rem;
    }

    .description {
        color: black;
    }

    @media (max-width: 1240px) {
        width: 48%; 
    }

    @media (max-width: 997px) {
        width: 48%; 
    }

    @media (max-width: 768px) {
        width: 100%;

        .description {
            text-align: justify;
        }
    }

    @media (max-width: 690px) {
        width: 100%;
    }  
`;

export const DjProfilePicture = styled.div`
    background-size: contain;
    background-repeat: no-repeat;
    width: 350px;
    height: 350px;
    border-radius: 50%;
    margin-right: 200px; 

    @media (max-width: 1240px) {
        margin-right: 50px;
    }

    @media (max-width: 997px) {
        margin-right: 0px;
        width: 300px;
        height: 300px;
    }

    @media (max-width: 768px) {
        margin-right: 50px;
        width: 250px;
        height: 250px;
    }

    @media (max-width: 480px) {
        width: 100%;
        margin-right: 0px;
        border-radius: 10px;
        height: 300px;
        width: 200px;
        height: 200px;
    }  
`;

export const AnEvent = styled(Link)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;   
    color: black;
    width: 23%;
    font-size: 90%;
    margin-bottom: 20px;
    text-decoration: none;

    .picture {
        background-size: cover;
        width: 100%;
        height: 100px;
        border-radius: 10px 10px 0 0;
    }

    .description {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;

        .day {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            width: 100%;

            .week-day {
                font-weight: 600;
            }

            .date-time {
                color: grey;
                font-size: 85%;
            }
        }

        .date-time {
            color: gray;
            font-size: 85%;
        }

        .location {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            width: 100%;

            svg {
                font-size: 120%;
            }
        }
    }

    @media (max-width: 1240px) {
        width: 23%;
    }

    @media (max-width: 997px) {
        width: 30%;

        .picture {
            background-size: cover;
            width: 100%;
            height: 120px;
            border-radius: 10px;
        }   
    }

    @media (max-width: 768px) {
        width: 46%;

        .picture {
            background-size: cover;
            width: 100%;
            height: 150px;
            border-radius: 10px;
        }
    }

    @media (max-width: 480px) {
        width: 100%;

        .picture {
            background-size: cover;
            width: 100%;
            height: 200px;
            border-radius: 10px;
        }
    }  
`;

export const ResetPasswordFormContainer = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 20px;
    width: 100%;
    align-items: center;
    
    .other-options {
        p {
            color: black;
        }

        button {
            font-size: 100%;
            border: 0px;
            background: none;
            color: blue;
            cursor: pointer;

            &:hover {
                color: orange;
            }
        }

    } 

    .form-input-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 5px;
        width: 40%;
        align-items: flex-start;
    }

    .form-input-container2 {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 5px;
        width: 40%;
        align-items: flex-start;
    }

    input, p, select, textarea {
        width: 100%;
    }

    input, select, textarea {
        border: none;
        padding: 8px 12px;
        border-radius: 5px;
        background: white;
        color: black;
        border: 1px solid #d9d9d9;
        font-size: 100%;
    }

    .submit-button {
        padding: 12px 12px;
        background: black;
        color: white;
        border: 1px solid #d9d9d9;
        font-size: 100%;
        cursor: pointer;

        &:hover {
            background: gray;
        }
    }

    p {
        font-size: 85%;
        color: tomato;
    }

    @media (max-width: 1240px) {
        .form-input-container {
            width: 50%;
        }

        .form-input-container2 {
            width: 50%;
        }
    }

    @media (max-width: 997px) {
        .form-input-container {
            width: 70%;
        }
        
        .form-input-container2 {
            width: 70%;
        }
    }

    @media (max-width: 768px) {
        .form-input-container {
            width: 80%;
        }   

        .form-input-container2 {
            width: 80%;
        }   
    }

    @media (max-width: 480px) {
        .form-input-container {
            width: 100%;
        }   
    }
`;

export const BookFormContainer = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 20px;
    width: 100%;
    align-items: center;
    font-family: 'Poppins', sans-serif;
    
    .other-options {
        p {
            color: black;
        }

        button {
            font-size: 100%;
            border: 0px;
            background: none;
            color: blue;
            cursor: pointer;

            &:hover {
                color: orange;
            }
        }

    } 

    .form-input-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 5px;
        width: 80%;
        align-items: flex-start;
    }

    .form-input-container2 {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 5px;
        width: 50%;
        align-items: flex-start;
    }

    input, p, select, textarea {
        width: 100%;
    }

    input, select, textarea {
        border: none;
        padding: 8px 12px;
        border-radius: 5px;
        background: white;
        color: black;
        border: 1px solid #d9d9d9;
        font-size: 100%;
    }

    .submit-button {
        padding: 12px 12px;
        background: black;
        color: white;
        border: 1px solid #d9d9d9;
        font-size: 100%;
        cursor: pointer;

        &:hover {
            background: gray;
        }
    }

    p {
        font-size: 85%;
        color: tomato;
    }

    @media (max-width: 1240px) {

    }

    @media (max-width: 997px) {
        .form-input-container {
            width: 70%;
        }
        
        .form-input-container2 {
            width: 70%;
        }
    }

    @media (max-width: 768px) {
        .form-input-container {
            width: 80%;
        }   

        .form-input-container2 {
            width: 80%;
        }   
    }

    @media (max-width: 480px) {
        .form-input-container {
            width: 100%;
        }   
    }
`;

export const CustomFormContainer1 = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;
    width: 100%;
    align-items: center;

    .other-options {
        p {
            color: black;
        }

        button {
            font-size: 100%;
            border: 0px;
            background: none;
            color: blue;
            cursor: pointer;

            &:hover {
                color: orange;
            }
        }

    } 
    
    div {
        .form-input-container {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            gap: 5px;
            width: 47%;
            align-items: flex-start;
        }

        input, p, select {
            width: 100%;
        }

        input, select {
            border: none;
            padding: 8px 12px;
            border-radius: 5px;
            background: white;
            color: black;
            border: 1px solid #d9d9d9;
            font-size: 100%;
        }

        .submit-button {
            padding: 12px 12px;
            background: black;
            color: white;
            border: 1px solid #d9d9d9;
            font-size: 100%;
            cursor: pointer;

            &:hover {
                background: gray;
            }
        }

        p {
            font-size: 85%;
            color: tomato;
        }
    }

    @media (max-width: 1240px) {

    }

    @media (max-width: 997px) {
        div {
            .form-input-container {
                width: 80%;
            }   

            .left {
                margin-bottom: 10px;
            }
        }   
    }

    @media (max-width: 768px) {
        div {
            .form-input-container {
                width: 80%;

                input, p, select {
                    width: 100%;
                }
            }
        }   
    }

    @media (max-width: 480px) {
        div {
            .form-input-container {
                width: 100%;
            }
        }   
    }
`;

export const SignInSignUpCustomBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30%;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    paddingTop: 40px;

    @media (max-width: 997px) {
        width: 50%;
    }

    @media (max-width: 768px) {
        width: 70%;
    }

    @media (max-width: 480px) {
        width: 90%;
    }
`;

export const UserIconAndName = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    font-size: 90%;
    padding: 5px;
    cursor: pointer;
    
    &:hover {
        background: #454a54;
    }

    .icon {
        border: 1px solid white;
        width: 35px;
        height: 35px;
        border-radius: 50%;
    }

    @media (max-width: 997px) {
    }

    @media (max-width: 768px) {
    }

    @media (max-width: 480px) {
    }
`;

export const HorizontallyFlexedContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
`;

export const VerticallyFlexedContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const AdminDashboardContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    background: white;
    padding: 20px;
    border-radius: 5px;
    border: 1px solid rgba(0,0,0,0.1);

    .first, .second, .third, .fouth {
        width: 25%;
        display: flex;
        flex-direction: column;
        align-items: center; 
        padding: 20px;

        .inner-stats {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;

            svg {
                font-size: 400%;
                margin-bottom: 20px;
            }

            h3 {
                text-align: center;
            }
        }
    }

    @media (max-width: 1024px) {
                
    }

    @media (max-width: 768px) {
        .first, .second, .third, .fouth {
            width: 50%;
        }


    }

    @media (max-width: 480px) {
        .first, .second, .third, .fouth {
            width: 100%;
        }
    }

`;