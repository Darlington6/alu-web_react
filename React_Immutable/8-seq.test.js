import printBestStudents from './8-seq.js';

describe('printBestStudents', () => {
  let consoleLogSpy;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('should filter students with score >= 70 and capitalize names', () => {
    const grades = {
      1: {
        score: 99,
        firstName: 'guillaume',
        lastName: 'salva',
      },
      2: {
        score: 65,
        firstName: 'john',
        lastName: 'doe',
      },
      3: {
        score: 85,
        firstName: 'jane',
        lastName: 'smith',
      },
    };

    printBestStudents(grades);

    expect(consoleLogSpy).toHaveBeenCalledWith({
      1: {
        score: 99,
        firstName: 'Guillaume',
        lastName: 'Salva',
      },
      3: {
        score: 85,
        firstName: 'Jane',
        lastName: 'Smith',
      },
    });
  });

  it('should handle edge case with score exactly 70', () => {
    const grades = {
      1: {
        score: 70,
        firstName: 'alice',
        lastName: 'johnson',
      },
      2: {
        score: 69,
        firstName: 'bob',
        lastName: 'williams',
      },
    };

    printBestStudents(grades);

    expect(consoleLogSpy).toHaveBeenCalledWith({
      1: {
        score: 70,
        firstName: 'Alice',
        lastName: 'Johnson',
      },
    });
  });

  it('should handle empty result when all scores are below 70', () => {
    const grades = {
      1: {
        score: 50,
        firstName: 'failing',
        lastName: 'student',
      },
      2: {
        score: 60,
        firstName: 'another',
        lastName: 'failing',
      },
    };

    printBestStudents(grades);

    expect(consoleLogSpy).toHaveBeenCalledWith({});
  });

  it('should handle all students passing', () => {
    const grades = {
      1: {
        score: 95,
        firstName: 'excellent',
        lastName: 'student',
      },
      2: {
        score: 88,
        firstName: 'great',
        lastName: 'learner',
      },
    };

    printBestStudents(grades);

    expect(consoleLogSpy).toHaveBeenCalledWith({
      1: {
        score: 95,
        firstName: 'Excellent',
        lastName: 'Student',
      },
      2: {
        score: 88,
        firstName: 'Great',
        lastName: 'Learner',
      },
    });
  });

  it('should preserve other properties', () => {
    const grades = {
      1: {
        score: 99,
        firstName: 'guillaume',
        lastName: 'salva',
        age: 25,
        email: 'test@example.com',
      },
    };

    printBestStudents(grades);

    expect(consoleLogSpy).toHaveBeenCalledWith({
      1: {
        score: 99,
        firstName: 'Guillaume',
        lastName: 'Salva',
        age: 25,
        email: 'test@example.com',
      },
    });
  });
});
