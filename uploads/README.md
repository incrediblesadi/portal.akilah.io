# Uploads Directory

This directory is used for storing uploaded files such as:

- Business logos
- Menu item images  
- Category images
- Concept assets
- Display assets
- Kiosk assets

## Structure

```
uploads/
├── business/
│   ├── logos/
│   └── branding/
├── menu/
│   ├── categories/
│   ├── items/
│   └── concepts/
├── displays/
│   ├── templates/
│   └── assets/
└── kiosks/
    ├── templates/
    └── assets/
```

## File Types Supported

- Images: JPG, PNG, GIF, SVG
- Documents: PDF
- Videos: MP4, WEBM (for displays)

## Security Notes

- All uploads should be validated for file type and size
- Images should be optimized and resized as needed
- Implement virus scanning for uploaded files
- Use secure file naming conventions