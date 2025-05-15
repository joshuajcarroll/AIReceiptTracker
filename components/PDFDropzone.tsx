"use client";

import {
    DndContext,
    useSensor,
    useSensors,
    PointerSensor
} from "@dnd-kit/core";
import { useCallback, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useSchematicEntitlement } from "@schematichq/schematic-react";


function PDFDropzone() {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
    const [isDraggingOver, setisDraggingOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const user = useUser();
    const {
        value: isFeatureEnabled,
        featureUsageExceeded,
        featureUsage,
        featureAllocation,
    } = useSchematicEntitlement("scans");
    
    //Set up the sensors for drag detection
    const sensors = useSensors(useSensor(PointerSensor));

    const handleUpload = useCallback(async(files: FileList | File[]) => {
        if(!user) {
            alert("Please sign in to upload files.");
            return;
        }

        const fileArray = Array.from(files);
        const pdfFiles = fileArray.filter((file) => file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"));

        if (pdfFiles.length === 0) {
            alert("Please drop only PDF files.");
            return;
        }

        setIsUploading(true);

        try {
            //Upload files
            const newUploadedFiles: string[] = [];

            for (const file of pdfFiles) {
                //Create a FormData object to use with the server action
                const formData = new FormData();
                formData.append("file", file);

                //Call the server action to handle the upload
                const result = await uploadPDF(formData);

                if (!result.success) {
                    throw new Error(result.error);
                }
                newUploadedFiles.push(file.name);
            }

            setUploadedFiles((prev) => [...prev, ...newUploadedFiles]);

            setTimeout(() => {
                setUploadedFiles([]);
            }, 5000);

            router.push("/receipts");

        } catch (error) {
            console.error("Upload failed:", error);
            alert(`Upload failed: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
        finally {
            setIsUploading(false);
        }

    },[user, router])

    /*const handleUpload = useCallback((files: FileList | File[]) => {
        // Convert FileList to an array and filter only PDF files
        const fileArray = Array.from(files);
        const pdfFiles = fileArray.filter(file =>
            file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")
        );
    
        if (pdfFiles.length === 0) {
            alert("Please drop only PDF files.");
            return;
        }
    
        // Log the valid PDF files to the console
        console.log("PDF files dropped:", pdfFiles);
    
        // You can add upload logic here if needed later
    }, []);*/
    

    //Handle file drop via native browser events for better PDF support
    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setisDraggingOver(true);
    },[]);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setisDraggingOver(false);
    },[]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setisDraggingOver(false);

        if(!user) {
            alert("Please sign in to upload files.");
            return;
        }

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            console.log("Files dropped:", e.dataTransfer.files);
            handleUpload(e.dataTransfer.files);
        }
    }, [user, handleUpload]);

    //const canUpload = isUserSignedIn && isFeatureEnabled;
    const canUpload = true;

  return (
    <DndContext sensors={sensors}>
        <div className="w-full max-w-md mx-auto bg-red-400">
            <div
                onDragOver = {canUpload ? handleDragOver : undefined}
                onDragLeave = {canUpload ? handleDragLeave : undefined}
                onDrop = {canUpload ? handleDrop : (e) => e.preventDefault()}
                className = {`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDraggingOver ? "border-blue-500 bg-blue-50" : "border-gray-300"}
                    ${canUpload ? "opacity-70 cursor-not-allowed" : ""}`}
            >
            </div>
        </div>
    </DndContext>
        
  )
}

export default PDFDropzone