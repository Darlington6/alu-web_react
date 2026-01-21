import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const rowStyle = { backgroundColor: '#f5f5f5ab' };
const headerRowStyle = { backgroundColor: '#deb5b545' };
const thStyle = { borderBottom: '1px solid grey', textAlign: 'left' };
const tdStyle = { textAlign: 'left' };

function CourseListRow({ isHeader, textFirstCell, textSecondCell }) {
    return (
        <>
            <tr style={isHeader ? headerRowStyle : rowStyle}>
                { isHeader && !textSecondCell && (
                    <th colSpan={ 2 } style={ thStyle } className={css(styles.cell)}>{ textFirstCell }</th>
                ) }
                { isHeader && textSecondCell && (
                    <>
                        <th style={ thStyle } className={css(styles.cell)}>{ textFirstCell }</th>
                        <th style={ thStyle } className={css(styles.cell)}>{ textSecondCell }</th>
                    </>
                ) }
                { !isHeader && (
                    <>
                        <td style={ tdStyle } className={css(styles.cell)}>{ textFirstCell }</td>
                        <td style={ tdStyle } className={css(styles.cell)}>{ textSecondCell }</td>
                    </>
                ) }
            </tr>
        </>
    );
}

const styles = StyleSheet.create({
    cell: {
        padding: '4px',
    },
});

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