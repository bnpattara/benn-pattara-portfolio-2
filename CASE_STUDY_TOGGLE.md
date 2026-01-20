# How to Hide Case Studies from Homepage

## Simple Method: Comment Out

To hide a case study from your homepage, simply comment it out in `/constants.tsx`.

### Example: Hiding Stella McCartney

```tsx
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'on-apex',
    // ... visible on homepage
  },
  // HIDDEN: Uncomment the lines below to show on homepage
  // {
  //   id: 'stella-mccartney',
  //   title: 'Stella McCartney x Zellerfeld',
  //   // ... rest of the object
  // },
  {
    id: 'nike-snkrs',
    // ... visible on homepage
  },
];
```

### To Hide a Case Study:
1. Open `/constants.tsx`
2. Find the case study object you want to hide
3. Add `//` at the start of each line of that object
4. Add a comment above like: `// HIDDEN: Uncomment to show`

### To Show a Hidden Case Study:
1. Open `/constants.tsx`
2. Find the commented-out case study
3. Remove the `//` from each line

### Deploy Your Changes:
```bash
npm run build
cp -r dist/* docs/
git add constants.tsx docs/
git commit -m "Update visible case studies"
git push origin main
```

## Current Status
- ✅ On Apex: Visible
- ❌ Stella McCartney: **HIDDEN** (commented out)
- ✅ Nike SNKRS: Visible
- ✅ Diesel: Visible
- ✅ Stylect: Visible
- ✅ Off-White Mentorship: Visible

## Why This Method?
- **Safe**: No filtering logic that could break
- **Simple**: Just comment/uncomment lines
- **Clear**: Easy to see what's hidden
- **No Dependencies**: Doesn't rely on any special fields or logic
