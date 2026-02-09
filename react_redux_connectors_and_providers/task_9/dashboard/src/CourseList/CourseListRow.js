import React from 'react';
import PropTypes from 'prop-types';
import './CourseList.css';

const rowStyle = { backgroundColor: '#f5f5f5ab' };
const headerRowStyle = { backgroundColor: '#deb5b545' };

function CourseListRow({ isHeader, textFirstCell, textSecondCell, id, isChecked, onChangeRow }) {

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
                                onChange={ (event) => onChangeRow(id, event.target.checked) }
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
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isChecked: PropTypes.bool,
    onChangeRow: PropTypes.func,
};

CourseListRow.defaultProps = {
    isHeader: false,
    textFirstCell: "Holberton",
    textSecondCell: null,
    id: null,
    isChecked: false,
    onChangeRow: () => {},
};

export default CourseListRow;
