'use client';

import { currentHeadingIdAtom } from "@/store";
import { useAtom } from "jotai";

interface PostSummaryProps {
    post: any;
}

export default function PostSummary({ post }: PostSummaryProps) {
    const [currentHeadingId, setCurrentHeadingId] = useAtom(currentHeadingIdAtom);

    const generateIdFromText = (text: any) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    function extractHeadingsInOrder(html: string): string[] {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const summary: string[] = [];

        // Function to recursively search for headings in the document tree
        function searchHeadings(node: Node) {
            if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as HTMLElement;
                if (['H2'].includes(element.tagName)) {
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
                <a onClick={() => setCurrentHeadingId(generateIdFromText(title))} key={index} className={`${currentHeadingId === generateIdFromText(title) ? "text-[#FF4140] font-jekobold" : "text-black"} cursor-pointer hover:text-[#FF4140]`}>
                    {title}
                </a>
            ))}
        </div>
    );
}
