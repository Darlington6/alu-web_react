import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CourseList.css';

const rowStyle = { backgroundColor: '#f5f5f5ab' };
const headerRowStyle = { backgroundColor: '#deb5b545' };

function CourseListRow({ isHeader, textFirstCell, textSecondCell }) {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    let rowClass = '';
    let appliedStyle = isHeader ? headerRowStyle : rowStyle;
    
    if (!isHeader && isChecked) {
        rowClass = 'rowChecked';
        appliedStyle = {};
    }

    return (
        <>
            <tr style={appliedStyle} className={rowClass}>
                { isHeader && !textSecondCell && (
                    <th colSpan={ 2 }>{ textFirstCell }</th>
                ) }
                { isHeader && textSecondCell && (
                    <>
                        <th>{ textFirstCell }</th>
                        <th>{ textSecondCell }</th>
                    </>
                ) }
                { !isHeader && (
                    <>
                        <td>
                            <input 
                                type="checkbox" 
                                checked={ isChecked } 
                                onChange={ handleCheckboxChange }
                            />
                            { textFirstCell }
                        </td>
                        <td>{ textSecondCell }</td>
                    </>
                ) }
            </tr>
        </>
    );
}

CourseListRow.propTypes = {
    isHeader: PropTypes.bool,
    textFirstCell: PropTypes.string.isRequired,
    textSecondCell: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
};

CourseListRow.defaultProps = {
    isHeader: false,
    textFirstCell: "Holberton",
    textSecondCell: null,
};

export default CourseListRow;
