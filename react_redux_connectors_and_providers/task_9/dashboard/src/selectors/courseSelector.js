export const getListCourses = (state) => {
  const courses = state.get('courses');

  if (!courses) {
    return [];
  }

  return courses.valueSeq().toList();
};
