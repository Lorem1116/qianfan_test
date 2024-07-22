import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { Terminal } from 'lucide-react';
import 'highlight.js/styles/atom-one-dark.css';
import CopyButton from './CopyButton';

const Markdown = ({ content }) => {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeHighlight]}
      components={{
        pre: ({ children }) => <pre className="not-prose">{children}</pre>,
        code: ({ node, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");
          if (match && match.length) {
            const id = Math.random().toString(36).substr(2, 9);
            return (
              <div className="not-prose rounded-md border">
                <div className="flex h-8 items-center justify-between bg-zinc-100 px-2 dark:bg-zinc-900">
                  <div className="flex items-center gap-2">
                    <Terminal size={18} />
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {node?.data?.meta}
                    </p>
                  </div>
                  <CopyButton id={id} />
                </div>
                <div className="text-sm overflow-x-auto">
                  <div id={id} className="p-4">
                    {children}
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <code
                {...props}
                className="not-prose rounded bg-gray-100 px-1 dark:bg-zinc-900"
              >
                {children}
              </code>
            );
          }
        },
      }}
      className="prose prose-zinc max-w-2xl dark:prose-invert"
    >
      {content}
    </ReactMarkdown>
  );
};


export default Markdown;