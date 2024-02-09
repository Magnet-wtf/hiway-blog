'use client';

interface PostSummaryProps {
    post: any;
}

export default function PostSummary({ post }: PostSummaryProps) {
    function extractHeadingsInOrder(html: string): string[] {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const summary: string[] = [];

        // Function to recursively search for headings in the document tree
        function searchHeadings(node: Node) {
            if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as HTMLElement;
                if (['H1', 'H2', 'H3', 'H4'].includes(element.tagName)) {
                    summary.push(`${element.textContent || ''}`);
                }
                element.childNodes.forEach(searchHeadings);
            }
        }

        searchHeadings(doc.body);

        return summary;
    }

    return (
        <div className={'flex flex-col space-y-4'}>
            {extractHeadingsInOrder(post.content.rendered).map((title, index) => (
                <a href={`#${title}`} key={index} className={`${index === 0 ? "text-[#FF4140] font-jekobold" : "text-black"}`}>
                    {title}
                </a>
            ))}
        </div>
    );
}
