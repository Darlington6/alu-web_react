import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { connect } from 'react-redux';
import './CourseList.css';
import CourseListRow from './CourseListRow';
import { getListCourses } from '../selectors/courseSelector';
import {
    fetchCourses,
    selectCourse,
    unSelectCourse
} from '../actions/courseActionCreators';

export class CourseList extends React.Component {
    componentDidMount() {
        const { fetchCourses } = this.props;
        fetchCourses();
    }

    onChangeRow = (id, checked) => {
        const { selectCourse, unSelectCourse } = this.props;
        const courseId = String(id);

        if (checked) {
            selectCourse(courseId);
        } else {
            unSelectCourse(courseId);
        }
    };

    render() {
        const { listCourses } = this.props;
        const isEmpty = typeof listCourses.size === 'number'
            ? listCourses.size === 0
            : listCourses.length === 0;

        return (
            <>
                <table id="CourseList">
                    <thead>
                        <CourseListRow textFirstCell="Available courses" isHeader={ true } />
                        <CourseListRow textFirstCell="Course name" textSecondCell="Credit" isHeader={ true } />
                    </thead>
                    <tbody>
                    {isEmpty ? (
                        <CourseListRow textFirstCell="No course available yet" />
                    ) : (
                    listCourses.map((course) => {
                        const id = course.get ? course.get('id') : course.id;
                        const name = course.get ? course.get('name') : course.name;
                        const credit = course.get ? course.get('credit') : course.credit;
                        const isSelected = course.get ? course.get('isSelected') : course.isSelected;

                        return (
                            <CourseListRow
                                key={ id }
                                id={ id }
                                textFirstCell={ name }
                                textSecondCell={ credit }
                                isChecked={ isSelected }
                                onChangeRow={ this.onChangeRow }
                            />
                        );
                    })
                    )}
                    </tbody>
                </table>
            </>
        );
    }
}

// propType listcourses takes an array of the courseShape
CourseList.propTypes = {
    listCourses: PropTypes.oneOfType([
        PropTypes.instanceOf(List),
        PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                name: PropTypes.string,
                credit: PropTypes.number,
                isSelected: PropTypes.bool
            })
        )
    ]),
    fetchCourses: PropTypes.func,
    selectCourse: PropTypes.func,
    unSelectCourse: PropTypes.func,
};

// listCourses is an empty array by default
CourseList.defaultProps = {
    listCourses: List(),
    fetchCourses: () => {},
    selectCourse: () => {},
    unSelectCourse: () => {},
}

export const mapStateToProps = (state) => ({
    listCourses: getListCourses(state.courses)
});

export default connect(mapStateToProps, {
    fetchCourses,
    selectCourse,
    unSelectCourse
})(CourseList);
