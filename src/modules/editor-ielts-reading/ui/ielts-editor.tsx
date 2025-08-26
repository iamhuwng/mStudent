// @module:editor-ielts-reading @layer:ui @owner:studio
'use client';

import { useState } from 'react';
import type { Material, IeltsReadingContent } from '@/modules/materials/service/materials.types';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { PlusCircle, Save, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { saveIeltsContent } from '../service/ielts.service';

type IeltsEditorProps = {
  material: Material;
};

// Dummy initial content for a new material
const initialContent: IeltsReadingContent = {
    passages: [{ id: 'p1', title: 'Passage 1', text: 'The history of the bicycle...' }],
    tasks: [],
};

// >>> BEGIN gen:editor.ielts.reading.ui (layer:ui)
export function IeltsEditor({ material }: IeltsEditorProps) {
  const [content, setContent] = useState<IeltsReadingContent>(() => {
      // Ensure content is a structured object, not a string.
      if (typeof material.content === 'object' && material.content !== null && 'passages' in material.content) {
          return material.content as IeltsReadingContent;
      }
      return initialContent;
  });

  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
      setIsSaving(true);
      try {
          await saveIeltsContent(material.id, content);
          toast({
              title: 'Content Saved',
              description: 'Your changes to the IELTS material have been saved.',
          });
      } catch (error) {
          toast({
              variant: 'destructive',
              title: 'Save Failed',
              description: error instanceof Error ? error.message : 'An unknown error occurred.',
          });
      } finally {
          setIsSaving(false);
      }
  }

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold font-headline">IELTS Reading Editor</h2>
            <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2" />}
                {isSaving ? 'Saving...' : 'Save Content'}
            </Button>
        </div>
      <Tabs defaultValue="passage-0">
        <TabsList>
          {content.passages.map((p, i) => (
            <TabsTrigger key={p.id} value={`passage-${i}`}>
              {p.title || `Passage ${i+1}`}
            </TabsTrigger>
          ))}
          {/* Add new passage button could go here */}
        </TabsList>
        {content.passages.map((p, i) => (
          <TabsContent key={p.id} value={`passage-${i}`}>
            <Card>
                <CardHeader>
                    <Input
                        value={p.title}
                        onChange={(e) => {
                            const newPassages = [...content.passages];
                            newPassages[i].title = e.target.value;
                            setContent({...content, passages: newPassages});
                        }}
                        className="text-lg font-semibold"
                    />
                </CardHeader>
              <CardContent>
                <Textarea
                  value={p.text}
                  onChange={(e) => {
                    const newPassages = [...content.passages];
                    newPassages[i].text = e.target.value;
                    setContent({...content, passages: newPassages});
                  }}
                  className="min-h-[300px]"
                />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      
      <Card>
        <CardHeader>
            <CardTitle>Tasks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            {/* Task rendering would go here */}
            <p className="text-muted-foreground">Task editing UI is a work in progress.</p>
            <Button variant="outline">
                <PlusCircle className="mr-2" />
                Add Task
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
// <<< END gen:editor.ielts.reading.ui
