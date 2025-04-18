import { render, screen } from '@testing-library/react';
import BlogPostDetail from './BlogPostDetail';

test('renders content HTML correctly', () => {
  const mockPost = {
    title: 'Test Title',
    author: 'Test Author',
    date: '2023-01-01',
    content: '<p>Some paragraph text.</p><h2>A Subheading</h2>',
  };
  render(<BlogPostDetail {...mockPost} />);

  // Check for text within the rendered HTML
  expect(screen.getByText('Some paragraph text.')).toBeInTheDocument();

  // Check for elements rendered from the HTML string by their role
  expect(screen.getByRole('heading', { level: 2, name: 'A Subheading' })).toBeInTheDocument();
});