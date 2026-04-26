type Props = {
  onFileSelected: (file: File) => void;
  isLoading: boolean;
};

export function FileUpload({ onFileSelected, isLoading }: Props) {
  return (
    <div style={{ marginBottom: 16 }}>
      <input
        type="file"
        accept=".gpx"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            onFileSelected(file);
          }
        }}
        disabled={isLoading}
      />
    </div>
  );
}