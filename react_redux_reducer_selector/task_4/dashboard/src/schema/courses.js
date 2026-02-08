import { normalize, schema } from 'normalizr';

export const course = new schema.Entity('courses');

export const coursesNormalizer = (data) => normalize(data, [course]);
