import React from 'react';
import PropTypes from 'prop-types';
import CourseListRow from './CourseListRow';
import CourseShape from './CourseShape';
import { StyleSheet, css } from 'aphrodite';

function CourseList({ listCourses }) {
    return (
        <>
            <table id="CourseList" className={css(styles.courseList)}>
                <thead className={css(styles.thead)}>
                    <CourseListRow textFirstCell="Available courses" isHeader={ true } />
                    <CourseListRow textFirstCell="Course name" textSecondCell="Credit" isHeader={ true } />
                </thead>
                <tbody className={css(styles.tbody)}>
                {listCourses.length === 0 ? (
                    <CourseListRow textFirstCell="No course available yet" />
                ) : (
                listCourses.map((course) => (
                    <CourseListRow
                        key={ course.id }
                        textFirstCell={ course.name }
                        textSecondCell={ course.credit }
                    />
                    ))
                )}
                </tbody>
            </table>
        </>
    );
}

const styles = StyleSheet.create({
    courseList: {
        width: '90vw',
        margin: '0 5vw',
        border: '1px solid grey',
        borderCollapse: 'collapse',
    },
    thead: {
        textAlign: 'left',
    },
    tbody: {
        textAlign: 'left',
    },
});

// propType listcourses takes an array of the courseShape
CourseList.propTypes = {
    listCourses: PropTypes.arrayOf(CourseShape),
};

// listCourses is an empty array by default
CourseList.defaultProps = {
    listCourses: [],
}

export default CourseList;