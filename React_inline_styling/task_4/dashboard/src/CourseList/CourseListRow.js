import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

function CourseListRow({ isHeader, textFirstCell, textSecondCell }) {
    return (
        <tr className={css(isHeader ? styles.headerRow : styles.row)}>
            { isHeader && !textSecondCell && (
                <th colSpan={ 2 } className={css(styles.headerCell)}>{ textFirstCell }</th>
            ) }
            { isHeader && textSecondCell && (
                <>
                    <th className={css(styles.headerCell)}>{ textFirstCell }</th>
                    <th className={css(styles.headerCell)}>{ textSecondCell }</th>
                </>
            ) }
            { !isHeader && (
                <>
                    <td className={css(styles.dataCell)}>{ textFirstCell }</td>
                    <td className={css(styles.dataCell)}>{ textSecondCell }</td>
                </>
            ) }
        </tr>
    );
}

const styles = StyleSheet.create({
    headerRow: {
        backgroundColor: '#deb5b545',
    },
    row: {
        backgroundColor: '#f5f5f5ab',
    },
    headerCell: {
        borderBottom: '1px solid grey',
        textAlign: 'left',
        padding: '4px',
    },
    dataCell: {
        textAlign: 'left',
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