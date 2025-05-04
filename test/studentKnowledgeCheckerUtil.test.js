import { expect } from 'chai';
import { checkStudentKnowledge } from '../src/utils/studentKnowledgeCheckerUtil.js';

describe('checkStudentKnowledge', () => {

  it('should return true if all answers are correct', () => {
    const student = {
      question1: 'A',
      question2: 'B',
      question3: 'C'
    };

    const correct = {
      question1: 'A',
      question2: 'B',
      question3: 'C'
    };

    expect(checkStudentKnowledge(student, correct)).to.be.true;
  });

  it('should return false if answers do not match', () => {
    const student = {
      question1: 'A',
      question2: 'C',
      question3: 'C'
    };

    const correct = {
      question1: 'A',
      question2: 'B',
      question3: 'C'
    };

    expect(checkStudentKnowledge(student, correct)).to.be.false;
  });

  it('should return false if student has extra answers', () => {
    const student = {
      question1: 'A',
      question2: 'B',
      question3: 'C',
      question4: 'D'
    };

    const correct = {
      question1: 'A',
      question2: 'B',
      question3: 'C'
    };

    expect(checkStudentKnowledge(student, correct)).to.be.false;
  });

  it('should return false if student has fewer answers', () => {
    const student = {
      question1: 'A',
      question2: 'B'
    };

    const correct = {
      question1: 'A',
      question2: 'B',
      question3: 'C'
    };

    expect(checkStudentKnowledge(student, correct)).to.be.false;
  });

  it('should return true if both student and correct answers are empty objects', () => {
    const student = {};
    const correct = {};

    expect(checkStudentKnowledge(student, correct)).to.be.true;
  });

  it('should return false if the student answers are in a different data type (e.g., number instead of string)', () => {
    const student = {
      question1: 1,
      question2: 'B',
      question3: 'C'
    };

    const correct = {
      question1: 'A',
      question2: 'B',
      question3: 'C'
    };

    expect(checkStudentKnowledge(student, correct)).to.be.false;
  });

  it('should return false if there is a mismatch in data types (string vs number)', () => {
    const student = {
      question1: 'A',
      question2: 'B',
      question3: 3
    };

    const correct = {
      question1: 'A',
      question2: 'B',
      question3: 'C'
    };

    expect(checkStudentKnowledge(student, correct)).to.be.false;
  });

  it('should return false if student answers are null or undefined', () => {
    const student = null;
    const correct = {
      question1: 'A',
      question2: 'B',
      question3: 'C'
    };

    expect(checkStudentKnowledge(student, correct)).to.be.false;
  });

  it('should return false if correct answers are null or undefined', () => {
    const student = {
      question1: 'A',
      question2: 'B',
      question3: 'C'
    };
    const correct = null;

    expect(checkStudentKnowledge(student, correct)).to.be.false;
  });

  it('should return true if the answers are in any order', () => {
    const student = {
      question3: 'C',
      question1: 'A',
      question2: 'B'
    };

    const correct = {
      question1: 'A',
      question2: 'B',
      question3: 'C'
    };

    expect(checkStudentKnowledge(student, correct)).to.be.true;
  });

});
