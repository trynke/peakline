import { useRef } from 'react'

interface FileUploadProps {
  onFileSelected?: (file: File) => void
  accept?: string
  disabled?: boolean
}

export function FileUpload({
  onFileSelected,
  accept = '.gpx,.kml,.tcx',
  disabled = false,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && onFileSelected) {
      onFileSelected(file)
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        disabled={disabled}
        onChange={handleChange}
      />
    </div>
  )
}
