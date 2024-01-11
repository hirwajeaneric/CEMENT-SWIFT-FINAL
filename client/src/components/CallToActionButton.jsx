import { Link } from "react-router-dom";
import styled from "styled-components";

export default function CallToActionButton(props) {
    // eslint-disable-next-line react/prop-types
    const { text, color, hoverColor, destination } = props;

    const CustomCallToActionLink = styled(Link)`
        text-decoration: none;
        color: ${color};
        padding: 0 20px 10px 0;
        border-bottom: 2px solid ${color};
        margin-top: 20px;

        &:hover {
            color: ${hoverColor};
            padding: 0 50px 10px 0;
            border-bottom: 2px solid ${hoverColor};
        }
    `;

    return (
        <CustomCallToActionLink to={destination}>{text}</CustomCallToActionLink>
    )
}
