// src/components/BlogPostList.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import BlogPostList from './BlogPostList';

// Mock data for multiple posts
const mockPosts = [
{ id: '1', title: 'Post 1', summary: 'Summary 1', date: '2023-01-01', url: '/posts/1' },
{ id: '2', title: 'Post 2', summary: 'Summary 2', date: '2023-02-01', url: '/posts/2' },
];

describe('BlogPostList Component', () => {
    test('renders a list of BlogPostItem components when posts are provided', () => {
        render(
        <MemoryRouter>
            <BlogPostList posts={mockPosts} />
        </MemoryRouter>
        );

        // Check if both post titles are rendered (implicitly checks items are rendered)
        expect(screen.getByRole('heading', { name: 'Post 1' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Post 2' })).toBeInTheDocument();

        // Check that the "No posts" message is NOT present
        expect(screen.queryByText('No blog posts available.')).not.toBeInTheDocument();
    });

    test('renders "No blog posts available." message when posts array is empty', () => {
        render(
        <MemoryRouter>
            <BlogPostList posts={[]} /> {/* Pass an empty array */}
        </MemoryRouter>
        );

        // Check if the message is displayed
        expect(screen.getByText('No blog posts available.')).toBeInTheDocument();
    });

    test('renders "No blog posts available." message when posts prop is null or undefined', () => {
        // Test for null
        const { rerender } = render(
            <MemoryRouter>
                <BlogPostList posts={null} />
            </MemoryRouter>
        );
        expect(screen.getByText('No blog posts available.')).toBeInTheDocument();

        // Test for undefined
        rerender(
            <MemoryRouter>
                <BlogPostList posts={undefined} />
            </MemoryRouter>
        );
        expect(screen.getByText('No blog posts available.')).toBeInTheDocument();
    });

    test('passes correct props to each BlogPostItem', () => {
        render(
        <MemoryRouter>
            <BlogPostList posts={mockPosts} />
        </MemoryRouter>
        );

        // Check props for the first post (more detailed checks can be done,
        // but often testing the Item itself is sufficient)
        const firstLink = screen.getByRole('link', { name: mockPosts[0].title });
        expect(firstLink).toHaveAttribute('href', mockPosts[0].url);
        expect(screen.getByText(mockPosts[0].summary)).toBeInTheDocument();
        // Add date check if necessary
    });
});