"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const ResumeDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">View Resume</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-full h-[90vh] p-0 flex flex-col">
        <VisuallyHidden>
          <DialogTitle>Resume</DialogTitle>
        </VisuallyHidden>
        <div className="flex-grow overflow-hidden">
          {/* Using iframe to display the PDF */}
          <iframe
            src="/resume.pdf#toolbar=0&navpanes=0"
            width="100%"
            height="100%"
            className="border-none"
            title="My Resume"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeDialog; 