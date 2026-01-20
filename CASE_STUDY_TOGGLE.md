# Case Study Visibility Toggle - Quick Reference

## How It Works

You can now control which case studies appear on your home page by setting the `published` field in `constants.tsx`.

## Usage

### To Hide a Case Study
In `/constants.tsx`, set `published: false`:

```tsx
{
  id: 'stella-mccartney',
  title: 'Stella McCartney x Zellerfeld',
  // ... other fields
  published: false  // This case study will NOT appear on the home page
}
```

### To Show a Case Study
Set `published: true` or omit the field entirely (defaults to true):

```tsx
{
  id: 'nike-snkrs',
  title: 'Nike SNKRS: Bridging the Confidence Gap',
  // ... other fields
  published: true  // This case study WILL appear on the home page
}
```

## Current Status

- **On Apex**: Published ✅
- **Stella McCartney**: Hidden ❌ (example)
- **Nike SNKRS**: Published ✅
- **Diesel**: Published ✅
- **Stylect**: Published ✅
- **Off-White Mentorship**: Published ✅

## Notes

- Case studies with `published: false` are hidden from the home page grid
- The project count automatically updates to reflect only published case studies
- Users can still access hidden case studies directly via URL if they know the link
- This is perfect for hiding work-in-progress case studies while you edit them
