// @module:materials @layer:ui @owner:studio
'use client'

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Material } from "../service/materials.types";
import { Send } from "lucide-react";

type MaterialPreviewProps = {
    material: Material;
}

// >>> BEGIN gen:materials.preview (layer:ui)
export function MaterialPreview({ material }: MaterialPreviewProps) {
    return (
        <Card className="bg-muted/40">
            <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Preview</h3>
                <div className="prose prose-sm max-w-none dark:prose-invert">
                    {/* 
                        This is a placeholder for rendering material content.
                        In a real app, this would be a complex component that could render 
                        Markdown, a video player, an interactive quiz, etc. based on `material.format`.
                    */}
                    <p>{material.content || "No content available for this material."}</p>
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
