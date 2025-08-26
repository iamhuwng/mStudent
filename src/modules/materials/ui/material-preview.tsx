// @module:materials @layer:ui @owner:studio
'use client'

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Material, IeltsReadingContent } from "../service/materials.types";
import { Send } from "lucide-react";

type MaterialPreviewProps = {
    material: Material;
}

function renderContent(material: Material) {
    if (material.format === 'ielts-reading' && typeof material.content === 'object') {
        const ieltsContent = material.content as IeltsReadingContent;
        return (
            <div>
                {ieltsContent.passages.map(p => (
                    <div key={p.id} className="mb-4">
                        <h4 className="font-bold text-lg">{p.title}</h4>
                        <p className="whitespace-pre-wrap">{p.text}</p>
                    </div>
                ))}
            </div>
        )
    }
    // Default renderer for simple string content
    return <p>{material.content || "No content available for this material."}</p>;
}


// >>> BEGIN gen:materials.preview (layer:ui)
export function MaterialPreview({ material }: MaterialPreviewProps) {
    return (
        <Card className="bg-muted/40">
            <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Preview</h3>
                <div className="prose prose-sm max-w-none dark:prose-invert">
                    {renderContent(material)}
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button disabled>
                    <Send className="mr-2" />
                    Submit
                </Button>
            </CardFooter>
        </Card>
    )
}
// <<< END gen:materials.preview
