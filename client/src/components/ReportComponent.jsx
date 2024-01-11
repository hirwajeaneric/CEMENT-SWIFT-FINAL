import React from 'react';
import { useSelector } from 'react-redux';

export const ReportComponent = React.forwardRef((props, ref) => {
    const { reportType, reportData, isLoading } = useSelector(state => state.report); 

    return (
        <div ref={ref}>
            {reportType}
        </div>
    )
})