import React from 'react';
import { CourseListItem } from '../../types/course';
import { CourseCard } from './CourseCard';
import { EmptyState } from './EmptyState';

interface CourseListProps {
  courses?: CourseListItem[];
  onCreateCourse: () => void;
}

export const CourseList: React.FC<CourseListProps> = ({ 
  courses = [], // Provide default empty array
  onCreateCourse 
}) => {
  // Check if courses exist and have length
  if (!courses || courses.length === 0) {
    return <EmptyState onCreateCourse={onCreateCourse} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};