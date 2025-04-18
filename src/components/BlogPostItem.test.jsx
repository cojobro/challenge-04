// src/components/BlogPostItem.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Needed because BlogPostItem uses <Link>
import '@testing-library/jest-dom';
import BlogPostItem from './BlogPostItem';

// Mock data for a single post
const testPost = {
id: 'test-1',
title: 'Test Title',
summary: 'Test summary content.',
date: '2024-03-15', // Use a fixed date for predictable formatting
url: '/posts/test-1',
};

describe('BlogPostItem Component', () => {
    beforeEach(() => {
        // Render the component within MemoryRouter before each test
        render(
        <MemoryRouter>
            <BlogPostItem {...testPost} />
        </MemoryRouter>
        );
    });

    test('renders the post title as a heading', () => {
        // Check if a heading element with the correct text exists
        const titleElement = screen.getByRole('heading', { name: testPost.title, level: 2 });
        expect(titleElement).toBeInTheDocument();
    });

    test('renders the post summary', () => {
        // Check if the summary text is present
        const summaryElement = screen.getByText(testPost.summary);
        expect(summaryElement).toBeInTheDocument();
        expect(summaryElement.tagName).toBe('P'); // Check semantic element
    });

    test('renders the formatted publication date', () => {
        // Check if the formatted date text is present (adjust expected format if needed)
        // Note: Formatting depends on locale. 'March 15, 2024' is expected for en-US.
        const dateElement = screen.getByText(/Published on March 15, 2024/i);
        expect(dateElement).toBeInTheDocument();
        expect(dateElement.tagName).toBe('P'); // Check semantic element
    });

    test('title is a link pointing to the correct URL', () => {
        // Check if the title is within a link element with the correct href
        const linkElement = screen.getByRole('link', { name: testPost.title });
        expect(linkElement).toBeInTheDocument();
        // Check the 'href' attribute - MemoryRouter resolves it relative to base '/'
        expect(linkElement).toHaveAttribute('href', testPost.url);
    });
});